import { Outlet } from "react-router-dom";
import Sidebar from "@/components/admin/layout/SideBar";
import Header from "./Header";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
function AdminLayout() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="min-h-screen">
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />

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

      <div className="">
        <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
           <div
          className={`transition-[margin] duration-300 ${
            showMenu ? "md:ml-56 xl:ml-60" : "md:ml-0"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
