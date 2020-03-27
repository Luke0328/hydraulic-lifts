// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * InputLift is the general model for the Input Lift.
 *
 * Extends Lift while adding the following:
 *  1. Ranges for the radius and force used by sliders in the control panel
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Lift = require( 'HYDRAULIC_LIFTS/model/Lift' );
  const Range = require( 'SIM_CORE/util/Range' );

  // constants
  const INPUT_FORCE_RANGE = new Range( 0, 5 ); // chosen arbitrarily
  const INPUT_RADIUS_RANGE = new Range( 1, 3 ); // chosen arbitrarily

  class InputLift extends Lift {

    /**
     * @param {number} centerX - center x-coordinate for the Input Lift
     * @param {object} [options] - controls Input Lift properties
     */
    constructor( centerX, options ) {

      // rewrite options such that it overrides the defaults above if provided.
      options = { ...options };

      super( centerX, options );

      // @public (read-only) {Range} - Range of radii available for the slider in the control panel, in Meters
      this.radiusRange = INPUT_RADIUS_RANGE;

      // @public (read-only) {Range} - Range of forces available for the slider in the control panel, in Newtons
      this.forceRange = INPUT_FORCE_RANGE;

    }
  }

  return InputLift;
} );