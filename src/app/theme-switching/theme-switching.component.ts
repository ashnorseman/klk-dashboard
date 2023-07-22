import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as echarts from "echarts";

@Component({
  selector: "app-theme-switching",
  templateUrl: "./theme-switching.component.html",
  styleUrls: ["./theme-switching.component.scss"],
})
export class ThemeSwitchingComponent implements AfterViewInit {
  @ViewChild("lineChart1")
  public lineChart1?: ElementRef<HTMLElement>;

  @ViewChild("lineChart2")
  public lineChart2?: ElementRef<HTMLElement>;

  @ViewChild("lineChart3")
  public lineChart3?: ElementRef<HTMLElement>;

  @ViewChild("lineChartComplex")
  public lineChartComplex?: ElementRef<HTMLElement>;

  @HostBinding("class")
  public theme = "";

  constructor(private readonly route: ActivatedRoute) {
    document.body.style.transform = "";

    this.theme = this.route.snapshot.params["theme"];
  }

  public ngAfterViewInit(): void {
    this.createLineChart("#387dff", this.lineChart1?.nativeElement as HTMLElement);
    this.createLineChart("#6dd230", this.lineChart2?.nativeElement as HTMLElement);
    this.createLineChart("#fe7c4b", this.lineChart3?.nativeElement as HTMLElement);

    this.createLineChartComplex(this.lineChartComplex?.nativeElement as HTMLElement);
  }

  private createLineChart(color: string, el: HTMLElement):void {
    const chart = echarts.init(el);

    chart.setOption({
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      xAxis: {
        type: "category",
        show: false,
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320, 420, 764],
          type: "line",
          lineStyle: {
            color,
            width: 2,
          },
          smooth: true,
          symbol: "none",
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: color,
              },
              {
                offset: 1,
                color: "rgba(255, 255, 255, 0)",
              },
            ]),
          },
        },
      ],
    });
  }

  private createLineChartComplex(el: HTMLElement): void {
    const chart = echarts.init(el);

    chart.setOption({
      grid: {
        top: 10,
        left: 0,
        right: 4,
        bottom: 56,
        containLabel: true,
      },
      legend: {
        show: true,
        bottom: 0,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
        },
        textStyle: {
          color: "#334681",
        },
      },
      xAxis: {
        data: ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5"],
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#EAEBF0",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#6C7293",
          margin: 10,
          formatter: (value: string, index: number) => {
            return `{${index}|${value}}`;
          },
          rich: {
            0: {
              padding: [0, 0, 0, 32],
            },
            4: {
              padding: [0, 32, 0, 0],
            },
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(234, 235, 230, .5)",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#EAEBF0",
          },
        },
        axisLabel: {
          show: true,
          color: "#6C7293",
          fontSize: 12,
        },
        splitLine: {
          lineStyle: {
            color: "#EAEBF0",
            type: "dashed",
          },
        },
      },
      series: [
        {
          name: "Data 1",
          data: [10, 22, 28, 43, 49],
          type: "line",
          smooth: true,
          color: "#387DFF",
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 3,
          }
        },
        {
          name: "Data 2",
          data: [5, 4, 3, 5, 10],
          type: "line",
          smooth: true,
          color: "#EAD656",
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 3,
          }
        },
        {
          name: "Data 3",
          data: [15, 14, 13, 15, 20],
          type: "line",
          smooth: true,
          color: "#FE7C4B",
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 3,
          }
        },
        {
          name: "Data 4",
          data: [25, 24, 23, 25, 30],
          type: "line",
          smooth: true,
          color: "#23B899",
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 3,
          }
        },
      ],
    });
  }
}
