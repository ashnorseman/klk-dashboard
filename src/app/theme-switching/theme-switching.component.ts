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
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      legend: {
        show: true,
      },
      xAxis: {
        data: [
          "A",
          "B",
          "C",
          "D",
          "E",
        ],
      },
      series: [
        {
          name: "A",
          data: [
            10,
            22,
            28,
            43,
            49,
          ],
          type: "line",
          stack: "x",
        },
        {
          name: "B",
          data: [
            5,
            4,
            3,
            5,
            10,
          ],
          type: "line",
          stack: "x",
          label: {
            show: true,
          },
        },
      ],
    });
  }
}
