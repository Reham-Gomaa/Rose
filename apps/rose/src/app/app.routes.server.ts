import { RenderMode, ServerRoute } from "@angular/ssr";

export const serverRoutes: ServerRoute[] = [
  {
    path: "home",
    renderMode: RenderMode.Server,
  },
  {
    path: "all-categories",
    renderMode: RenderMode.Server,
  },
  {
    path: "**",
    renderMode: RenderMode.Prerender,
  },
];
