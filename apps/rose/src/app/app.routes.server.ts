import { RenderMode, ServerRoute } from "@angular/ssr";

export const serverRoutes: ServerRoute[] = [
  {
    path: "dashboard/home",
    renderMode: RenderMode.Server,
  },
  {
    path: "dashboard/all-categories",
    renderMode: RenderMode.Server,
  },
  {
    path: "**",
    renderMode: RenderMode.Prerender,
  },
];
