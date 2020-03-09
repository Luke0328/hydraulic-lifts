// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Screen for the simulation.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const HydraulicLiftsModel = require( 'HYDRAULIC_LIFTS/model/HydraulicLiftsModel' );
  const HydraulicLiftsScreenView = require( 'HYDRAULIC_LIFTS/view/HydraulicLiftsScreenView' );
  const Screen = require( 'SIM_CORE/Screen' );

  class HydraulicLiftsScreen extends Screen {

    constructor() {

      super( {
        name: 'Hydraulic Lifts',
        background: 'rgb( 255, 250, 227 )',
        model: HydraulicLiftsModel,
        view: HydraulicLiftsScreenView
      } );
    }
  }

  return HydraulicLiftsScreen;
} );