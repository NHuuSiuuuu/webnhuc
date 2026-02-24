import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify"; // Thêm toast thông báo

function ShippingMethodCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    thumbnail: null,
    description: "",
    fee: 0,
    freeThreshold: 0,
    status: "1",
    isDefault: false,
    deliveryTime: "2-3 ngày làm việc",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload) => {
      return await axios.post(
        `http://localhost:3001/api/shipping-method/create`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    onSuccess: () => {
      toast.success("Thêm phương thức vận chuyển thành công!");
      // Reset form
      setFormData({
        code: "",
        name: "",
        thumbnail: null,
        description: "",
        fee: 0,
        freeThreshold: 0,
        status: "1",
        deliveryTime: "",
      });
      navigate(`/admin/shipping-method`);
    },
    onError: () => {
      toast.error("Thêm mới không thành công!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("code", formData.code);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("fee", formData.fee);
    data.append("freeThreshold", formData.freeThreshold);
    data.append("status", formData.status);
    data.append("deliveryTime", formData.deliveryTime);

    data.append("thumbnail", formData.thumbnail);
    mutate(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };
  console.log(formData);
  return (
    <div className="w-full p-6 mx-auto wg-gray-1060">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Thêm phương thức vận chuyển
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Tạo phương thức vận chuyển mới cho cửa hàng của bạn
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 bg-white rounded-lg shadow"
      >
        {/* === THÔNG TIN CƠ BẢN === */}
        <div className="space-y-6">
          <h3 className="pb-3 text-lg font-semibold text-gray-900 border-b border-gray-200">
            Thông tin cơ bản
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Code */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                Mã phương thức
                <span className="ml-1 text-red-500">*</span>
                <span className="ml-2 text-xs text-gray-400">
                  (standard, fast, express, saving)
                </span>
              </label>
              <div className="relative">
                <input
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  placeholder="VD: standard"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                />
                {formData.code &&
                  !["standard", "fast", "express", "saving"].includes(
                    formData.code,
                  ) && (
                    <p className="absolute mt-1 text-xs text-red-500">
                      Chỉ chấp nhận: standard, fast, express, saving
                    </p>
                  )}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                Tên hiển thị
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="VD: Giao hàng tiêu chuẩn"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết về phương thức vận chuyển này..."
              rows={3}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
            />
          </div>

          {/* Delivery Time */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              Thời gian giao hàng dự kiến
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              required
              placeholder="VD: 2-3 ngày làm việc"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* === CẤU HÌNH PHÍ === */}
        <div className="space-y-6">
          <h3 className="pb-3 text-lg font-semibold text-gray-900 border-b border-gray-200">
            Cấu hình phí vận chuyển
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Fee */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                Phí vận chuyển
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1000"
                  placeholder="0"
                  className="w-full px-4 py-3 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                />
                <span className="absolute left-3 top-3.5 text-sm font-medium text-gray-500">
                  ₫
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Phí mặc định khi chưa đạt ngưỡng miễn phí
              </p>
            </div>

            {/* Free Threshold */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                Ngưỡng miễn phí
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="freeThreshold"
                  value={formData.freeThreshold || ""}
                  onChange={handleChange}
                  min="0"
                  step="100000"
                  placeholder="Để trống nếu không miễn phí"
                  className="w-full px-4 py-3 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                />
                <span className="absolute left-3 top-3.5 text-sm font-medium text-gray-500">
                  ₫
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Miễn phí ship cho đơn hàng từ ngưỡng này
              </p>
            </div>
          </div>
        </div>

        {/* === TRẠNG THÁI === */}
        <div className="space-y-6">
          <h3 className="pb-3 text-lg font-semibold text-gray-900 border-b border-gray-200">
            Trạng thái
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Active Status */}
            <div className="space-y-3">
              <label className="flex items-center text-sm font-medium text-gray-700">
                Trạng thái hoạt động
              </label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    onChange={handleChange}
                    checked={formData.status === "active"}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Hoạt động</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    onChange={handleChange}
                    value="inactive"
                    checked={formData.status === "inactive"}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Dừng hoạt động
                  </span>
                </label>
              </div>
            </div>

            {/* Default Status */}
            <div className="space-y-3">
              <label className="flex items-center text-sm font-medium text-gray-700">
                Mặc định
              </label>
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Đặt làm phương thức mặc định
                  </span>
                </label>
              </div>
              <p className="text-xs text-gray-400">
                Chỉ có 1 phương thức mặc định duy nhất
              </p>
            </div>

            {/* Image Upload */}
            <div className="p-5 rounded-lg bg-gray-50">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Hình ảnh phương thức vận chuyển
              </h3>
              <div className="space-y-4">
                <div className="p-6 text-center transition border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    // multiple
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-12 h-12 mb-3 bg-blue-100 rounded-full">
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <span className="font-medium text-gray-700">
                      Tải ảnh lên
                    </span>
                    <p className="mt-1 text-sm text-gray-500">
                      Kéo thả hoặc chọn file
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      PNG, JPG, GIF tối đa 10MB
                    </p>
                  </label>
                </div>

                {/* Image Preview */}
                {formData?.thumbnail && (
                  <div>
                    <h4 className="mb-3 font-medium text-gray-700">
                      Ảnh đã chọn
                    </h4>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                      <div className="relative overflow-hidden border border-gray-200 rounded-lg group">
                        <img
                          className="object-cover w-full h-32"
                          src={URL.createObjectURL(formData?.thumbnail)}
                        // alt={`preview-${index}`}
                        />
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, thumbnail: null }))}
                          className="absolute flex items-center justify-center w-8 h-8 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-2 right-2 group-hover:opacity-100 hover:bg-red-600"
                        >
                          <FontAwesomeIcon icon={faX} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                          <p className="text-xs text-white truncate">
                            {/* {thumb.name} */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* === BUTTONS === */}
        <div className="flex items-center justify-end pt-6 space-x-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              setFormData({
                code: "",
                name: "",
                description: "",
                fee: 0,
                freeThreshold: null,
                status: "1",
                isDefault: false,
                deliveryTime: "2-3 ngày làm việc",
              });
            }}
            className="px-6 py-3 font-medium text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Xóa form
          </button>

          <button type="submit" disabled={isPending}>
            {isPending ? (
              <>Đang tạo sản phẩm...</>
            ) : (
              <div className="relative inline-flex items-center justify-center h-12 px-6 overflow-hidden font-medium duration-500 rounded-md group bg-gradient-to-r from-blue-600 to-blue-800 text-neutral-200">
                <div class="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                  Thêm sản phẩm
                </div>
                <div class="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingMethodCreate;
