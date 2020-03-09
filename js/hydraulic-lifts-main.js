// Copyright © 2020 Luke Pan. All rights reserved.

 /* Main Entry point for the 'Rotational Motion' sim.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

 define( require => {
  'use strict';

  // modules
  const HydraulicLiftsScreen = require( 'HYDRAULIC_LIFTS/HydraulicLiftsScreen' );
  const Sim = require( 'SIM_CORE/Sim' );

  //----------------------------------------------------------------------------------------
  // Start the Hydraulic Lifts Sim.
  Sim.start( { screens: [ new HydraulicLiftsScreen() ], name: 'Hydraulic Lifts' } );
} );