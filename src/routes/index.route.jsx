import HomePage from "../pages/HomePage";
import LayoutDefault from "../components/layout/LayoutDefault";
import Collection from "../components/products/Collection";
import ProductDetail from "../components/products/ProductDetail";
import Cart from "../components/products/Card";
import LayoutDefaultAdmin from "@/components/admin/layout/LayoutDefault";
import DashBoard from "@/pages/admin/DashBoard";
import ProductAdmin from "@/pages/admin/product/ProductAdmin";
import ProductCreateAdmin from "@/pages/admin/product/ProductCreateAdmin";
import ProductUpdateAdmin from "@/pages/admin/product/ProductUpdateAdmin";
import CategoryAdmin from "@/pages/admin/category-product/CategoryAdmin";
import CategoryUpdateAdmin from "@/pages/admin/category-product/CategoryUpdateAdmin";
import CategoryCreateAdmin from "@/pages/admin/category-product/CategoryCreateAdmin";
import CategoryDetail from "@/pages/admin/category-product/CategoryDetail";
import Login from "@/pages/client/user/login";
import Register from "@/pages/client/user/register";
import Roles from "@/pages/admin/roles/Roles";
import RoleCreate from "@/pages/admin/roles/RoleCreate";
import RoleUpdate from "@/pages/admin/roles/RoleUpdate";
import RoleDetail from "@/pages/admin/roles/RoleDetail";

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
      {
        path: "login/",
        element: <Login />,
      },
      {
        path: "register/",
        element: <Register />,
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
      {
        path: "product/update/:id",
        element: <ProductUpdateAdmin />,
      },
      {
        path: "products-category",
        element: <CategoryAdmin />,
      },
      {
        path: "product-category/update/:id",
        element: <CategoryUpdateAdmin />,
      },
      {
        path: "product-category/create",
        element: <CategoryCreateAdmin />,
      },
      {
        path: "product-category/detail/:id",
        element: <CategoryDetail />,
      },
      {
        path: "roles/",
        element: <Roles />,
      },
      {
        path: "roles/create",
        element: <RoleCreate />,
      },
      {
        path: "roles/update/:id",
        element: <RoleUpdate />,
      },
      {
        path: "roles/detail/:id",
        element: <RoleDetail />,
      },
    ],
  },
];
