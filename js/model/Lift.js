// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Lift is the general model for the two lifts seen in the simulation.
 * There is an input lift and an output lift.
 *
 * Primary responsibilities:
 *    - Keep track of the center position of each lift
 *    - Keep track of the surface radius of each lift
 *    - Keep track of the force exerted on the input lift or the force exerted by the output lift
 *
 * The output force changes according to the radii of the lifts and the input force.
 * The lifts move up and down according to the forces. A greater force results in a greater
 * displacement from the starting center position of each lift.
 *
 * For physics background information see https://en.wikipedia.org/wiki/Pascal%27s_law
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  // const assert = require( 'SIM_CORE/util/assert' );
  const Property = require( 'SIM_CORE/util/Property' );
  const Vector = require( 'SIM_CORE/util/Vector' );

  class Lift {

    /**
     * @param {Vector} initialCenterPosition - center position for the Lift
     * @param {object} [options] - controls Lift properties
     */
    constructor( initialCenterPosition, options ) {

      options = {

        initialForce: 0, // {number} - initial force exerted on or exerted by Lift, in Newtons

        initialRadius: 1, // {number} - initial surface radius of Lift, in Meters

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };

      // @public (read-only) centerPositionProperty - Property of the position of the Lift center
      this.centerPositionProperty = new Property( initialCenterPosition, { type: Vector } );

      // @public (read-only) forceProperty - Property of the force on or from the Lift
      this.forceProperty = new Property( options.initialForce, {
        type: 'number',
        isValidValue: value => value >= 0 // force must be greater than or equal to 0
      } );

      // @public (read-only) radiusProperty - Property of the surface radius of the Lift
      this.radiusProperty = new Property( options.initialRadius, {
        type: 'number',
        isValidValue: value => value > 0 // radius must be greater than 0
      } );
    }

    /**
     * Resets Lift properties to their initial values
     * @public
     */
    reset() {
      this.centerPositionProperty.reset();
      this.forceProperty.reset();
      this.radiusProperty.reset();
    }
  }

  return Lift;
} );