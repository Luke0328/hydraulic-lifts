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
  // const VectorNode = require( 'SIM_CORE/scenery/VectorNode' );

  class OutputLiftNode extends LiftNode {

    constructor( outputLift, initialCenterY, modelViewTransform, options ) {

      options = { ...options };

      super( outputLift, initialCenterY, modelViewTransform, options );

      // // @public {VectorNode} - represents the force exerted by the lift, initialized at 0
      // this.forceVector = new VectorNode( Vector.ZERO, Vector.ZERO, { fill: 'green' } );
      // this.addChild( this.forceVector );

      /**
       * Create a Multilink to update the appearance of the Lift. Observe when following properties change:
       * - outputLift.radiusProperty - updates the width of liftRectangle to match the width of the lift
       * - outputLift.forceProperty - updates the y-coordinates of the liftRectangle and the length of the forceVector
       * based on the force
       */
      this.updateOutputLiftNodeMultilink = new Multilink( [ outputLift.radiusProperty, outputLift.forceProperty ], () => {
        this.updateOutputLiftNode( outputLift, modelViewTransform );
      } );
    }

    updateOutputLiftNode( outputLift, modelViewTransform ) {

      this.liftRectangle.width = modelViewTransform.modelToViewDeltaX( outputLift.radius * 2 );

      this.liftRectangle.centerY = this.centerYProperty.value + modelViewTransform.modelToViewY( outputLift.force * 5 );

      const start = new Vector( modelViewTransform.modelToViewX( outputLift.centerX ), this.liftRectangle.centerY );

      const end = start.copy().add( new Vector( 0, modelViewTransform.modelToViewDeltaY( outputLift.force * 3 ) ) );

      // this.forceVector.set( start, end );
    }
  }

  return OutputLiftNode;
} );