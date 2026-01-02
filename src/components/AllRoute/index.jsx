import { useRoutes } from "react-router";
import { routes } from "@/routes/index.route";

function AllRoute() {
  const element = useRoutes(routes);
  return element;
}

export default AllRoute;
