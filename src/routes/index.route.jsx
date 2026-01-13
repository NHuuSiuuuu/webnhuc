import HomePage from "../pages/HomePage";
import LayoutDefault from "../components/layout/LayoutDefault";
import Collection from "../components/products/Collection";
import ProductDetail from "../components/products/ProductDetail";
import Cart from "../components/products/Card";
import LayoutDefaultAdmin from "@/components/admin/layout/LayoutDefault";
import DashBoard from "@/pages/admin/DashBoard";
import ProductAdmin from "@/pages/admin/product/ProductAdmin";
import ProductCreateAdmin from "@/pages/admin/product/ProductCreateAdmin";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "collection/:slug",
        element: <Collection />,
      },
      {
        path: "cart/",
        element: <Cart />,
      },
      {
        path: "product/:slug",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "/admin",
    element: <LayoutDefaultAdmin />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "products",
        element: <ProductAdmin />,
      },
      {
        path: "product/create",
        element: <ProductCreateAdmin />,
      },
      //       {
      //   path: "products",
      //   element: <ProductAdmin />,
      // },
    ],
  },
];
