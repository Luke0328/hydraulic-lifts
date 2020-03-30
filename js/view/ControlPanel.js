// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * View for the control panel in the simulation.
 *
 * ControlPanel contains a background rectangle and a Flexbox.
 * The Flexbox holds and organizes three sliders and two checkboxes.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const FlexBox = require( 'SIM_CORE/scenery/FlexBox' );
  const HydraulicLiftsCheckbox = require( 'HYDRAULIC_LIFTS/view/HydraulicLiftsCheckbox' );
  const HydraulicLiftsSlider = require( 'HYDRAULIC_LIFTS/view/HydraulicLiftsSlider' );
  const Node = require( 'SIM_CORE/scenery/Node' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );

  class ControlPanel extends Node {

    /**
     * @param {Container} container - Container object
     * @param {Property.<boolean>} outputForceVisibleProperty - determines if the ouput force display text is visible
     * @param {Property.<boolean>} arrowsVisibleProperty - determines if the force arrows are visible
     * @param {object} [options] - controls ControlPanel properties
     */
    constructor( container, outputForceVisibleProperty, arrowsVisibleProperty, options ) {

      options = {
        width: 210, // {number} - width of the control panel
        height: 325, // {number} - height of the control panel
        fontSize: 15, // {number} - font size for text in the control panel

        padding: 20, // {number} - padding between control panel contents and outline of the background rectangle

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };
      super( options );

      // Create the flexbox
      const flexBox = new FlexBox( 'vertical', {
        spacing: 30,
        align: 'center'
      } );

      // Create the slider for the input force
      const inputForceSlider = new HydraulicLiftsSlider(
        container.inputLift.forceRange, container.inputLift.forceProperty, {
        controlPanelWidth: options.width,
        labelText: 'Input Force',
        rightLabel: '10',
        leftLabel: '0',
        numberDisplayUnit: 'N',
        fontSize: options.fontSize
      } );

      // Create the slider for the input radius
      const inputRadiusSlider = new HydraulicLiftsSlider(
        container.inputLift.radiusRange, container.inputLift.radiusProperty, {
        controlPanelWidth: options.width,
        labelText: 'Input Radius',
        rightLabel: '1',
        leftLabel: '5',
        numberDisplayUnit: 'm',
        fontSize: options.fontSize
      } );

      // Create the slider for the output radius
      const outputRadiusSlider = new HydraulicLiftsSlider(
        container.outputLift.radiusRange, container.outputLift.radiusProperty, {
        controlPanelWidth: options.width,
        labelText: 'Output Radius',
        rightLabel: '5',
        leftLabel: '10',
        numberDisplayUnit: 'm',
        fontSize: options.fontSize
      } );

      // Create the checkbox for the visibility of the ouput force
      const outputForceCheckbox = new HydraulicLiftsCheckbox( outputForceVisibleProperty, {
        labelText: 'Show Output Force?',
        fontSize: options.fontSize
      } );

      // Create the checkbox for the visibility of the force arrows
      const forceArrowsCheckbox = new HydraulicLiftsCheckbox( arrowsVisibleProperty, {
        labelText: 'Show Force Arrows?',
        fontSize: options.fontSize
      } );

      // Set the children of the Flexbox
      flexBox.setChildren( [
        inputForceSlider,
        inputRadiusSlider,
        outputRadiusSlider,
        outputForceCheckbox,
        forceArrowsCheckbox
      ] );

      // Create the background rectangle
      const background = new Rectangle( flexBox.width + 2 * options.padding,
       flexBox.height + 2 * options.padding, {
        cornerRadius: 5,
        stroke: 'black',
        fill: 'rgb( 238, 229, 233 )',
        strokeWidth: 1
      } );

      // Set the center of the flexbox to match the center of the background rectangle
      flexBox.center = background.center;

      // Render the children in the correct z-layering
      this.setChildren( [
        background,
        flexBox
      ] );

    }
  }

  return ControlPanel;
} );