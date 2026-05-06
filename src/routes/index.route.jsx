import HomePage from "../pages/HomePage";
import LayoutDefault from "../components/layout/LayoutDefault";
import Collection from "../components/products/Products";
import ProductDetail from "../components/products/ProductDetail";
import Cart from "../components/products/Cart";
import LayoutDefaultAdmin from "@/components/admin/layout/LayoutDefault";
import DashBoard from "@/pages/admin/DashBoard";
import ProductAdmin from "@/pages/admin/product/ProductAdmin";
import ProductCreateAdmin from "@/pages/admin/product/ProductCreateAdmin";
import ProductUpdateAdmin from "@/pages/admin/product/ProductUpdateAdmin";
import CategoryAdmin from "@/pages/admin/category-product/CategoryAdmin";
import CategoryUpdateAdmin from "@/pages/admin/category-product/CategoryUpdateAdmin";
import CategoryCreateAdmin from "@/pages/admin/category-product/CategoryCreateAdmin";
import CategoryDetail from "@/pages/admin/category-product/CategoryDetail";
import Login from "@/pages/client/account/Login";
import Register from "@/pages/client/account/Register";
import Roles from "@/pages/admin/roles/Roles";
import RoleCreate from "@/pages/admin/roles/RoleCreate";
import RoleUpdate from "@/pages/admin/roles/RoleUpdate";
import RoleDetail from "@/pages/admin/roles/RoleDetail";
import RolePermissions from "@/pages/admin/roles/RolePermissions";
import AccountAdmin from "@/pages/admin/accounts/AccountAdmin";
import AccountCreateAdmin from "@/pages/admin/accounts/AccountCreateAdmin";
import AccountUpdateAdmin from "@/pages/admin/accounts/AccountUpdateAdmin";
import AccountDetail from "@/pages/admin/accounts/AccountDetail";
import LoginAdmin from "@/pages/admin/auth/LoginAdmin";
import AccountMeAdmin from "@/pages/admin/accounts/AccountMeAdmin";
import ProductDetailAdmin from "@/pages/admin/product/ProductDetailAdmin";
import Checkout from "@/pages/client/Checkouts";
import ShippingMethod from "@/pages/admin/shipping_method/ShippingMethod";
import ShippingMethodCreate from "@/pages/admin/shipping_method/ShippingMethodCreate";
import ShippingMethodDetail from "@/pages/admin/shipping_method/ShippingMethodDetail";
import ShippingMethodUpdate from "@/pages/admin/shipping_method/ShippingMethodUpdate";
import Orders from "@/pages/admin/orders/order";
import OrderSuccess from "@/pages/client/orders/OrderSuccess";
import OrderDetail from "@/pages/client/orders/OrderDetail";
import OrderTracking from "@/pages/client/tracking/Tracking";
import OrderDetailPage from "@/pages/admin/orders/OrderDetailAdmin";
import AdminOrderDetail from "@/pages/admin/orders/OrderDetailAdmin";
import ProducstNew from "@/pages/client/products/ProductsNew";
import Account from "@/pages/client/account/Account";
import AuthRedirect from "@/components/admin/layout/AuthRedirect";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import AuthRoute from "@/components/protected-route/AuthRoute";
import AdminRoute from "@/components/protected-route/AdminRoute";

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
        path: "/products",
        element: <Collection />,
      },
      {
        path: "/products/san-pham-moi",
        element: <ProducstNew />,
      },
      {
        path: "cart/",
        element: <Cart />,
      },

      {
        path: "products/:slug",
        element: <ProductDetail />,
      },

      {
        path: "tracking",
        element: <OrderTracking />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "account",
            element: <Account />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AuthRoute />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "checkouts/:cart_id",
    element: <Checkout />,
  },
  {
    path: "orders/success/:id",
    element: <OrderSuccess />,
  },
  {
    path: "orders/detail/:id",
    element: <OrderDetail />,
  },

  {
    path: "/admin",
    element: <AuthRoute />,
    children: [
      {
        path: "login",
        element: <LoginAdmin />,
      },
    ],
  },
 
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      {
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
            path: "product/detail/:id",
            element: <ProductDetailAdmin />,
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
          {
            path: "roles/permissions",
            element: <RolePermissions />,
          },
          {
            path: "accounts",
            element: <AccountAdmin />,
          },
          {
            path: "accounts/me",
            element: <AccountMeAdmin />,
          },
          {
            path: "accounts/create",
            element: <AccountCreateAdmin />,
          },
          {
            path: "accounts/update/:id",
            element: <AccountUpdateAdmin />,
          },
          {
            path: "accounts/detail/:id",
            element: <AccountDetail />,
          },
          {
            path: "shipping-method",
            element: <ShippingMethod />,
          },
          {
            path: "shipping-method/create",
            element: <ShippingMethodCreate />,
          },
          {
            path: "shipping-method/detail/:id",
            element: <ShippingMethodDetail />,
          },
          {
            path: "shipping-method/update/:id",
            element: <ShippingMethodUpdate />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "order/:id",
            element: <AdminOrderDetail />,
          },
        ],
      },
    ],
  },
];
