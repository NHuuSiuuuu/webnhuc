import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft, Truck, MapPin, Phone, Clock, Package2, CheckCircle, Mail } from "lucide-react";

function OrderDetail() {
  const { orderId } = useParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setMounted(true), 50);
  }, []);

  // Dữ liệu mẫu - thay bằng API call thực tế
  const order = {
    _id: orderId || "699db64b7d642ab48fb7f314",
    orderDate: "25 tháng 2, 2026",
    orderTime: "14:30",
    status: "processing", // pending, processing, shipping, delivered, cancelled
    customer: {
      fullName: "Nguyễn Thị Hương",
      phone: "0987 654 321",
      email: "huongnguyen@email.com",
      address: {
        detail: "123 Lê Hồng Phong",
        ward: "Lộc Hạ",
        district: "TP Nam Định",
        province: "Nam Định",
      },
    },
    products: [
      {
        id: 1,
        name: "Đầm Dự Tiệc Lụa Tơ Tằm Cao Cấp",
        variant: "Đỏ burgundy · Size M",
        quantity: 1,
        price: 450000,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop"
      },
      {
        id: 2,
        name: "Áo Kiểu Voan Hoa Nhí Vintage",
        variant: "Trắng kem · Size S",
        quantity: 2,
        price: 180000,
        image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=200&h=200&fit=crop"
      },
      {
        id: 3,
        name: "Túi Xách Tote Da Thật",
        variant: "Nâu cognac · One Size",
        quantity: 1,
        price: 650000,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop"
      }
    ],
    totalPrice: 1100000,
    shippingFee: 30000,
    discount: 50000,
    finalPrice: 1080000,
    paymentMethod: "Thanh toán khi nhận hàng",
    estimatedDelivery: "28 tháng 2, 2026",
    timeline: [
      { 
        status: "Đơn hàng đã đặt", 
        time: "25/02/2026 - 14:30", 
        completed: true,
        description: "Đơn hàng của bạn đã được tiếp nhận"
      },
      { 
        status: "Đã xác nhận", 
        time: "25/02/2026 - 14:35", 
        completed: true,
        description: "Người bán đã xác nhận đơn hàng"
      },
      { 
        status: "Đang chuẩn bị hàng", 
        time: "", 
        completed: false,
        description: "Đơn hàng đang được đóng gói"
      },
      { 
        status: "Đang vận chuyển", 
        time: "", 
        completed: false,
        description: "Đơn hàng đang trên đường giao đến bạn"
      },
      { 
        status: "Đã giao hàng", 
        time: "", 
        completed: false,
        description: "Giao hàng thành công"
      }
    ]
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const getStatusText = (status) => {
    const statusMap = {
      pending: "Chờ xác nhận",
      processing: "Đang xử lý",
      shipping: "Đang vận chuyển",
      delivered: "Đã giao hàng",
      cancelled: "Đã hủy"
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      pending: "text-amber-800 bg-amber-50 border-amber-200",
      processing: "text-[#a47b67] bg-[#f5ede6] border-[#d4c4b8]",
      shipping: "text-purple-800 bg-purple-50 border-purple-200",
      delivered: "text-emerald-800 bg-emerald-50 border-emerald-200",
      cancelled: "text-rose-800 bg-rose-50 border-rose-200"
    };
    return colorMap[status] || "text-gray-800 bg-gray-50 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-[#faf8f6]">
      
      {/* Header */}
      <div className="border-b-2 border-[#e8dfd7] bg-white">
        <div className="max-w-5xl px-8 py-8 mx-auto">
          <Link 
            to="/user/orders" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8b6f5f] hover:text-[#a47b67] transition-colors mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" />
            <span>Quay lại đơn hàng</span>
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-3 text-[#2d2520]">
                Chi Tiết Đơn Hàng
              </h1>
              <p className="text-sm text-[#8b6f5f] font-mono font-medium">#{order._id}</p>
            </div>
            
            <div className={`px-6 py-3 border-2 ${getStatusColor(order.status)} text-[10px] uppercase tracking-[0.25em] font-semibold`}>
              {getStatusText(order.status)}
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-5xl mx-auto px-8 py-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        <div className="grid gap-12 lg:grid-cols-3">
          
          {/* Main Content */}
          <div className="space-y-16 lg:col-span-2">
            
            {/* Order Timeline */}
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-10 font-semibold">
                Trạng Thái Đơn Hàng
              </h2>
              
              <div className="space-y-8">
                {order.timeline.map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        item.completed 
                          ? 'border-[#a47b67] bg-[#a47b67]' 
                          : 'border-[#e8dfd7] bg-white'
                      }`}>
                        {item.completed ? (
                          <CheckCircle className="w-6 h-6 text-white" strokeWidth={2} />
                        ) : (
                          <div className="w-2 h-2 bg-[#d4c4b8] rounded-full"></div>
                        )}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className={`w-0.5 h-16 ${item.completed ? 'bg-[#a47b67]' : 'bg-[#e8dfd7]'}`}></div>
                      )}
                    </div>
                    
                    <div className="flex-1 pb-8">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-light text-base ${item.completed ? 'text-[#2d2520]' : 'text-[#c4b5a7]'}`}>
                          {item.status}
                        </h3>
                        {item.time && (
                          <span className="text-xs text-[#8b6f5f] font-medium">{item.time}</span>
                        )}
                      </div>
                      <p className="text-sm text-[#6b5446] font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-[#e8dfd7]"></div>

            {/* Products */}
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-10 font-semibold">
                Sản Phẩm
              </h2>
              
              <div className="space-y-8">
                {order.products.map((product) => (
                  <div key={product.id} className="flex gap-6 group">
                    <div className="w-28 h-28 bg-[#f5ede6] flex-shrink-0 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <h3 className="font-light text-base mb-2 tracking-tight text-[#2d2520]">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#8b6f5f] tracking-wide font-medium">
                          {product.variant}
                        </p>
                      </div>
                      <div className="flex items-end justify-between mt-4 text-sm">
                        <span className="text-[#6b5446]">Số lượng: {product.quantity}</span>
                        <span className="font-light text-[#2d2520] font-medium">{formatPrice(product.price * product.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-[#e8dfd7]"></div>

            {/* Customer Info */}
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-6 font-semibold">
                  Thông Tin Khách Hàng
                </h2>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-[#a47b67]">
                      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="font-light text-[#2d2520]">{order.customer.fullName}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#a47b67]" strokeWidth={1.5} />
                    <p className="text-[#6b5446] font-light">{order.customer.phone}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#a47b67]" strokeWidth={1.5} />
                    <p className="text-[#6b5446] font-light">{order.customer.email}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-6 font-semibold">
                  Địa Chỉ Giao Hàng
                </h2>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#a47b67] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="font-light leading-relaxed text-[#6b5446] text-sm">
                    {order.customer.address.detail}<br />
                    {order.customer.address.ward}<br />
                    {order.customer.address.district}<br />
                    {order.customer.address.province}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-[#e8dfd7]"></div>

            {/* Payment & Delivery */}
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-6 font-semibold">
                  Thanh Toán
                </h2>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-2xl">💵</span>
                  <span className="font-light text-[#2d2520]">{order.paymentMethod}</span>
                </div>
              </div>

              <div>
                <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-6 font-semibold">
                  Dự Kiến Giao Hàng
                </h2>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-[#a47b67]" strokeWidth={1.5} />
                  <span className="font-light text-[#2d2520]">{order.estimatedDelivery}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky space-y-6 top-8">
              
              {/* Order Summary */}
              <div className="border-2 border-[#e8dfd7] bg-white">
                <div className="p-8">
                  <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-8 font-semibold">
                    Tóm Tắt Đơn Hàng
                  </h2>
                  
                  <div className="mb-8 space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#6b5446]">Ngày đặt</span>
                      <span className="text-[#2d2520] font-light">{order.orderDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6b5446]">Giờ đặt</span>
                      <span className="text-[#2d2520] font-light">{order.orderTime}</span>
                    </div>
                  </div>

                  <div className="mb-8 space-y-4 text-sm">
                    <div className="flex justify-between font-light">
                      <span className="text-[#6b5446]">Tạm tính</span>
                      <span className="text-[#2d2520]">{formatPrice(order.totalPrice)}</span>
                    </div>
                    
                    <div className="flex justify-between font-light">
                      <span className="text-[#6b5446]">Phí vận chuyển</span>
                      <span className="text-[#2d2520]">{formatPrice(order.shippingFee)}</span>
                    </div>
                    
                    {order.discount > 0 && (
                      <div className="flex justify-between font-light">
                        <span className="text-[#6b5446]">Giảm giá</span>
                        <span className="text-[#2d2520]">-{formatPrice(order.discount)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-4 border-t-2 border-[#a47b67]">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#2d2520] font-semibold">Tổng Cộng</span>
                      <span className="text-lg font-light text-[#2d2520] font-medium">{formatPrice(order.finalPrice)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Link
                      to="/"
                      className="block w-full py-4 text-center text-[11px] uppercase tracking-[0.25em] border-2 border-[#a47b67] text-[#a47b67] hover:bg-[#a47b67] hover:text-white transition-all duration-500 font-semibold"
                    >
                      Về Trang Chủ
                    </Link>
                    
                    {order.status === 'delivered' && (
                      <button
                        className="block w-full py-4 text-center text-[11px] uppercase tracking-[0.25em] bg-[#a47b67] text-white hover:bg-[#8b6f5f] transition-all duration-500 font-semibold"
                      >
                        Đánh Giá Sản Phẩm
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Help Box */}
              <div className="border-2 border-[#e8dfd7] bg-[#f5ede6] p-8">
                <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#8b6f5f] mb-4 font-semibold">
                  Cần Hỗ Trợ?
                </h3>
                <p className="text-xs text-[#6b5446] leading-relaxed font-light mb-4">
                  Nếu bạn có bất kỳ thắc mắc nào về đơn hàng, vui lòng liên hệ với chúng tôi.
                </p>
                <Link 
                  to="/support"
                  className="text-xs text-[#a47b67] hover:text-[#8b6f5f] font-semibold underline-offset-4 hover:underline transition-colors"
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