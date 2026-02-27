import { formatPrice } from "@/utils/price";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronRight, Package, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

function OrderTracking() {
  const [mounted, setMounted] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [formData, setFormData] = useState({ phone: "", orderId: "" });
  const [errorTracking, setErrorTracking] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate();
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ["orderTracking"],
    mutationFn: async (payload) => {
      return await axios.post(
        `http://localhost:3001/api/order/tracking`,
        payload,
      );
    },
    onSuccess: (res) => {
      console.log(res.data);
      setErrorTracking(null);
      setSearchResult(res.data.data.order);
    },
    onError: (error) => {
      console.log(error.response.data.message);
      setErrorTracking(error.response.data.message);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setMounted(true), 50);
  }, []);
  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchResult(null);
    mutate(formData);
  };
  const handleOrderDetail = (id) => {
    console.log(id);
    navigate(`/orders/detail/${id}`);
  };
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
  console.log(searchResult);
  return (
    <div className="min-h-screen bg-[#faf8f6] overflow-hidden">
      <div
        className={`max-w-4xl mx-auto px-8 transition-all duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        {/* Hero Section */}
        <div className="pt-24 pb-16 text-center">
          {/* Icon */}
          <div className="relative inline-block mb-12">
            <div className="absolute inset-0 bg-[#a47b67] opacity-10 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative w-24 h-24 border-2 border-[#a47b67] rounded-full flex items-center justify-center bg-white shadow-sm">
              <Search className="w-10 h-10 text-[#a47b67]" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-5 h-5 text-[#d4a574] animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl font-light tracking-[-0.02em] mb-6 text-[#2d2520]">
            Tra cứu đơn hàng
          </h1>

          <p className="text-[#6b5446] leading-loose max-w-lg mx-auto font-light text-base">
            Theo dõi hành trình của đơn hàng
            <br />
            Nhập thông tin để kiểm tra trạng thái
          </p>
        </div>

        {/* Form tìm kiế<m></m> */}
        <div className="max-w-2xl mx-auto mb-24">
          <form
            // onSubmit={handleSearch}
            className="bg-white border-2 border-[#e8dfd7] shadow-sm"
          >
            <div className="p-12">
              {/* Order ID Input */}
              <div className="mb-10">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-6 font-semibold">
                  Mã đơn hàng
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="orderId"
                    onChange={(e) => handleOnChange(e)}
                    onFocus={() => setFocusedInput("orderId")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Nhập mã đơn hàng của bạn"
                    className="w-full px-0 py-5 border-0 border-b-2 border-[#e8dfd7] focus:border-[#a47b67] outline-none transition-all duration-500 text-lg font-light text-[#2d2520] bg-transparent placeholder:text-[#c4b5a7] tracking-wide"
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#a47b67] transition-all duration-500 ${focusedInput === "orderId" ? "w-full" : "w-0"}`}
                  ></div>
                </div>
              </div>

              {/*  Vận chuyển */}
              <div className="relative py-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#e8dfd7]"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-8 text-[10px] text-[#8b6f5f] uppercase tracking-[0.3em] font-medium">
                    Hoặc tra cứu bằng
                  </span>
                </div>
              </div>

              {/* Phone Input */}
              <div className="mb-12">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-6 font-semibold">
                  Số điện thoại
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    onChange={(e) => handleOnChange(e)}
                    onFocus={() => setFocusedInput("phone")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Nhập số điện thoại đặt hàng"
                    className="w-full px-0 py-5 border-0 border-b-2 border-[#e8dfd7] focus:border-[#a47b67] outline-none transition-all duration-500 text-lg font-light text-[#2d2520] bg-transparent placeholder:text-[#c4b5a7] tracking-wide"
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#a47b67] transition-all duration-500 ${focusedInput === "phone" ? "w-full" : "w-0"}`}
                  ></div>
                </div>
              </div>

              {/* Error Message */}
              {errorTracking && (
                <div className="px-6 py-4 mb-8 text-center border-l-2 border-rose-400 bg-rose-50">
                  <p className="text-sm font-medium tracking-wide text-rose-800">
                    {errorTracking}
                  </p>
                </div>
              )}

              {/*  Submit Button */}
              <button
                onClick={handleSubmit}
                className="relative w-full py-5 bg-[#a47b67] text-white text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-[#8b6f5f] transition-all duration-500 
                disabled:bg-[#d4c4b8] disabled:cursor-not-allowed group overflow-hidden"
              >
                {isPending ? (
                  <span className="relative z-10">Tra cứu ngay</span>
                ) : (
                  <span className="relative z-10">Đang tìm kiếm</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#8b6f5f] to-[#a46792] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </div>
          </form>
        </div>

        {/* Kết quả tìm kiếm */}
        {searchResult && (
          <div>
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 border-2 border-emerald-200 bg-emerald-50 text-emerald-900">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">
                  Tìm thấy {searchResult.length} đơn hàng
                </span>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {searchResult.map((order, index) => (
                <div
                  key={order._id}
                  className="bg-white border-2 border-[#e8dfd7] hover:border-[#a47b67] hover:shadow-xl 
                  transition-all duration-500 group cursor-pointer overflow-hidden"
                >
                  <div className="p-10">
                    {/* Order Header */}
                    <div className="flex items-start justify-between mb-8 pb-8 border-b border-[#f5ede6]">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-3 font-semibold">
                          Đơn hàng
                        </p>
                        <p className="font-mono text-sm text-[#2d2520] tracking-wide font-medium">
                          {order._id}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] uppercase tracking-[0.25em] font-semibold`}
                        >
                          {/* .at(-1) láy phần tử cuối*/}
                          {getStatusText(order?.orderTimeLine.at(-1)?.status)}
                        </span>
                      </div>
                    </div>

                    {/* Chi tiết đơn hàng*/}
                    <div className="grid grid-cols-3 gap-8 mb-8">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8b6f5f] mb-3 font-semibold">
                          Ngày đặt
                        </p>
                        <p className="font-light text-[#2d2520] tracking-wide">
                          {new Date(order.createdAt).toLocaleDateString()}
                          <br />
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8b6f5f] mb-3 font-semibold">
                          Sản phẩm
                        </p>
                        <p className="font-light text-[#2d2520] tracking-wide">
                          {order.totalQuantity} sp
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8b6f5f] mb-3 font-semibold">
                          Tổng tiền
                        </p>
                        <p className="font-light text-[#2d2520] tracking-wide">
                          {formatPrice(order.finalPrice)}
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => handleOrderDetail(order._id)}
                      className="flex items-center justify-end gap-3 text-sm group-hover:gap-4 transition-all duration-300 pt-6 border-t border-[#f5ede6]"
                    >
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#8b6f5f] group-hover:text-[#a47b67] transition-colors font-semibold">
                        Xem chi tiết
                      </span>
                      <ChevronRight
                        className="w-4 h-4 text-[#8b6f5f] "
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* Hover gradient effect */}
                  <div className="h-1 bg-gradient-to-r from-[#a47b67] via-[#c4a889] to-[#a47b67] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hỗ trợ */}
        <div className="py-24 border-t-2 border-[#e8dfd7]">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#8b6f5f] mb-8 font-semibold">
              Hỗ trợ khách hàng
            </h3>
            <p className="text-[#6b5446] mb-12 font-light leading-loose text-lg">
              Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn
              <br />
              trong việc tra cứu và theo dõi đơn hàng
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/support"
                className="group relative px-10 py-4 border-2 border-[#a47b67] overflow-hidden"
              >
                <span className="relative z-10 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#a47b67] group-hover:text-white transition-colors duration-500">
                  Liên hệ hỗ trợ
                </span>
                <div className="absolute inset-0 bg-[#a47b67] transform translate-y-full  group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>
              <Link
                to="/faq"
                className="px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8b6f5f] hover:text-[#a47b67] transition-colors underline-offset-8 hover:underline"
              >
                Câu hỏi thường gặp
              </Link>
            </div>
          </div>
        </div>

        {/*Info Cards */}
        <div className="grid gap-6 pb-24 md:grid-cols-3">
          <div className="group bg-white border-2 border-[#e8dfd7] p-10 text-center hover:border-[#a47b67] transition-all duration-500">
            <div className="w-12 h-12 mx-auto mb-6 border-2 border-[#a47b67] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Package className="w-6 h-6 text-[#a47b67]" strokeWidth={1.5} />
            </div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-4 font-semibold">
              Theo dõi realtime
            </h4>
            <p className="text-xs text-[#6b5446] font-light leading-relaxed">
              Cập nhật trạng thái
              <br />
              liên tục
            </p>
          </div>

          <div className="group bg-white border-2 border-[#e8dfd7] p-10 text-center hover:border-[#a47b67] transition-all duration-500">
            <div className="w-12 h-12 mx-auto mb-6 text-3xl transition-transform duration-500 group-hover:scale-110">
              📦
            </div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-4 font-semibold">
              Giao hàng express
            </h4>
            <p className="text-xs text-[#6b5446] font-light leading-relaxed">
              Nhanh chóng
              <br />
              trong 3-5 ngày
            </p>
          </div>

          <div className="group bg-white border-2 border-[#e8dfd7] p-10 text-center hover:border-[#a47b67] transition-all duration-500">
            <div className="w-12 h-12 mx-auto mb-6 text-3xl transition-transform duration-500 group-hover:scale-110">
              💳
            </div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-4 font-semibold">
              Thanh toán linh hoạt
            </h4>
            <p className="text-xs text-[#6b5446] font-light leading-relaxed">
              COD hoặc
              <br />
              chuyển khoản
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTracking;
