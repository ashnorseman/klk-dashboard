import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as echarts from "echarts";

@Component({
  selector: "app-order-analysis",
  templateUrl: "./order-analysis.component.html",
  styleUrls: ["./order-analysis.component.scss"],
})
export class OrderAnalysisComponent implements AfterViewInit {
  @ViewChild("pie")
  public pieChart?: ElementRef<HTMLElement>;

  public ballCurvePercent = .642;

  public ballCurve: {
    path: string;
    endPoint: [number, number];
  } = this.createCurvePath(this.ballCurvePercent);

  constructor() {
  }

  public ngAfterViewInit(): void {
    if (!this.pieChart?.nativeElement) {
      return;
    }

    const chart = echarts.init(this.pieChart.nativeElement);

    chart.setOption({
      toolbox: {
        show: false,
      },
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
      ],
    });
  }

  public createCurvePath(percent: number, rotateRad = 0): {
    path: string;
    endPoint: [number, number];
  } {
    const cos = Math.cos;
    const sin = Math.sin;
    const pi = Math.PI;

    const c = 175 / 2;
    const r = 175 / 2;

    const f_matrix_times: ([[a, b], [c, d]]: [[number, number], [number, number]], [x, y]: [number, number]) => [number, number]
      = ([[a, b], [c, d]], [x, y]) => [a * x + b * y, c * x + d * y];

    const f_rotate_matrix: (x: number) => [[number, number], [number, number]]
      = x => [[cos(x), -sin(x)], [sin(x), cos(x)]];

    const f_vec_add: ([a1, a2]: [number, number], [b1, b2]: [number, number]) => [number, number]
      = ([a1, a2], [b1, b2]) => [a1 + b1, a2 + b2];

    const deg = percent * 2 * pi % (2 * pi);
    const rotMatrix = f_rotate_matrix(rotateRad);
    const [sX, sY] = (f_vec_add(f_matrix_times(rotMatrix, [r * cos(-pi / 2), r * sin(-pi / 2)]), [c, c]));
    const [eX, eY] = (f_vec_add(f_matrix_times(rotMatrix, [r * cos(-pi / 2 + deg), r * sin(-pi / 2 + deg)]), [c, c]));
    const fA = ((deg > pi) ? 1 : 0);
    const fS = ((deg > 0) ? 1 : 0);

    return {
      path: "M " + sX + " " + sY + " A " + [c, c, rotateRad / (2 * pi) * 360, fA, fS, eX, eY].join(" "),
      endPoint: [eX, eY],
    };
  }
}
