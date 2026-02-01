import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import { useState, useEffect } from "react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
  });

  const fetchGetMe = async () => {
    const res = await axios.get("http://localhost:3001/api/account/getMe");
    return res.data.data;
  };

  // API thống kê (cần tạo backend)
  const fetchStats = async () => {
    try {
      // Gọi các API thống kê
      const productsRes = await axios.get("http://localhost:3001/api/product/products?page=0&limit=1");
      const categoriesRes = await axios.post("http://localhost:3001/api/category-product/productCategories");
      // Cần thêm API cho orders và users
      
      return {
        totalProducts: productsRes.data.totalProducts || 0,
        totalCategories: categoriesRes.data.productCategories?.length || 0,
        totalOrders: 124,
        totalUsers: 45,
        revenue: 12543000,
      };
    } catch (error) {
      console.error("Error fetching stats:", error);
      return {
        totalProducts: 0,
        totalCategories: 0,
        totalOrders: 0,
        totalUsers: 0,
        revenue: 0,
      };
    }
  };

  const { data: userData, isLoading: userLoading, isError: userError } = useQuery({
    queryKey: ["getMe"],
    queryFn: fetchGetMe,
  });

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
  });

  // Update stats khi có data
  useEffect(() => {
    if (statsData) {
      setStats(statsData);
    }
  }, [statsData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (userLoading || statsLoading) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="w-48 h-8 mb-6 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-6 bg-white shadow-sm rounded-xl">
                  <div className="w-24 h-4 mb-4 bg-gray-200 rounded"></div>
                  <div className="w-16 h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-8 text-center border border-red-200 rounded-lg bg-red-50">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-red-800">Đã xảy ra lỗi</h3>
          <p className="text-gray-600">Không thể tải thông tin dashboard.</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Tổng sản phẩm",
      value: stats.totalProducts,
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Tổng danh mục",
      value: stats.totalCategories,
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      color: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Tổng đơn hàng",
      value: stats.totalOrders,
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      color: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Tổng doanh thu",
      value: formatCurrency(stats.revenue),
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
  ];

  return (
    <div className="min-h-screen p-4 bg-gray-50 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                Chào mừng trở lại, {userData.fullName}!
              </h1>
              <p className="mt-2 text-gray-600">
                {userData.role_id?.title || "Administrator"} • {userData.email}
              </p>
              {userData.role_id?.description && (
                <p className="mt-1 text-sm text-gray-500">{userData.role_id.description}</p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Hôm nay</span>
              <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                {new Date().toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card, index) => (
            <div key={index} className="p-6 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className={`text-2xl font-bold mt-2 ${card.textColor}`}>
                    {card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${card.color}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2">
            {/* Quick Actions */}
            <div className="p-6 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Thao tác nhanh</h2>
                <span className="text-sm text-gray-500">Tiện ích</span>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { name: "Thêm sản phẩm", href: "/admin/product/create", icon: "M12 4v16m8-8H4", color: "bg-blue-100 text-blue-600" },
                  { name: "Quản lý đơn hàng", href: "/admin/orders", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", color: "bg-green-100 text-green-600" },
                  { name: "Thêm danh mục", href: "/admin/categories/create", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6", color: "bg-purple-100 text-purple-600" },
                  { name: "Thêm người dùng", href: "/admin/users/create", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z", color: "bg-yellow-100 text-yellow-600" },
                ].map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className="flex flex-col items-center p-4 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 group"
                  >
                    <div className={`p-3 rounded-full ${action.color} mb-3 group-hover:scale-110 transition-transform`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon} />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-center text-gray-700">{action.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Hoạt động gần đây</h2>
                <a href="/admin/activity" className="text-sm text-blue-600 hover:text-blue-800">
                  Xem tất cả
                </a>
              </div>
              <div className="space-y-4">
                {[
                  { user: "Admin", action: "đã thêm sản phẩm mới", item: "iPhone 15 Pro Max", time: "2 phút trước", type: "product" },
                  { user: "Nguyễn Văn A", action: "đã đặt đơn hàng", item: "#ORD-20240001", time: "15 phút trước", type: "order" },
                  { user: "Admin", action: "đã cập nhật danh mục", item: "Điện thoại", time: "1 giờ trước", type: "category" },
                  { user: "Trần Thị B", action: "đã đăng ký tài khoản", item: "trantb@email.com", time: "2 giờ trước", type: "user" },
                  { user: "Admin", action: "đã xóa sản phẩm", item: "Samsung Galaxy S23", time: "3 giờ trước", type: "product" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center p-3 transition rounded-lg hover:bg-gray-50">
                    <div className={`p-2 rounded-full mr-3 ${
                      activity.type === 'product' ? 'bg-blue-100' :
                      activity.type === 'order' ? 'bg-green-100' :
                      activity.type === 'category' ? 'bg-purple-100' : 'bg-yellow-100'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
                          activity.type === 'product' ? "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" :
                          activity.type === 'order' ? "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" :
                          activity.type === 'category' ? "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" :
                          "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        } />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.item}</span>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - User Info & System Status */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 mr-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                  {userData.avatar ? (
                    <img src={userData.avatar} alt="Avatar" className="object-cover w-full h-full rounded-full" />
                  ) : (
                    <span className="text-xl font-bold text-white">
                      {userData.fullName?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{userData.fullName}</h3>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                  <span className="inline-block px-2 py-1 mt-1 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                    {userData.role_id?.title || "Administrator"}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tham gia: {new Date(userData.createdAt).toLocaleDateString('vi-VN')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Trạng thái: <span className="ml-1 font-medium text-green-600">Hoạt động</span>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
              <h3 className="mb-6 text-lg font-semibold text-gray-800">Trạng thái hệ thống</h3>
              <div className="space-y-4">
                {[
                  { name: "Database", status: "online", value: 95 },
                  { name: "API Server", status: "online", value: 99 },
                  { name: "Storage", status: "warning", value: 75 },
                  { name: "Cache", status: "online", value: 90 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.status === 'online' ? 'bg-green-100 text-green-800' :
                        item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status === 'online' ? 'Hoạt động' : item.status === 'warning' ? 'Cảnh báo' : 'Lỗi'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${
                          item.status === 'online' ? 'bg-green-500' :
                          item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-right">
                      <span className="text-xs text-gray-500">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
              <h3 className="mb-6 text-lg font-semibold text-gray-800">Liên kết nhanh</h3>
              <div className="space-y-2">
                {[
                  { name: "Tài liệu hướng dẫn", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                  { name: "Báo cáo hệ thống", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
                  { name: "Hỗ trợ kỹ thuật", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
                  { name: "Cài đặt nâng cao", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
                ].map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center p-3 transition rounded-lg hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} />
                    </svg>
                    <span className="text-sm text-gray-700">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;