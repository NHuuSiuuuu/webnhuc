import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faInfo,
  faPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";

function ProductUpdateAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /* =======================
    State form data
  =======================*/
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    featured: "0",
    price: "",
    discountPercentage: "",
    stock: "",
    position: "",
    status: "active",
    category_id: "",
    thumbnail: [], // Ảnh cũ (string hoặc {id, url})
    newThumbnail: [], // Ảnh mới (File)
  });

  /* =======================
    Hàm onchange
  =======================*/
  const handleOnchange = (e) => {
    const { name, type, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type == "number" ? Number(value) : value, // input kiểu num nhưng nhập vào nó là string vào đổi sang num để mongo hiểu
    }));
  };

  /* =======================
    Hàm xử lý khi chọn ảnh mới
  =======================*/
  const handleThumbChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      newThumbnail: [...prev.newThumbnail, ...files],
    }));
  };

  /* =======================
    Hàm xử lý xóa ảnh cũ
  =======================*/
  const handleRemoveThumb = (indexRemove) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: prev.thumbnail.filter((item, idx) => {
        if (idx == indexRemove) {
          return false;
        } else {
          return true;
        }
      }),
    }));
  };

  /* =======================
    Hàm xử lý xóa ảnh mới
  =======================*/
  const handleRemoveNewThumb = (indexRemove) => {
    setFormData((prev) => ({
      ...prev,
      newThumbnail: prev.newThumbnail.filter((item, idx) => {
        if (idx == indexRemove) {
          return false;
        } else {
          return true;
        }
      }),
    }));
  };
  /* =======================
    Load sản phẩm
  =======================*/
  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/product/detail/${id}`,
    );
    return res.data.product;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchData,
  });

  /* =======================
    APi tree category
  =======================*/
  const fetchCategoriesTree = async () => {
    const res = await axios.get(
      "http://localhost:3001/api/category-product/tree",
    );
    return res.data.data;
  };
  const { data: categoriesTree } = useQuery({
    queryKey: ["category-tree"],
    queryFn: fetchCategoriesTree,
  });
  // console.log(categoriesTree);

  // Render option category tree
  const renderOptionCategory = (categories, level = 0) => {
    return categories?.map((item) => (
      <Fragment key={item._id}>
        <option value={item._id}>
          {"-".repeat(level)} {item.title}
        </option>
        {item.children?.length > 0 &&
          renderOptionCategory(item.children, level + 1)}
      </Fragment>
    ));
  };

  /* =======================
    SET FORM KHI CÓ DATA
  =======================*/
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title ?? "", // nếu vế trái là null or undefind thì lấy vế phải
        description: data.description ?? "",
        featured: String(data.featured),
        price: data.price ?? "",
        discountPercentage: data.discountPercentage ?? "",
        stock: data.stock ?? "",
        position: data.position ?? "",
        status: data.status ?? "active",
        category_id: data.category_id ?? null,
        thumbnail: data.thumbnail ?? [],
        newThumbnail: [],
      });
    }
  }, [data]);

  /* =======================
    API upldate product
  =======================*/
  const updateProduct = async (payload) => {
    const res = await axios.patch(
      `http://localhost:3001/api/product/update/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  };

  /* =======================
    useMutation: thực hiện các tao tác POST PUT ....
    - quản lý trạng thái mutation (loading, error, success)
  =======================*/
  const {
    mutate,
    isPending,
    isError: isErrorUpdate,
  } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success("Cập nhật thành công!");
      queryClient.invalidateQueries(["products"]);
      navigate("/admin/products");
    },
  });

  /* =======================
    Hàm submit form
  =======================*/
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    // Dữ liệu text
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("featured", formData.featured);
    form.append("price", formData.price);
    form.append("discountPercentage", formData.discountPercentage);
    form.append("stock", formData.stock);
    form.append("status", formData.status);
    form.append("position", formData.position);
    if (formData.category_id) {
      form.append("category_id", formData.category_id);
    }

    // Ảnh cũ
    form.append("oldThumbnail", JSON.stringify(formData.thumbnail));

    // Ảnh mới
    formData.newThumbnail.forEach((thumb) => form.append("thumbnail", thumb));

    mutate(form);
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
  console.log("data:", formData);

  return (
    <div className="w-full p-6 mx-auto wg-gray-1060">
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Cập nhật sản phẩm
          </h1>
          <p className="mt-2 text-gray-600">Chỉnh sửa thông tin sản phẩm</p>
          <div className="flex items-center mt-4 text-sm text-gray-500">
            <FontAwesomeIcon
              icon={faInfo}
              className="text-[6px] p-1 border rounded-[100%] mr-1"
            />
            ID sản phẩm:{" "}
            <span className="px-2 py-1 ml-1 font-mono bg-gray-100 rounded">
              {id}
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 bg-white rounded-lg shadow"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Colum */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  placeholder="Ví dụ: iPhone 15 Pro Max 256GB"
                  onChange={handleOnchange}
                  value={formData.title}
                  required
                  className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Danh mục sản phẩm
                </label>
                <div className="relative">
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleOnchange}
                    className="w-full px-4 py-3 transition bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">-- Chọn danh mục --</option>

                    {renderOptionCategory(categoriesTree)}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Mô tả sản phẩm
                </label>
                <textarea
                  name="description"
                  placeholder="Mô tả chi tiết về sản phẩm..."
                  onChange={handleOnchange}
                  value={formData.description}
                  rows="4"
                  className="w-full px-4 py-3 transition border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Price & Discount */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Giá bán <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      placeholder="0"
                      onChange={handleOnchange}
                      value={formData.price}
                      required
                      min="0"
                      className="w-full px-4 py-3 pl-10 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute left-3 top-3.5 text-gray-500">
                      ₫
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Giảm giá (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="discountPercentage"
                      placeholder="0"
                      onChange={handleOnchange}
                      value={formData.discountPercentage}
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 pr-10 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-3.5 text-gray-500">
                      %
                    </span>
                  </div>
                </div>
              </div>
              {/* Stock & Position */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Số lượng tồn kho
                  </label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="0"
                    onChange={handleOnchange}
                    value={formData.stock}
                    min="0"
                    className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Vị trí hiển thị
                  </label>
                  <input
                    type="number"
                    name="position"
                    placeholder="0"
                    onChange={handleOnchange}
                    value={formData.position}
                    className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Featured Status */}
              <div className="p-5 rounded-lg bg-gray-50">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Trạng thái nổi bật
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center p-3 transition bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="featured"
                      onChange={handleOnchange}
                      value="1"
                      checked={formData.featured === "1"}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-800">
                        Sản phẩm nổi bật
                      </span>
                      <p className="mt-1 text-sm text-gray-500">
                        Hiển thị ở vị trí ưu tiên trên trang chủ
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 transition bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="featured"
                      value="0"
                      onChange={handleOnchange}
                      checked={formData.featured === "0"}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-800">
                        Sản phẩm thường
                      </span>
                      <p className="mt-1 text-sm text-gray-500">
                        Hiển thị bình thường trong danh mục
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Product Status */}
              <div className="p-5 rounded-lg bg-gray-50">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Trạng thái sản phẩm
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center p-3 transition bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      onChange={handleOnchange}
                      checked={formData.status === "active"}
                      className="w-5 h-5 text-green-600 focus:ring-green-500"
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-800">
                        Hiển thị
                      </span>
                      <p className="mt-1 text-sm text-gray-500">
                        Sản phẩm đang bán và hiển thị
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 transition bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="status"
                      onChange={handleOnchange}
                      value="inactive"
                      checked={formData.status === "inactive"}
                      className="w-5 h-5 text-red-600 focus:ring-red-500"
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-800">Ẩn</span>
                      <p className="mt-1 text-sm text-gray-500">
                        Sản phẩm ngừng bán hoặc ẩn
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Image Upload */}
              <div className="p-5 rounded-lg bg-gray-50">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Hình ảnh sản phẩm
                </h3>
                <div className="space-y-4">
                  <div className="p-6 text-center transition border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400">
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      onChange={handleThumbChange}
                      multiple
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
                  {formData.thumbnail.length > 0 && (
                    <div>
                      <h4 className="mb-3 font-medium text-gray-700">
                        Ảnh đã chọn ({formData.thumbnail.length})
                      </h4>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                        {formData?.thumbnail?.map((thumb, index) => (
                          <div
                            key={index}
                            className="relative overflow-hidden border border-gray-200 rounded-lg group"
                          >
                            <img
                              className="object-cover w-full h-24"
                              src={thumb}
                              alt={`current-${index}`}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveThumb(index)}
                              className="absolute flex items-center justify-center w-8 h-8 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-2 right-2 group-hover:opacity-100 hover:bg-red-600"
                            >
                              <FontAwesomeIcon icon={faX} />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                              <p className="text-xs text-white truncate">
                                {thumb.name}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Images Preview */}
                  {formData.newThumbnail.length > 0 && (
                    <div>
                      <h4 className="mb-3 font-medium text-gray-700">
                        Ảnh mới ({formData.newThumbnail.length})
                      </h4>
                      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                        {formData.newThumbnail.map((newThumb, index) => (
                          <div
                            key={index}
                            className="relative overflow-hidden border border-gray-200 rounded-lg group"
                          >
                            <img
                              className="object-cover w-full h-24"
                              src={URL.createObjectURL(newThumb)}
                              alt={`new-${index}`}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveNewThumb(index)}
                              className="absolute flex items-center justify-center w-6 h-6 text-xs text-white transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100 hover:bg-red-600"
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/60 to-transparent">
                              <p className="px-1 text-xs text-white truncate">
                                {newThumb.name}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-end gap-4 pt-6 border-t border-gray-200 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      title: "",
                      description: "",
                      featured: "0",
                      price: "",
                      discountPercentage: "",
                      stock: "",
                      position: "",
                      status: "active",
                      thumbnail: [],
                      category_id: "",
                    });
                  }}
                  className="px-6 py-3 font-medium text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Xóa form
                </button>
                <button type="submit">
                  <div className="relative inline-flex items-center justify-center h-12 px-6 overflow-hidden font-medium duration-500 rounded-md group bg-gradient-to-r from-blue-600 to-blue-800 text-neutral-200">
                    <div class="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                      {isPending
                        ? "Đang cập nhật sản phẩm..."
                        : "Cập nhật sản phẩm"}
                    </div>
                    <div class="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                      <FontAwesomeIcon icon={faArrowsRotate} />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductUpdateAdmin;
