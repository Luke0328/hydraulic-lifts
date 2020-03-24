// Copyright © 2020 Luke Pan. All rights reserved.

/**
 * Custom path for a container.
 *
 * @author Luke Pan <curly0328@gmail.com>
 */

define( require => {
  'use strict';

  // modules
  const Path = require( 'SIM_CORE/scenery/Path' );
  const Shape = require( 'SIM_CORE/util/Shape' );

  class ContainerPath extends Path {

    constructor( leftCenterTop, origin, rightCenterTop, options ) {

      options = {

        leftWidth: 100,
        rightWidth: 100,
        midHeight: 50,

        // rewrite options such that it overrides the defaults above if provided.
        ...options
      };
      super( null, options );

      // @private {number}
      this._leftCenterTop = leftCenterTop;
      this._origin = origin;
      this._rightCenterTop = rightCenterTop;
      this._leftWidth = options.leftWidth;
      this._rightWidth = options.rightWidth;
      this._midHeight = options.midHeight;

      this._updateContainerShape();

    }

    set leftWidth( leftWidth ) {
      if ( leftWidth === this._leftWidth ) return;
      this._leftWidth = leftWidth;
      this._updateContainerShape();
    }

    set rightWidth( rightWidth ) {
      if ( rightWidth === this._rightWidth ) return;
      this._rightWidth = rightWidth;
      this._updateContainerShape();
    }

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

      super.shape = containerShape;
    }
  }

  return ContainerPath;
} );