// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Custom slider for the simulation.
 * Contains a label, number display, and slider bar.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Node = require( 'SIM_CORE/scenery/Node' );
  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );
  const Slider = require( 'SIM_CORE/scenery/Slider' );
  const Text = require( 'SIM_CORE/scenery/Text' );
  const Util = require( 'SIM_CORE/util/Util' );
  const Vector = require( 'SIM_CORE/util/Vector' );

  class HydraulicLiftsSlider extends Node {

    /**
     * @param {Range} range - the numeric range to constrain the setting of numberProperty
     * @param {Property.<number>} numberProperty - the number property to change with the slider
     * @param {Object} [options] - controls HydraulicLiftsSlider properties
     */
    constructor( range, numberProperty, options ) {

      options = {

        labelText: '', // {string} - text for the label of the HydraulicLiftsSlider
        leftLabel: '', // {string} - text for the left label of the slider bar
        rightLabel: '', // {string} - text for the right label of the slider bar

        fontSize: 15, // {number} - font size
        padding: 15, // {padding} - padding between control panel contents and outline of the background rectangle

        numberDisplaySize: new Vector( 65, 30 ), // {Vector} - size of the number display (width, height)
        numberDisplayDecimalPlaces: 2, // {number} - number of decimal places used in the number display
        numberDisplayUnit: '', // {string} - units used in the number display

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };

      super( options );

      // Create the slider
      const slider = new Slider( range, numberProperty, {
        rightLabel: options.rightLabel,
        leftLabel: options.leftLabel,
        centerY: 50 // eyeballed
      } );

      // Create the background rectangle for the number display
      const numberDisplay = new Rectangle( options.numberDisplaySize.x, options.numberDisplaySize.y, {
        fill: 'white',
        stroke: 'rgb( 150, 150, 150 )',
        strokeWidth: 0.5,
        right: slider.right,
        bottom: slider.top - options.padding / 2,
        cornerRadius: 1
      } );

      // Create the text inside the background rectangle
      const numberDisplayText = new Text( '', {
        fontSize: options.fontSize
      } );

      // Create the text label for the slider
      const label = new Text( options.labelText, {
        fontSize: options.fontSize,
        left: slider.left,
        centerY: numberDisplay.centerY
      } );

      // Link the property to the text such that the text displays the current value.
      // This link is never disposed as nothing in the sim is ever destroyed.
      numberProperty.link( value => {
        numberDisplayText.setText(
          `${ Util.toFixed( value, options.numberDisplayDecimalPlaces ) } ${ options.numberDisplayUnit }`
        );
        numberDisplayText.centerX = numberDisplay.centerX;
        numberDisplayText.centerY = numberDisplay.centerY + 2;
      } );

      // Render the children in the correct z-layering
      this.setChildren( [
        numberDisplay,
        numberDisplayText,
        label,
        slider
       ] );

    }
  }

  return HydraulicLiftsSlider;
} );