import React from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";
import useAuth from "@/hooks/useAuth";
export default function AuthRedirect() {
  const { data, isLoading } = useAuth();
  if (isLoading) return null;
  if (data) return <Navigate to="/" replace />;

  return <Outlet />;
}
