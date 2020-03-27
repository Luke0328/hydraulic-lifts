// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * View for the container in the simulation.
 *
 * ContainerNode creates two LiftNode's, a ContainerPath, a number Display.
 * ContainerNode also creates a multilink to update the appearances of the left and right openings of the ContainerPath.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const ContainerPath = require( 'HYDRAULIC_LIFTS/view/ContainerPath' );
  const InputLiftNode = require( 'HYDRAULIC_LIFTS/view/InputLiftNode' );
  const Multilink = require( 'SIM_CORE/util/Multilink' );
  const Node = require( 'SIM_CORE/scenery/Node' );
  const OutputLiftNode = require( 'HYDRAULIC_LIFTS/view/OutputLiftNode' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );
  const Text = require( 'SIM_CORE/scenery/Text' );
  const Util = require( 'SIM_CORE/util/Util' );
  const Vector = require( 'SIM_CORE/util/Vector' );

  // constants
  const INITIAL_INPUT_CENTER_Y = 300; // eyeballed
  const INITIAL_OUTPUT_CENTER_Y = 380; // eyeballed
  const OPENING_GAP = 1.5; // eyeballed

  class ContainerNode extends Node {

    /**
     * @param {Container} container - Container object
     * @param {ModelViewTransform} modelViewTransform - coordinate transform between model and view
     * @param {object} [options] - controls ContainerNode properties
     */
    constructor( container, modelViewTransform, options ) {

      options = {
        fill: 'blue', // {Color|string} - fill color
        stroke: 'black', // {Color|string} - stroke color
        strokeWidth: 2.5, // {number} - width of the stroke

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };

      super( options );

      // Create the input lift node
      const inputLiftNode = new InputLiftNode( container.inputLift, INITIAL_INPUT_CENTER_Y, modelViewTransform );

      // Create the output lift node
      const outputLiftNode = new OutputLiftNode( container.outputLift, INITIAL_OUTPUT_CENTER_Y, modelViewTransform );

      // Create the container path
      const containerPath = new ContainerPath(
        new Vector( modelViewTransform.modelToViewX( container.inputLift.centerX ), INITIAL_INPUT_CENTER_Y - 10 ),
        modelViewTransform.modelToViewPoint( new Vector( 4, -4 ) ),
        new Vector( modelViewTransform.modelToViewX( container.outputLift.centerX ), INITIAL_INPUT_CENTER_Y - 10 ),
        {
          midHeight: 70,
          stroke: options.stroke,
          fill: options.fill,
          strokeWidth: options.strokeWidth
        } );

      // Create the background rectangle for the number display
      const numberDisplay = new Rectangle( 75, 30, {
        fill: 'white',
        stroke: 'rgb( 150, 150, 150 )',
        strokeWidth: 0.5,
        centerX: modelViewTransform.modelToViewX( container.outputLift.centerX ),
        top: INITIAL_OUTPUT_CENTER_Y + 20,
        cornerRadius: 1
      } );

      // Create the text inside the number display rectangle
      const numberDisplayText = new Text( '', {
        fontSize: 15
      } );

      // Link the forceProperty to the text such that the text displays the current force outputted.
      // This link is never disposed as nothing in the sim is ever destroyed.
      container.outputLift.forceProperty.link( value => {
        numberDisplayText.setText( `${ Util.toFixed( value, 1 ) } ${ 'N' }` );
        numberDisplayText.center = numberDisplay.center;
      } );

      /**
       * Create a Multilink to update the appearances of the openings. Observe when following properties change:
       * - container.inputLift.radiusProperty - updates the left width of the container path
       * - container.outputLift.radiusProperty - updates the right width of the container path
       * This multilink is never disposed as nothing in the sim is ever destroyed.
       */
      new Multilink( [ container.inputLift.radiusProperty, container.outputLift.radiusProperty ],
        ( inputRadius, outputRadius ) => {

        containerPath.leftWidth = ( modelViewTransform.modelToViewDeltaX( inputRadius ) + OPENING_GAP ) * 2;

        containerPath.rightWidth = ( modelViewTransform.modelToViewDeltaX( outputRadius ) + OPENING_GAP ) * 2;

      } );

      // Render the children in the correct z-layering
      this.setChildren( [
        containerPath,
        numberDisplay,
        numberDisplayText,
        inputLiftNode,
        outputLiftNode
      ] );

    }
  }

  return ContainerNode;
} );