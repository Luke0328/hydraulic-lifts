// Copyright © 2020 Luke Pan. All rights reserved.

/**
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  // const assert = require( 'SIM_CORE/util/assert' );
  const LiftNode = require( 'HYDRAULIC_LIFTS/view/LiftNode' );
  // const Property = require( 'SIM_CORE/util/Property' );
  const SVGNode = require( 'SIM_CORE/scenery/SVGNode' );

  class ContainerNode extends SVGNode {

    constructor( container, modelViewTransform, options ) {

      options = { ...options };

      super( options );

      // Create the input lift node
      const inputLiftNode = new LiftNode( container.inputLift, modelViewTransform );

      // Create the output lift node
      const outputLiftNode = new LiftNode( container.outputLift, modelViewTransform );

      const containerCenterRectangle = new Rectangle( {
        width: 400,
        height 300,
        stroke: 'black',
        fill: 'white',
        strokewidth: 1
       } );
  }
  }
  return ContainerNode;
} );