// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Container is the top level model for the simulation.
 * The Container contains two lift objects: an Input Lift and an Output Lift.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  // const assert = require( 'SIM_CORE/util/assert' );
  const Property = require( 'SIM_CORE/util/Property' );
  const Lift = require( 'HYDRAULIC_LIFTS/model/Lift' );
  const Vector = require( 'SIM_CORE/util/Vector' );

  // constants
  const INITIAL_INPUT_LIFT_CENTER = new Vector( 1, 1 );
  const INITIAL_OUTPUT_LIFT_CENTER = new Vector( 11, 1 );
  const CONTAINER_CENTER_POSITION = new Vector( 5, 0 );

  class Container {

    constructor() {

      this.inputOpeningProperty = new Property ();

      this.outputOpeningProperty = new Property ();

      this.inputLift = new Lift( INITIAL_INPUT_LIFT_CENTER );

      this.outputLift = new Lift( INITIAL_OUTPUT_LIFT_CENTER );

      this.containerCenterPosition = CONTAINER_CENTER_POSITION;
    }

  }

  return Container;
} );