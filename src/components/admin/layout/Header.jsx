import { useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import { useState } from "react";
import { Bell, LayoutDashboard, Menu, Moon, Sun, X } from "lucide-react";
import { MessageSquare } from "lucide-react";
import useTheme from "@/hooks/useTheme";

function Header({ showMenu, setShowMenu }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { toggleTheme, theme } = useTheme();
  const fetchGetMe = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BACKEND}/account/getMe`,
    );
    return res.data.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getMe"],
    queryFn: fetchGetMe,
  });
  if (isLoading)
    return (
      <header className="fixed w-full top-0 left-0 items-center justify-between h-16 px-5 bg-[#0f1117] border-b border-white/[0.06]">
        <div className="h-4 w-32 bg-white/[0.08] rounded animate-pulse" />
        <div className="h-8 w-8 bg-white/[0.08] rounded-full animate-pulse" />
      </header>
    );

  if (isError) return <div>Lỗi</div>;

  return (
    <>
      <header className="fixed top-0 left-0 z-50 h-16 w-full dark:bg-[#0f1117] bg-white dark:border-white/[0.06] shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5 py-5 border-b border-white/[0.06]">
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-md transition-colors
                         text-gray-500     dark:text-gray-400
                         hover:bg-gray-100 dark:hover:bg-white/[0.06]"
              >
                {showMenu ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center bg-indigo-600 rounded-md size-7 shrink-0 dark:bg-indigo-500">
                  <LayoutDashboard className="text-white size-4" />
                </div>
                <span
                  className="text-[15px] font-semibold tracking-wide
                               text-gray-800 dark:text-white"
                >
                  Admin Panel
                </span>
              </div>
            </div>
            {/* Right Side */}
            <div className="flex items-center gap-1">
              {/* Toggle Theme */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-colors
                         text-gray-500     dark:text-gray-400
                         hover:bg-gray-100 dark:hover:bg-white/[0.06]"
              >
                {theme === "light" ? (
                  <Sun className="size-[18px]" />
                ) : (
                  <Moon className="size-[18px]" />
                )}
              </button>

              <button
                className="relative p-2 rounded-lg  transition-colors
                         text-gray-500     dark:text-gray-400
                         hover:bg-gray-100 dark:hover:bg-white/[0.06]"
              >
                <Bell className="size-[18px]" />
                <span className="absolute top-1.5 right-1.5 size-1.5 bg-red-500 rounded-full ring-1 ring-[#0f1117]" />
              </button>

              {/* Messages */}
              <button
                className="relative p-2 rounded-lg  transition-colors
                         text-gray-500     dark:text-gray-400
                         hover:bg-gray-100 dark:hover:bg-white/[0.06]"
              >
                <MessageSquare className="size-[18px]" />
                <span className="absolute top-1.5 right-1.5 size-1.5 bg-indigo-400 rounded-full ring-1 ring-[#0f1117]" />
              </button>

              <div className="mx-2 h-5 w-px bg-white/[0.08]" />

              {/* User profile */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2.5 pl-1 pr-2.5 py-1 rounded-lg "
                >
                  {/* Avatar */}
                <div className="flex items-center justify-center flex-shrink-0 overflow-hidden bg-indigo-100 rounded-full size-7 dark:bg-indigo-500/20 ring-1 ring-indigo-300 dark:ring-indigo-500/40">
                  
                    {data?.avatar ? (
                      <img
                        src={data.avatar}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-[14px] font-semibold text-indigo-600 dark:text-indigo-300">
                        {data?.fullName?.charAt(0).toUpperCase() ?? "A"}
                      </span>
                    )}
                  </div>

                  {/* Name + role */}
                  <div className="hidden text-left md:block">
                    <p className="text-[14px] font-medium text-gray-600     dark:text-gray-400 leading-tight">
                      {data?.fullName}
                    </p>
                    <p className="text-[13px] text-gray-600     dark:text-gray-400 leading-tight">
                      {data?.role_id?.title || "Admin"}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
