import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ZoomIn } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
          <a key={item.id} href="">
            <div className="px-2 mb-8 product-card">
              <div className="aspect-[3/4] overflow-hidden relative group">
                <img
                  className="absolute inset-0 object-cover w-full h-full"
                  src="https://product.hstatic.net/1000321269/product/d___n_m_i_0b79d4ad39cb4043bb940ac4150a6283_1024x1024.jpg"
                  alt=""
                />
                {/* icon */}
                <ZoomIn className="opacity-0 size-[30px] absolute transition-opacity duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 group-hover:opacity-100 z-10" />

                {/* Ảnh hover */}
                <img
                  className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                  src="https://scontent.fhph6-1.fna.fbcdn.net/v/t39.30808-6/606026947_858526316908097_515062926806784402_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeFuvnno_aFd-dq5ZhMCYosKgt0xTua6B5WC3TFO5roHlRrm1ehfPfUd5eBUJb_N5-yOqCI43PtiCeFCoZBPQZ8Q&_nc_ohc=MXZm0Z_wpBoQ7kNvwFDhPof&_nc_oc=Adnry7PuPyNGGNAhQxVXzpkYOFyBJG13tBqLYxEFWh8-QiLUqrAnBJuARbCY_xbqa08QJRIbYoikGTxdFOJWwa9t&_nc_zt=23&_nc_ht=scontent.fhph6-1.fna&_nc_gid=P2TxYt-HEOabB29p0h9qdQ&oh=00_AfqtEmOAaXl7LIUZS7BpvRy4AyyOzCH_-1WLdozpNzK6_w&oe=695C4F8F"
                  alt=""
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-[13px]">{item.title}</h3>
                <p className="mt-1">{item.price} d</p>
              </div>
            </div>
          </a>
        ))}
      </Slider>
    </section>
  );
}

export default ProductList;
