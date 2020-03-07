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

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      const options = {
        name: 'Hydraulic Lifts',

        style: {
          background: 'rgb( 255, 250, 227 )'
        }
      };

      super( () => new HydraulicLiftsModel(), model => new HydraulicLiftsScreenView( model ), options );
    }
  }

  return HydraulicLiftsScreen;
} );