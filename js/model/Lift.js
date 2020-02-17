// Copyright © 2020 Luke Pan. All rights reserved.

/**
* Lift is the general model for the two lifts seen in the simulation.
*
* @author Luke Pan <curly0328@gmail.com>
*/

define( require => {
	'use strict';

	//modules
	const assert = require( 'SIM_CORE/util/assert' );
	const Property = require( 'SIM_CORE/util/Property' );
	const Vector = require( 'SIM_CORE/util/Vector' );

	class Lift{

		 /**
    	 * @param centerPosition - center position for the Lift
	     * @param force - force exerted on or exerted by the Lift
	     * @param radius - radius of the Lift surface
	     */
		constructor( centerPosition, force, radius ){
			this._centerPosition = centerPosition;
			this._force = force;
			this._radius = radius;
		}
}
})