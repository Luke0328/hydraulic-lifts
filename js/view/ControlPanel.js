// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * View for the control panel in the simulation.
 *
 * ControlPanel contains a background rectangle and three HydraulicLiftsSlider's.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SIM_CORE/scenery/buttons/Checkbox' );
  const HydraulicLiftsSlider = require( 'HYDRAULIC_LIFTS/view/HydraulicLiftsSlider' );
  const Node = require( 'SIM_CORE/scenery/Node' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );
  const Text = require( 'SIM_CORE/scenery/Text' );

  class ControlPanel extends Node {

    /**
     * @param {Container} container - Container object
     * @param {Property.<boolean>} outputForceVisibleProperty - determines if the ouput force display text is visible
     * @param {object} [options] - controls ControlPanel properties
     */
    constructor( container, outputForceVisibleProperty, options ) {

      options = {
        width: 210, // {number} - width of the control panel
        height: 325, // {number} - height of the control panel
        fontSize: 15, // {number} - font size for text in the control panel

        padding: 10, // {number} - padding between control panel contents and outline of the background rectangle

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };
      super( options );

      // Create the background rectangle
      const background = new Rectangle( options.width, options.height, {
        cornerRadius: 5,
        stroke: 'black',
        fill: 'rgb( 238, 229, 233 )',
        strokeWidth: 1
      } );

      // Create the slider for the input force
      const inputForceSlider = new HydraulicLiftsSlider(
        container.inputLift.forceRange, container.inputLift.forceProperty, {
        controlPanelWidth: options.width,
        labelText: 'Input Force',
        rightLabel: '10',
        leftLabel: '0',
        numberDisplayUnit: 'N',
        padding: options.padding,
        sliderCenterX: background.left + options.width / 2,
        sliderCenterY: background.top + options.height / 4
      } );

      // Create the slider for the input radius
      const inputRadiusSlider = new HydraulicLiftsSlider(
        container.inputLift.radiusRange, container.inputLift.radiusProperty, {
        controlPanelWidth: options.width,
        labelText: 'Input Radius',
        rightLabel: '1',
        leftLabel: '5',
        numberDisplayUnit: 'm',
        padding: options.padding,
        sliderCenterX: background.left + options.width / 2,
        sliderCenterY: background.top + options.height * 2 / 4
      } );

      // Create the slider for the output radius
      const outputRadiusSlider = new HydraulicLiftsSlider(
        container.outputLift.radiusRange, container.outputLift.radiusProperty, {
        controlPanelWidth: options.width,
        labelText: 'Output Radius',
        rightLabel: '5',
        leftLabel: '10',
        numberDisplayUnit: 'm',
        padding: options.padding,
        sliderCenterX: background.left + options.width / 2,
        sliderCenterY: background.top + options.height * 3 / 4
      } );

      // Create the checkbox that toggles the visibility of the output force number display
      const outputForceCheckbox = new Checkbox( outputForceVisibleProperty, {
        centerX: background.right - 32.5 - options.padding,
        centerY: background.top + options.height - 3 * options.padding
      } );

      // Create the text labeling the checkbox
      const checkboxText = new Text( ' Show Output Force? ', {
        fontSize: 15,
        left: options.padding,
        centerY: outputForceCheckbox.centerY
      } );

      // Render the children in the correct z-layering
      this.setChildren( [
        background,
        inputForceSlider,
        inputRadiusSlider,
        outputRadiusSlider,
        outputForceCheckbox,
        checkboxText
      ] );

    }
  }

  return ControlPanel;
} );