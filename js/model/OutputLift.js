// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * OutputLift is the general model for the Output Lift.
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

  class OutputLift extends Lift {

    constructor( initialCenterX, inputLift, options ) {

      options = {

        initialRadius: 10,

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };

      super( initialCenterX, options );

      this.inputLift = inputLift;

      new Multilink( [ this.inputLift.radiusProperty, this.inputLift.forceProperty ],
        ( inputRadius, inputForce ) => {
        this.forceProperty.value = Math.pow( this.radius / inputRadius, 2 ) * inputForce;
      } );
    }
  }

  return OutputLift;
} );