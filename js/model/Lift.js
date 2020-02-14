// Copyright © 2020 Luke Pan. All rights reserved.

const assert = require( 'SIM_CORE/util/assert' );
const Property = require( 'SIM_CORE/util/Property' );
const Vector = require( 'SIM_CORE/util/Vector' );

class Lift{

	constructor( centerPosition, options ){
		options = {
			force: 0;
			initialRadius: 1;
		};
	this.centerPositionProperty = new Property( centerPosition, { type: Vector } );

	this.radiusProperty = new Property( options.initialRadius, {
		type: 'number',
		isValidValue: value => value >= 0
	} );

	this.forceProperty = new Property( options.force, { type: Vector } );
	}
}