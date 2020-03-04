// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * InputLift is the general model for the Input Lift.
 * InputLift is a copy of Lift; is created to mirror OutputLift.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Lift = require( 'HYDRAULIC_LIFTS/model/Lift' );

  class InputLift extends Lift {

    /**
     * @param {number} initialCenterX - center x-coordinate for the Input Lift
     * @param {object} [options] - controls Output Lift properties
     */
    constructor( initialCenterX, options ) {

      // rewrite options such that it overrides the defaults above if provided.
      options = { ...options };

      super( initialCenterX, options );

    }
  }

  return InputLift;
} );