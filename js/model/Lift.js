// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Lift is the general model for the two lifts seen in the simulation.
 * There is an input lift and an output lift that are subclasses of Lift.
 *
 * Primary responsibilities:
 *    - Keep track of the center X of the lift
 *    - Keep track of the surface radius of the lift
 *    - Keep track of the force exerted on the input lift or the force exerted by the output lift
 *
 * Equation for the magnification of force:
 *    - Output Force = (Output Area / Input Area) * Input Force
 *
 * The lifts move up and down according to the forces. A greater force results in a greater
 * displacement from the starting center Y of each lift.
 *
 * For physics background information see:
 *    - https://en.wikipedia.org/wiki/Pascal%27s_law
 *    - http://hyperphysics.phy-astr.gsu.edu/hbase/pasc.html
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  // const assert = require( 'SIM_CORE/util/assert' );
  const Property = require( 'SIM_CORE/util/Property' );
  // const Vector = require( 'SIM_CORE/util/Vector' );

  class Lift {

    /**
     * @param {number} initialCenterX - center x-coordinate for the Lift
     * @param {object} [options] - controls Lift properties
     */
    constructor( initialCenterX, options ) {

      options = {

        initialForce: 0, // {number} - initial force exerted on or exerted by Lift, in Newtons

        initialRadius: 1, // {number} - initial surface radius of Lift, in Meters

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };

      // @public (read-only) centerXProperty - Property of the x-coordinate of the Lift center
      this.centerXProperty = new Property( initialCenterX, { type: 'number' } );

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
      this.centerXProperty.reset();
      this.forceProperty.reset();
      this.radiusProperty.reset();
    }

    // Convenience Methods
    /**
     * Gets the x-coordinate of the Lift's center
     * @public
     * @returns {number} - in meters
     */
    get centerX() {
      return this.centerXProperty.value;
    }

    /**
     * Sets the x-coordinate of the Lift's center
     * @public
     * @param {number} center - in meters
     */
    set centerX( center ) {
      this.centerXProperty.value = center;
    }

    /**
     * Gets the force on or from the Lift
     * @public
     * @returns {number} - in Newtons
     */
    get force() {
      return this.forceProperty.value;
    }

    /**
     * Sets the force on or from the Lift
     * @public
     * @param {number} force - in Newtons
     */
    set force( force ) {
      this.forceProperty.value = force;
    }

    /**
     * Gets the surface radius of the Lift
     * @public
     * @returns {number} - in meters
     */
    get radius() {
      return this.radiusProperty.value;
    }

    /**
     * Sets the surface radius of the Lift
     * @public
     * @param {number} radius - in meters
     */
    set radius( radius ) {
      this.radiusProperty.value = radius;
    }
  }

  return Lift;
} );