// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Lift is the general model for the two lifts seen in the simulation.
 * There is an input lift and an output lift.
 *
 * Primary responsibilities:
 *		- Keep track of the center position of each lift
 *		- Keep track of the radius of each lift
 *		- Keep track of the force exerted on the input lift or the force exerted by the output lift
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
	// const Property = require( 'SIM_CORE/util/Property' );
	// const Vector = require( 'SIM_CORE/util/Vector' );

	class Lift {

		/**
     * @param centerPosition - center position for the Lift
		 * @param force - force exerted on or exerted by the Lift in newtons
		 * @param radius - radius of the Lift surface in meters
		 */
		constructor( centerPosition ) {
			this._centerPosition = centerPosition;
			this._force = 0;
			this._radius = 1;
		}
	}

	return Lift;
} );