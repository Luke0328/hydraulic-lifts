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

      // @public {Rectangle} liftRectangle - represents a lift, initialized with a width of 0
      this.liftRectangle = new Rectangle( 0,
        options.height, {
        centerX: modelViewTransform.modelToViewX( lift.centerX ),
        centerY: initialCenterY,
        fill: options.fill
      } );

      // @public {Rectangle} emptyRectanlge - created for visual effect, initalized with a width of 0
      this.emptyRectangle = new Rectangle( 0, 155, {
        centerX: this.liftRectangle.centerX,
        bottom: this.liftRectangle.top,
        fill: 'rgb( 255, 250, 227 )'
      } );

      // @public {Arrow} forceArrow - represents the force exerted on or by the lift, initialized at 0
      this.forceArrow = new Arrow( 0, 0, 0, 0, {
        fill: 'green',
        headHeight: 16,
        headWidth: 20,
        tailWidth: 12
      } );

      // Render the children in the correct z-layering
      this.setChildren( [ this.liftRectangle, this.emptyRectangle, this.forceArrow ] );
    }

    dispose() {
      this.updateLiftNodeMultilink.dispose();
    }
  }

  return LiftNode;
} );