import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft, MoreVertical, Printer, Download, Mail, Phone, MapPin, Package, CreditCard, Truck, Clock, User, Edit, Archive, RefreshCw } from "lucide-react";

function AdminOrderDetail() {
  const { orderId } = useParams();
  const [orderStatus, setOrderStatus] = useState("");
  const [showActions, setShowActions] = useState(false);

  // Dữ liệu mẫu
  const order = {
    _id: orderId || "699db64b7d642ab48fb7f314",
    orderNumber: "ORD-2024-1234",
    orderDate: "25/02/2026",
    orderTime: "14:30",
    orderStatus: "confirmed",
    customer: {
      id: "CUST-001",
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
        sku: "DRS-BUR-M",
        name: "Đầm Dự Tiệc Lụa Tơ Tằm Cao Cấp",
        variant: "Đỏ burgundy · Size M",
        quantity: 1,
        price: 450000,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop"
      },
      {
        id: 2,
        sku: "TOP-CRM-S",
        name: "Áo Kiểu Voan Hoa Nhí Vintage",
        variant: "Trắng kem · Size S",
        quantity: 2,
        price: 180000,
        image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=200&h=200&fit=crop"
      },
      {
        id: 3,
        sku: "BAG-COG-OS",
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
    paymentMethod: "COD",
    paymentStatus: "unpaid",
    shippingMethod: "Giao hàng tiêu chuẩn",
    trackingNumber: "VNP1234567890",
    notes: "Gọi trước khi giao hàng",
    timeline: [
      { status: "Đơn hàng đã tạo", time: "25/02/2026 14:30", user: "Khách hàng" },
      { status: "Đã xác nhận", time: "25/02/2026 14:35", user: "Admin Hương" },
    ]
  };

  useEffect(() => {
    setOrderStatus(order.orderStatus);
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const statusConfig = {
    pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-800 border-blue-200" },
    shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-800 border-purple-200" },
    completed: { label: "Hoàn thành", color: "bg-green-100 text-green-800 border-green-200" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800 border-red-200" }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      
      {/* Top Bar - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/admin/orders" 
                className="p-2 transition-colors rounded-lg hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {order.orderNumber}
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {order.orderDate} lúc {order.orderTime}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[orderStatus]?.color}`}>
                {statusConfig[orderStatus]?.label}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
                <Printer className="w-4 h-4" />
                In
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Xuất
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowActions(!showActions)}
                  className="p-2 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
                {showActions && (
                  <div className="absolute right-0 w-48 py-1 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <button className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50">
                      <Edit className="w-4 h-4" />
                      Chỉnh sửa
                    </button>
                    <button className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50">
                      <Archive className="w-4 h-4" />
                      Lưu trữ
                    </button>
                    <button className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50">
                      <Archive className="w-4 h-4" />
                      Hủy đơn
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-6">
            
            {/* Products Card */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-900">Sản phẩm</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.products.map((product, index) => (
                    <div key={product.id} className={`flex gap-4 pb-4 ${index !== order.products.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-16 h-16 border border-gray-200 rounded-lg"
                        />
                        <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-gray-900 rounded-full -top-2 -right-2">
                          {product.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 text-sm font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <p className="mb-1 text-sm text-gray-500">{product.variant}</p>
                        <p className="text-xs text-gray-400">SKU: {product.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {formatPrice(product.price)}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          × {product.quantity}
                        </p>
                      </div>
                      <div className="text-right min-w-[100px]">
                        <p className="text-sm font-semibold text-gray-900">
                          {formatPrice(product.price * product.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="pt-6 mt-6 space-y-3 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-medium text-gray-900">{formatPrice(order.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-medium text-gray-900">{formatPrice(order.shippingFee)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Giảm giá</span>
                      <span className="font-medium text-red-600">-{formatPrice(order.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 text-base font-semibold border-t border-gray-200">
                    <span className="text-gray-900">Tổng cộng</span>
                    <span className="text-gray-900">{formatPrice(order.finalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Card */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-900">Thanh toán</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.paymentMethod}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                      </p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    Đánh dấu đã thanh toán
                  </button>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-900">Lịch sử</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        {index !== order.timeline.length - 1 && (
                          <div className="absolute top-8 left-4 w-0.5 h-8 bg-gray-200"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-medium text-gray-900">{event.status}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {event.time} • {event.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="col-span-1 space-y-6">
            
            {/* Notes */}
            {order.notes && (
              <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                <div className="flex items-start gap-2">
                  <div className="text-yellow-600">⚠️</div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-yellow-900">Ghi chú</p>
                    <p className="text-sm text-yellow-800">{order.notes}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Customer */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Khách hàng</h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{order.customer.fullName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">ID: {order.customer.id}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <a href={`mailto:${order.customer.email}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{order.customer.email}</span>
                  </a>
                  <a href={`tel:${order.customer.phone}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <Phone className="w-4 h-4" />
                    <span>{order.customer.phone}</span>
                  </a>
                </div>

                <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Xem hồ sơ khách hàng
                </button>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Địa chỉ giao hàng</h3>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <p className="text-sm leading-relaxed text-gray-700">
                    {order.customer.address.detail}<br />
                    {order.customer.address.ward}<br />
                    {order.customer.address.district}<br />
                    {order.customer.address.province}
                  </p>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Xem trên bản đồ
                </button>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Vận chuyển</h3>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{order.shippingMethod}</p>
                    {order.trackingNumber && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                  </div>
                </div>
                <button className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  <RefreshCw className="w-4 h-4" />
                  Cập nhật tracking
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Tags</h3>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">
                    Khách VIP
                  </span>
                  <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">
                    Ưu tiên
                  </span>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  + Thêm tag
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default AdminOrderDetail;