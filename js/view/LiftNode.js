// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Lift Node is the view for a Lift object in the simulation.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  // const assert = require( 'SIM_CORE/util/assert' );
  // const Lift = require( 'HYDRAULIC_LIFTS/model/Lift' );
  const Multilink = require( 'SIM_CORE/util/Multilink' );
  // const Property = require( 'SIM_CORE/util/Property' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );
  const SVGNode = require( 'SIM_CORE/scenery/SVGNode' );

  class LiftNode extends SVGNode {

    constructor( lift, initialCenterY, modelViewTransform, options ) {

      options = {
        x: lift.centerX,
        y: initialCenterY,
        width: lift.radius * 2,
        height: 1,
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

      /**
       * Create a Multilink to update the appearance of the Lift. Observe when following properties change:
       * - lift.radiusProperty - updates the width of liftRectangle to match the width of the lift
       * - this.centerYProperty - updates the y-coordinates of the liftRectangle
       */
      new Multilink( [ lift.radiusProperty, this.centerYProperty ], () => {
        this.updateLiftNode( lift, modelViewTransform );
        } );

    }

    updateLiftNode( lift, modelViewTransform ) {

      this.liftRectangle.width = modelViewTransform.modelToViewDeltaX( lift.radius * 2 );

      this.liftRectangle.y = modelViewTransform.modelToViewY( initialCenterY + lift.force * 5 );
    }

    dispose() {
      this.updateBallNodeMultilink.dispose();
    }
  }

  return LiftNode;
} );