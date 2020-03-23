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
  const InputLiftNode = require( 'HYDRAULIC_LIFTS/view/InputLiftNode' );
  const Multilink = require( 'SIM_CORE/util/Multilink' );
  const Node = require( 'SIM_CORE/scenery/Node' );
  const OutputLiftNode = require( 'HYDRAULIC_LIFTS/view/OutputLiftNode' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );
  const Text = require( 'SIM_CORE/scenery/Text' );
  const Util = require( 'SIM_CORE/util/Util' );

  // constants
  const INITIAL_INPUT_CENTER_Y = 235;
  const INITIAL_OUTPUT_CENTER_Y = 335;
  const OPENING_GAP = 1.5;

  class ContainerNode extends Node {

    constructor( container, modelViewTransform, options ) {

      options = {
        stroke: 'black',
        fill: 'blue',
        strokeWidth: 2.5,
        ...options
      };

      super( options );

      // Create the input lift node
      const inputLiftNode = new InputLiftNode( container.inputLift, INITIAL_INPUT_CENTER_Y, modelViewTransform );

      // Create the output lift node
      const outputLiftNode = new OutputLiftNode( container.outputLift, INITIAL_OUTPUT_CENTER_Y, modelViewTransform );

      // Create the container center rectangle
      const containerCenterRectangle = new Rectangle( 300, 150, {
        center: modelViewTransform.modelToViewPoint( container.containerCenterPosition ),
        stroke: options.stroke,
        fill: options.fill,
        strokeWidth: options.strokeWidth
      } );

      // Create the container's input opening rectangle
      const containerInputOpening = new Rectangle(
        ( modelViewTransform.modelToViewDeltaX( container.inputLift.radius ) + OPENING_GAP ) * 2,
        230, {
        centerX: modelViewTransform.modelToViewX( container.inputLift.centerX ),
        centerY: modelViewTransform.modelToViewY( container.containerCenterPosition.y ),
        stroke: options.stroke,
        fill: options.fill,
        strokeWidth: options.strokeWidth
      } );

      // Create the container's output opening rectangle
      const containerOutputOpening = new Rectangle(
        ( modelViewTransform.modelToViewDeltaX( container.outputLift.radius ) + OPENING_GAP ) * 2,
        230, {
        centerX: modelViewTransform.modelToViewX( container.outputLift.centerX ),
        centerY: modelViewTransform.modelToViewY( container.containerCenterPosition.y ),
        stroke: options.stroke,
        fill: options.fill,
        strokeWidth: options.strokeWidth
      } );

      // Create the output force number display
      const numberDisplay = new Rectangle( 75, 30, {
        fill: 'white',
        stroke: 'rgb( 150, 150, 150 )',
        strokeWidth: 0.5,
        centerX: modelViewTransform.modelToViewX( container.outputLift.centerX ),
        top: modelViewTransform.modelToViewY( container.containerCenterPosition.y ) + 10,
        cornerRadius: 1
      } );
      const numberDisplayText = new Text( '', {
        fontSize: 15,
        centerX: numberDisplay.left + numberDisplay.width / 5 - 2,
        centerY: numberDisplay.top + numberDisplay.height / 5 + 2
      } );

      container.outputLift.forceProperty.link( value => {
        numberDisplayText.setText( `${ Util.toFixed( value, 1 ) } ${ 'N' }` );
      } );

      /**
       * Create a Multilink to update the appearances of the openings. Observe when following properties change:
       * - container.inputLift.radiusProperty - updates the width of the input opening
       * - container.outputLift.radiusProperty - updates the width of the output opening
       */
      new Multilink( [ container.inputLift.radiusProperty, container.outputLift.radiusProperty ],
        ( inputRadius, outputRadius ) => {

        containerInputOpening.width = ( modelViewTransform.modelToViewDeltaX( inputRadius ) + OPENING_GAP ) * 2;

        containerInputOpening.centerX = modelViewTransform.modelToViewX( container.inputLift.centerX );

        containerOutputOpening.width = ( modelViewTransform.modelToViewDeltaX( outputRadius ) + OPENING_GAP ) * 2;

        containerOutputOpening.centerX = modelViewTransform.modelToViewX( container.outputLift.centerX );

      } );

      // Render the children in the correct z-layering
      this.setChildren( [
        containerCenterRectangle,
        containerInputOpening,
        containerOutputOpening,
        numberDisplay,
        numberDisplayText,
        inputLiftNode,
        outputLiftNode
      ] );
    }
  }

  return ContainerNode;
} );