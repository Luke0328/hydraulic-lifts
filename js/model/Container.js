// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Container is the general model for the entire container seen in the simulation.
 * The Container object contains two lift objects: an Input Lift and an Output Lift.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const InputLift = require( 'HYDRAULIC_LIFTS/model/InputLift' );
  const OutputLift = require( 'HYDRAULIC_LIFTS/model/OutputLift' );
  const Vector = require( 'SIM_CORE/util/Vector' );

  // constants
  const INITIAL_INPUT_LIFT_CENTER_X = -8;
  const INITIAL_OUTPUT_LIFT_CENTER_X = 8;
  const CONTAINER_CENTER_POSITION = new Vector( 0, 0 );

  class Container {

    constructor() {

      // @public (read-only) {InputLift} - Input Lift object
      this.inputLift = new InputLift( INITIAL_INPUT_LIFT_CENTER_X );

      // @public (read-only) {OutputLift} - Output Lift object
      this.outputLift = new OutputLift( INITIAL_OUTPUT_LIFT_CENTER_X, this.inputLift );

      // @public (read-only) containerCenterPosition - Center position of the container (constant at (0,0))
      this.containerCenterPosition = CONTAINER_CENTER_POSITION;

    }
  }

  return Container;
} );