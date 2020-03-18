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
  const Arrow = require( 'SIM_CORE/scenery/Arrow' );

  class InputLiftNode extends LiftNode {

    constructor( inputLift, initialCenterY, modelViewTransform, options ) {

      options = { ...options };

      super( inputLift, initialCenterY, modelViewTransform, options );

      // @public {Arrow} - represents the force exerted on the lift, initialized at 0
      this.forceArrow = new Arrow( 0, 0, 0, 0, { fill: 'green' } );
      this.addChild( this.forceArrow );

      /**
       * Create a Multilink to update the appearance of the Lift. Observe when following properties change:
       * - inputLift.radiusProperty - updates the width of liftRectangle to match the width of the lift
       * - inputLift.forceProperty - updates the y-coordinates of the liftRectangle and the length of the forceArrow
       * based on the force
       */
      this.updateInputiftNodeMultilink = new Multilink( [ inputLift.radiusProperty, inputLift.forceProperty ], () => {
        this.updateInputLiftNode( inputLift, modelViewTransform );
      } );
    }

    updateInputLiftNode( inputLift, modelViewTransform ) {

      this.liftRectangle.width = modelViewTransform.modelToViewDeltaX( inputLift.radius * 2 );

      this.liftRectangle.centerY = this.centerYProperty.value - inputLift.force * 5;

      const tip = new Vector( modelViewTransform.modelToViewX( inputLift.centerX ), this.liftRectangle.centerY );

      const tail = tip.copy().add( new Vector( 0, modelViewTransform.modelToViewDeltaY( inputLift.force * 3 ) ) );

      this.forceArrow.tail.set( tail );

      this.forceArrow.tip.set( tip );
    }
  }

  return InputLiftNode;
} );