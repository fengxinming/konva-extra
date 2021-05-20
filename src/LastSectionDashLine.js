import { Line } from 'konva';

export default class LastSectionDashLine extends Line {
  constructor(config) {
    super(config);
    let { lastDashEnabled } = config;
    if (lastDashEnabled == null) {
      lastDashEnabled = true;
      this.dashEnabled(false);
    }
    this.lastDashEnabled(lastDashEnabled);
  }

  /**
   * 内部渲染方法
   *
   * @param {konva.Context} context
   */
  _sceneFunc(context) {
    const points = this.points();
    const length = points.length;

    if (!length) {
      return;
    }

    const tension = this.tension();
    const closed = this.closed();
    const bezier = this.bezier();
    const dash = this.dash();
    let tp;
    let len;
    let n;
    let ex;
    let ey;

    context.beginPath();
    context.moveTo(points[0], points[1]);

    // tension
    if (tension !== 0 && length > 4) {
      tp = this.getTensionPoints();
      len = tp.length;
      n = closed ? 0 : 4;

      if (!closed) {
        context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
      }

      while (n < len - 2) {
        context.bezierCurveTo(
          tp[n++],
          tp[n++],
          tp[n++],
          tp[n++],
          tp[n++],
          tp[n++]
        );
      }

      if (!closed) {
        context.quadraticCurveTo(
          tp[len - 2],
          tp[len - 1],
          points[length - 2],
          points[length - 1]
        );
      }
    }
    else if (bezier) {
      // no tension but bezier
      n = 2;

      while (n < length) {
        context.bezierCurveTo(
          points[n++],
          points[n++],
          points[n++],
          points[n++],
          points[n++],
          points[n++]
        );
      }
    }
    else {
      // no tension
      len = length - 2;
      for (n = 2; n < len; n += 2) {
        context.lineTo(points[n], points[n + 1]);
      }

      if (len > 1) {
        ex = points[len];
        ey = points[len + 1];

        if (this.lastDashEnabled() && dash && dash.length) {
          context.strokeShape(this);
          context.save();
          context.beginPath();
          context.moveTo(points[len - 2], points[len - 1]);
          context.setLineDash(dash);
          context.lineTo(ex, ey);
          context.strokeShape(this);
          context.save();
          context.restore();
        }
        else {
          context.lineTo(ex, ey);
        }
      }
    }

    // closed e.g. polygons and blobs
    if (closed) {
      context.closePath();
      context.fillStrokeShape(this);
    }
    else {
      // open e.g. lines and splines
      context.strokeShape(this);
    }
  }
}

LastSectionDashLine.prototype.className = 'LastSectionDashLine';
LastSectionDashLine.prototype.lastDashEnabled = function (bool) {
  if (bool == null) {
    return this.getAttr('lastDashEnabled');
  }
  this.setAttr('lastDashEnabled', !!bool);
  return this;
};
