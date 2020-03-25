// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Custom path for a "container".
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Path = require( 'SIM_CORE/scenery/Path' );
  const Shape = require( 'SIM_CORE/util/Shape' );

  class ContainerPath extends Path {

    /**
     * @param {vector} leftCenterTop - coordinates for the top center of the left opening
     * @param {vector} origin - center top of the middle of the container path
     * @param {vector} rightCenterTop - coordinates for the top center of the right opening
     * @param {object} [options] - controls ContainerPath properties
     */
    constructor( leftCenterTop, origin, rightCenterTop, options ) {

      options = {

        leftWidth: 100, // {number} - width of the left opening of the container path
        rightWidth: 100, // {number} - width of the right opening of the container path
        midHeight: 50, // {number} - height of the middle section of the container path

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };
      super( null, options );

      // @private {number} - see above documentaion
      this._leftCenterTop = leftCenterTop;
      this._origin = origin;
      this._rightCenterTop = rightCenterTop;
      this._leftWidth = options.leftWidth;
      this._rightWidth = options.rightWidth;
      this._midHeight = options.midHeight;

      this._updateContainerShape();

    }

    /**
     * Sets the width of the left opening
     * @public
     *
     * @param {number} leftWidth - in view coordinates
     */
    set leftWidth( leftWidth ) {
      if ( leftWidth === this._leftWidth ) return;
      this._leftWidth = leftWidth;
      this._updateContainerShape();
    }

    /**
     * Sets the width of the right opening
     * @public
     *
     * @param {number} rightWidth - in view coordinates
     */
    set rightWidth( rightWidth ) {
      if ( rightWidth === this._rightWidth ) return;
      this._rightWidth = rightWidth;
      this._updateContainerShape();
    }
    /**
     * Generates a container shape and updates the shape of this container.
     * Called when a property or the container that is displayed is changed.
     * @private
     */
    _updateContainerShape() {

      const containerShape = new Shape()
        .moveTo( this._origin.x, this._origin.y )
        .horizontalLineTo( this._leftCenterTop.x + this._leftWidth / 2 )
        .verticalLineTo( this._leftCenterTop.y )
        .horizontalLineTo( this._leftCenterTop.x )
        .horizontalLineTo( this._leftCenterTop.x - this._leftWidth / 2 )
        .verticalLineTo( this._origin.y + this._midHeight )
        .horizontalLineTo( this._rightCenterTop.x + this._rightWidth / 2 )
        .verticalLineTo( this._rightCenterTop.y )
        .horizontalLineTo( this._rightCenterTop.x )
        .horizontalLineTo( this._rightCenterTop.x - this._rightWidth / 2 )
        .verticalLineTo( this._origin.y )
        .close();

      // Passes the updated shape to the super class
      super.shape = containerShape;
    }

  }

  return ContainerPath;
} );