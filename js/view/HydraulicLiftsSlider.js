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
  const SliderNode = require( 'SIM_CORE/scenery/SliderNode' );
  const Text = require( 'SIM_CORE/scenery/Text' );
  const Util = require( 'SIM_CORE/util/Util' );
  const Vector = require( 'SIM_CORE/util/Vector' );

  class HydraulicLiftsSlider extends Node {

    constructor( range, numberProperty, options ) {

      options = {

        controlPanelWidth: 200,

        labelText: '',
        leftLabel: '',
        rightLabel: '',

        fontSize: 15,
        padding: 10,
        fontWeight: '100',

        numberDisplaySize: new Vector( 20, 10 ),
        numberDisplayDecimalPlaces: 2,
        numberDisplayUnit: '',

        ...options
      };

      super( options );

      // Create the number display
      const numberDisplay = new Rectangle( {
        width: options.numberDisplaySize.x,
        height: options.numberDisplaySize.y,
        fill: 'white',
        stroke: 'rgb( 150, 150, 150 )',
        strokeWidth: 0.5,
        x: options.controlPanelWidth - options.padding - options.numberDisplaySize.x
      } );
      const numberDisplayText = new Text( {
        fontSize: options.fontSize,
        fontWeight: options.fontWeight,
        x: numberDisplay.x + numberDisplay.width / 2,
        y: numberDisplay.height / 2,
        attributes: {
          'text-anchor': 'middle',
          'alignment-baseline': 'middle'
        }
      } );

      // Create the text label
      const label = new Text( {
        text: options.labelText,
        fontSize: options.fontSize,
        fontWeight: options.fontWeight,
        x: options.padding,
        y: numberDisplay.height,
        attributes: {
          'text-anchor': 'start',
          'alignment-baseline': 'baseline'
        }
      } );

      // Create the slider
      const slider = new SliderNode( range, numberProperty, {
        rightLabel: options.rightLabel,
        leftLabel: options.leftLabel
      } );

      numberProperty.link( value => {
        numberDisplayText.setText(
          `${ Util.toFixed( value, options.numberDisplayDecimalPlaces ) } ${ options.numberDisplayUnit }`
        );
      } );

      // Render the children in the correct z-layering
      this.setchildren( [
        numberDisplay,
        numberDisplayText,
        label,
        slider
       ] );

    }
  }

  return HydraulicLiftsSlider;
} );