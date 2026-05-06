// Đã đăng nhập thì không được vào nữa

import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function AuthRoute() {
  const { data, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (data?.data) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
