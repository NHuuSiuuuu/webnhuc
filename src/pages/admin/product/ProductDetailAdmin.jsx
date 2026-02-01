import { useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faArrowLeft,
  faArrowsRotate,
  faBoxArchive,
  faCode,
  faFileImage,
  faHouse,
  faInfo,
  faLocationDot,
  faPenToSquare,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function ProductDetailAdmin() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  /* =======================
    API chi tiết sản phẩm
  =======================*/
  const fetchProductDetail = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/product/detail/${id}`,
    );
    return res.data.product;
  };

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product-detail", id],
    queryFn: fetchProductDetail,
  });

  /* =======================
    API danh mục để lấy tên danh mục
  =======================*/
  const fetchCategories = async () => {
    const res = await axios.post(
      `http://localhost:3001/api/category-product/productCategories`,
    );
    return res.data.productCategories;
  };

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Tạo map từ category_id sang tên danh mục
  const categoryMap = {};
  categories.forEach((cat) => {
    categoryMap[cat._id] = cat.title;
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin">
            <div class="flex items-center justify-center">
              <svg
                class="animate-spin border-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
              >
                <g id="Group 1000003710">
                  <circle
                    id="Ellipse 717"
                    cx="26.0007"
                    cy="25.9994"
                    r="22.7221"
                    stroke="#D1D5DB"
                    stroke-width="6"
                    stroke-dasharray="4 4"
                  />
                  <path
                    id="Ellipse 715"
                    d="M32.6373 47.7311C38.0288 46.0843 42.6156 42.4922 45.5067 37.6526C48.3977 32.8129 49.3864 27.0714 48.2808 21.5435C47.1751 16.0156 44.054 11.0961 39.5239 7.74084C34.9938 4.38554 29.3781 2.83406 23.768 3.38782"
                    stroke="#4F46E5"
                    stroke-width="6"
                  />
                </g>
              </svg>
            </div>
          </div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );

  if (isError || !product) {
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
  }

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Tính giá sau khi giảm
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return price * (1 - discount / 100);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50 md:p-6">
      <div>
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                  Chi tiết thông sản phẩm
                </h1>
                <p className="mt-2 text-gray-600">
                  {" "}
                  Chi tiết thông tin sản phẩm
                </p>
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
            </div>
            <div className="flex gap-2">
              <Link to={`/admin/product/update/${product._id}`}>
                <div className="relative inline-flex items-center justify-center h-12 px-6 overflow-hidden font-medium duration-500 rounded-md group bg-gradient-to-r from-blue-600 to-blue-800 text-neutral-200">
                  <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                    Sửa sản phẩm
                  </div>
                  <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </div>
                </div>
              </Link>
              <Link
                to="/admin/products"
                className="inline-flex items-center px-4 py-2 font-medium text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Quay lại
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}

        <div className="overflow-hidden shadow-sm rounded-xl">
          <div className="mb-6">
            {/* Product ID */}
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full">
                <FontAwesomeIcon icon={faCode} className="w-4 h-4 mr-2" />
                ID: {product._id}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
              {/* Left Column - Images */}
              <div>
                {/* Main Image */}
                <div className="mb-4">
                  <div className="overflow-hidden border border-gray-200 rounded-lg aspect-square bg-gray-50">
                    {product.thumbnail && product.thumbnail.length > 0 ? (
                      <img
                        src={product.thumbnail[selectedImage]}
                        alt={product.title}
                        className="object-contain w-full h-full p-4"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <FontAwesomeIcon
                          icon={faFileImage}
                          className="text-[90px] text-gray-400"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                {product.thumbnail && product.thumbnail.length > 1 && (
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-gray-700">
                      Ảnh sản phẩm
                    </h3>
                    <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                      {product.thumbnail.map((thumb, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImage === index
                              ? "border-blue-500 ring-2 ring-blue-200"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={thumb}
                            alt={`${product.title} - ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Details */}
              <div>
                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      product.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${product.status === "active" ? "bg-green-500" : "bg-red-500"}`}
                    ></span>
                    {product.status === "active"
                      ? "Đang hoạt động"
                      : "Dừng hoạt động"}
                  </span>

                  {product.featured === "1" && (
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-[12px]  mr-1"
                      />
                      Nổi bật
                    </span>
                  )}

                  {product.discountPercentage > 0 && (
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-red-800 bg-red-100 rounded-full">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
                        />
                      </svg>
                      Giảm {product.discountPercentage}%
                    </span>
                  )}

                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-[12px] text"
                    />
                    Vị trí: {product.position || 0}
                  </span>
                </div>

                {/* Price Section */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    {product.discountPercentage > 0 ? (
                      <>
                        <span className="text-3xl font-bold text-red-600">
                          {formatPrice(
                            calculateDiscountedPrice(
                              product.price,
                              product.discountPercentage,
                            ),
                          )}
                        </span>
                        <span className="text-xl text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                        <span className="px-2 py-1 text-sm font-medium text-red-800 bg-red-100 rounded">
                          -{product.discountPercentage}%
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">
                    Giá gốc: {formatPrice(product.price)}
                  </p>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">
                    Danh mục
                  </h3>
                  <div className="flex items-center p-3 rounded-lg bg-gray-50">
                    <FontAwesomeIcon
                      className="text-[18px] mr-3"
                      icon={faBoxArchive}
                    />
                    <span className="font-medium text-gray-900">
                      {categoryMap[product.category_id]}
                    </span>
                  </div>
                </div>

                {/* Stock */}
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">
                    Tồn kho
                  </h3>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        product.stock > 10
                          ? "bg-green-500"
                          : product.stock > 0
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <div>
                      <span
                        className={`text-xl font-bold ${
                          product.stock > 10
                            ? "text-green-600"
                            : product.stock > 0
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {product.stock} sản phẩm
                      </span>
                      <p className="text-sm text-gray-500">
                        {product.stock > 10
                          ? "Còn hàng"
                          : product.stock > 0
                            ? "Sắp hết hàng"
                            : "Hết hàng"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium text-gray-700">
                    Mô tả sản phẩm
                  </h3>
                  <p className="whitespace-pre-wrap ">{product.description}</p>
                </div>

                {/* Create , update by id */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-500">Ngày tạo</p>
                    <p className="font-medium text-gray-900">
                      {new Date(product.createBy?.createdAt).toLocaleString(
                        "vi-VN",
                      )}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Bởi:{" "}
                      {product.createBy?.account_id?.fullName ||
                        "Không xác định"}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-500">Lần cập nhật cuối</p>
                    {product.updatedBy?.length > 0 ? (
                      <>
                        <p className="font-medium text-gray-900">
                          {new Date(
                            product.updatedBy[product.updatedBy.length - 1]
                              ?.updatedAt,
                          ).toLocaleString("vi-VN")}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Bởi:
                          {product.updatedBy[product.updatedBy.length - 1]
                            ?.account_id?.fullName || "Không xác định"}
                        </p>
                      </>
                    ) : (
                      <p className="italic text-gray-500">Chưa cập nhật</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailAdmin;
