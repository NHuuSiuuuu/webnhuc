import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../../utils/axios";

import { Link } from "react-router";

function Roles() {
  const queryClient = useQueryClient();

  // Api list roles
  const fetchRoles = async () => {
    const res = await axios.get("http://localhost:3001/api/roles/index");
    return res.data.data;
  };

  // Api xóa role
  const fetchDeleteRole = async (id) => {
    const res = await axios.delete(
      `http://localhost:3001/api/roles/delete/${id}`,
    );
    return res.data;
  };
  const {
    mutate,
    isPending,
    isError: isErrorDelete,
  } = useMutation({
    mutationFn: fetchDeleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });

  const handleDeleteRole = (id) => {
    window.confirm("Mày có chắc xóa?");
    mutate(id);
  };
  if (isLoading) return <div className="p-4">Đang loading...</div>;
  if (isError) return <div className="p-4 text-red-500">Lỗi</div>;

  if (isErrorDelete) return <div className="p-4 text-red-500">Xóa lỗi</div>;

  return (
    <div className="p-6">
      <Link
        to="/admin/roles/create"
        className="inline-block px-4 py-2 mb-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Thêm quyền
      </Link>

      <h1 className="mb-4 text-2xl font-semibold">Trang quản lý quyền</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-center border">STT</th>
              <th className="px-4 py-2 text-left border">Nhóm quyền</th>
              <th className="px-4 py-2 text-left border">Mô tả ngắn</th>
              <th className="px-4 py-2 text-center border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item._id} className="transition hover:bg-gray-50">
                <td className="px-4 py-2 text-center border">{index + 1}</td>
                <td className="px-4 py-2 border">{item.title}</td>
                <td className="px-4 py-2 border">{item.description}</td>
                <td className="px-4 py-2 space-x-2 text-center border">
                  <Link
                    to={`/admin/roles/detail/${item._id}`}
                    className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Chi tiết
                  </Link>
                  <Link
                    to={`/admin/roles/update/${item._id}`}
                    className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => {
                      handleDeleteRole(item._id);
                    }}
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Roles;
