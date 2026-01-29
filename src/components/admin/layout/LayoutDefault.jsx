import { Outlet } from "react-router-dom";
import Sidebar from "@/components/admin/layout/SideBar";
import Header from "./Header";

function AdminLayout() {
  return (
    <div>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
