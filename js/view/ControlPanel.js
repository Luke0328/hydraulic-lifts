// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * View for the control panel in the simulation.
 * The control panel will contain 3 sliders.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const HydraulicLiftsSlider = require( 'HYDRAULIC_LIFTS/view/HydraulicLiftsSlider' );
  const Node = require( 'SIM_CORE/scenery/Node' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );

  class ControlPanel extends Node {

    constructor( inputLift, outputLift, options ) {

      options = {
        width: 200,
        height: 300,
        fontSize: 15,
        padding: 10,
        ...options
      };
      super( options );

      // Create the background rectangle
      const background = new Rectangle( {
        width: options.width,
        height: options.height,
        cornerRadius: 5,
        stroke: 'black',
        fill: 'rgb( 211, 211, 211 )',
        strokeWidth: '1'
      } );

      // Create the slider for the input force
      const inputForceSlider = new HydraulicLiftsSlider( inputLift.forceRange, inputLift.forceProperty, {
        controlPanelWidth: options.width,
        labelText: 'Input Force',
        rightLabel: '10',
        leftLabel: '0',
        numberDisplayUnit: 'N'
      } );

      // Create the slider for the input radius
      const inputRadiusSlider = new HydraulicLiftsSlider( inputLift.radiusRange, inputLift.radiusProperty, {
        controlPanelWidth: options.width,
        labelText: 'Input Radius',
        rightLabel: '1',
        leftLabel: '5',
        numberDisplayUnit: 'N'
      } );

      // Create the slider for the output radius
      const outputRadiusSlider = new HydraulicLiftsSlider( outputLift.radiusRange, outputLift.radiusProperty, {
        controlPanelWidth: options.width,
        labelText: 'Output Radius',
        rightLabel: '5',
        leftLabel: '10',
        numberDisplayUnit: 'N'
      } );

      // Render the children in the correct z-layering
      this.setchildren( [
        background,
        inputForceSlider,
        inputRadiusSlider,
        outputRadiusSlider
      ] );
    }
  }

  return ControlPanel;
} );