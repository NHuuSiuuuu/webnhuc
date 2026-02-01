import { useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import { useState } from "react";
import Logout from "../auth/Logout";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const fetchGetMe = async () => {
    const res = await axios.get("http://localhost:3001/api/account/getMe");
    return res.data.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getMe"],
    queryFn: fetchGetMe,
  });
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin">
            <div class="flex items-center justify-center">
              <svg
                class="animate-spin border-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
              >
                <g id="Group 1000003710">
                  <circle
                    id="Ellipse 717"
                    cx="26.0007"
                    cy="25.9994"
                    r="22.7221"
                    stroke="#D1D5DB"
                    stroke-width="6"
                    stroke-dasharray="4 4"
                  />
                  <path
                    id="Ellipse 715"
                    d="M32.6373 47.7311C38.0288 46.0843 42.6156 42.4922 45.5067 37.6526C48.3977 32.8129 49.3864 27.0714 48.2808 21.5435C47.1751 16.0156 44.054 11.0961 39.5239 7.74084C34.9938 4.38554 29.3781 2.83406 23.768 3.38782"
                    stroke="#4F46E5"
                    stroke-width="6"
                  />
                </g>
              </svg>
            </div>
          </div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-8 text-center border border-red-200 rounded-lg bg-red-50">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-red-600"
            />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-red-800">
            Đã xảy ra lỗi
          </h3>
          <p className="text-gray-600">
            Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="w-30  my-[6px] h-10 bg-white cursor-pointer rounded-3xl border-2 border-[#991B1B] shadow-[inset_0px_-2px_0px_1px_#991B1B] group hover:bg-[#991B1B] transition duration-300 ease-in-out"
          >
            <span className="font-medium text-[#333] group-hover:text-white">
              Thử lại
            </span>
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 class="bg-gradient-to-r font-bold text-4xl from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              NHuu ADMIN
            </h1>
            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-600 transition rounded-full hover:text-gray-900 hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
              </div>

              {/* Messages */}
              <div className="relative">
                <button className="p-2 text-gray-600 transition rounded-full hover:text-gray-900 hover:bg-gray-100">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-500 rounded-full"></span>
                </button>
              </div>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center p-1 space-x-2 transition rounded-lg hover:bg-gray-100"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                      {data.avatar ? (
                        <img
                          src={data.avatar}
                          alt="Avatar"
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        <span className="text-sm font-bold text-white">
                          {data.fullName?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-medium text-gray-900">
                      {data.fullName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {data.role_id.title || ""}
                    </p>
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform ${showUserMenu ? "transform rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {data.fullName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {data.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <a
                        href="/admin/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <svg
                          className="w-5 h-5 mr-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Hồ sơ cá nhân
                      </a>
                      <a
                        href="/admin/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <svg
                          className="w-5 h-5 mr-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                        </svg>
                        Cài đặt
                      </a>
                    </div>

                    <div className="py-1 border-t border-gray-100">
                      <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <svg
                          className="w-5 h-5 mr-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        Xem website
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Click outside to close dropdown */}
        {showUserMenu && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowUserMenu(false)}
          ></div>
        )}
      </header>
    </>
  );
}

export default Header;
