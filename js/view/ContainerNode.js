// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * View for the container in the simulation.
 * ContainerNode creates two LiftNode's.
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
  const INITIAL_INPUT_CENTER_Y = 220;
  const INITIAL_OUTPUT_CENTER_Y = 330;
  const OPENING_GAP = 1.5;

  class ContainerNode extends Node {

    constructor( container, modelViewTransform, options ) {

      options = {
        stroke: 'black',
        fill: 'blue',
        strokeWidth: 2.5,

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
        modelViewTransform.modelToViewPoint( container.containerCenterPosition ),
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
        top: modelViewTransform.modelToViewY( container.containerCenterPosition.y ) + 10,
        cornerRadius: 1
      } );

      // Create the text inside the number display rectangle
      const numberDisplayText = new Text( '', {
        fontSize: 15,
        centerX: numberDisplay.left + numberDisplay.width / 5 - 2,
        centerY: numberDisplay.top + numberDisplay.height / 5 + 2
      } );

      // Link the forceProperty to the text such that the text displays the current force outputted
      container.outputLift.forceProperty.link( value => {
        numberDisplayText.setText( `${ Util.toFixed( value, 1 ) } ${ 'N' }` );
      } );

      /**
       * Create a Multilink to update the appearances of the openings. Observe when following properties change:
       * - container.inputLift.radiusProperty - updates the left width of the container path
       * - container.outputLift.radiusProperty - updates the right width of the container path
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