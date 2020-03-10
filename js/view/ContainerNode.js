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
  // const assert = require( 'SIM_CORE/util/assert' );
  const InputLiftNode = require( 'HYDRAULIC_LIFTS/view/InputLiftNode' );
  const Multilink = require( 'SIM_CORE/util/Multilink' );
  const OutputLiftNode = require( 'HYDRAULIC_LIFTS/view/OutputLiftNode' );
  // const Property = require( 'SIM_CORE/util/Property' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );
  const Node = require( 'SIM_CORE/scenery/Node' );

  // constants
  const INITIAL_INPUT_CENTER_Y = 300;
  const INITIAL_OUTPUT_CENTER_Y = 800;
  const OPENING_GAP = 10;

  class ContainerNode extends Node {

    constructor( container, modelViewTransform, options ) {

      options = {
        stroke: 'black',
        fill: 'blue',
        strokewidth: 2,
        ...options
      };

      super( options );

      // Create the input lift node
      const inputLiftNode = new InputLiftNode( container.inputLift, INITIAL_INPUT_CENTER_Y, modelViewTransform );

      // Create the output lift node
      const outputLiftNode = new OutputLiftNode( container.outputLift, INITIAL_OUTPUT_CENTER_Y, modelViewTransform );

      // Create the container center rectangle
      const containerCenterRectangle = new Rectangle( {
        x: container.containerCenter.x,
        y: container.containerCenter.y,
        width: 400,
        height: 250,
        stroke: options.stroke,
        fill: options.fill,
        strokewidth: options.strokewidth
       } );

      // Create the container's input opening rectangle
      const containerInputOpening = new Rectangle( {
        width: ( container.inputLift.radius + OPENING_GAP ) * 2,
        height: 400,
        stroke: options.stroke,
        fill: options.fill,
        strokewidth: options.strokewidth
      } );

      // Create the container's output opening rectangle
      const containerOutputOpening = new Rectangle( {
        width: ( container.outputLift.radius + OPENING_GAP ) * 2,
        height: 400,
        stroke: options.stroke,
        fill: options.fill,
        strokewidth: options.strokewidth
      } );

      /**
       * Create a Multilink to update the appearances of the openings. Observe when following properties change:
       * - container.inputLift.radiusProperty - updates the width of the input opening
       * - container.outputLift.radiusProperty - updates the width of the output opening
       */
      new Multilink( [ container.inputLift.radiusProperty, container.outputLift.radiusProperty ],
        ( inputRadius, outputRadius ) => {
        this.containerInputOpening.width = ( inputRadius + OPENING_GAP ) * 2;
        this.containerOutputOpening.width = ( outputRadius + OPENING_GAP ) * 2;
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