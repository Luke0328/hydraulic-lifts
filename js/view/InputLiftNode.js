// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * InputLiftNode is the specific view for an input lift.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const LiftNode = require( 'HYDRAULIC_LIFTS/view/LiftNode' );
  const Multilink = require( 'SIM_CORE/util/Multilink' );
  const Vector = require( 'SIM_CORE/util/Vector' );
  const VectorNode = require( 'SIM_CORE/scenery/VectorNode' );

  class InputLiftNode extends LiftNode {

    constructor( lift, initialCenterY, modelViewTransform, options ) {

      options = { ...options };

      super( lift, initialCenterY, modelViewTransform, options );

      this.forceVector = new VectorNode( Vector.ZERO, Vector.ZERO, { fill: 'green' } );

      this.addChild( this.forceVector );

      /**
       * Create a Multilink to update the appearance of the Lift. Observe when following properties change:
       * - lift.radiusProperty - updates the width of liftRectangle to match the width of the lift
       * - this.centerYProperty - updates the y-coordinates of the liftRectangle
       */
      this.updateLiftNodeMultilink = new Multilink( [ lift.radiusProperty, this.centerYProperty ], () => {
        this.updateLiftNode( lift, modelViewTransform );
      } );
    }

    updateLiftNode( lift, modelViewTransform ) {

      this.liftRectangle.width = modelViewTransform.modelToViewDeltaX( lift.radius * 2 );

      this.liftRectangle.y = this.centerYProperty.value - modelViewTransform.modelToViewY( lift.force * 50 );
    }
  }

  return InputLiftNode;
} );