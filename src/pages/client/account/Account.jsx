import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";

function Account() {
  const { data, isLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("profile");
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.get(`${import.meta.env.VITE_API_BACKEND}/logout`);
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth"] });
      navigate("/");
    },
  });

  if (isLoading) return <div>Loading</div>;

  return (
    <div>
      {/* Header */}
      <div className="pt-12 pb-8 text-center">
        <h1 className="text-3xl font-semibold text-[#8B6F5E] mb-6">
          Tài khoản của bạn
        </h1>
        <div className="w-12 h-0.5 bg-gray-800 mx-auto" />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Body */}
      <div className="flex gap-16 px-20 py-12 mx-auto">
        {/* Sidebar */}
        <div className="min-w-[180px]">
          <p className="text-base font-bold tracking-[1px] text-[#5a4a42] uppercase mb-4">
            Tài khoản
          </p>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <span className="text-[10px] text-gray-400">⊙</span>
                Thông tin tài khoản
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveTab("address")}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <span className="text-[10px] text-gray-400">⊙</span>
                Danh sách địa chỉ
              </button>
            </li>
            <li>
              <button
                onClick={mutate}
                className="flex items-center gap-2 p-0 text-sm text-gray-600 bg-transparent border-none cursor-pointer hover:text-gray-900"
              >
                <span className="text-[10px] text-gray-400">⊙</span>
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>

        <div className="flex-1">
          {activeTab === "profile" && (
            <>
              <p className="text-base font-bold tracking-[1px] text-[#5a4a42] uppercase mb-4">
                Thông tin tài khoản
              </p>

              <div className="mb-6">
                <p className="text-[15px] font-medium text-gray-900 mb-1">
                  {data?.data?.fullName}
                </p>
                <p className="mb-1 text-sm text-gray-600">
                  {data?.data?.email}
                </p>

                {/* <div className="p-4 border rounded bg-gray-50">
                  <p className="text-sm text-gray-500">
                    Bạn chưa có địa chỉ nào.
                  </p>
                </div> */}
              </div>
            </>
          )}

          {activeTab === "address" && (
            <>
              <p className="text-base font-bold tracking-[1px] text-[#5a4a42] uppercase mb-4">
                Danh sách địa chỉ
              </p>

              <p className="text-sm text-gray-500">Bạn chưa có địa chỉ nào.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
