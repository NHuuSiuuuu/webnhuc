import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatPrice } from "@/utils/price";
import { toast } from "react-toastify";
import { Slide, ToastContainer } from "react-toastify";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function OrderDetail() {
  const { id } = useParams();
  const [mounted, setMounted] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setMounted(true), 50);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3001/api/order/success/${id}`,
      );
      return data;
    },
  });

  // Hủy đơn hàng
  const { mutate } = useMutation({
    mutationFn: async () =>
      await axios.post(`http://localhost:3001/api/order/cancel/${id}`),

    onSuccess: () => {
      toast.success("Hủy đơn hàng thành công");
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-[#a47b67] rounded-full animate-spin"></div>
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
  const isCancelled = data?.order.orderStatus;
  const isPayloadStatus = data?.order.paymentStatus;
  console.log("isCancelled", isCancelled);

  const handleCancelOrder = (e) => {
    e.preventDefault();
    const canCancel = isCancelled === "pending" || isCancelled === "confirmed";
    if (!canCancel) return;

    setShowCancelModal(true);
  };

  const orderSteps =
    isCancelled === "cancelled"
      ? [
          {
            status: "pending",
            title: "Đơn hàng đã đặt",
            message: "Đơn hàng của bạn đã được tiếp nhận",
          },
          {
            status: "cancelled",
            title: "Đơn hàng đã hủy",
            message: "Đơn hàng đã bị hủy",
          },
          ...(isPayloadStatus === "refund_pending"
            ? [
                {
                  status: "refund_pending",
                  title: "Đang chờ hoàn tiền",
                  message:
                    "Chúng tôi đang xử lý hoàn tiền về tài khoản của bạn",
                },
              ]
            : isPayloadStatus === "refunded"
              ? [
                  {
                    status: "refunded",
                    title: "Đã hoàn tiền",
                    message:
                      "Chúng tôi đã liên hệ và hoàn tiền về tài khoản của bạn",
                  },
                ]
              : []),
        ]
      : [
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
            status: "shipping",
            title: "Đang vận chuyển",
            message: "Đơn hàng đang trên đường giao đến bạn",
          },
          {
            status: "completed",
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
    return colorMap[status];
  };

  return (
    <div className="min-h-screen bg-[rgb(250,248,246)]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      ;{/* Modal xác nhận hủy */}
      <div
        onClick={() => setShowCancelModal(false)}
        className={`${
          showCancelModal ? "opacity-100 visible" : "opacity-0 invisible"
        }  fixed inset-0 z-50 w-full h-full transition-opacity duration-300 `}
        style={{
          backgroundColor: "rgba(45,37,32,0.4)",
          backdropFilter: "blur(4px)",
        }}
      ></div>
      <div
        className={`
            
             ${
               showCancelModal
                 ? "opacity-100 scale-100 "
                 : "opacity-0 scale-95  pointer-events-none"
             }
            w-full fixed z-50 -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2 max-w-md p-10 duration-200 bg-white shadow-2xl `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-8 border border-red-100 bg-red-50">
          <svg
            className="w-5 h-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="mb-10 text-center">
          <h3 className="mb-3 text-lg  tracking-tight text-[#2d2520]">
            Xác nhận hủy đơn hàng
          </h3>
          <p className="text-[14px] leading-relaxed tracking-wide text-[#8b6f5f]">
            Đơn hàng <span className="font-mono text-[#2d2520]">#{id}</span> sẽ
            bị hủy vĩnh viễn.
            <br />
            Hành động này không thể hoàn tác.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowCancelModal(false)}
            className="flex-1 py-3 text-[14px] font-medium tracking-widest uppercase border border-[#e8dfd7] text-[#8b6f5f] hover:border-[#2d2520] hover:text-[#2d2520] transition-all duration-300"
          >
            Giữ đơn
          </button>
          <button
            onClick={() => {
              setShowCancelModal(false);
              mutate();
            }}
            className="flex-1 py-3 text-[14px] font-medium tracking-widest uppercase bg-[#2d2520] text-white hover:bg-red-700 transition-all duration-500"
          >
            Xác nhận hủy
          </button>
        </div>
      </div>
      {/* Header */}
      <div className="border-b border-[#e8dfd7]">
        <div className="max-w-5xl px-6 py-6 mx-auto">
          <Link
            to={-1}
            className="inline-flex items-center gap-2 mb-4 text-sm text-gray-700 transition-colors hover:text-[#2d2520]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại </span>
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-2xl  tracking-tight text-[#2d2520]">
                Chi Tiết Đơn Hàng
              </h1>
              <p className="font-mono text-sm  text-[#8b6f5f]">#{id}</p>
            </div>

            <div
              className={`px-4 py-2 border ${getStatusColor(data?.order.orderStatus)} text-sm  uppercase tracking-widest font-medium`}
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
              <h2 className="mb-8 text-sm  tracking-widest text-[#8b6f5f] uppercase">
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
                              className={` text-base text-[#2d2520]
                                
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
                              <span className="text-sm  text-[#8b6f5f]">
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
                          <p className="text-sm  text-[#8b6f5f]">
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
              <h2 className="mb-8 text-sm  tracking-widest text-[#8b6f5f] uppercase">
                Sản Phẩm
              </h2>

              <div className="space-y-8">
                {data?.order.items.map((product) => {
                  const size = product.product_id.sizes.find(
                    (s) => s._id === product.size_id,
                  );
                  return (
                    <div key={product._id} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-24 h-24 overflow-hidden bg-[#f5ede6]">
                        <img
                          src={product?.product_id.thumbnail[0]}
                          alt={product?.product_id.title}
                          className="object-cover w-full h-full transition-all duration-500 grayscale group-hover:grayscale-0"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <h3 className="mb-1 text-base  tracking-tight text-[#2d2520]">
                            {product?.product_id.title}
                          </h3>
                          <p className="text-sm  tracking-wide text-[#8b6f5f]">
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
                <h2 className="mb-6 text-sm  tracking-widest text-[#8b6f5f] uppercase">
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
                    <p className=" text-[#2d2520]">
                      {data?.order.customer.fullName}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone
                      className="w-5 h-5 text-[#a47b67]"
                      strokeWidth={1.5}
                    />
                    <p className="text-[#6b5446] ">
                      {data?.order.customer.phone}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail
                      className="w-5 h-5 text-[#a47b67]"
                      strokeWidth={1.5}
                    />
                    <p className="text-[#6b5446] ">
                      {data?.order.customer.email}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-6 text-sm  tracking-widest text-[#8b6f5f] uppercase">
                  Địa Chỉ Giao Hàng
                </h2>
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 text-[#a47b67] flex-shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <p className=" leading-relaxed text-[#6b5446] text-sm">
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
                  <span className=" text-[#2d2520]">
                    {data?.order.paymentMethod === "cod"
                      ? "Thanh toán khi nhận hàng"
                      : "💳 Thanh toán ngân hàng"}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-6 font-semibold">
                  Dự Kiến Giao Hàng
                </h2>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-[#a47b67]" strokeWidth={1.5} />
                  <span className=" text-[#2d2520]">null</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Order Summary */}
              <div className="bg-white border border-[#e8dfd7]">
                <div className="p-8">
                  <h2 className="mb-8 text-[16px]  tracking-widest text-[#8b6f5f] uppercase">
                    Tóm Tắt Đơn Hàng
                  </h2>

                  <div className="mb-8 space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#8b6f5f]">Ngày đặt</span>
                      <span className=" text-[#2d2520]">
                        {new Date(data?.order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8b6f5f]">Giờ đặt</span>
                      <span className=" text-[#2d2520]">
                        {new Date(data?.order.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-8 space-y-4 text-sm">
                    <div className="flex justify-between ">
                      <span className="text-[#8b6f5f]">Tạm tính</span>
                      <span className="text-[#2d2520]">
                        {formatPrice(data?.order.totalPrice)}
                      </span>
                    </div>

                    <div className="flex justify-between ">
                      <span className="text-[#8b6f5f]">Phí vận chuyển</span>
                      <span className="text-[#2d2520]">
                        {formatPrice(data?.order.shippingFee)}
                      </span>
                    </div>

                    {/* {order.discount > 0 && ( */}
                    <div className="flex justify-between ">
                      <span className="text-[#8b6f5f]">Giảm giá</span>
                      <span className="text-[#2d2520]">{formatPrice(0)}</span>
                    </div>
                    {/* )} */}

                    <div className="flex justify-between pt-4 border-t border-[#a47b67]">
                      <span className="text-sm  tracking-widest text-[#2d2520] uppercase">
                        Tổng Cộng
                      </span>
                      <span className="text-lg  text-[#2d2520]">
                        {formatPrice(data?.order.finalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Link
                      to="/"
                      className="block w-full py-3 text-center transition-all duration-300 border border-black up percase trackintext-smg-widest font-smmedium text- hover:bg-black hover:text-white"
                    >
                      Về Trang Chủ
                    </Link>

                    {/* Khi có status nhận được hành rồi mới được đánh giá */}
                    <button
                      disabled={
                        isCancelled !== "confirmed" && isCancelled !== "pending"
                      }
                      onClick={handleCancelOrder}
                      className={`${isCancelled !== "confirmed" && isCancelled !== "pending" ? "cursor-not-allowed  bg-gray-400" : "hover:bg-gray-800"} block w-full py-3 text-sm  font-medium tracking-widest text-center text-white uppercase transition-all duration-300 bg-black `}
                    >
                      Hủy đơn hàng
                    </button>
                    {/* <button className="block w-full py-3 text-center uppercase transition-all duration-300 bg-black te xt-white trackintext-smg-widest font-smmedium text- hover:bg-gray-800">
                      Đánh Giá Sản Phẩm
                    </button> */}
                  </div>
                </div>
              </div>

              {/* Help Box */}
              <div className="p-6 border border-[#e8dfd7] bg-gray-50">
                <h3 className="mb-4 text-sm  tracking-widest text-[#8b6f5f] uppercase">
                  Cần Hỗ Trợ?
                </h3>
                <p className="mb-4 text-grtext-sm ay-700 leadismng-relaxed text-">
                  Nếu bạn có bất kỳ thắc mắc nào về đơn hàng, vui lòng liên hệ
                  với chúng tôi.
                </p>
                <Link
                  to="/support"
                  className="text-sm   text-[#2d2520] underline hover:no-underline"
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
