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
  const ScreenView = require( 'SIM_CORE/scenery/ScreenView' );

  // constants
  const SCREEN_VIEW_X_MARGIN = 60; // eyeballed
  const SCREEN_VIEW_Y_MARGIN = 40; // eyeballed
  const MODEL_TO_VIEW_SCALE = 20; // eyeballed

  class HydraulicLiftsScreenView extends ScreenView {

    /**
     * @param {HydraulicLiftsModel} hydraulicLiftsModel - top level model for the simulation
     */
    constructor( hydraulicLiftsModel ) {

      super();

      // Create the model bounds (in meter coordinates)
      const modelBounds = new Bounds( -20, -15, 20, 15 );

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
      const containerNode = new ContainerNode( hydraulicLiftsModel.container, modelViewTransform );

      // Create the Control Panel
      const controlPanel = new ControlPanel( hydraulicLiftsModel.container );

      // Render the children in the correct z-layering
      this.setChildren( [
        containerNode,
        controlPanel
      ] );
    }
  }

  return HydraulicLiftsScreenView;
} );