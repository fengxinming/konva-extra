import Konva from 'konva';
import type { LineConfig } from 'konva/lib/shapes/Line';

export interface LastSectionDashLineConfig extends LineConfig {
  lastDashEnabled?: boolean;
  dash: number[];
}

export class LastSectionDashLine extends Konva.Line {
  className = 'LastSectionDashLine';
  constructor(config: LastSectionDashLineConfig) {
    super(config);

    const { lastDashEnabled } = config;
    this.dashEnabled(false);
    this.lastDashEnabled = !!lastDashEnabled;
  }

  get lastDashEnabled(): boolean {
    return this.attrs.lastDashEnabled;
  }

  set lastDashEnabled(bool: boolean) {
    this.attrs.lastDashEnabled = bool;
  }

  /**
   * 内部渲染方法
   *
   * @param {Konva.Context} context
   */
  _sceneFunc(context: Konva.Context) {
    const points = this.points(); // 坐标点
    const length = points.length; // 坐标点数量

    if (!length) {
      return;
    }

    const tension: number = this.tension(); // 张力，值越大，曲线越弯曲。
    const closed: boolean = this.closed(); // 是否闭合
    const bezier: boolean = this.bezier(); // 是否贝塞尔曲线
    const dash: number[] = this.dash(); // 虚线
    let tp: number[]; // 张力坐标
    let len: number; // 线段长度
    let n: number; // 索引
    let ex: number; // 终点x
    let ey: number; // 终点y

    context.beginPath();
    context.moveTo(points[0], points[1]);

    // 曲线
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
      // 直线
      len = length - 2;
      for (n = 2; n < len; n += 2) {
        context.lineTo(points[n], points[n + 1]);
      }

      if (len > 1) {
        ex = points[len];
        ey = points[len + 1];

        if (this.lastDashEnabled && dash && dash.length) {
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
