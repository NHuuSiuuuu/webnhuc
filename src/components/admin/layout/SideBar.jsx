import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Tag,
  Truck,
  ClipboardList,
  ShieldCheck,
  KeyRound,
  Users,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";
import Logout from "../auth/Logout";

const NAV_ITEMS = [
  {
    group: "Tổng quan",
    items: [
      { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    ],
  },
  {
    group: "Sản phẩm",
    items: [
      { to: "/admin/products", label: "Danh sách sản phẩm", icon: ShoppingBag },
      { to: "/admin/products-category", label: "Danh mục", icon: Tag },
    ],
  },
  {
    group: "Vận hành",
    items: [
      {
        to: "/admin/orders",
        label: "Đơn hàng",
        icon: ClipboardList,
        end: true,
      },
      {
        to: "/admin/shipping-method",
        label: "Vận chuyển",
        icon: Truck,
        end: true,
      },
    ],
  },
  {
    group: "Hệ thống",
    items: [
      { to: "/admin/roles", label: "Nhóm quyền", icon: ShieldCheck, end: true },
      { to: "/admin/roles/permissions", label: "Phân quyền", icon: KeyRound },
      { to: "/admin/accounts/", label: "Tài khoản", icon: Users, end: true },
    ],
  },
  {
    group: "Cá nhân",
    items: [
      { to: "/admin/accounts/me", label: "Hồ sơ", icon: UserCircle },
      { to: "/admin/setting/", label: "Cài đặt", icon: Settings },
    ],
  },
];

const activeClass =
  "flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-medium transition-all duration-150 " +
  "bg-gray-200 text-black dark:bg-white/10 dark:text-white";

const inactiveClass =
  "flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-medium transition-all duration-150 " +
  "text-gray-600 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white";
function Sidebar({ showMenu, setShowMenu }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden ${
          showMenu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={()=>setShowMenu(false)}
      ></div>

      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] no-scrollbar overflow-y-auto
        md:flex flex-col w-56 xl:w-60 transition-transform shadow-xl
        dark:bg-[#0f1117] bg-white shrink-0
        ${showMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Nav */}
        <nav className="px-3 py-4 space-y-5 overflow-y-auto no-scrollbar ">
          {NAV_ITEMS.map((group) => (
            <div key={group.group}>
              <p className="px-3 mb-1 text-[14px] font-semibold uppercase tracking-wide  text-gray-400 dark:text-gray-500 ">
                {group.group}
              </p>
              <ul className="space-y-0.5">
                {group.items.map(({ to, label, icon: Icon, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      className={({ isActive }) =>
                        isActive ? activeClass : inactiveClass
                      }
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="truncate">{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        {/* Logout */}
          <Logout className="flex items-center w-full gap-3 px-3 py-2 font-[14px]medium text-gray-400 transition-all duration-150 rounded-lg text- hover:bg-white/6 hover:text-red-400" />
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
