// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * View for the control panel in the simulation.
 * The control panel will contain 3 sliders.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  const Rectangle = require( 'SIM_CORE/scenery/Rectangle' );
  const SliderNode = require( 'SIM_CORE/scenery/SliderNode' );
  const SVGNode = require( 'SIM_CORE/scenery/SVGNode' );

  class ControlPanel extends SVGNode {

    constructor( inputLift, outputLift, options ) {
      options = {
        width: 200,
        height: 300,
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
      const inputForceSlider = new SliderNode( inputLift.forceRange, inputLift.forceProperty, {
        rightLabel: '10',
        leftLabel: '0'
      } );

      // Create the slider for the input radius
      const inputRadiusSlider = new SliderNode( inputLift.radiusRange, inputLift.radiusProperty, {
        rightLabel: '1',
        leftLabel: '5'
      } );

      // Create the slider for the output radius
      const outputRadiusSlider = new SliderNode( outputLift.radiusRange, outputLift.radiusProperty, {
        rightLabel: '5',
        leftLabel: '10'
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