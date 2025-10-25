import { isPlatformBrowser } from "@angular/common";
import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
// Primeng
import { ChartModule } from "primeng/chart";
import { Skeleton } from "primeng/skeleton";

// Shared Interfaces
import { DailyRevenue, MonthlyRevenue } from "@rose_dashboard/core_interfaces/statistics";
// Shared_Component
import { EmptyStateComponent } from "../empty-state/emptyState.component";

@Component({
  selector: "app-revenue-chart",
  imports: [ChartModule, TranslatePipe, Skeleton, EmptyStateComponent],
  templateUrl: "./revenue-chart.component.html",
  styleUrl: "./revenue-chart.component.scss",
})
export class RevenueChartComponent {
  private readonly platformId = inject(PLATFORM_ID);

  dailyRevenue: InputSignal<DailyRevenue[] | undefined> = input<DailyRevenue[] | undefined>();
  monthlyRevenue: InputSignal<MonthlyRevenue[] | undefined> = input<MonthlyRevenue[] | undefined>();

  data: any;
  options: any;

  mode: WritableSignal<"daily" | "monthly"> = signal<"daily" | "monthly">("monthly");
  loading: WritableSignal<boolean> = signal(true);

  private readonly chartEffect = effect(() => {
    if (this.dailyRevenue() && this.monthlyRevenue()) {
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
      axisText: style.getPropertyValue("--main-text"),
    };
  }

  private buildChartData(styles: ReturnType<typeof this.getDocumentStyles>) {
    const labels = this.mode() === "monthly" ? this.getMonthlyLabels() : this.getDailyLabels();
    const values =
      this.mode() === "monthly"
        ? this.monthlyRevenue()!.map((m) => m.revenue)
        : this.dailyRevenue()!.map((d) => d.revenue);

    return {
      labels,
      datasets: [
        {
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
            color: styles.axisText.trim(),
            font: { size: 12, weight: "700" },
          },
          grid: { color: styles.border, drawBorder: false, display: true },
          border: { display: false },
        },
        y: {
          display: window.innerWidth >= 992,
          ticks: {
            color: styles.axisText.trim(),
            font: { size: 12, weight: "700" },
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
    return this.monthlyRevenue()!
      .sort((a, b) => a._id.localeCompare(b._id))
      .map((m) => {
        const [year, month] = m._id.split("-");
        return new Date(+year, +month - 1).toLocaleString("en-US", {
          month: "short",
        });
      });
  }

  private getDailyLabels(): string[] {
    return this.dailyRevenue()!
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
}
