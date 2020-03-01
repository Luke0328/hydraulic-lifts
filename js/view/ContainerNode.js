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
  // const Property = require( 'SIM_CORE/util/Property' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );
  const SVGNode = require( 'SIM_CORE/scenery/SVGNode' );

  class ContainerNode extends SVGNode {

    constructor( container, modelViewTransform, options ) {

      options = {
        stroke: 'black',
        fill: 'blue',
        strokewidth: 1,
        ...options
      };

      super( options );

      // Create the input lift node
      const inputLiftNode = new LiftNode( container.inputLift, modelViewTransform );

      // Create the output lift node
      const outputLiftNode = new LiftNode( container.outputLift, modelViewTransform );

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
        width: container.inputOpeningWidth,
        height: 350,
        stroke: options.stroke,
        fill: options.fill,
        strokewidth: options.strokewidth
      } );

      // Create the container's output opening rectangle
      const containerOutputOpening = new Rectangle( {
        width: container.outputOpeningWidth,
        height: 350,
        stroke: options.stroke,
        fill: options.fill,
        strokewidth: options.strokewidth
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