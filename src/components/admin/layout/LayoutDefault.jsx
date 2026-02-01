import { Outlet } from "react-router-dom";
import Sidebar from "@/components/admin/layout/SideBar";
import Header from "./Header";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminLayout() {
  return (
    <div>
      <Header />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />

      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
