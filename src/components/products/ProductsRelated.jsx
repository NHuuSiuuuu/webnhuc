import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ZoomIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { calculateDiscountedPrice, formatPrice } from "../../utils/price";
import QuickViewModal from "../modals/QuickViewModal";
import LoadingPage from "../comon/LoadingPage";
import ErrorPage from "../comon/ErrorPage";
import { getProducts } from "@/apis/products.api";
import axios from "../../utils/axios";

function ProductsRelated({ id }) {
  const [openDialog, setOpendialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isDragging, setIsDragging] = useState(false); // giữ chuột và kéo - phải chặn hành vi mặc định của thẻ link khi dragging
  const isDragging = useRef(false); //  Dùng useRef thay useState
  const [sliderConfig, setSliderConfig] = useState({
    slidesToShow: 4,
    rows: 2,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // console.log("width:", width);
      if (width <= 480) {
        setSliderConfig({ slidesToShow: 2, rows: 1, dots: false });
      } else if (width <= 1024) {
        setSliderConfig({ slidesToShow: 3, rows: 1, dots: false });
      } else {
        setSliderConfig({ slidesToShow: 5, rows: 1, dots: false });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products-related", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `/product/related-products/${id}`,
      );
      return data;
    },
  });
  // console.log("isDragging", isDragging);

  // Dùng useMemo tránh slider re-render lại toàn bộ
  const settings = useMemo(
    () => ({
      dots: sliderConfig.dots,
      infinite: true,
      speed: 500,
      slidesToShow: sliderConfig.slidesToShow,
      rows: sliderConfig.rows,
      slidesToScroll: 1,
      slidesPerRow: 1,
      pauseOnHover: false, // thêm dòng này
      pauseOnFocus: false, // thêm dòng này nếu dùng autoplay

      // autoplay: true, // Bật auto
      // autoplaySpeed: 1000, // 5s đổi slide

      swipeToSlide: true, // cho phép vuốt tự do không bị cứng 1 bước

      beforeChange: () => {
        isDragging.current = true;
      }, //  không re-render
      afterChange: () => {
        isDragging.current = false;
      }, //  không re-render
      touchThreshold: 10,

      dotsClass: "slick-dots !-my-[20px] !flex !justify-center ",
    }),
    [sliderConfig],
  );
  console.log(data);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage text="Không thể tải danh sách sản phẩm" />;
  return (
    <div className="relative w-full px-3 mx-auto  mt-2 bg-white sm:px-4  xl:px-18 md:mt-[40px] lg:mt-[40px]">
      <div className="mx-auto "></div>
      <Slider {...settings}>
        {data?.relatedProducts?.map((item) => (
          <Link
            key={item.slug}
            onClick={(e) => {
              if (isDragging.current) {
                e.preventDefault();
              }
            }}
            to={`/products/${item?.slug}`}
          >
            {/* Sản phâm */}
            <div className="px-[15px]  overflow-hidden ">
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
                  {item?.stock === 0 ? (
                    <div className="absolute text-[#a47b67] z-10 product-sale left-[10px] top-[10px] text-[12px] px-[15px] py-[10px] font-bold leading-1  bg-white">
                      Hết hàng
                    </div>
                  ) : (
                    // <div className="absolute z-10 product-sale right-[10px] top-[10px] text-[12px] px-[15px] py-[10px] font-bold leading-1 text-[#f94c43] bg-white">
                    <div className="absolute right-2 top-2 z-20 text-[10px] sm:text-xs px-2 py-1 font-semibold text-red-500 bg-white  shadow ">
                      {item?.discountPercentage &&
                        `-${item?.discountPercentage}%`}
                    </div>
                  )}
                  <img
                    className="absolute inset-0 object-cover w-full h-full"
                    src={item?.thumbnail[0]}
                    alt={item?.title}
                  />

                  <img
                    className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                    src={item?.thumbnail[1]}
                    alt={item?.title}
                  />
                </div>
              </div>
              <div className="product-detail pt-2.5 ">
                <h3>
                  <p
                    // có thể viết là: truncate = overflow-hidden + whitespace-nowrap (không cho xuống dòng) + text-overflow: ellopsis (Hiện ...) : Combo luôn đi chung nhau
                    className="text-[14px] font-medium leading-1.2 overflow-hidden whitespace-nowrap block text-ellipsis"
                    title={item?.title}
                  >
                    {item?.title}
                  </p>
                </h3>
                <div>
                  {/* Giá đã giảm */}
                  {item?.discountPercentage ? (
                    <>
                      <span className="text-[14px] text-[#f94c43] font-medium leading-1">
                        {formatPrice(
                          calculateDiscountedPrice(
                            item?.price,
                            item?.discountPercentage,
                          ),
                        )}
                      </span>
                      {/* Giá gốc */}
                      <span className="ml-2.5 text-[13px] text-[#939393] font-medium leading-1 line-through">
                        {formatPrice(item?.price)}
                      </span>
                    </>
                  ) : (
                    <span className="ml-2.5 text-[14px] text-[#000000] font-medium leading-1 ">
                      {formatPrice(item?.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
      {/* -------------------------------------------------- */}

      <QuickViewModal
        selectedProduct={selectedProduct}
        setOpendialog={setOpendialog}
        openDialog={openDialog}
      />
    </div>
  );
}

export default ProductsRelated;
