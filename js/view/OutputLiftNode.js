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
       */
      new Multilink( [ outputLift.radiusProperty, outputLift.forceProperty ],
        ( outputRadius, outputForce ) => {

        this.liftRectangle.width = modelViewTransform.modelToViewDeltaX( outputRadius * 2 );

        // Restores the center x-coordinate as changing the width of a Rectangle maintains the top left coordinate
        this.liftRectangle.centerX = modelViewTransform.modelToViewX( outputLift.centerX );

        this.emptyRectangle.width = modelViewTransform.modelToViewDeltaX( outputRadius * 2 );

        this.emptyRectangle.centerX = this.liftRectangle.centerX;

        this.liftRectangle.centerY = this.liftCenterY - outputForce / 3; // slight adjustment for visual effect

        this.emptyRectangle.bottom = this.liftRectangle.top;

        const tail = this.liftRectangle.center;

        const tip = tail.copy().subtract( new Vector( 0, outputForce ) );

        this.forceArrow.tail = tail;

        this.forceArrow.tip = tip;

      } );

    }
  }

  return OutputLiftNode;
} );