import type { RouteObject } from "react-router-dom";
import { Welcome } from "./welcome/welcome";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Welcome />,
  },
];

export default routes;