// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * OutputLift is the general model for the Output Lift.
 *
 * The output force changes according to the radii of the lifts and the input force.
 *
 * Note the following equation:
 * - Output Force = (Output Area / Input Area) * Input Force
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Lift = require( 'HYDRAULIC_LIFTS/model/Lift' );
  const Multilink = require( 'SIM_CORE/util/Multilink' );
  const Range = require( 'SIM_CORE/util/Range' );


  class OutputLift extends Lift {

    /**
     * @param {number} initialCenterX - center x-coordinate for the Output Lift
     * @param {InputLift} inputLift - Input Lift object
     * @param {object} [options] - controls Output Lift properties
     */
    constructor( initialCenterX, inputLift, options ) {

      options = {

        initialRadius: 5, // {number} - initial surface radius of Ouput Lift, in Meters

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };

      super( initialCenterX, options );

      this.radiusRange = new Range( 5, 7 ); // in meters

      this.inputLift = inputLift;

      /**
       * Create a Multilink to update the output force. Observe when following properties change:
       *    - this.inputLift.radiusProperty
       *    - this.inputLift.forceProperty
       *    - this.radiusProperty
       * Calculates the ouput force using the equation given in the introduction documentation.
       */
      new Multilink( [ this.inputLift.radiusProperty, this.inputLift.forceProperty, this.radiusProperty ],
        ( inputRadius, inputForce, outputRadius ) => {
        this.forceProperty.value = Math.pow( outputRadius / inputRadius, 2 ) * inputForce;
      } );
    }

    // Convenience Methods
    /**
     * Gets the x-coordinate of the Lift's center
     * @public
     * @returns {number} - in meters
     */
    get centerX() {
      return this.centerXProperty.value;
    }

  }

  return OutputLift;
} );