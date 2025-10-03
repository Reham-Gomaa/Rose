// import { isPlatformBrowser } from "@angular/common";
// import {
//   Component,
//   effect,
//   inject,
//   input,
//   InputSignal,
//   OnInit,
//   PLATFORM_ID,
//   signal,
// } from "@angular/core";
// import { TranslatePipe } from "@ngx-translate/core";
// // Shared_Interfaces
// import { DailyRevenue, MonthlyRevenue } from "@rose_dashboard/core_interfaces/statistics";
// // Primeng
// import { ChartModule } from "primeng/chart";

// @Component({
//   selector: "app-revenue-chart",
//   imports: [ChartModule, TranslatePipe],
//   templateUrl: "./revenue-chart.component.html",
//   styleUrl: "./revenue-chart.component.scss",
// })
// export class RevenueChartComponent {
//   private readonly platformId = inject(PLATFORM_ID);

//   dailyRevenue: InputSignal<DailyRevenue[]> = input([] as DailyRevenue[]);
//   monthlyRevenue: InputSignal<MonthlyRevenue[]> = input([] as MonthlyRevenue[]);
//   data: any;
//   options: any;

//   mode = signal<"daily" | "monthly">("monthly");

//   private readonly chartEffect = effect(() => {
//     if (this.dailyRevenue()?.length && this.monthlyRevenue()?.length) {
//       this.initChart();
//     }
//   });

//   initChart() {
//     if (isPlatformBrowser(this.platformId)) {
//       const documentStyle = getComputedStyle(document.documentElement);
//       const textColor = documentStyle.getPropertyValue("--p-text-color");
//       const textColorSecondary = documentStyle.getPropertyValue("--p-text-muted-color");
//       const surfaceBorder = documentStyle.getPropertyValue("--p-content-border-color");

//       if (this.mode() === "monthly") {
//         const monthlyLabels = this.monthlyRevenue()
//           .sort((a, b) => a._id.localeCompare(b._id))
//           .map((m) => {
//             const [year, month] = m._id.split("-");
//             return new Date(+year, +month - 1).toLocaleString("en-US", { month: "short" });
//           });

//         const monthlyData = this.monthlyRevenue().map((m) => m.revenue);

//         this.data = {
//           labels: monthlyLabels,
//           datasets: [
//             {
//               label: "Monthly Revenue",
//               data: this.monthlyRevenue().map((m) => m.revenue),
//               fill: { target: "origin" },
//               spanGaps: true,
//               borderWidth: 1,
//               borderColor: documentStyle.getPropertyValue("--maroon-600"),
//               tension: 0.4,
//               backgroundColor: (context: any) => {
//                 const chart = context.chart;
//                 const { ctx, chartArea } = chart;

//                 if (!chartArea) return null; // skip until chart is ready

//                 const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
//                 gradient.addColorStop(0, "rgba(166, 37, 42, 0.5)");
//                 gradient.addColorStop(1, "rgba(248, 177, 239, 0)");

//                 return gradient;
//               },
//             },
//           ],
//         };
//       } else {
//         const sortedDaily = this.dailyRevenue().sort((a, b) => a._id.localeCompare(b._id));

//         const dailyLabels = sortedDaily.map((d) => {
//           const date = new Date(d._id);
//           return `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;
//         });

//         const dailyData = sortedDaily.map((d) => d.revenue);

//         this.data = {
//           labels: dailyLabels,
//           datasets: [
//             {
//               label: "Daily Revenue",
//               data: dailyData,
//               fill: {
//                 target: "origin", // 👈 force fill to baseline
//               },
//               spanGaps: true,
//               borderWidth: 1,
//               borderColor: documentStyle.getPropertyValue("--maroon-600"),
//               tension: 0.4,
//               backgroundColor: (context: any) => {
//                 const chart = context.chart;
//                 const { ctx, chartArea } = chart;
//                 if (!chartArea) return null;

//                 const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
//                 gradient.addColorStop(0, "rgba(166, 37, 42, 0.5)");
//                 gradient.addColorStop(1, "rgba(248, 177, 239, 0)");

//                 return gradient;
//               },
//             },
//           ],
//         };
//       }

//       this.options = {
//         maintainAspectRatio: false,
//         aspectRatio: 0.6,
//         interaction: {
//           mode: "nearest", // hover nearest point
//           intersect: false,
//         },
//         plugins: {
//           legend: {
//             display: false,
//           },
//           tooltip: {
//             enabled: true,
//             backgroundColor: "transparent", // 👈 make background invisible
//             titleColor: "transparent", // 👈 hide title
//             titleFont: { size: 0 }, // 👈 ensure title is gone
//             displayColors: false, // 👈 remove color box
//             bodyColor: "#A6252A", // 👈 value text color
//             bodyFont: {
//               size: 14,
//               weight: "bold",
//             },
//             callbacks: {
//               title: () => "", // remove title
//               label: (ctx: { raw: any }) => `${ctx.raw}`, // only show value
//             },
//           },
//         },
//         elements: {
//           point: {
//             radius: 0, // 👈 completely hide default points
//             hoverRadius: 5, // 👈 show only on hover
//             hoverBackgroundColor: documentStyle.getPropertyValue("--maroon-600"),
//             hoverBorderColor: "#fff",
//             hoverBorderWidth: 2,
//             //z: 100,
//             order: 1,
//           },
//         },
//         scales: {
//           x: {
//             ticks: {
//               color: "#27272A", // 👈 change axis value color
//               font: {
//                 size: 10,
//                 weight: "700",
//               },
//             },

//             grid: {
//               color: surfaceBorder, // vertical lines
//               drawBorder: false,
//               display: true,
//             },
//             border: {
//               display: false, // 👈 NEW: remove X axis baseline
//             },
//           },
//           y: {
//             ticks: {
//               color: "#27272A", // 👈 change axis value color
//               font: {
//                 size: 10,
//                 weight: "700",
//               },
//             },

//             grid: {
//               display: false, // ❌ hide horizontal lines
//               drawBorder: false,
//               drawTicks: true,
//               color: surfaceBorder,
//               z: 0,
//             },
//             border: {
//               display: false, // 👈 NEW: remove X axis baseline
//             },
//           },
//         },
//       };
//     }
//   }
// }

import { isPlatformBrowser } from "@angular/common";
import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  signal,
  PLATFORM_ID,
  WritableSignal,
} from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
// Primeng
import { ChartModule } from "primeng/chart";
import { Skeleton } from "primeng/skeleton";

// Shared Interfaces
import { DailyRevenue, MonthlyRevenue } from "@rose_dashboard/core_interfaces/statistics";

@Component({
  selector: "app-revenue-chart",
  imports: [ChartModule, TranslatePipe, Skeleton],
  templateUrl: "./revenue-chart.component.html",
  styleUrl: "./revenue-chart.component.scss",
})
export class RevenueChartComponent {
  private readonly platformId = inject(PLATFORM_ID);

  dailyRevenue: InputSignal<DailyRevenue[]> = input([] as DailyRevenue[]);
  monthlyRevenue: InputSignal<MonthlyRevenue[]> = input([] as MonthlyRevenue[]);

  data: any;
  options: any;

  mode = signal<"daily" | "monthly">("monthly");
  loading: WritableSignal<boolean> = signal(true);

  private readonly chartEffect = effect(() => {
    if (this.dailyRevenue()?.length && this.monthlyRevenue()?.length) {
      this.loading.set(false);
      this.initChart();
    }
  });

  private initChart(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const styles = this.getDocumentStyles();
    this.data = this.buildChartData(styles);
    this.options = this.buildChartOptions(styles);
  }

  private getDocumentStyles() {
    const style = getComputedStyle(document.documentElement);
    return {
      border: style.getPropertyValue("--p-content-border-color"),
      maroon: style.getPropertyValue("--chart-active-button"),
    };
  }

  private buildChartData(styles: ReturnType<typeof this.getDocumentStyles>) {
    const labels = this.mode() === "monthly" ? this.getMonthlyLabels() : this.getDailyLabels();
    const values =
      this.mode() === "monthly"
        ? this.monthlyRevenue().map((m) => m.revenue)
        : this.dailyRevenue()
            .sort((a, b) => a._id.localeCompare(b._id))
            .map((d) => d.revenue);

    return {
      labels,
      datasets: [
        {
          label: `${this.capitalize(this.mode())} Revenue`,
          data: values,
          fill: { target: "origin" },
          spanGaps: true,
          borderWidth: 1,
          borderColor: styles.maroon,
          tension: 0.4,
          backgroundColor: this.buildGradientBackground,
        },
      ],
    };
  }

  private buildChartOptions(styles: ReturnType<typeof this.getDocumentStyles>) {
    return {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      interaction: { mode: "nearest", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "transparent",
          titleColor: "transparent",
          titleFont: { size: 0 },
          displayColors: false,
          bodyColor: "#A6252A",
          bodyFont: { size: 14, weight: "bold" },
          callbacks: {
            title: () => "",
            label: (ctx: { raw: any }) => `${ctx.raw}`,
          },
        },
      },
      elements: {
        point: {
          radius: 0,
          hoverRadius: 5,
          hoverBackgroundColor: styles.maroon,
          hoverBorderColor: "#fff",
          hoverBorderWidth: 2,
          order: 1,
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#27272A",
            font: { size: 10, weight: "700" },
          },
          grid: { color: styles.border, drawBorder: false, display: true },
          border: { display: false },
        },
        y: {
          display: window.innerWidth >= 992,
          ticks: {
            color: "#27272A",
            font: { size: 10, weight: "700" },
          },
          grid: {
            display: false,
            drawBorder: false,
            drawTicks: true,
            color: styles.border,
            z: 0,
          },
          border: { display: false },
        },
      },
    };
  }

  private getMonthlyLabels(): string[] {
    return this.monthlyRevenue()
      .sort((a, b) => a._id.localeCompare(b._id))
      .map((m) => {
        const [year, month] = m._id.split("-");
        return new Date(+year, +month - 1).toLocaleString("en-US", {
          month: "short",
        });
      });
  }

  private getDailyLabels(): string[] {
    return this.dailyRevenue()
      .sort((a, b) => a._id.localeCompare(b._id))
      .map((d) => {
        const date = new Date(d._id);
        return `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;
      });
  }

  private buildGradientBackground(context: any) {
    const { chart } = context;
    const { ctx, chartArea } = chart;
    if (!chartArea) return null;

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, "rgba(166, 37, 42, 0.5)");
    gradient.addColorStop(1, "rgba(248, 177, 239, 0)");
    return gradient;
  }

  private capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
