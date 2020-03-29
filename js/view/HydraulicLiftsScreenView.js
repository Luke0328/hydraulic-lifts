// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Top level view for the simulation. Creates a modelViewTransform for the simulation.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Bounds = require( 'SIM_CORE/util/Bounds' );
  const ContainerNode = require( 'HYDRAULIC_LIFTS/view/ContainerNode' );
  const ControlPanel = require( 'HYDRAULIC_LIFTS/view/ControlPanel' );
  const ModelViewTransform = require( 'SIM_CORE/util/ModelViewTransform' );
  const Property = require( 'SIM_CORE/util/Property' );
  const ResetButton = require( 'SIM_CORE/scenery/buttons/ResetButton' );
  const ScreenView = require( 'SIM_CORE/scenery/ScreenView' );

  // constants
  const SCREEN_VIEW_X_MARGIN = 15; // eyeballed
  const SCREEN_VIEW_Y_MARGIN = 10; // eyeballed
  const MODEL_TO_VIEW_SCALE = 20; // eyeballed
  const CONTROL_PANEL_TO_RESET_BUTTON_MARGIN = 40; // eyeballed

  class HydraulicLiftsScreenView extends ScreenView {

    /**
     * @param {HydraulicLiftsModel} hydraulicLiftsModel - top level model for the simulation
     */
    constructor( hydraulicLiftsModel ) {

      super();

      // @public (read-only) {Property.<boolean>} - Boolean that represents if the output force is visible
      this.outputForceVisibleProperty = new Property( false, { type: 'boolean' } );

      // @public (read-only) {Property.<boolean>} - Boolean that represents if the force arrows are visible
      this.arrowsVisibleProperty = new Property( false, { type: 'boolean' } );

      // Create the model bounds centered around the center of the container
      const modelBounds = new Bounds( -25, -15, 20, 15 ); // the model bounds are 40 x 30 meters

      // Create the view bounds
      const viewBounds = Bounds.rect(
        SCREEN_VIEW_X_MARGIN,
        SCREEN_VIEW_Y_MARGIN,
        modelBounds.width * MODEL_TO_VIEW_SCALE,
        modelBounds.height * MODEL_TO_VIEW_SCALE
      );

      // Create the ModelViewTransform from the model and view bounds
      const modelViewTransform = new ModelViewTransform( modelBounds, viewBounds );

      // Create the Container Node
      const containerNode = new ContainerNode( hydraulicLiftsModel.container, this.outputForceVisibleProperty,
       this.arrowsVisibleProperty, modelViewTransform );

      // Create the Control Panel
      const controlPanel = new ControlPanel( hydraulicLiftsModel.container, this.outputForceVisibleProperty,
       this.arrowsVisibleProperty, {
        left: SCREEN_VIEW_X_MARGIN,
        top: SCREEN_VIEW_Y_MARGIN
      } );

      // Create the reset button
      const resetButton = new ResetButton( {
        listener: () => { hydraulicLiftsModel.container.reset(); },
        centerX: controlPanel.centerX,
        centerY: controlPanel.bottom + CONTROL_PANEL_TO_RESET_BUTTON_MARGIN
      } );

      // Render the children in the correct z-layering
      this.setChildren( [
        containerNode,
        controlPanel,
        resetButton
      ] );
    }
  }

  return HydraulicLiftsScreenView;
} );