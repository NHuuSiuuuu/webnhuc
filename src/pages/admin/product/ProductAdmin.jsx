import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faCircleExclamation,
  faImage,
  faInfo,
  faPenToSquare,
  faPlus,
  faStar,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ProductAdmin() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);
  /* =======================
    API danh sách product
  =======================*/
  const fetchApi = async ({ queryKey }) => {
    // Lấy dữ liệu từ queryKey của ReactQuery ra để dùng
    const [, page, sort, filter, statusFilter] = queryKey;
    let url = `http://localhost:3001/api/product/products?page=${page}`;

    // 2 thằng này dùng find để tìm bên database chứ không dùng hàm filter
    if (statusFilter) url += `&filter=status:${statusFilter}`;
    if (filter) url += `&filter=featured:${filter}`;

    if (sort) url += `&sort=${sort}`;

    const res = await axios.get(url);
    return res.data;
  };

  /* =======================
    API categories
  =======================*/
  const fetchCategories = async () => {
    const res = await axios.post(
      `http://localhost:3001/api/category-product/productCategories`,
    );
    return res.data.productCategories;
  };

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  console.log("categories", categories);

  /* =======================
    Load product
  =======================*/
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, sort, filter, statusFilter],
    queryFn: fetchApi,
  });

  /* =======================
    API xóa product
  =======================*/
  const deleteProduct = async (id) => {
    const res = await axios.patch(
      `http://localhost:3001/api/product/delete/${id}`,
    );
    return res.data;
  };

  /* =======================
    Mutation delete
  =======================*/
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Xóa sản phẩm thành công!");
      queryClient.invalidateQueries(["products"]);
    },
  });

  /* =======================
    Hàm xóa product
  =======================*/
  const handleRemoveProduct = (id) => {
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
        deleteMutation.mutate(id);
      }
    });
  };

  /* =======================
    Hàm lọc trạng thái
  =======================*/
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    console.log(e.target.value);
  };
  /* =======================
    Hàm lọc trạng thái nổi bật
  =======================*/
  const handleFeaturedFilter = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
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
  // console.log("data", data);
  const categoryMap = {};

  categories.forEach((cat) => {
    categoryMap[cat._id] = cat.title;
  });

  return (
    <div className="min-h-screen p-4 bg-gray-50 md:p-6">
      {/* Bộ lọc trạng thái */}
      <div>
        <div className="mb-8">
          <div className="flex justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Quản lý sản phẩm
              </h1>
              <p className="mt-1 text-gray-600">
                Tổng số sản phẩm:{" "}
                <span className="font-semibold">{data?.total || 0}</span>
              </p>
            </div>

            <Link to="/admin/product/create">
              <div className="relative inline-flex items-center justify-center h-12 px-6 overflow-hidden font-medium duration-500 rounded-md group bg-gradient-to-r from-blue-600 to-blue-800 text-neutral-200">
                <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                  Thêm sản phẩm
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
                value={statusFilter}
                onChange={handleStatusFilter}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Dừng hoạt động</option>
              </select>
            </div>

            {/* Featured Filter */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Sản phẩm nổi bật
              </label>
              <select
                value={filter}
                onChange={handleFeaturedFilter}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="">Tất cả</option>
                <option value="1">Nổi bật</option>
                <option value="0">Không nổi bật</option>
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
                <option value="title:asc">Tên: A → Z</option>
                <option value="title:desc">Tên: Z → A</option>
                <option value="price:desc">Giá: Cao → Thấp</option>
                <option value="price:asc">Giá: Thấp → Cao</option>
                <option value="position:asc">Vị trí: Thấp → Cao</option>
                <option value="position:desc">Vị trí: Cao → Thấp</option>
              </select>
            </div>

            {/* Reset Bộ Lọc */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilter("");
                  setSort("");
                  setStatusFilter("");
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
          {(statusFilter || filter || sort) && (
            <div className="pt-6 mt-6 border-t border-gray-200">
              <h3 className="mb-3 text-sm font-medium text-gray-700">
                Bộ lọc đang áp dụng:
              </h3>
              <div className="flex flex-wrap gap-2">
                {statusFilter && (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                    Trạng thái:{" "}
                    {statusFilter === "active"
                      ? "Đang hoạt động"
                      : "Dừng hoạt động"}
                    <button
                      onClick={() => setStatusFilter("")}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filter && (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-purple-800 bg-purple-100 rounded-full">
                    Nổi bật: {filter === "1" ? "Có" : "Không"}
                    <button
                      onClick={() => setFilter("")}
                      className="ml-2 text-purple-600 hover:text-purple-800"
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

      {/* Products Table */}
      {data.products.length === 0 ? (
        <div>
          <h1 className="font-medium text-center text-red-500 text-[20px]">
            Không có sản phẩm nào{" "}
          </h1>
        </div>
      ) : (
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                  >
                    Sản phẩm
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                  >
                    Danh mục
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                  >
                    Giá
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                  >
                    Tồn kho
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                  >
                    Trạng thái
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase"
                  >
                    Người tạo
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
                {data.products.map((item) => (
                  <tr key={item._id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
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
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.title}
                          </div>
                          <div className="max-w-xs text-sm text-gray-500 truncate">
                            {item.description || "Không có mô tả"}
                          </div>
                          <div className="flex items-center mt-1">
                            {item.featured === "1" && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                <FontAwesomeIcon icon={faStar} />
                                Nổi bật
                              </span>
                            )}
                            <span className="ml-2 text-xs text-gray-500">
                              Vị trí: {item.position || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {item.category_id
                          ? categoryMap[item.category_id]
                          : "Không có danh mục"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)}
                      </div>
                      {item.discountPercentage > 0 && (
                        <div className="text-sm text-red-600">
                          -{item.discountPercentage}%
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`text-sm font-medium ${item.stock > 10 ? "text-green-600" : item.stock > 0 ? "text-yellow-600" : "text-red-600"}`}
                      >
                        {item.stock} sản phẩm
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${item.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {item.status === "active" ? (
                          <>
                            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                            Hoạt động
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 mr-2 bg-red-500 rounded-full"></span>
                            Dừng hoạt động
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {item.createBy?.account_id?.fullName ||
                          "Không xác định"}
                      </div>

                      <div className="text-xs text-gray-500">
                        {new Date(item?.createBy?.createdAt).toLocaleString(
                          "vi-VN",
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/product/update/${item._id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-50 transition"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                          Sửa
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(item._id)}
                          className="inline-flex items-center px-3 py-1.5 border border-red-300 text-red-700 text-sm font-medium rounded-lg hover:bg-red-50 transition"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                          Xóa
                        </button>
                        <Link
                          to={`/admin/product/detail/${item._id}`}
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

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium ${page === 0 ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-gray-700 bg-white hover:bg-gray-50 border-gray-300"}`}
                >
                  Trước
                </button>
                <span className="px-3 py-2 text-sm text-gray-700">
                  Trang <span className="font-medium">{page + 1}</span>
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page + 1 === data.totalPage}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium ${page + 1 === data.totalPage ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-gray-700 bg-white hover:bg-gray-50 border-gray-300"}`}
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductAdmin;
