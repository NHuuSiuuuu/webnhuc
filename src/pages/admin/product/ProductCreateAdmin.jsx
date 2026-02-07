import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../../utils/axios";

import { toast } from "react-toastify";
import { Fragment, useState } from "react";
import { Slide } from "react-toastify";
import { useNavigate } from "react-router";
import { faArrowDown, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 1️⃣ useState – khai báo state
// 2️⃣ useQueryClient – lấy client
// 3️⃣ handleOnChange / handleFileChange / handleRemoveThumb – hàm xử lý UI
// 4️⃣ createProduct (API)
// 5️⃣ useMutation
// 6️⃣ handleSubmit

function ProductCreateAdmin() {
  const navigate = useNavigate();
  const fnSuccess = () => {
    toast.success("Tạo sản phẩm thành công!");
  };

  const fnError = () =>
    toast.error("Tạo sản phẩm thất bại!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });

  /* =======================
    State lưu form
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
    thumbnail: [],
    category_id: "",
    sizes: [
      { name: "S", stock: "" },
      { name: "M", stock: "" },
      { name: "L", stock: "" },
      { name: "XL", stock: "" },
    ],
  });
  console.log(formData);

  /* =======================
   Query client: Đơn giản dùng để refesh lại sau khi tạo mới vì khi tạo xong sản phẩm frontend cần hiển thị danh sách sản phẩm và gọi lại api
    Nếu không gọi lại thì bắt buộc phải load lại trang mới thấy sp mới
   =======================*/
  const queryClient = useQueryClient();

  /* =======================
    Hàm xử lý thay đổi
  =======================*/
  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,

      // [name] nghĩa là: lấy giá trị của biến name làm key cho object
      [name]: type == "number" ? Number(value) : value, // convert value nào dạng number về number tránh lỗi trong db
    }));
  };

  const handleSizeChange = (index, value) => {
    setFormData((prev) => {
      // copy lại mảng sizes cũ
      const newSizes = [...prev.sizes];

      // Sửa stock của size lại vị trí index
      newSizes[index] = {
        ...newSizes[index],
        stock: Number(value), // stock này trong sizes
      };
      // Trả về formData mới
      return {
        ...prev,
        sizes: newSizes,
      };
    });
  };
  /* =======================
    Hàm xử lý file
  =======================*/
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // FileList chuyển sang  Array
    setFormData((prev) => ({
      ...prev,
      thumbnail: files,
    }));
  };

  /* =======================
    Hàm xử lý xỏa ảnh preview
  =======================*/
  const handleRemoveThumb = (index) => {
    console.log("click");
    setFormData((prev) => ({
      ...prev,
      thumbnail: prev.thumbnail.filter((item, i) => {
        if (i == index) {
          return false;
        } else {
          return true;
        }
      }),
    }));
  };

  /* =======================
    API create product
  =======================*/
  const createProduct = async (data) => {
    const res = await axios.post(
      "http://localhost:3001/api/product/create",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log("res.data", res.data);
    return res.data;
  };

  /* =======================
    API tree danh mục sản phẩm
  =======================*/
  const fetchCategoryTree = async () => {
    const res = await axios.get(
      "http://localhost:3001/api/category-product/tree",
    );
    return res.data.data;
  };

  /* =======================
    Load category tree
  =======================*/
  const { data: categoryTree = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["category-tree"],
    queryFn: fetchCategoryTree,
  });

  /* =======================
    useMutation: thực hiện các tao tác POST PUT ....
    - quản lý trạng thái mutation (loading, error, success)
  =======================*/
  const { mutate, isPending, isError } = useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      fnSuccess();
      navigate("/admin/products");

      // refetch lại danh sách sản phẩm
      queryClient.invalidateQueries(["products"]); // products tên api

      // reset form
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
      });
    },

    onError: (error) => {
      console.error(error);
      fnError();
    },
  });

  /* =======================
    Hàm xử lý submit form
  =======================*/
  const handleSubmit = (e) => {
    e.preventDefault();

    // Tạo 1 form data để gửi text và file lên backend (OBJ đặc biệt của js)
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("featured", formData.featured);
    data.append("price", formData.price);
    data.append("discountPercentage", formData.discountPercentage);
    data.append("stock", formData.stock);
    data.append("status", formData.status);
    data.append("position", formData.position);
    data.append("category_id", formData.category_id);
    // data.append("sizes", formData.sizes);

    // Thằng này là obj lên phải chuyển nó sang json
    data.append("sizes", JSON.stringify(formData.sizes));

    // Nhiều ảnh thì phải lặp qua - thằng này dạng arr chỉ có phần tử thôi
    formData.thumbnail.forEach((file) => {
      data.append("thumbnail", file);
    });
    mutate(data);
    // console.log("formData:", data);
  };

  // Hàm render option theo tree
  const renderCategoryOptions = (categories, level = 0) => {
    return categories.map((item) => (
      <Fragment key={item._id}>
        <option value={item._id}>
          {"— ".repeat(level)} {/* Lặp chuỗi (-) đó level lần */}
          {item.title}
        </option>

        {/* Nếu danh mục có children (độ dài length > 0)*/}
        {item.children?.length > 0 &&
          renderCategoryOptions(item.children, level + 1)}
      </Fragment>
    ));
  };

  return (
    <div className="w-full p-6 mx-auto wg-gray-1060">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Thêm mới sản phẩm
      </h1>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 bg-white rounded-lg shadow"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                placeholder="Ví dụ: iPhone 15 Pro Max 256GB"
                onChange={handleOnChange}
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
                  onChange={handleOnChange}
                  className="w-full px-4 py-3 transition bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">-- Chọn danh mục --</option>
                  {loadingCategories ? (
                    <option value="" disabled>
                      Đang tải danh mục...
                    </option>
                  ) : (
                    renderCategoryOptions(categoryTree)
                  )}
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
                onChange={handleOnChange}
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
                    onChange={handleOnChange}
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
                    onChange={handleOnChange}
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
              {/* Sizes */}
              <div>
                <label className="block mb-3 text-sm font-medium text-gray-700">
                  Size và Số lượng
                </label>
                <div className="space-y-3">
                  {formData.sizes.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-10 text-sm font-semibold text-gray-600">
                        {item.name}
                      </span>
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        value={item.stock}
                        onChange={(e) =>
                          handleSizeChange(index, e.target.value)
                        }
                        className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Position */}
              <div>
                <label className="block mb-3 text-sm font-medium text-gray-700">
                  Vị trí hiển thị
                </label>

                <input
                  type="number"
                  name="position"
                  placeholder="0"
                  value={formData.position}
                  onChange={handleOnChange}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    onChange={handleOnChange}
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
                    onChange={handleOnChange}
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
                    onChange={handleOnChange}
                    checked={formData.status === "active"}
                    className="w-5 h-5 text-green-600 focus:ring-green-500"
                  />
                  <div className="ml-3">
                    <span className="font-medium text-gray-800">Hiển thị</span>
                    <p className="mt-1 text-sm text-gray-500">
                      Sản phẩm đang bán và hiển thị
                    </p>
                  </div>
                </label>
                <label className="flex items-center p-3 transition bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50">
                  <input
                    type="radio"
                    name="status"
                    onChange={handleOnChange}
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
                    onChange={handleFileChange}
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
                      {formData.thumbnail.map((thumb, index) => (
                        <div
                          key={index}
                          className="relative overflow-hidden border border-gray-200 rounded-lg group"
                        >
                          <img
                            className="object-cover w-full h-32"
                            src={URL.createObjectURL(thumb)}
                            alt={`preview-${index}`}
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
          </div>
        </div>
      </form>

      <div></div>
    </div>
  );
}

export default ProductCreateAdmin;
