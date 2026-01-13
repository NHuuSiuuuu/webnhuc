import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 p-5 text-white bg-black">
      <h2 className="mb-6 text-xl font-bold">ADMIN</h2>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/products/create"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
          }
        >
          Add Product
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
