// Bắt buộc phải login - và quyền

import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function AdminRoute() {
  const { data, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  const permissions = data?.data?.role_id?.permissions;
  if (!data?.data) {
    return <Navigate to="/" replace />;
  }

  if (!permissions.includes("dashboard_view")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
