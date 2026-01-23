import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 p-5 text-white bg-black">
      <h2 className="mb-6 text-xl font-bold">ADMIN</h2>

      <nav className="flex flex-col gap-3">
        {/* Trang chủ */}
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
          }
        >
          Dashboard
        </NavLink>

        {/* Danh sách sản phẩm */}
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
          }
        >
          Danh sách sản phẩm
        </NavLink>

        {/* Danh mục sản phẩm */}
        <NavLink
          to="/admin/products-category"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
          }
        >
          Danh mục sản phẩm
        </NavLink>

        {/* Nhóm quyền */}
        <NavLink
          to="/admin/roles"
          end
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
          }
        >
          Nhóm quyền
        </NavLink>

        {/*Phân quyền*/}
        <NavLink
          to="/admin/roles/permissions"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
          }
        >
          Phân quyền
        </NavLink>

        {/* Danh sách tài khoản */}
        <NavLink
          to="/admin/accounts/"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
          }
        >
          Danh sách tài khoản
        </NavLink>

        {/* Cài đặt chung*/}
        <NavLink
          to="/admin/setting/"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
          }
        >
          Cài đặt chung
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
