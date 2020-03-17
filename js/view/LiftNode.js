// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Lift Node is the general view for a Lift object in the simulation.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Node = require( 'SIM_CORE/scenery/Node' );
  const Property = require( 'SIM_CORE/util/Property' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );

  class LiftNode extends Node {

    constructor( lift, initialCenterY, modelViewTransform, options ) {

      options = {
        height: 30,
        fill: 'red',

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };

      super( options );

      this.centerYProperty = new Property( initialCenterY, { type: 'number' } );

      this.liftRectangle = new Rectangle( modelViewTransform.modelToViewDeltaX( lift.radius * 2 ),
        options.height, {
        centerX: modelViewTransform.modelToViewX( lift.centerX ),
        centerY: initialCenterY,
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