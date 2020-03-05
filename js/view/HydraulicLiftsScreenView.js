// Copyright © 2020 Luke Pan. All rights reserved.

/**
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const ContainerNode = require( 'HYDRAULIC_LIFTS/view/ContainerNode' );
  const ScreenView = require( 'SIM_CORE/scenery/ScreenView' );

  class HydraulicLiftsScreenView extends ScreenView {

    constructor() {

      super();

      // Create the Container Node
      const containerNode = new ContainerNode();
    }
  }

  return HydraulicLiftsScreenView;
} );