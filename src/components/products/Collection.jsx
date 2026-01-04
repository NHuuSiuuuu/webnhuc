import {
  ArrowDown,
  ArrowDownAZ,
  SlidersHorizontal,
  X,
  XIcon,
  ZoomIn,
} from "lucide-react";
import { useState } from "react";
import Slider from "react-slick";
function Collection() {
  const [opened, setOpened] = useState(false);
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
  };
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
        <div className="px-[15px]  overflow-hidden ">
          <div className="relative overflow-hidden product-img group aspect-[3/4]">
            {/* icon */}
            <ZoomIn
              onClick={() => {
                setOpendialog(true);
                setSelectedProduct(product); // product sau có API mới có
              }}
              className="opacity-0 size-[30px] absolute transition-opacity duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 group-hover:opacity-100 z-10"
            />
            <a href="" className="">
              <div className="absolute z-10 product-sale right-[10px] top-[10px] text-[12px] px-[15px] py-[10px] font-bold leading-1 text-[#f94c43] bg-white">
                -36%
              </div>
              <img
                className="absolute inset-0 object-cover w-full h-full"
                src="https://product.hstatic.net/1000321269/product/vqs_2545_4008a53cb50d4b5880481bd390736501_1024x1024.jpg"
                alt=""
              />

              <img
                className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                src="https://cdn.hstatic.net/products/1000321269/img_3902_6fcb1bb72d2d49d38096a9f4fc103e72_1024x1024.png"
                alt=""
              />
            </a>
          </div>
          <div className="product-detail pt-2.5 ">
            <h3>
              <a
                // có thể viết là: truncate = overflow-hidden + whitespace-nowrap (không cho xuống dòng) + text-overflow: ellopsis (Hiện ...) : Combo luôn đi chung nhau
                className="text-[14px] font-medium leading-1.2 overflow-hidden whitespace-nowrap block text-ellipsis"
                href="/products/tsun-windbreaker-jacket-black"
                title="TSUN Áo Khoác Dù Đen Phối Kim Loại - Windbreaker Jacket - Black"
              >
                TSUN Áo Khoác Dù Đen Phối Kim Loại - Windbreaker Jacket - Black
              </a>
            </h3>
            <div>
              {/* Giá đã giảm */}
              <span className="text-[14px] text-[#f94c43] font-medium leading-1">
                239.000d
              </span>
              {/* Giá gốc */}
              <span className="ml-2.5 text-[13px] text-[#939393] font-medium leading-1">
                339.000d
              </span>
            </div>
          </div>
        </div>

        {/* Sản phẩm 2 */}
        <div className="px-[15px]  overflow-hidden">
          <div className="relative product-img overflow-hidden product-img group aspect-[3/4]">
            <a href="" className="">
              <div className="absolute z-10 sold-out left-[10px] top-[10px] text-[12px] px-[15px] py-[10px] font-bold leading-1 text-[#a47b67] bg-white">
                Hết hàng
              </div>

              <img
                className="absolute inset-0 object-cover w-full h-full"
                src="https://product.hstatic.net/1000321269/product/vqs_2545_4008a53cb50d4b5880481bd390736501_1024x1024.jpg"
                alt=""
              />
              {/* icon */}
              <ZoomIn className="opacity-0 size-[30px] absolute transition-opacity duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 group-hover:opacity-100 z-10" />

              <img
                className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                src="https://cdn.hstatic.net/products/1000321269/img_3902_6fcb1bb72d2d49d38096a9f4fc103e72_1024x1024.png"
                alt=""
              />
            </a>
          </div>
          <div className="product-detail pt-2.5">
            <h3>
              <a
                className="text-[14px] font-medium leading-1.2 overflow-hidden whitespace-nowrap block text-ellipsis"
                href="/products/tsun-windbreaker-jacket-black"
                title="TSUN Áo Khoác Dù Đen Phối Kim Loại - Windbreaker Jacket - Black"
              >
                TSUN Áo Khoác Dù Đen Phối Kim Loại - Windbreaker Jacket - Black
              </a>
            </h3>
            <div>
              {/* Giá gốc */}
              <span className=" text-[14px] text-black font-medium leading-1">
                339.000d
              </span>
            </div>
          </div>
        </div>
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

        <div className="grid grid-cols-12 p-[30px]">
          <div className="col-span-5 aspect-[3/4] pr-[15px]">
            <div>
              {/* img product full */}
              <img
                class=" object-cover overflow-hidden"
                src="//cdn.hstatic.net/products/1000321269/510164626_18513535765043329_2738599444392828056_n_6129f0a806b94d77868f57a338e57c4a_1024x1024.jpg"
                alt="TSUN Candy Mini Skirt - Váy Caro Hồng Dáng Bí"
              />
            </div>
            {/* Slick small */}
            <div>
              <Slider {...settings} className="">
                <div className="pr-2">
                  <img
                    className=""
                    src="https://cdn.hstatic.net/products/1000321269/510164626_18513535765043329_2738599444392828056_n_6129f0a806b94d77868f57a338e57c4a_medium.jpg"
                    alt=""
                  />
                </div>
                <div className="pr-2">
                  <img
                    className=""
                    src="https://product.hstatic.net/1000321269/product/250_7d6680c7ae59448f90340f8e54cef56e_medium.jpg"
                    alt=""
                  />
                </div>
                <div className="pr-2">
                  <img
                    className=""
                    src="http://cdn.hstatic.net/products/1000321269/504147944_18509877691043329_7859555509248107177_n_c58a3e4a9d3044b28b0540dbb1b69d6c_medium.jpg"
                    alt=""
                  />
                </div>
                <div className="pr-2">
                  <img
                    className=""
                    src="https://product.hstatic.net/1000321269/product/504119331_18509877712043329_1477979350154590914_n_451b709723ba4239b71f76bd400b86d8_medium.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://product.hstatic.net/1000321269/product/504184872_18509877703043329_4303556664051632356_n_1d0186c8be3547e188d321a15198f8e0_medium.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://product.hstatic.net/1000321269/product/261_038b7ef89d2a41419f7a0279f33c9c65_medium.jpg"
                    alt=""
                  />
                </div>
              </Slider>
            </div>
          </div>

          <div className="col-span-7 pl-[15px]">
            <div className="product title mb-[10px]    bg-[#c8c8c8]">
              <h1 className="text-[20px] font-bold leading-tight  text-black">
                TSUN Candy Mini Skirt - Váy Caro Hồng Dáng Bí
              </h1>
            </div>

            <hr className="border-[#dfe0e1]  border-dotted border-b-[1px]" />

            <div className="flex items-center py-[10px]">
              <span className="inline-block py-[5px] px-2.5 mr-2.5 uppercase font-semibold bg-[#ededed] text-[#f04c43] text-[12px]">
                -27%
              </span>
              <span className="pr-[10px] font-bold text-[#ff0000] text-[18px] opacity-90">
                479,000d
              </span>
              <del className="pr-[10px] text-[14px] text-[#777a7b] font-medium">
                660,000d
              </del>
            </div>

            {/* Select Size */}
            <div>
              <div className="font-bold text-black text-[14px] my-3">SIZE:</div>
              <div name="" id="" className="my-3 size-wrapper">
                {/* Thằng nào soldout sẽ không click được */}
                <input type="radio" name="size" id="S" value="S" />
                <label htmlFor="S">S</label>
                <input type="radio" name="size" id="M" value="M" />
                <label htmlFor="M">M</label>
                <input type="radio" name="size" id="L" value="L" />
                <label htmlFor="L">L</label>
                <input type="radio" name="size" id="XL" value="XL" />
                <label htmlFor="XL">XL</label>
              </div>
            </div>

            {/* Form */}
            <form action="" className="my-2.5 flex">
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
                <button
                  className="font-bold uppercase btn btn-border-reveal"
                  type="submit"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </form>
            {/* Chi tiết sản phẩm */}
            <div className="text-center">
              <a
                href=""
                className=" text-[12px] text-[#a47b67] font-bold uppercase underline transition-all duration-300 hover:text-black"
              >
                xem chi tiết sản phâm
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
