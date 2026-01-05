import HomePage from "../pages/HomePage";
import LayoutDefault from "../components/layout/LayoutDefault";
import Collection from "../components/products/Collection";
import ProductDetail from "../components/products/ProductDetail";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "collection/:slug",
        element: <Collection />,
      },
      {
        path: "product/:slug",
        element: <ProductDetail />,
      },
    ],
  },
];
