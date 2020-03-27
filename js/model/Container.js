// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Container is the model for the entire container seen in the simulation.
 *
 * A Container contains an Input Lift, an Output Lift, and a constant center position.
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
  const INPUT_LIFT_CENTER_X = -8; // eyeballed
  const OUTPUT_LIFT_CENTER_X = 8; // eyeballed

  // the container's center position is (0,0) in model coordinates
  const CONTAINER_CENTER_POSITION = new Vector( 0, 0 );

  class Container {

    constructor() {

      // @public (read-only) {InputLift} - Input Lift object
      this.inputLift = new InputLift( INPUT_LIFT_CENTER_X );

      // @public (read-only) {OutputLift} - Output Lift object
      this.outputLift = new OutputLift( this.inputLift, OUTPUT_LIFT_CENTER_X );

      // @public (read-only) {Vector} - Center position of the container
      this.containerCenterPosition = CONTAINER_CENTER_POSITION;

    }

    /**
     * Resets both Lifts
     * @public
     */
    reset() {
      this.inputLift.reset();
      this.outputLift.reset();
    }
  }

  return Container;
} );