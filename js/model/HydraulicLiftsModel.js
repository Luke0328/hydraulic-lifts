// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * HydraulicLiftsModel is the top Level model for the Hydraulic Lifts simulation.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Container = require( 'HYDRAULIC_LIFTS/model/Container' );

  class HydraulicLiftsModel {

    constructor() {

      this.container = new Container();

    }
  }

  return HydraulicLiftsModel;
} );