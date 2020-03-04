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
  // const assert = require( 'SIM_CORE/util/assert' );
  const InputLift = require( 'HYDRAULIC_LIFTS/model/InputLift' );
  const OutputLift = require( 'HYDRAULIC_LIFTS/model/OutputLift' );
  // const Property = require( 'SIM_CORE/util/Property' );
  const Vector = require( 'SIM_CORE/util/Vector' );

  // constants
  const INITIAL_INPUT_LIFT_CENTER_X = -5;
  const INITIAL_OUTPUT_LIFT_CENTER_X = 5;
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

    /**
     * Gets the coordinates of the Containter's center
     * @public
     * @returns {Vector} - in meter coordinates
     */
    get containerCenter() {
      return this.containerCenterPosition;
    }

  }

  return Container;
} );