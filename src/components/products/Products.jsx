import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  ArrowDown,
  ArrowDownAZ,
  CheckCircle,
  SlidersHorizontal,
  X,
  XIcon,
  ZoomIn,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Slider from "react-slick";
import { calculateDiscountedPrice, formatPrice } from "../../utils/price";
import Pagination from "../layout/Pagination";

function Products() {
  const [opened, setOpened] = useState(false);
  const [indexThumb, setIndexThumb] = useState(0);
  const [openDialog, setOpendialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorSize, setErrorSize] = useState(false);
  const [errorQuantitySize, setErrorQuantitySize] = useState(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  // Sản phẩm được chọn khi zoom in
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const queryClient = useQueryClient();

  let cartId = localStorage.getItem("cart_id");
  if (!cartId) {
    cartId = crypto.randomUUID();
    localStorage.setItem("cart_id", cartId);
  }
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true, // cho phép vuốt tự do không bị cứng 1 bước
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const fetchListProducts = async () => {
    let url = `${import.meta.env.VITE_API_BACKEND}/product?page=${page}`;

    if (sort) url += `&sort=${sort}`;
    if (filter) url += `&filter=featured:${filter}`;

    const res = await axios.get(url);
    return res.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, sort, filter],
    queryFn: fetchListProducts,
  });

  const handleOnClickSize = (quantity) => {
    if (selectedSize.stock > quantity) {
      setQuantity(quantity + 1);
    } else {
      setErrorQuantitySize(true);
      return;
    }
  };
  const { mutate } = useMutation({
    mutationFn: async (payload) => {
      return await axios.post(
        `${import.meta.env.VITE_API_BACKEND}/cart/create`,
        payload,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", cartId]);
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    },
  });
  const handleAddToCart = async (productId) => {
    if (!selectedSize) {
      setErrorSize(true);
    }
    const payload = {
      cart_id: cartId,
      product_id: productId,
      quantity: quantity,
      size_id: selectedSize?._id,
    };
    console.log("payload", payload);
    mutate(payload);
  };
  const totalPage = data?.totalPage || 0;
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 rounded-full border-[#a47b67] animate-spin"></div>
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
  return (
    <div>
      {/* Breadcrumb: Hiển thị đường dẫn phân cấp của trang hiện tại  */}
      <div className="w-full mx-auto sm:px-4 md:px-16 xl:px-18 text-[13px] text-[#333333] h-[40px] bg-[#f1f1f1] mb-[40px] flex items-center px-4">
        <ul className="flex gap-2 ">
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>›</li>
          <li>
            <Link to="">Danh mục</Link>
          </li>
          <li>›</li>
          <li>
            <Link to="">Tất cả sản phẩm</Link>
          </li>
        </ul>
      </div>
      <div className="container relative mx-auto lg:[50%]  xl:w-[90%] bg-white ">
        <div className="mb-[15px]">
          <h1 className="text-center my-[15px] font-bold text-[20px] md:text-[27px] ">
            Tất cả sản phẩm
          </h1>
          <div className="mx-[15px]">
            {/* collection title */}
            <div className="flex justify-between">
              {/* heading collection */}
              <div
                onClick={() => setOpened(true)}
                className=" flex items-center md:col-span-3  md:text-[14px]  cursor-pointer "
              >
                {" "}
                <i>
                  <SlidersHorizontal className="size-[16px] md:size-[20px] mr-2.5 text-[#A47B67]" />
                </i>
                <p className="text-[12px] font-bold md:text-[14px]  text-[#A47B67]">
                  Bộ lọc
                </p>
              </div>

              {/* Filter */}
              <div className=" text-[12px] flex items-center justify-end md:col-span-3 md:text-[14px] ">
                <div>
                  <div className="relative flex items-center">
                    {/* Icon */}
                    <ArrowDownAZ className="absolute left-3 size-3 md:size-4 text-[#A47B67] pointer-events-none" />

                    {/* Select */}
                    <select
                      id="sort-by"
                      name="sort-by"
                      defaultValue="title:asc"
                      onChange={(e) => {
                        setSort(e.target.value);
                      }}
                      //   appearance-none tắt css mặc định của option - tắt mũi tên
                      className=" text-[12px]  appearance-none pl-10 pr-8 py-1  md:text-[14px] text-[#A47B67] border border-[#cccc] rounded bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#A47B67]"
                    >
                      <option value="price:asc">Giá: Tăng dần</option>
                      <option value="price:desc">Giá: Giảm dần</option>
                      <option value="title:asc">Tên: A-Z</option>
                      <option value="title:desc">Tên: Z-A</option>
                      <option value="createdAt:asc">Cũ nhất</option>
                      <option value="createdAt:desc">Mới nhất</option>
                      <option value="/">Bán chạy nhất</option>
                    </select>

                    {/* Arrow dropdown */}
                    <ArrowDown className="absolute right-3 size-4 text-[#cccc] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Lớp phủ */}
          <div
            onClick={() => setOpened(false)}
            className={`${
              opened ? "opacity-100 visible" : "opacity-0 invisible"
            } fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ease-in-out`}
          ></div>

          {/* Menu */}
          <div
            className={`${
              opened ? "translate-x-0 " : "-translate-x-full "
            } fixed top-0 left-0 z-50 h-dvh w-[80vw] max-w-[400px] p-3.5 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-bold uppercase p-2.5">
                {" "}
                Danh mục sản phẩm
              </span>
              <X
                onClick={() => setOpened(false)}
                className="text-[#88888888] px-[10px] size-[50px] cursor-pointer"
              />
            </div>
            <ul>
              <li>
                <a
                  className="text-[#A47B67] text-[14px] py-[5px] px-2.5 py-[#5px] font-medium inline-block"
                  href=""
                >
                  Sản phẩm khuyến mãi
                </a>
              </li>
              <li>
                <p
                  onClick={() => {
                    setOpened(false);
                    setFilter("1")();
                  }}
                  className="text-[#A47B67] text-[14px] py-[5px] px-2.5 py-[#5px] font-medium inline-block"
                >
                  Sản phẩm nổi bật
                </p>
              </li>
              <li>
                <a
                  className="text-[#A47B67] text-[14px] py-[5px]  px-2.5 py-[#5px] font-medium inline-block "
                  href=""
                >
                  Tất cả sản phẩm
                </a>
              </li>
              <hr className="mx-2.5 border-[#88888888]" />
            </ul>
          </div>
        </div>
        {/* content product list */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-y-3.5">
          {/* Sản phâm 1 */}

          {data?.products.map((item, index) => (
            <Link key={index} to={`/products/${item.slug}`}>
              <div key={index} className="px-[15px]  overflow-hidden ">
                <div className="relative overflow-hidden product-img group aspect-[3/4]">
                  {/* icon */}
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // chặn click lan ra Link
                      setOpendialog(true);
                      setSelectedProduct(item);
                    }}
                    className="
                    absolute top-1/2 opacity- left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-400 group-hover:scale-100 group-hover:opacity-100
                    scale-0 size-[44px] rounded-full bg-white hidden md:flex items-center justify-center 
                    "
                  >
                    <div className="">
                      {" "}
                      <ZoomIn className="size-[22px] text-black" />
                    </div>
                  </div>

                  <div className="">
                    {item.stock === 0 ? (
                      <div className="absolute text-[#a47b67] z-10 product-sale left-[10px] top-[10px] text-[12px] px-[15px] py-[10px] font-bold leading-1  bg-white">
                        Hết hàng
                      </div>
                    ) : (
                      <div className="absolute z-10 product-sale right-[10px] top-[10px] text-[12px] px-[15px] py-[10px] font-bold leading-1 text-[#f94c43] bg-white">
                        {item.discountPercentage &&
                          `-${item.discountPercentage}%`}
                      </div>
                    )}
                    <img
                      className="absolute inset-0 object-cover w-full h-full"
                      src={item.thumbnail[0]}
                      alt={item.title}
                    />

                    <img
                      className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                      src={item.thumbnail[1]}
                      alt={item.title}
                    />
                  </div>
                </div>
                <div className="product-detail pt-2.5 ">
                  <h3>
                    <p
                      // có thể viết là: truncate = overflow-hidden + whitespace-nowrap (không cho xuống dòng) + text-overflow: ellopsis (Hiện ...) : Combo luôn đi chung nhau
                      className="text-[14px] font-medium leading-1.2 overflow-hidden whitespace-nowrap block text-ellipsis"
                      title={item.title}
                    >
                      {item.title}
                    </p>
                  </h3>
                  <div>
                    {/* Giá đã giảm */}
                    {item.discountPercentage ? (
                      <>
                        <span className="text-[14px] text-[#f94c43] font-medium leading-1">
                          {formatPrice(
                            calculateDiscountedPrice(
                              item.price,
                              item.discountPercentage,
                            ),
                          )}
                        </span>
                        {/* Giá gốc */}
                        <span className="ml-2.5 text-[13px] text-[#939393] font-medium leading-1 line-through">
                          {formatPrice(item.price)}
                        </span>
                      </>
                    ) : (
                      <span className="ml-2.5 text-[14px] text-[#000000] font-medium leading-1 ">
                        {formatPrice(item.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* -------------------------------------------------- */}
        {/* dialog */}
        {/* Lớp phủ */}
        <div
          onClick={() => setOpendialog(false)}
          className={`${
            openDialog ? "opacity-100 visible" : "opacity-0 invisible"
          }  fixed inset-0 z-50 w-full h-full transition-opacity duration-300  bg-black/50`}
        ></div>
        {/* -------------------------------------------------- */}
        {/* Phần chính */}
        {/* sử dụng pointer-events-none thay cho invisible(dễ bị giật) vì thằng pointer không ảnh hưởng đến layout, animation  */}
        <div
          className={`${
            openDialog
              ? "opacity-100 scale-100 "
              : "opacity-0 scale-95  pointer-events-none"
          } fixed z-50 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-all duration-300  bg-white left-1/2 cols-12`}
        >
          {/* Close */}
          <div
            onClick={() => setOpendialog(false)}
            className="absolute top-0 right-0 text-black transition-all duration-300 translate-x-0 bg-white cursor-pointe1 hover:bg-black hover:text-white"
          >
            <XIcon className="block w-[30px] h-[30px]  " />
          </div>

          <div className="grid grid-cols-12 p-[16px]">
            <div className="col-span-5 aspect-[3/4]">
              <div className="px-2 mb-[20px]  aspect-[3/4]">
                {/* img product full */}
                <img
                  class=" object-cover h-full w-full overflow-hidden"
                  src={selectedProduct?.thumbnail[indexThumb]}
                  alt={selectedProduct?.title}
                />
              </div>
              {/* Slick small */}
              <div>
                <Slider {...settings}>
                  {selectedProduct?.thumbnail.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setIndexThumb(index)}
                      className="lg:px-1"
                    >
                      <img className="w-full " src={item} alt={item.title} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className="col-span-7 pl-[15px]">
              <div className="product title mb-[10px]  ">
                <h1 className="text-[20px] font-bold leading-tight  text-black">
                  {selectedProduct?.title}
                </h1>
              </div>

              <hr className="border-[#dfe0e1]  border-dotted border-b-[1px]" />

              <div className="flex items-center py-[10px]">
                <span className="inline-block py-[5px] px-2.5 mr-2.5 uppercase font-semibold bg-[#ededed] text-[#f04c43] text-[12px]">
                  -{selectedProduct?.discountPercentage}%
                </span>
                <span className="pr-[10px] font-bold text-[#ff0000] text-[18px] opacity-90">
                  {formatPrice(
                    calculateDiscountedPrice(
                      selectedProduct?.price,
                      selectedProduct?.discountPercentage,
                    ),
                  )}
                </span>
                <del className="pr-[10px] text-[14px] text-[#777a7b] font-medium">
                  {formatPrice(selectedProduct?.price)}
                </del>
              </div>

              {/* Form */}
              <div>
                {/* Select Size */}
                <div>
                  <div className="font-bold text-black text-[14px] my-3">
                    CHỌN SIZE:
                  </div>
                  <div className="flex gap-3 lg:gap-[20px] my-[12px]">
                    {/* Thằng nào soldout sẽ không click được */}
                    {selectedProduct?.sizes?.map((size, idx) => (
                      <label
                        key={idx}
                        className={`relative flex items-center justify-center w-8 h-8 transition-all duration-200 border-2 rounded-md 
                          ${
                            size?.stock === null || size.stock === 0
                              ? "opacity-40 cursor-not-allowed border-gray-300 bg-gray-100"
                              : selectedSize?._id === size._id
                                ? "border-black cursor-pointer  bg-black text-white shadow-md"
                                : "border-gray-300 cursor-pointer  bg-white hover:border-gray-400"
                          }
                          `}
                        onClick={() => {
                          setErrorSize(false);
                          setErrorQuantitySize(false);
                        }}
                      >
                        <input
                          type="radio"
                          name="size"
                          disabled={size.stock === null || size.stock === 0}
                          className="w-0 h-0 opacity-0 "
                          onChange={() => setSelectedSize(size)}
                        />
                        <span className="text-xs font-medium">{size.name}</span>
                      </label>
                    ))}
                  </div>

                  {/* Khi không chọn size */}
                  {errorSize && (
                    <div className="flex items-center my-[16px]">
                      <span className="font-medium text-sm text-[#FF424F]">
                        Vui lòng chọn Phân loại hàng
                      </span>
                    </div>
                  )}
                  {/* Khi chọn nhiều hơn sản phẩm đang còn */}
                  {errorQuantitySize && (
                    <div className="flex items-center my-[16px]">
                      <span className="font-medium text-sm text-[#FF424F]">
                        Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này
                      </span>
                    </div>
                  )}
                  <div className="flex items-center">
                    {selectedSize?.stock && (
                      <span className="font-medium text-sm text-[#757575]">
                        <CheckCircle className="inline w-4 h-4 mr-1" />
                        {selectedSize?.stock} sản phẩm có sẵn
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex my-2.5 flex-col lg:flex-row gap-[20px]">
                  <div className="flex-1 quantity-area">
                    <input
                      className=" qty-btn"
                      type="button"
                      value="-"
                      onClick={() => {
                        setQuantity(Math.max(1, quantity - 1));
                        setErrorQuantitySize(false);
                        setErrorSize(false);
                      }}
                    />
                    <input
                      id="quantity_quickview"
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      min="1"
                    />
                    <input
                      className="qty-btn"
                      type="button"
                      value="+"
                      onClick={() => handleOnClickSize(quantity)}
                    />
                  </div>
                  <div className="flex-2">
                    {/* Khi còn sản phẩm */}
                    <button
                      onClick={() => handleAddToCart(selectedProduct._id)}
                      className="font-bold text-center uppercase md:inline-block btn btn-border-reveal"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
              {/* Chi tiết sản phẩm */}
              <div className="text-center">
                <Link
                  to={`/products/${selectedProduct?.slug}`}
                  className=" text-[12px] text-[#a47b67] font-bold uppercase underline transition-all duration-300 hover:text-black"
                >
                  xem chi tiết sản phâm
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Pagination page={page} totalPage={totalPage} setPage={setPage} />
      </div>
    </div>
  );
}

export default Products;
