import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ArrowDown,
  ArrowDownAZ,
  SlidersHorizontal,
  X,
  XIcon,
  ZoomIn,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import Slider from "react-slick";
function Products() {
  const [opened, setOpened] = useState(false);
  const [indexThumb, setIndexThumb] = useState(0);
  const [openDialog, setOpendialog] = useState(false);
  // Sản phẩm được chọn khi zoom in
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  console.log("openDialog", openDialog);
  // console.log(typeof quantity);
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true, // cho phép vuốt tự do không bị cứng 1 bước
  };

  const fetchApi = async () => {
    const res = await axios.get(`http://localhost:3001/api/product/products`);
    return res.data;
  };
  // data: dữ liệu api
  // isLoading: đang loading
  // isError: có lỗi
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchApi,
  });
  console.log(data);
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;

    return price * (1 - discount / 100);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vn-VN", {
      style: "currency",
      currency: "vnd",
    }).format(price);
  };

  if (isLoading) return <div>Loading ....</div>;

  if (isError) return <div>Lỗi rồi</div>;
  console.log(selectedProduct);
  return (
    <div className="container relative mx-auto bg-white ">
      <div className="mb-[15px]">
        <h1 className="text-center my-[15px] font-bold text-[20px] md:hidden">
          Collection
        </h1>
        <div className="section-container">
          {/* collection title */}
          <div className="grid grid-cols-12">
            {/* heading collection */}
            <div
              onClick={() => setOpened(true)}
              className=" col-span-6 flex items-center md:col-span-3  md:text-[14px]  cursor-pointer "
            >
              {" "}
              <i>
                <SlidersHorizontal className="size-[16px] md:size-[20px] mr-2.5 text-[#A47B67]" />
              </i>
              <p className="text-[12px] font-bold md:text-[14px]  text-[#A47B67]">
                Bộ lọc
              </p>
            </div>

            {/* Title */}
            <div className="hidden md:col-span-6 md:block">
              <h1 className="text-[#A47B67] font-bold text-[27px] text-center">
                clearance sale
              </h1>
            </div>

            {/* Filter */}
            <div className="col-span-6 ml-[15px] text-[12px] flex items-center justify-end md:col-span-3 md:text-[14px] md:px-[15px]">
              <form>
                <div className="relative flex items-center">
                  {/* Icon */}
                  <ArrowDownAZ className="absolute left-3 size-3 md:size-4 text-[#A47B67] pointer-events-none" />

                  {/* Select */}
                  <select
                    id="sort-by"
                    name="sort-by"
                    defaultValue="title-ascending"
                    //   appearance-none tắt css mặc định của option
                    className=" text-[12px]  appearance-none pl-10 pr-8 py-1  md:text-[14px] text-[#A47B67] border border-[#cccc] rounded bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#A47B67]"
                  >
                    <option value="manual">Sản phẩm nổi bật</option>
                    <option value="price-ascending">Giá: Tăng dần</option>
                    <option value="price-descending">Giá: Giảm dần</option>
                    <option value="title-ascending">Tên: A-Z</option>
                    <option value="title-descending">Tên: Z-A</option>
                    <option value="created-ascending">Cũ nhất</option>
                    <option value="created-descending">Mới nhất</option>
                    <option value="best-selling">Bán chạy nhất</option>
                  </select>

                  {/* Arrow dropdown */}
                  <ArrowDown className="absolute right-3 size-4 text-[#cccc] pointer-events-none" />
                </div>
              </form>
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
          } fixed top-0 left-0 z-50 h-dvh w-[400px] p-3.5 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out`}
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

      <div className="grid grid-cols-2 md:grid-cols-4  gap-y-3.5">
        {/* Sản phâm 1 */}

        {data.products.map((item, index) => (
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
                  scale-0 size-[44px] rounded-full bg-white flex items-center justify-center 
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
      {/* {selectedProduct && (
       ....
      )} */}
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
          <XIcon className="block   w-[30px] h-[30px]  " />
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
                    className="px-2"
                  >
                    <img className="w-full border" src={item} alt="" />
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
            <form action="" className="">
              {/* Select Size */}
              <div>
                <div className="font-bold text-black text-[14px] my-3">
                  SIZE:
                </div>
                <div name="" id="" className="flex gap-[20px]">
                  {/* Thằng nào soldout sẽ không click được */}
                  {selectedProduct?.sizes.map((it, idx) => (
                    <div key={idx}>
                      {it.stock === null ? (
                        ""
                      ) : (
                        <div>
                          {" "}
                          <label htmlFor={it.idx}>{it.name}</label>
                          <input
                            type="radio"
                            name={it.name}
                            id={it.idx}
                            value=""
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex my-2.5 gap-[20px]">
                <div className="flex-1 quantity-area">
                  <input
                    className=" qty-btn"
                    type="button"
                    value="-"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
                    onClick={() => setQuantity(quantity + 1)}
                  />
                </div>
                <div className="flex-2">
                  {/* Khi còn sản phẩm */}
                  <Link
                    className="inline-block font-bold text-center uppercase btn btn-border-reveal"
                    type="submit"
                  >
                    Thêm vào giỏ
                  </Link>
                </div>
              </div>
            </form>
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
    </div>
  );
}

export default Products;
