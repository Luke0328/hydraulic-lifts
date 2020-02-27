// Copyright © 2020 Luke Pan. All rights reserved.

/**
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  // const assert = require( 'SIM_CORE/util/assert' );
  // const Lift = require( 'HYDRAULIC_LIFTS/model/Lift' );
  // const Property = require( 'SIM_CORE/util/Property' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );
  const SVGNode = require( 'SIM_CORE/scenery/SVGNode' );


  class LiftNode extends SVGNode {

    constructor( lift, modelViewTransform, options ) {

      options = {

        width: 300,
        height: 20,
        cornerRadius: 5,
        stroke: 'black',
        fill: 'red',
        strokeWidth: 1,

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };

      super( options );

      this.liftRectangle = new Rectangle( {
        width: options.width,
        height: options.height,
        cornerRadius: options.cornerRadius,
        stroke: options.stroke,
        fill: options.fill,
        strokeWidth: options.strokeWidth
      } );
    }
  }

  return LiftNode;
} );