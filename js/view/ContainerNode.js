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

  // constants
  const INITIAL_INPUT_CENTER_Y = 230;
  const INITIAL_OUTPUT_CENTER_Y = 330;
  const OPENING_GAP = 10;

  class ContainerNode extends Node {

    constructor( container, modelViewTransform, options ) {

      options = {
        stroke: 'black',
        fill: 'blue',
        strokeWidth: 1.5,
        ...options
      };

      super( options );

      // Create the input lift node
      const inputLiftNode = new InputLiftNode( container.inputLift, INITIAL_INPUT_CENTER_Y, modelViewTransform );

      // Create the output lift node
      const outputLiftNode = new OutputLiftNode( container.outputLift, INITIAL_OUTPUT_CENTER_Y, modelViewTransform );

      // Create the container center rectangle
      const containerCenterRectangle = new Rectangle( 200, 150, {
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

      /**
       * Create a Multilink to update the appearances of the openings. Observe when following properties change:
       * - container.inputLift.radiusProperty - updates the width of the input opening
       * - container.outputLift.radiusProperty - updates the width of the output opening
       */
      new Multilink( [ container.inputLift.radiusProperty, container.outputLift.radiusProperty ],
        ( inputRadius, outputRadius ) => {
        containerInputOpening.width = ( modelViewTransform.modelToViewDeltaX( inputRadius ) + OPENING_GAP ) * 2;
        containerOutputOpening.width = ( modelViewTransform.modelToViewDeltaX( outputRadius ) + OPENING_GAP ) * 2;
      } );

      // Render the children in the correct z-layering
      this.setChildren( [
        containerCenterRectangle,
        containerInputOpening,
        containerOutputOpening,
        inputLiftNode,
        outputLiftNode
      ] );
    }
  }

  return ContainerNode;
} );