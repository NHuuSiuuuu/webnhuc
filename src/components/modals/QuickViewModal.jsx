import { calculateDiscountedPrice, formatPrice } from "@/utils/price";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CheckCircle, XIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import Slider from "react-slick";

function QuickViewModal({ selectedProduct, openDialog ,setOpendialog}) {
  //   const [openDialog, setOpendialog] = useState(false);
  //   const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorSize, setErrorSize] = useState(false);
  const [errorQuantitySize, setErrorQuantitySize] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [indexThumb, setIndexThumb] = useState(0);
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
      return await axios.post(`http://localhost:3001/api/cart/create`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", cartId]);
      setOpendialog(false)
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    },
  });
  const handleAddToCart = async (productId) => {
    console.log("heheheh")
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

  return (
    <div>
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
            <div>
              {/* Select Size */}
              <div>
                <div className="font-bold text-black text-[14px] my-3">
                  CHỌN SIZE:
                </div>
                <div className="flex gap-[20px] my-[12px]">
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
    </div>
  );
}

export default QuickViewModal;
