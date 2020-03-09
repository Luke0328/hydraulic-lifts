// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * RequireJS configuration file for the sim.
 * Paths are relative to the location of this file.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

 require.config( {

    deps: [ 'hydraulic-lifts-main' ],

    paths: {

      // Sim Core plugins
      image: '../node_modules/sim-core/src/core-internal/image-plugin',
      text: '../node_modules/sim-core/src/core-internal/text-plugin',

      SIM_CORE: '../node_modules/sim-core/src',
      REPOSITORY: '..',
      HYDRAULIC_LIFTS: '.',
      IMAGES: '../images'
  }
} );