// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * InputLiftNode is the specific view for an input lift.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Arrow = require( 'SIM_CORE/scenery/Arrow' );
  const LiftNode = require( 'HYDRAULIC_LIFTS/view/LiftNode' );
  const Multilink = require( 'SIM_CORE/util/Multilink' );
  const Vector = require( 'SIM_CORE/util/Vector' );

  class InputLiftNode extends LiftNode {

    constructor( inputLift, initialCenterY, modelViewTransform, options ) {

      options = { ...options };

      super( inputLift, initialCenterY, modelViewTransform, options );

      this.inputLift = inputLift;

      /**
       * Create a Multilink to update the appearance of the Lift. Observe when following properties change:
       * - this.inputLift.radiusProperty - updates the width of liftRectangle to match the width of the lift
       * - this.inputLift.forceProperty - updates the y-coordinates of the liftRectangle and the length of the forceArrow
       * based on the force
       */
      new Multilink( [ this.inputLift.radiusProperty, this.inputLift.forceProperty ], ( inputRadius, inputForce ) => {

        this.liftRectangle.width = modelViewTransform.modelToViewDeltaX( inputRadius * 2 );

        this.liftRectangle.centerX = modelViewTransform.modelToViewX( inputLift.centerX );

        this.liftRectangle.centerY = this.liftCenterY + inputForce * 3;

        const tip = this.liftRectangle.center;

        const tail = tip.copy().subtract( new Vector( 0, inputForce ) );

        this.forceArrow.tail = tail;

        this.forceArrow.tip = tip;

      } );
    }
  }

  return InputLiftNode;
} );