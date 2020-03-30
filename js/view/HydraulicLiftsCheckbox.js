// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Custom checkbox for the simulation.
 * Contains a label and a checkbox.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SIM_CORE/scenery/buttons/Checkbox' );
  const Node = require( 'SIM_CORE/scenery/Node' );
  const Text = require( 'SIM_CORE/scenery/Text' );

  class HydraulicLiftsCheckbox extends Node {

    /**
     * @param {Property.<boolean>} numberProperty - the boolean property to toggle with the checkbox
     * @param {Object} [options] - controls HydraulicLiftsCheckbox properties
     */
    constructor( booleanProperty, options ) {

      options = {

        fontSize: 15, // {number} - font size for checkbox text

        labelText: '',

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };

      super( options );

      // Create the checkbox
      const checkbox = new Checkbox( booleanProperty, {
        centerX: 150,
        centerY: 10
      } );

      // Create the text labeling the checkbox
      const checkboxText = new Text( options.labelText, {
        fontSize: options.fontSize,
        left: -7,
        centerY: checkbox.centerY
      } );

      // Render the children in the correct z-layering
      this.setChildren( [
        checkbox,
        checkboxText
       ] );

    }
  }

  return HydraulicLiftsCheckbox;
} );