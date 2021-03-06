// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * OutputLift is the general model for the Output Lift.
 *
 * Extends Lift while adding the following:
 *  1. A range for the radius used by sliders in the control panel
 *  2. A multilink to update the output force which changes according to the radii of both lifts and the input force.
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

  // constants
  const OUTPUT_RADIUS_RANGE = new Range( 5, 7 ); // chosen arbitrarily

  class OutputLift extends Lift {

    /**
     * @param {number} centerX - center x-coordinate for the Output Lift
     * @param {InputLift} inputLift - Input Lift object
     * @param {object} [options] - controls Output Lift properties
     */
    constructor( inputLift, centerX, options ) {

      options = {

        initialRadius: 5, // {number} - initial surface radius of Ouput Lift, in Meters

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };

      super( centerX, options );

      // @public (read-only) {Range} - Range of radii available for the slider in the control panel, in Meters
      this.radiusRange = OUTPUT_RADIUS_RANGE;

      /**
       * Create a Multilink to update the output force. Observe when following properties change:
       *    - this.inputLift.areaProperty
       *    - this.inputLift.forceProperty
       *    - this.areaProperty
       * Calculates the ouput force using the equation given above in the introduction documentation.
       * This multilink is never disposed as nothing in the sim is ever destroyed.
       */
      new Multilink( [ inputLift.areaProperty, inputLift.forceProperty, this.areaProperty ],
        ( inputArea, inputForce, outputArea ) => {

        this.force = outputArea / inputArea * inputForce;

      } );

    }
  }

  return OutputLift;
} );