import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import * as echarts from "echarts";

interface DataItem {
  name: string;
  percent?: number;
  value: number;
}

@Component({
  selector: "app-order-analysis",
  templateUrl: "./order-analysis.component.html",
  styleUrls: ["./order-analysis.component.scss"],
})
export class OrderAnalysisComponent implements AfterViewInit {
  @ViewChild("pie")
  public pieChart?: ElementRef<HTMLElement>;

  public ballCurvePercent = 0;
  public ballCurveTarget = .642;

  public barRightData: DataItem[] = [
    {
      name: "车间 1",
      percent: 0,
      value: 0,
    },
    {
      name: "车间 2",
      percent: 0,
      value: 0,
    },
    {
      name: "车间 3",
      percent: 0,
      value: 0,
    },
    {
      name: "车间 4",
      percent: 0,
      value: 0,
    },
    {
      name: "车间 5",
      percent: 0,
      value: 0,
    },
  ];
  public barRightTarget = [1892, 1500, 1200, 700, 600];

  public barLeftData: DataItem[][] = [
    [
      {
        name: "公共区域",
        percent: 0,
        value: 0,
      },
      {
        name: "后整理车间",
        percent: 0,
        value: 0,
      },
      {
        name: "涂料车间",
        percent: 0,
        value: 0,
      },
      {
        name: "浇筑车间",
        percent: 0,
        value: 0,
      },
      {
        name: "蜡膜车间",
        percent: 0,
        value: 0,
      },
    ],
    [
      {
        name: "公共区域",
        percent: 0,
        value: 0,
      },
      {
        name: "后整理车间",
        percent: 0,
        value: 0,
      },
      {
        name: "涂料车间",
        percent: 0,
        value: 0,
      },
      {
        name: "浇筑车间",
        percent: 0,
        value: 0,
      },
      {
        name: "蜡膜车间",
        percent: 0,
        value: 0,
      },
    ],
  ];
  public barLeftTarget = [
    [1800, 1400, 1000, 600, 200],
    [1600, 1200, 800, 400, 100]];

  public ballCurve: {
    path: string;
    endPoint: [number, number];
  } = this.createCurvePath(this.ballCurvePercent);

  public ngAfterViewInit(): void {
    this.createPieChart();

    setTimeout(() => {
      this.createCurve();
      this.createBarLeft();
      this.createBarRight();
    });
  }

  private createBarLeft() {
    let shouldRun = false;

    this.barLeftData.forEach((group, g) => {
      group.forEach((item, i) => {
        if (item.value < this.barLeftTarget[g][i]) {
          item.value = Math.min(item.value + 20, this.barLeftTarget[g][i]);
          item.percent = item.value / 2000 * 100;
          shouldRun = true;
        }
      });
    });

    if (shouldRun) {
      window.requestAnimationFrame(() => {
        this.createBarLeft();
      });
    }
  }

  private createBarRight() {
    let shouldRun = false;

    this.barRightData.forEach((item, i) => {
      if (item.value < this.barRightTarget[i]) {
        item.value = Math.min(item.value + 20, this.barRightTarget[i]);
        item.percent = item.value / 2000 * 100;
        shouldRun = true;
      }
    });

    if (shouldRun) {
      window.requestAnimationFrame(() => {
        this.createBarRight();
      });
    }
  }

  private createCurve() {
    this.ballCurve = this.createCurvePath(this.ballCurvePercent);

    if (this.ballCurvePercent < this.ballCurveTarget) {
      this.ballCurvePercent = Math.min(
        this.ballCurvePercent + this.ballCurveTarget / 100,
        this.ballCurveTarget);

      window.requestAnimationFrame(() => {
        this.createCurve();
      });
    }
  }

  private createCurvePath(percent: number, rotateRad = 0): {
    path: string;
    endPoint: [number, number];
  } {
    const cos = Math.cos;
    const sin = Math.sin;
    const pi = Math.PI;

    const c = 175 / 2;
    const r = 175 / 2;

    const f_matrix_times: (
      [[a, b], [c, d]]: [[number, number], [number, number]],
      [x, y]: [number, number]) => [number, number]
      = ([[a, b], [c, d]], [x, y]) => [a * x + b * y, c * x + d * y];

    const f_rotate_matrix: (x: number) => [[number, number], [number, number]]
      = x => [[cos(x), -sin(x)], [sin(x), cos(x)]];

    const f_vec_add: (
      [a1, a2]: [number, number],
      [b1, b2]: [number, number]) => [number, number]
      = ([a1, a2], [b1, b2]) => [a1 + b1, a2 + b2];

    const deg = percent * 2 * pi % (2 * pi);
    const rotMatrix = f_rotate_matrix(rotateRad);
    const [sX, sY] = (f_vec_add(
      f_matrix_times(rotMatrix, [r * cos(-pi / 2), r * sin(-pi / 2)]), [c, c]));
    const [eX, eY] = (f_vec_add(f_matrix_times(rotMatrix,
      [r * cos(-pi / 2 + deg), r * sin(-pi / 2 + deg)]), [c, c]));
    const fA = ((deg > pi) ? 1 : 0);
    const fS = ((deg > 0) ? 1 : 0);

    return {
      path: "M " + sX + " " + sY + " A " +
        [c, c, rotateRad / (2 * pi) * 360, fA, fS, eX, eY].join(" "),
      endPoint: [eX, eY],
    };
  }

  private createPieChart() {
    if (!this.pieChart?.nativeElement) {
      return;
    }

    const chart = echarts.init(this.pieChart.nativeElement);

    chart.setOption({
      series: [
        {
          type: "pie",
          radius: ["50%", "95%"],
          center: ["50%", "50%"],
          roseType: "area",
          labelLine: {
            show: false,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              color: "white",
            },
          },
          data: [
            {
              value: 39,
              name: "标题1",
              itemStyle: {
                color: "#fec50f",
              },
            },
            {
              value: 22,
              name: "标题2",
              itemStyle: {
                color: "#01ffff",
              },
            },
            {
              value: 16,
              name: "标题3",
              itemStyle: {
                color: "#0ba1f9",
              },
            },
            {
              value: 13,
              name: "标题4",
              itemStyle: {
                color: "#32ff40",
              },
            },
          ],
        },
        {
          type: "pie",
          z: -1,
          radius: ["43%", "85%"],
          center: ["50%", "50%"],
          roseType: "area",
          labelLine: {
            show: false,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              color: "white",
            },
          },
          data: [
            {
              value: 39,
              name: "标题1",
              itemStyle: {
                color: "#c1930c",
              },
            },
            {
              value: 22,
              name: "标题2",
              itemStyle: {
                color: "#01cbcb",
              },
            },
            {
              value: 16,
              name: "标题3",
              itemStyle: {
                color: "#087cc0",
              },
            },
            {
              value: 13,
              name: "标题4",
              itemStyle: {
                color: "#26bc30",
              },
            },
          ],
        },
      ],
    });
  }
}
