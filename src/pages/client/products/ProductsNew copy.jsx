import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ZoomIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { useRef, useEffect, useState } from "react";

function ProductList() {
  // const [isDragging, setIsDragging] = useState(false); // giữ chuột và kéo - phải chặn hành vi mặc định của thẻ link khi dragging

  const isDragging = useRef(false); //  Dùng useRef thay useState

  const [sliderConfig, setSliderConfig] = useState({
    slidesToShow: 4,
    rows: 2,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setSliderConfig({ slidesToShow: 1, rows: 1 });
      } else if (width <= 768) {
        setSliderConfig({ slidesToShow: 2, rows: 1 });
      } else if (width <= 1024) {
        setSliderConfig({ slidesToShow: 3, rows: 2 });
      } else {
        setSliderConfig({ slidesToShow: 4, rows: 2 });
      }
    };

    handleResize(); // chạy 1 lần khi mount (fix bug load lần đầu)
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchApi = async () => {
    const res = await axios.get(`http://localhost:3001/api/product?limit=20`);
    return res.data;
  };
  // data: dữ liệu api
  // isLoading: đang loading
  // isError: có lỗi
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchApi,
  });
  console.log("isDragging", isDragging);

  if (isLoading) return <div>Loading ....</div>;

  if (isError) return <div>Lỗi rồi</div>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: sliderConfig.slidesToShow,
    slidesToScroll: 1,
    rows: sliderConfig.rows,
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
    // appendDots: dots => (  // custom VỎ CHỨA dots
    //   <div
    //     style={{
    //       backgroundColor: "#ddd",
    //       borderRadius: "10px",
    //       padding: "10px"
    //     }}
    //   >
    //     <ul style={{ margin: "0px" }}> {dots} </ul>
    //   </div>
    // ),
    // customPaging: i => ( // custom từng DOT (chấm)
    //   <div
    //     style={{
    //       width: "30px",
    //       color: "#a47b67",
    //       border: "1px #a47b67 solid"
    //     }}
    //   >
    //     {i + 1}
    //   </div>
    // )
  };

  return (
    <section className="mx-auto mt-30 productList section-container">
      <div className="mx-auto ">
        <a
          className="block text-center text-[24px] text-[#a47b67] font-bold uppercase py-8"
          href="tatcasanpham"
        >
          product
        </a>
      </div>
      <Slider {...settings}>
        {data.products.map((item) => (
          <Link
            key={item.id}
            onClick={(e) => {
              if (isDragging.current) {
                e.preventDefault();
              }
            }}
            to={`/products/${item.slug}`}
          >
            {/* Sản phâm 1 */}
            <div className="px-[15px]  overflow-hidden ">
              <div className="relative overflow-hidden product-img group aspect-[3/4]">
                {/* icon */}
                <ZoomIn
                  onClick={() => {
                    setOpendialog(true);
                    setSelectedProduct(item); // product sau có API mới có
                  }}
                  className="opacity-0 size-[30px] absolute transition-opacity duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 group-hover:opacity-100 z-10"
                />
                <p to={`products/:slug`} className="">
                  <div className="absolute z-10 product-sale right-[10px] top-[10px] text-[12px] px-[15px] py-[10px] font-bold leading-1 text-[#f94c43] bg-white">
                    {item.discountPercentage}%
                  </div>
                  <img
                    className="absolute inset-0 object-cover w-full h-full"
                    src={item.thumbnail[0]}
                    alt=""
                  />

                  <img
                    className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                    src={item.thumbnail[1]}
                    alt=""
                  />
                </p>
              </div>
              <div className="product-detail pt-2.5 ">
                <h3>
                  <a
                    // có thể viết là: truncate = overflow-hidden + whitespace-nowrap (không cho xuống dòng) + text-overflow: ellopsis (Hiện ...) : Combo luôn đi chung nhau
                    className="text-[14px] font-medium leading-1.2 overflow-hidden whitespace-nowrap block text-ellipsis"
                    href="/products/tsun-windbreaker-jacket-black"
                    title="TSUN Áo Khoác Dù Đen Phối Kim Loại - Windbreaker Jacket - Black"
                  >
                    {item.title}
                  </a>
                </h3>
                <div>
                  {/* Giá đã giảm */}
                  <span className="text-[14px] text-[#f94c43] font-medium leading-1">
                    239.000d
                  </span>
                  {/* Giá gốc */}
                  <span className="ml-2.5 text-[13px] text-[#939393] font-medium leading-1">
                    {item.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </section>
  );
}

export default ProductList;
