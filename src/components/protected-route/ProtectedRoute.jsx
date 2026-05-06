// Bắt buộc phải login

import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { data, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!data?.data) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
