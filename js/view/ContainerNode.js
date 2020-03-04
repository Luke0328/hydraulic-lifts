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
  const LiftNode = require( 'HYDRAULIC_LIFTS/view/LiftNode' );
  const Multilink = require( 'SIM_CORE/util/Multilink' );
  // const Property = require( 'SIM_CORE/util/Property' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );
  const SVGNode = require( 'SIM_CORE/scenery/SVGNode' );

  // constants
  const INITIAL_INPUT_CENTER_Y = 3;
  const INITIAL_OUPUT_CENTER_Y = 3;
  const OPENING_GAP = 0.05;

  class ContainerNode extends SVGNode {

    constructor( container, modelViewTransform, options ) {

      options = {
        stroke: 'black',
        fill: 'blue',
        strokewidth: 2,
        ...options
      };

      super( options );

      // Create the input lift node
      const inputLiftNode = new LiftNode( container.inputLift, INITIAL_INPUT_CENTER_Y, modelViewTransform );

      // Create the output lift node
      const outputLiftNode = new LiftNode( container.outputLift, INITIAL_OUTPUT_CENTER_Y,modelViewTransform );

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
        height: 350,
        stroke: options.stroke,
        fill: options.fill,
        strokewidth: options.strokewidth
      } );

      // Create the container's output opening rectangle
      const containerOutputOpening = new Rectangle( {
        width: ( container.outputLift.radius + OPENING_GAP ) * 2,
        height: 350,
        stroke: options.stroke,
        fill: options.fill,
        strokewidth: options.strokewidth
      } );

      new Multilink( [ container.inputLift.radiusProperty, container.outputLift.radiusProperty ],
        ( inputRadius, outputRadius ) => {
        this.containerInputOpening.width = 2 * ( inputRadius + OPENING_GAP );
        this.containerOutputOpening.width = 2 * ( outputRadius + OPENING_GAP );
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