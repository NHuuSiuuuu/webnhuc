import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowsRotate,
  faImage,
  faInfo,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "@/utils/price";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ShippingMethod() {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  /* =======================
    Load shipping method
  =======================*/
  const fetchShippingMethod = async ({ queryKey }) => {
    const [, page, sort, filter] = queryKey;
    let url = `http://localhost:3001/api/shipping-method/index?page=${page}`;

    if (filter) url += `&filter=status:${filter}`;
    if (sort) url += `&sort=${sort}`;

    const shippingMethodData = await axios.get(url);
    return shippingMethodData.data;
  };
  const handleStatusFilter = (e) => {
    setFilter(e.target.value);
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["shipping-method", page, sort, filter],
    queryFn: fetchShippingMethod,
  });
  const { mutate: removeSM } = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(
        `http://localhost:3001/api/shipping-method/delete/${id}`,
      );
    },
    onSuccess: () => {
      toast.success("Xóa phương thức vận chuyển thành công!");

      queryClient.invalidateQueries(["ShippingMethod"]);
    },
  });
  const handleRemoveShippingMethod = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1D4ED8",
    }).then((result) => {
      if (result.isConfirmed) {
        removeSM(id);
      }
    });
  };
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  if (isError)
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
  console.log(data);
  return (
    <div className="min-h-screen p-4 bg-gray-50 md:p-6">
      {/* Bộ lọc trạng thái */}
      <div>
        <div className="mb-8">
          <div className="flex justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Quản lý phương thức vận chuyển
              </h1>
              <p className="mt-1 text-gray-600">
                Tổng sphương thức vận chuyển:{" "}
                <span className="font-semibold">{data?.total || 0}</span>
              </p>
            </div>

            <Link to="/admin/shipping-method/create">
              <div className="relative inline-flex items-center justify-center h-12 px-6 overflow-hidden font-medium duration-500 rounded-md group bg-gradient-to-r from-blue-600 to-blue-800 text-neutral-200">
                <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                  Thêm phương thức vận chuyển
                </div>
                <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
            </Link>
          </div>
        </div>
        {/* Filter Section */}
        <div className="p-6 mb-8 bg-white border border-gray-200 shadow-sm ">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Status Filter */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Trạng thái hoạt động
              </label>
              <select
                value={filter}
                onChange={handleStatusFilter}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Dừng hoạt động</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Sắp xếp theo
              </label>
              <select
                value={sort}
                onChange={handleSort}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="">Mặc định</option>
                <option value="name:asc">Tên: A → Z</option>
                <option value="name:desc">Tên: Z → A</option>
                <option value="fee:desc">Phí vận chuyển: Cao → Thấp</option>
                <option value="fee:asc">Phí vận chuyển: Thấp → Cao</option>
                <option value="freeThreshold:asc">
                  Ngưỡng phí: Thấp → Cao
                </option>
                <option value="freeThreshold:desc">
                  Ngưỡng phí: Cao → Thấp
                </option>
              </select>
            </div>

            {/* Reset Bộ Lọc */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilter("");
                  setSort("");
                }}
                className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faArrowsRotate}
                    className="mx-[5px] text-[16px]"
                  />
                  Xóa bộ lọc
                </div>
              </button>
            </div>
          </div>

          {/* Hiển thị trạng thái lọc hiện tại */}
          {(filter || sort) && (
            <div className="pt-6 mt-6 border-t border-gray-200">
              <h3 className="mb-3 text-sm font-medium text-gray-700">
                Bộ lọc đang áp dụng:
              </h3>
              <div className="flex flex-wrap gap-2">
                {filter && (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                    Trạng thái:{" "}
                    {filter === "active" ? "Đang hoạt động" : "Dừng hoạt động"}
                    <button
                      onClick={() => setFilter("")}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}

                {sort && (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                    Sắp xếp: {sort.includes("price") ? "Giá" : "Tên"}{" "}
                    {sort.includes("asc") ? "↑" : "↓"}
                    <button
                      onClick={() => setSort("")}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {data.data.length === 0 ? (
        <div>
          <h1 className="font-medium text-center text-red-500 text-[20px]">
            Không có phương thức vận chuyển nào
          </h1>
        </div>
      ) : (
        <>
          <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                    >
                      STT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                    >
                      Hình ảnh
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                    >
                      Tên hiển thị
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                    >
                      Mô tả
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                    >
                      Thời gian giao hàng dự kiến
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                    >
                      Phí vận chuyển
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                    >
                      Trạng thái hoạt động
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                    >
                      Hành động
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {data.data?.map((item, index) => (
                    <tr key={item._id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">
                        {(page - 1) * data.limit + index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex-shrink-0 w-12 h-12">
                          {item?.thumbnail?.[0] ? (
                            <img
                              className="object-cover w-12 h-12 border rounded-lg"
                              src={item.thumbnail[0]}
                              alt={item.title}
                            />
                          ) : (
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-lg">
                              <FontAwesomeIcon
                                icon={faImage}
                                className="w-6 h-6 text-gray-400"
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{item.name}</td>
                      <td className="px-6 py-4 text-sm">
                        {item.description || "Không có mô tả"}
                      </td>
                      <td className="px-6 py-4 text-sm">{item.deliveryTime}</td>
                      <td className="px-6 py-4 text-sm">
                        {formatPrice(item.fee)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center  text-center px-3 py-1 rounded-full text-sm font-medium ${
                            item.status === "active"
                              ? "bg-green-100  text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status === "active"
                            ? "Hoạt động"
                            : "Dừng hoạt động"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/shipping-method/update/${item._id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-50 transition"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            Sửa
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleRemoveShippingMethod(item._id)}
                            className="inline-flex items-center px-3 py-1.5 border border-red-300 text-red-700 text-sm font-medium rounded-lg hover:bg-red-50 transition"
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                            Xóa
                          </button>
                          <Link
                            to={`/admin/shipping-method/detail/${item._id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                          >
                            <FontAwesomeIcon
                              icon={faInfo}
                              className="text-[7px] p-1 border rounded-[100%] mr-1"
                            />
                            Chi tiết
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 1}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium ${page === 1 ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-gray-700 bg-white hover:bg-gray-50 border-gray-300"}`}
                >
                  Trước
                </button>
                <span className="px-3 py-2 text-sm text-gray-700">
                  Trang <span className="font-medium">{page}</span>
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === data.totalPage}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium ${page === data.totalPage ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-gray-700 bg-white hover:bg-gray-50 border-gray-300"}`}
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShippingMethod;
