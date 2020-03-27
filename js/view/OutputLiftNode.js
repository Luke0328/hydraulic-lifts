// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * OutputLiftNode is the specific view for an Output Lift.
 *
 * Extends LiftNode but creates a multilink to visually update LiftNode's components.
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

    /**
     * @param {OutputLift} outputLift - outputLift object
     * @param {number} initialCenterY - initial center y-coordinate
     * @param {ModelViewTransform} modelViewTransform - coordinate transform between model and view
     * @param {object} [options] - controls OutputLiftNode properties
     */
    constructor( outputLift, initialCenterY, modelViewTransform, options ) {

      // rewrite options such that it overrides the defaults above if provided.
      options = { ...options };

      super( outputLift, initialCenterY, modelViewTransform, options );

      /**
       * Create a Multilink to update the appearance of the Lift. Observe when following properties change:
       * - this.outputLift.radiusProperty - updates the width of liftRectangle and emptyRectangle to match
       * the width of the lift
       * - this.outputLift.forceProperty - updates the y-coordinates of the liftRectangle and emptyRectangle
       * and the length of the forceArrow based on the force
       * This multilink is never disposed as nothing in the sim is ever destroyed.
       */
      new Multilink( [ outputLift.radiusProperty, outputLift.forceProperty ],
        ( outputRadius, outputForce ) => {

        this.liftRectangle.width = modelViewTransform.modelToViewDeltaX( outputRadius * 2 );

        // Restores the center x-coordinate as changing the width of a Rectangle maintains the top left coordinate
        this.liftRectangle.centerX = modelViewTransform.modelToViewX( outputLift.centerX );

        this.emptyRectangle.width = modelViewTransform.modelToViewDeltaX( outputRadius * 2 );

        this.emptyRectangle.centerX = this.liftRectangle.centerX;

        /**
         * Adjust the center y-coordinate such that the liftRectangle is at the top of the container when
         * max force is exerted on the output lift
         **/
        this.liftRectangle.centerY = this.liftCenterY - outputForce / 3.5;

        this.emptyRectangle.bottom = this.liftRectangle.top;

        const tail = this.liftRectangle.center;

        /**
         * Adjust the vector tip such that it is at the top of the screen when
         * max force is exerted on the output lift
         **/
        const tip = tail.copy().subtract( new Vector( 0, outputForce * 1.1 ) );

        this.forceArrow.tail = tail;

        this.forceArrow.tip = tip;

      } );

    }
  }

  return OutputLiftNode;
} );