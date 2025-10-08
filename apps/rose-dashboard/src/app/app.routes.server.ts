import { RenderMode, ServerRoute } from "@angular/ssr";

export const serverRoutes: ServerRoute[] = [
  {
    path: "dashboard/categories",
    renderMode: RenderMode.Client,
  },
  {
    path: "dashboard/occasions",
    renderMode: RenderMode.Client,
  },
  {
    path: "dashboard/products",
    renderMode: RenderMode.Client,
  },
  {
    path: "**",
    renderMode: RenderMode.Server,
  },
];
