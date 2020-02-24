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
  const Lift = require( 'HYDRAULIC_LIFTS/model/Lift' );
  const Property = require( 'SIM_CORE/util/Property' );
  const Vector = require( 'SIM_CORE/util/Vector' );

  // constants
  const INITIAL_INPUT_LIFT_CENTER = new Vector( 1, 1 );
  const INITIAL_OUTPUT_LIFT_CENTER = new Vector( 11, 1 );
  const CONTAINER_CENTER_POSITION = new Vector( 5, 0 );
  const OPENING_GAP = 0.05;

  class Container {

    constructor() {

      // @public (read-only) inputOpeningWidthProperty - Property of the width of the input opening
      this.inputOpeningWidthProperty = new Property( INITIAL_INPUT_LIFT_CENTER * 2 + OPENING_GAP,
      { type: 'number' } );

      // @public (read-only) outputOpeningWidthProperty - Property of the width of the output opening
      this.outputOpeningWidthProperty = new Property( INITIAL_OUTPUT_LIFT_CENTER * 2 + OPENING_GAP,
      { type: 'number' } );

      // @public (read-only) {Lift} - Input Lift object
      this.inputLift = new Lift( INITIAL_INPUT_LIFT_CENTER, { type: Vector } );

      // @public (read-only) {Lift} - Output Lift object
      this.outputLift = new Lift( INITIAL_OUTPUT_LIFT_CENTER, { type: Vector } );

      // @public (read-only) containerCenterPosition - Center position of the container (constant)
      this.containerCenterPosition = CONTAINER_CENTER_POSITION;
    }

  }

  return Container;
} );