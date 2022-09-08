import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import * as echarts from "echarts";

@Component({
  selector: "app-quality-analysis",
  templateUrl: "./quality-analysis.component.html",
  styleUrls: ["./quality-analysis.component.scss"],
})
export class QualityAnalysisComponent implements AfterViewInit {
  @ViewChild("comprehensiveChart")
  public comprehensiveChart?: ElementRef<HTMLElement>;

  @ViewChild("onceChart")
  public onceChart?: ElementRef<HTMLElement>;

  @ViewChild("closeRateChart")
  public closeRateChart?: ElementRef<HTMLElement>;

  @ViewChild("rightChart")
  public rightChart?: ElementRef<HTMLElement>;

  @ViewChild("qualityChart")
  public qualityChart?: ElementRef<HTMLElement>;

  public ngAfterViewInit(): void {
    this.createLineChart({
      areaTop: "#026da1",
      areaBottom: "#07134a",
      line: "#00c7f0",
    }, this.comprehensiveChart?.nativeElement);

    this.createLineChart({
      areaTop: "#026da1",
      areaBottom: "#07134a",
      line: "#00c7f0",
    }, this.onceChart?.nativeElement);

    this.createLineChart({
      areaTop: "#833266",
      areaBottom: "#07134a",
      line: "#e9518e",
    }, this.closeRateChart?.nativeElement);

    this.createBarChart(this.rightChart?.nativeElement);

    this.createPieChart(this.qualityChart?.nativeElement);
  }

  private createLineChart(color: {
    areaTop: string;
    areaBottom: string;
    line: string;
  }, el?: HTMLElement) {
    if (!el) {
      return;
    }

    const chart = echarts.init(el);

    chart.setOption({
      grid: {
        top: 35,
        left: 72,
        right: 30,
        bottom: 50,
      },
      textStyle: {
        color: "#ccc",
        fontSize: 12,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月"],
        axisLabel: {
          margin: 8,
        },
        axisLine: {
          lineStyle: {
            color: "#00e3ff",
          },
          width: 2,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          margin: 18,
        },
        splitLine: {
          lineStyle: {
            color: "#2e4e72",
          },
        },
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320, 420, 764],
          type: "line",
          lineStyle: {
            color: color.line,
            width: 2,
          },
          symbol: "none",
          symbolSize: 8,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: color.areaTop,
              },
              {
                offset: 1,
                color: color.areaBottom,
              },
            ]),
          },
        },
      ],
    });
  }

  private createBarChart(el?: HTMLElement) {
    if (!el) {
      return;
    }

    const chart = echarts.init(el);

    chart.setOption({
      grid: {
        top: 0,
        left: 150,
        right: 65,
        bottom: 20,
      },
      xAxis: {
        type: "value",
        show: false,
      },
      yAxis: {
        type: "category",
        data: ["平均办理时长", "优惠户数", "累计减免金额"],
        axisLabel: {
          margin: 16,
          textStyle: {
            color: "#ccc",
            fontSize: 16,
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          data: [
            {
              value: 80,
              itemStyle: {
                color: "rgba(233, 81, 142)",
              },
            },
            {
              value: 50,
              itemStyle: {
                color: "rgba(0, 127, 254)",
              },
            },
            {
              value: 60,
              itemStyle: {
                color: "rgba(255, 140, 52)",
              },
            },
          ],
          type: "bar",
          barWidth: 14,
          label: {
            show: true,
            color: "white",
            formatter: "{c}%",
            align: "left",
            position: 16,
            offset: [16, 1],
          },
        },
        {
          data: [
            {
              value: 100,
              itemStyle: {
                color: "rgba(233, 81, 142, .4)",
              },
            },
            {
              value: 100,
              itemStyle: {
                color: "rgba(0, 127, 254, .4)",
              },
            },
            {
              value: 100,
              itemStyle: {
                color: "rgba(255, 140, 52, .4)",
              },
            },
          ],
          type: "bar",
          barCategoryGap: 40,
          barGap: "-100%",
          barWidth: 14,
        },
      ],
    });
  }

  private createPieChart(el?: HTMLElement) {
    if (!el) {
      return;
    }

    const chart = echarts.init(el);

    const value = [5.8, 13.8, 16.8, 25.8, 56.8];

    chart.setOption({
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      polar: {
        radius: [30, "100%"],
      },
      angleAxis: {
        clockwise: false,
        min: 0,
        max: 133,
        show: false,
        startAngle: 0,
      },
      radiusAxis: {
        show: false,
        type: "category",
        data: ["功能", "零件", "其他", "尺寸", "外观"],
      },
      series: [
        {
          type: "bar",
          emphasis: {
            disabled: true
          },
          data: [
            {
              value: value[0] + 33,
              itemStyle: {
                color: "#cac9c9",
              },
            },
            {
              value: value[1] + 33,
              itemStyle: {
                color: "#00b7ee",
              },
            },
            {
              value: value[2] + 33,
              itemStyle: {
                color: "#6e69f9",
              },
            },
            {
              value: value[3] + 33,
              itemStyle: {
                color: "#1e67f2",
              },
            },
            {
              value: value[4] + 33,
              itemStyle: {
                color: "#1df9fc",
              },
            },
          ],
          coordinateSystem: "polar",
          label: {
            show: false,
          },
          barWidth: 6,
          showBackground: true,
          backgroundColor: "#282b4e",
        },
        {
          type: "bar",
          zIndex: 2,
          animation: false,
          emphasis: {
            disabled: true
          },
          label: {
            show: true,
            rotate: 0,
            position: "insideTopLeft",
            offset: [8, -7],
            align: "left",
            formatter: (p: any) => {
              return `${value[p.dataIndex]}%`;
            },
            color: "white",
          },
          data: [
            {
              value: 33,
              itemStyle: {
                color: "#060d35",
              },
            },
            {
              value: 33,
              itemStyle: {
                color: "#060d35",
              },
            },
            {
              value: 33,
              itemStyle: {
                color: "#060d35",
              },
            },
            {
              value: 33,
              itemStyle: {
                color: "#060d35",
              },
            },
            {
              value: 33,
              itemStyle: {
                color: "#060d35",
              },
            },
          ],
          coordinateSystem: "polar",
          barWidth: 8,
          barGap: "-110%",
        },
      ],
    });
  }
}
