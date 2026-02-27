import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "@/utils/price";

function OrderDetail() {
  const { id } = useParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setMounted(true), 50);
  }, []);

  const { data } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3001/api/order/success/${id}`,
      );
      return data;
    },
  });
  console.log(data);

  // Dữ liệu mẫu - thay bằng API call thực tế

  const orderSteps = [
    {
      status: "pending",
      title: "Đơn hàng đã đặt",
      message: "Đơn hàng của bạn đã được tiếp nhận",
    },
    {
      status: "confirmed",
      title: "Đã xác nhận",
      message: "Người bán đã xác nhận đơn hàng",
    },
    {
      status: "preparing",
      title: "Đang chuẩn bị hàng",
      message: "Đơn hàng đang được đóng gói",
    },
    {
      status: "shipping",
      title: "Đang vận chuyển",
      message: "Đơn hàng đang trên đường giao đến bạn",
    },
    {
      status: "delivered",
      title: "Đã giao hàng",
      message: "Giao hàng thành công",
    },
  ];

  const getStatusText = (status) => {
    const statusMap = {
      pending: "Chờ xác nhận",
      processing: "Đang xử lý",
      shipping: "Đang vận chuyển",
      delivered: "Đã giao hàng",
      cancelled: "Đã hủy",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      pending: "text-yellow-700 bg-yellow-50 border-yellow-200",
      processing: "text-blue-700 bg-blue-50 border-blue-200",
      shipping: "text-purple-700 bg-purple-50 border-purple-200",
      delivered: "text-green-700 bg-green-50 border-green-200",
      cancelled: "text-red-700 bg-red-50 border-red-200",
    };
    return colorMap[status] || "text-gray-700 bg-gray-50 border-[#e8dfd7]";
  };

  return (
    <div className="min-h-screen bg-[#faf8f6]">
      {/* Header */}
      <div className="border-b border-[#e8dfd7]">
        <div className="max-w-5xl px-6 py-6 mx-auto">
          <Link
            to="/user/orders"
            className="inline-flex items-center gap-2 mb-4 text-sm text-gray-700 transition-colors hover:text-[#2d2520]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại đơn hàng</span>
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-light tracking-tight text-[#2d2520]">
                Chi Tiết Đơn Hàng
              </h1>
              <p className="font-mono text-sm  text-[#8b6f5f]">#{id}</p>
            </div>

            <div
              className={`px-4 py-2 border ${getStatusColor(data?.order.orderStatus)} text-xs uppercase tracking-widest font-medium`}
            >
              {getStatusText(data?.order.orderStatus)}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`max-w-5xl mx-auto px-6 py-16 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-16 lg:col-span-2">
            {/* Order Timeline */}
            <div>
              <h2 className="mb-8 text-xs tracking-widest text-[#8b6f5f] uppercase">
                Trạng Thái Đơn Hàng
              </h2>

              <div className="space-y-8">
                {orderSteps.map((item, index) => {
                  const timeLineItem = data?.order.orderTimeLine.find(
                    (t) => t.status === item.status,
                  );
                  const isDone = !!timeLineItem;
                  return (
                    <div key={index}>
                      {/* // Đơn hàng đã đặt */}
                      <div className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                                  ${
                                    timeLineItem?.status === item.status
                                      ? "border-[#a47b67] bg-[#a47b67]"
                                      : "border-[#e8dfd7] bg-white"
                                  }
                                  )`}
                          >
                            {timeLineItem?.status === item.status ? (
                              <CheckCircle
                                className="w-5 h-5 text-white"
                                strokeWidth={2}
                              />
                            ) : (
                              <div className="w-2 h-2 bg-[#d4c4b8] rounded-full"></div>
                            )}
                          </div>
                          {index < orderSteps.length - 1 && (
                            <div
                              className={`w-0.5 h-16 ${isDone ? "bg-[#a47b67]" : "bg-[#e8dfd7]"} `}
                            ></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-start justify-between mb-2">
                            <h3
                              className={`font-light text-base text-[#2d2520]
                                
                                    ${
                                      timeLineItem?.status === item.status
                                        ? " text-[#2d2520]"
                                        : " text-gray-500"
                                    }
                                
                                `}
                            >
                              {item?.title}
                            </h3>
                            {timeLineItem?.time && (
                              <span className="text-xs text-[#8b6f5f]">
                                {new Date(
                                  timeLineItem?.time,
                                ).toLocaleDateString()}
                                {` - `}
                                {new Date(
                                  timeLineItem?.time,
                                ).toLocaleTimeString("vn-VN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-light text-[#8b6f5f]">
                            {item.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#e8dfd7]"></div>

            {/* Products */}
            <div>
              <h2 className="mb-8 text-xs tracking-widest text-[#8b6f5f] uppercase">
                Sản Phẩm
              </h2>

              <div className="space-y-8">
                {data?.order.items.map((product) => {
                  const size = product.product_id.sizes.find(
                    (s) => s._id === product.size_id,
                  );
                  return (
                    <div key={product.id} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-24 h-24 overflow-hidden bg-[#f5ede6]">
                        <img
                          src={product?.product_id.thumbnail[0]}
                          alt={product?.product_id.title}
                          className="object-cover w-full h-full transition-all duration-500 grayscale group-hover:grayscale-0"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <h3 className="mb-1 text-base font-light tracking-tight text-[#2d2520]">
                            {product?.product_id.title}
                          </h3>
                          <p className="text-xs tracking-wide text-[#8b6f5f]">
                            {size.name}
                          </p>
                        </div>
                        <div className="flex items-end justify-between text-sm">
                          <span className="text-[#8b6f5f]">
                            SL: {product.quantity}
                          </span>
                          <span className=" text-[#2d2520]  font-medium">
                            {formatPrice(product.price * product.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#e8dfd7]"></div>

            {/* Customer Info */}
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-xs tracking-widest text-[#8b6f5f] uppercase">
                  Thông Tin Khách Hàng
                </h2>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-[#a47b67]">
                      <svg
                        className="w-full h-full"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <p className="font-light text-[#2d2520]">
                      {data?.order.customer.fullName}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone
                      className="w-5 h-5 text-[#a47b67]"
                      strokeWidth={1.5}
                    />
                    <p className="text-[#6b5446] font-light">
                      {data?.order.customer.phone}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail
                      className="w-5 h-5 text-[#a47b67]"
                      strokeWidth={1.5}
                    />
                    <p className="text-[#6b5446] font-light">
                      {data?.order.customer.email}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-6 text-xs tracking-widest text-[#8b6f5f] uppercase">
                  Địa Chỉ Giao Hàng
                </h2>
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 text-[#a47b67] flex-shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <p className="font-light leading-relaxed text-[#6b5446] text-sm">
                    {data?.order.customer.address.detail}
                    <br />
                    {data?.order.customer.address.ward}
                    <br />
                    {data?.order.customer.address.district}
                    <br />
                    {data?.order.customer.address.province}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#e8dfd7]"></div>

            {/* Payment & Delivery */}
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-6 font-semibold">
                  Thanh Toán
                </h2>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-2xl">💵</span>
                  <span className="font-light text-[#2d2520]">
                    {data?.order.paymentMethod === "cod"
                      ? "Thanh toán khi nhận hàng"
                      : "Thanh toán ngân hàng"}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-6 font-semibold">
                  Dự Kiến Giao Hàng
                </h2>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-[#a47b67]" strokeWidth={1.5} />
                  <span className="font-light text-[#2d2520]">
                    28 tháng 2, 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky space-y-6 top-8">
              {/* Order Summary */}
              <div className="bg-white border border-[#e8dfd7]">
                <div className="p-8">
                  <h2 className="mb-8 text-xs tracking-widest text-[#8b6f5f] uppercase">
                    Tóm Tắt Đơn Hàng
                  </h2>

                  <div className="mb-8 space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#8b6f5f]">Ngày đặt</span>
                      <span className="font-light text-[#2d2520]">
                        {new Date(data?.order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8b6f5f]">Giờ đặt</span>
                      <span className="font-light text-[#2d2520]">
                        {new Date(data?.order.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-8 space-y-4 text-sm">
                    <div className="flex justify-between font-light">
                      <span className="text-[#8b6f5f]">Tạm tính</span>
                      <span className="text-[#2d2520]">
                        {formatPrice(data?.order.totalPrice)}
                      </span>
                    </div>

                    <div className="flex justify-between font-light">
                      <span className="text-[#8b6f5f]">Phí vận chuyển</span>
                      <span className="text-[#2d2520]">
                        {formatPrice(data?.order.shippingFee)}
                      </span>
                    </div>

                    {/* {order.discount > 0 && ( */}
                      <div className="flex justify-between font-light">
                        <span className="text-[#8b6f5f]">Giảm giá</span>
                        <span className="text-[#2d2520]">{formatPrice(0)}</span>
                      </div>
                    {/* )} */}

                    <div className="flex justify-between pt-4 border-t border-[#a47b67]">
                      <span className="text-xs tracking-widest text-[#2d2520] uppercase">
                        Tổng Cộng
                      </span>
                      <span className="text-lg font-light text-[#2d2520]">
                        {formatPrice(data?.order.finalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Link
                      to="/"
                      className="block w-full py-3 text-xs font-medium tracking-widest text-center uppercase transition-all duration-300 border border-black hover:bg-black hover:text-white"
                    >
                      Về Trang Chủ
                    </Link>

                    {/* Khi có status nhận được hành rồi mới được đánh giá */}
                    <button className="block w-full py-3 text-xs font-medium tracking-widest text-center text-white uppercase transition-all duration-300 bg-black hover:bg-gray-800">
                      Đánh Giá Sản Phẩm
                    </button>
                  </div>
                </div>
              </div>

              {/* Help Box */}
              <div className="p-6 border border-[#e8dfd7] bg-gray-50">
                <h3 className="mb-4 text-xs tracking-widest text-[#8b6f5f] uppercase">
                  Cần Hỗ Trợ?
                </h3>
                <p className="mb-4 text-xs font-light leading-relaxed text-gray-700">
                  Nếu bạn có bất kỳ thắc mắc nào về đơn hàng, vui lòng liên hệ
                  với chúng tôi.
                </p>
                <Link
                  to="/support"
                  className="text-xs font-light text-[#2d2520] underline hover:no-underline"
                >
                  Liên hệ hỗ trợ →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
