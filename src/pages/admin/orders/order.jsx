import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faEye,
  faEdit,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faSort,
  faDownload,
  faPrint,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Orders() {
  const [selecstedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3001/api/order/index`);
      return data;
    },
  });
  console.log(orders);

  const statusColors = {
    pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "Chờ xác nhận",
    },
    confirmed: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      label: "Đã xác nhận",
    },
    shipping: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      label: "Đang giao",
    },
    delivered: { bg: "bg-green-100", text: "text-green-800", label: "Đã giao" },
    cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Đã hủy" },
  };

  const paymentStatusColors = {
    paid: {
      bg: "bg-green-100",
      text: "text-green-800",
      label: "Đã thanh toán",
    },
    unpaid: {
      bg: "bg-red-100",
      text: "text-red-800",
      label: "Chưa thanh toán",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Orders Table */}
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow">
        {/* Table Header với filter */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Danh sách đơn hàng
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Tổng:{" "}
                <span className="font-semibold">{orders?.orders?.length}</span>{" "}
                đơn
              </span>
            </div>
          </div>
        </div>

        {/* Bảng */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  <div className="flex items-center gap-1 cursor-pointer group hover:text-gray-700">
                    Mã đơn
                    <FontAwesomeIcon
                      icon={faSort}
                      className="text-xs text-gray-400 group-hover:text-gray-600"
                    />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Khách hàng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Ngày đặt
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Sản phẩm
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Tổng tiền
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Trạng thái
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Thanh toán
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders?.orders?.map((order, index) => (
                <tr
                  key={order.id}
                  className={`hover:bg-gray-50 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  {/* Mã đơn */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800">
                      #{order._id.slice(-8).toUpperCase()}
                    </span>
                  </td>

                  {/* Khách hàng */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-medium text-white rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                        {order.customer.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {order.customer.fullName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.customer.phone}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Ngày đặt */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString("vi-VN")}
                    </div>
                  </td>

                  {/* Sản phẩm */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {order?.items?.length} sản phẩm
                    </div>
                    <div className="text-xs text-gray-500 space-y-0.5 mt-1">
                      {order?.items?.map((item, idx) => (
                        <div key={idx} className="truncate max-w-[200px]">
                          {item.product_id.title}
                        </div>
                      ))}
                      {order?.items?.length > 2 && (
                        <div className="text-gray-400">
                          + {order.items.length - 2} sản phẩm khác
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Tổng tiền */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {order.totalPrice?.toLocaleString("vi-VN")}đ
                    </span>
                  </td>

                  {/* Trạng thái đơn hàng */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`
                            inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                              ${order.orderStatus === "pending" && "bg-yellow-100 text-yellow-800"}
                              ${order.orderStatus === "confirmed" && "bg-blue-100 text-blue-800"}
                              ${order.orderStatus === "shipping" && "bg-purple-100 text-purple-800"}
                              ${order.orderStatus === "delivered" && "bg-green-100 text-green-800"}
                              ${order.orderStatus === "cancelled" && "bg-red-100 text-red-800"}
                              `}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5
                          ${order.orderStatus === "pending" && "bg-yellow-500"}
                          ${order.orderStatus === "confirmed" && "bg-blue-500"}
                          ${order.orderStatus === "shipping" && "bg-purple-500"}
                          ${order.orderStatus === "delivered" && "bg-green-500"}
                          ${order.orderStatus === "cancelled" && "bg-red-500"}
                        `}
                      ></span>
                      {order.orderStatus === "pending" && "Chờ xác nhận"}
                      {order.orderStatus === "confirmed" && "Đã xác nhận"}
                      {order.orderStatus === "shipping" && "Đang giao"}
                      {order.orderStatus === "delivered" && "Đã giao"}
                      {order.orderStatus === "cancelled" && "Đã hủy"}
                    </span>
                  </td>

                  {/* Thanh toán */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`
                inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                ${order.paymentMethod === "COD" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"}
              `}
                    >
                      {order.paymentMethod === "COD"
                        ? "💵 COD"
                        : "💳 Chuyển khoản"}
                    </span>
                    <p className="mt-1 text-xs text-gray-500">
                      {order.paymentStatus === "paid"
                        ? "Đã thanh toán"
                        : "Chưa thanh toán"}
                    </p>
                  </td>

                  {/* Thao tác */}
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <button
                        className="text-blue-600 transition-colors hover:text-blue-900"
                        title="Xem chi tiết"
                      >
                        <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600 transition-colors hover:text-green-900"
                        title="Sửa"
                      >
                        <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 transition-colors hover:text-red-900"
                        title="Xóa"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {(!orders?.orders || orders.orders.length === 0) && (
          <div className="py-12 text-center">
            <div className="mb-3 text-gray-400">
              {/* <FontAwesomeIcon icon={faPackage} className="w-12 h-12" /> */}
            </div>
            <h3 className="mb-1 text-sm font-medium text-gray-900">
              Chưa có đơn hàng
            </h3>
            <p className="text-sm text-gray-500">
              Đơn hàng sẽ xuất hiện tại đây
            </p>
          </div>
        )}

        {/* Pagination */}
        {/* {orders?.orders && orders.orders.length > 0 && (
          <div className="px-6 py-4 bg-white border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-medium">1</span> đến{" "}
                <span className="font-medium">
                  {Math.min(10, orders.orders.length)}
                </span>{" "}
                trong{" "}
                <span className="font-medium">{orders.orders.length}</span> đơn
                hàng
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  disabled
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
                </button>
                <span className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md">
                  1
                </span>
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Orders;
