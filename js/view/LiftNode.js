// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Lift Node is the general view for a Lift object in the simulation.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Arrow = require( 'SIM_CORE/scenery/Arrow' );
  const Node = require( 'SIM_CORE/scenery/Node' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );

  class LiftNode extends Node {

    constructor( lift, initialCenterY, modelViewTransform, options ) {

      options = {
        height: 20,
        fill: 'red',

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };

      super( options );

      this.liftCenterY = initialCenterY;

      this.liftRectangle = new Rectangle( modelViewTransform.modelToViewDeltaX( lift.radius * 2 ),
        options.height, {
        centerX: modelViewTransform.modelToViewX( lift.centerX ),
        centerY: initialCenterY,
        fill: options.fill
      } );
      this.addChild( this.liftRectangle );

      // @public {Arrow} - represents the force exerted on or by the lift, initialized at 0
      this.forceArrow = new Arrow( 0, 0, 0, 0, { fill: 'green' } );
      this.addChild( this.forceArrow );

    }

    dispose() {
      this.updateLiftNodeMultilink.dispose();
    }
  }

  return LiftNode;
} );