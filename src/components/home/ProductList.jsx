import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ZoomIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

function ProductList() {
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

  if (isLoading) return <div>Loading ....</div>;

  if (isError) return <div>Lỗi rồi</div>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
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
    <section className="container mx-auto mt-30 productList section-container">
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
          <Link key={item.id} to={`/products/${item.slug}`}>
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
