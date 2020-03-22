// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * OutputLiftNode is the specific view for an output lift.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const LiftNode = require( 'HYDRAULIC_LIFTS/view/LiftNode' );
  const Multilink = require( 'SIM_CORE/util/Multilink' );
  const Vector = require( 'SIM_CORE/util/Vector' );

  class OutputLiftNode extends LiftNode {

    constructor( outputLift, initialCenterY, modelViewTransform, options ) {

      options = { ...options };

      super( outputLift, initialCenterY, modelViewTransform, options );

      this.outputLift = outputLift;

      /**
       * Create a Multilink to update the appearance of the Lift. Observe when following properties change:
       * - this.outputLift.radiusProperty - updates the width of liftRectangle to match the width of the lift
       * - this.outputLift.forceProperty - updates the y-coordinates of the liftRectangle and the length of the
       * forceArrow based on the force
       */
      new Multilink( [ this.outputLift.radiusProperty, this.outputLift.forceProperty ],
        ( outputRadius, outputForce ) => {

        this.liftRectangle.width = modelViewTransform.modelToViewDeltaX( outputRadius * 2 );

        this.liftRectangle.centerX = modelViewTransform.modelToViewX( outputLift.centerX );

        this.liftRectangle.centerY = this.liftCenterY - outputForce / 3;

        const tail = this.liftRectangle.center;

        const tip = tail.copy().subtract( new Vector( 0, outputForce ) );

        this.forceArrow.tail = tail;

        this.forceArrow.tip = tip;

      } );
    }
  }

  return OutputLiftNode;
} );