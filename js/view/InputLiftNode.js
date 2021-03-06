// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * InputLiftNode is the specific view for an Input Lift.
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

  class InputLiftNode extends LiftNode {

    /**
     * @param {InputLift} inputLift - inputLift object
     * @param {number} initialCenterY - initial center y-coordinate
     * @param {Property.<boolean>} arrowsVisibleProperty - determines if the force arrows are visible
     * @param {ModelViewTransform} modelViewTransform - coordinate transform between model and view
     * @param {object} [options] - controls InputLiftNode properties
     */
    constructor( inputLift, initialCenterY, arrowsVisibleProperty, modelViewTransform, options ) {

      // rewrite options such that it overrides the defaults above if provided.
      options = { ...options };

      super( inputLift, initialCenterY, modelViewTransform, options );

      /**
       * Create a Multilink to update the appearance of the Lift. Observe when following properties change:
       * - this.inputLift.radiusProperty - updates the width of liftRectangle and emptyRectangle to match
       * the width of the lift
       * - this.inputLift.forceProperty - updates the y-coordinates of the liftRectangle and emptyRectangle
       * and the length of the forceArrow based on the force
       * This multilink is never disposed as nothing in the sim is ever destroyed.
       */
      new Multilink( [ inputLift.radiusProperty, inputLift.forceProperty, arrowsVisibleProperty ],
       ( inputRadius, inputForce, isVisible ) => {

        this.liftRectangle.width = modelViewTransform.modelToViewDeltaX( inputRadius * 2 );

        // Restores the center x-coordinate as changing the width of a Rectangle maintains the top left coordinate
        this.liftRectangle.centerX = modelViewTransform.modelToViewX( inputLift.centerX );

        this.emptyRectangle.width = modelViewTransform.modelToViewDeltaX( inputRadius * 2 );

        this.emptyRectangle.centerX = this.liftRectangle.centerX;

        /**
         * Adjust the center y-coordinate such that the liftRectangle reaches the bottom of the container when
         * 5 N of force are exerted on the ouput lift
         */
        this.liftRectangle.centerY = this.liftCenterY + inputForce * 15;

        this.emptyRectangle.bottom = this.liftRectangle.top;

        const tip = this.liftRectangle.center;

        const tail = tip.copy().subtract( new Vector( 0, inputForce * 6 ) ); // slight adjustment for visual effect

        this.forceArrow.tail = tail;

        this.forceArrow.tip = tip;

        // Update the visiblity of the arrows
        this.forceArrow.visible = isVisible;

      } );

    }
  }

  return InputLiftNode;
} );