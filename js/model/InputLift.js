// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * InputLift is the general model for the Input Lift.
 * Copies Lift; is created to mirror OutputLift.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Lift = require( 'HYDRAULIC_LIFTS/model/Lift' );

  class InputLift extends Lift {

    constructor( initialCenterX, options ) {

      // rewrite options such that it overrides the defaults above if provided.
      options = { ...options };

      super( initialCenterX, options );

    }
  }

  return InputLift;
} );