// Copyright © 2020 Luke Pan. All rights reserved.

/**
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

    constructor( range, numberProperty, options ) {

      options = {

        controlPanelWidth: 200,
        sliderCenterY: 0,
        sliderCenterX: 0,

        labelText: '',
        leftLabel: '',
        rightLabel: '',

        fontSize: 15,
        padding: 0,

        numberDisplaySize: new Vector( 65, 30 ),
        numberDisplayDecimalPlaces: 2,
        numberDisplayUnit: '',

        ...options
      };

      super( options );

      // Create the number display
      const numberDisplay = new Rectangle( options.numberDisplaySize.x, options.numberDisplaySize.y, {
        fill: 'white',
        stroke: 'rgb( 150, 150, 150 )',
        strokeWidth: 0.5,
        right: options.sliderCenterX + options.controlPanelWidth / 2 - options.padding,
        centerY: options.sliderCenterY - options.numberDisplaySize.y - 4,
        cornerRadius: 1
      } );
      const numberDisplayText = new Text( '', {
        fontSize: options.fontSize,
        centerX: numberDisplay.left + numberDisplay.width / 5 - 1,
        centerY: numberDisplay.top + numberDisplay.height / 5 + 2
      } );

      // Create the text label
      const label = new Text( options.labelText, {
        fontSize: options.fontSize,
        left: options.sliderCenterX - options.controlPanelWidth / 2 + options.padding,
        centerY: numberDisplay.centerY + 4
      } );

      // Create the slider
      const slider = new Slider( range, numberProperty, {
        rightLabel: options.rightLabel,
        leftLabel: options.leftLabel,
        centerX: options.sliderCenterX,
        centerY: options.sliderCenterY
      } );

      numberProperty.link( value => {
        numberDisplayText.setText(
          `${ Util.toFixed( value, options.numberDisplayDecimalPlaces ) } ${ options.numberDisplayUnit }`
        );
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