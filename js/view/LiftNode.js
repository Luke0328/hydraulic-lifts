// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Lift Node is the general view for a Lift object in the simulation.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  // const assert = require( 'SIM_CORE/util/assert' );
  // const Lift = require( 'HYDRAULIC_LIFTS/model/Lift' );
  const Property = require( 'SIM_CORE/util/Property' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );
  const Node = require( 'SIM_CORE/scenery/Node' );

  class LiftNode extends Node {

    constructor( lift, initialCenterY, modelViewTransform, options ) {

      options = {
        x: lift.centerX,
        y: initialCenterY,
        width: modelViewTransform.modelToViewDeltaX( lift.radius * 2 ),
        height: 50,
        fill: 'red',

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };

      super( options );

      this.centerYProperty = new Property( initialCenterY, { type: 'number' } );

      this.liftRectangle = new Rectangle( {
        x: options.x,
        y: options.y,
        width: options.width,
        height: options.height,
        fill: options.fill
      } );

      this.addChild( this.liftRectangle );

    }

    dispose() {
      this.updateLiftNodeMultilink.dispose();
    }
  }

  return LiftNode;
} );