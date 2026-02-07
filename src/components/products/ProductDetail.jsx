import { useState } from "react";
// import thư viện tab
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import { formatPrice, calculateDiscountedPrice } from "../../utils/price";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorSize, setErrorSize] = useState(false);
  const [errorQuantitySize, setErrorQuantitySize] = useState(false);
  const { slug } = useParams();
  /* =======================
    API chi tiết sản phẩm
  =======================*/
  const fetchProductDetail = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/product/detail/${slug}`,
    );
    return res.data.product;
  };
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product-detail", slug],
    queryFn: fetchProductDetail,
  });

  let cartId = localStorage.getItem("cart_id");
  if (!cartId) {
    cartId = crypto.randomUUID();
    localStorage.setItem("cart_id", cartId);
  }

  console.log(selectedSize);
  const [quantity, setQuantity] = useState(1);
  //API add cart
  // Tạo cart id

  const handleOnClickSize = (quantity) => {
    if (selectedSize.stock > quantity) {
      setQuantity(quantity + 1);
    } else {
      setErrorQuantitySize(true);
      // alert("hết hàng");
      return;
    }
  };
  const handleOnChangeSize = (quantity) => {
    if (selectedSize.stock > quantity) {
      setQuantity(quantity + 1);
    } else {
      setErrorQuantitySize(true);
      // alert("hết hàng");
      return;
    }
  };

  const handleAddToCart = async (productId) => {
    if (!selectedSize) {
      setErrorSize(true);
      return;
    }
    const payload = {
      cart_id: cartId,
      product_id: productId,
      quantity: quantity,
      size_id: selectedSize?._id,
    };
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
    console.log(payload);
    await axios.post(`http://localhost:3001/api/cart/create`, payload);
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
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
  return (
    // product detail
    <div id="product" className="mt-[40px]">
      <div className="container mx-auto">
        <div className="grid-cols-12 md:grid mb-[40px]">
          {/* LEFT:  Img Product */}
          <div className="col-span-7 px-[15px]">
            <div className="hidden md:grid grid-cols-2 aspect-[3/4] gap-[10px]">
              {product.thumbnail.map((item, index) => (
                <div key={index}>
                  <img className="" src={item} alt={product.title} />
                </div>
              ))}
            </div>
            <div className="block mx-auto md:hidden mb-[10px]">
              <Slider {...settings}>
                <div>
                  <img
                    className=""
                    src="https://product.hstatic.net/1000321269/product/6185c6ac63ffb5a1ecee_18cee4d9a56f4e0c95349922f9b908a0_master.jpg"
                    alt=""
                  />
                </div>

                <div>
                  <img
                    className=""
                    src="https://product.hstatic.net/1000321269/product/ban_sao_cua_dsc_5664_4b65d2fa7e9648579e753296743c2323_master.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className=""
                    src="https://product.hstatic.net/1000321269/product/2550c01cf3485a1603593_af9235564468401799189f91315acfce_master.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://product.hstatic.net/1000321269/product/9b5b75c0291ffe41a70e_fc77365fe66c4273b4f1976edb0f42c7_master.jpg"
                    alt=""
                  />
                </div>
              </Slider>
            </div>
          </div>
          {/*END LEFT:  Img Product */}

          {/* RIGH */}
          <div className="col-span-5 px-[15px]">
            <div className="md:sticky md:top-[100px]">
              <div className="block">
                <h1 className="text-[20px] font-bold mt-[5px] block leading-tight ">
                  {product.title}
                </h1>
              </div>
              <hr className=" border-[#dfe0e1]  border-dotted mt-[10px] pb-[10px]" />

              <div className="flex items-center py-[10px]">
                <span className="inline-block py-[5px] px-2.5 mr-2.5 uppercase font-semibold bg-[#ededed] text-[#f04c43] text-[12px]">
                  {product.discountPercentage}%
                </span>
                <span className="pr-[10px] font-bold text-[#ff0000] text-[18px] opacity-90">
                  {formatPrice(
                    calculateDiscountedPrice(
                      product.price,
                      product.discountPercentage,
                    ),
                  )}
                </span>
                <del className="pr-[10px] text-[14px] text-[#777a7b] font-medium">
                  {formatPrice(product.price)}
                </del>
              </div>

              {/* Select Size */}
              <div
                className={`mb-6 ${errorSize || errorQuantitySize ? "bg-[#fff5f5]" : "bg-[#ffffff]"} `}
              >
                <div className="font-bold text-black text-[16px] mb-4 uppercase tracking-wide">
                  CHỌN SIZE:
                </div>

                <div className="flex flex-wrap gap-3">
                  {product.sizes?.map((size) => (
                    <label
                      key={size._id}
                      className={` relative w-10 h-10 flex items-center justify-center rounded-md border-2   transition-all duration-200 
                              ${
                                size?.stock === null || size.stock === 0
                                  ? "opacity-40 cursor-not-allowed border-gray-300 bg-gray-100"
                                  : selectedSize?._id === size._id
                                    ? "border-black cursor-pointer  bg-black text-white shadow-md"
                                    : "border-gray-300 cursor-pointer  bg-white hover:border-gray-400"
                              }
                            `}
                    >
                      <input
                        type="radio"
                        name="size"
                        className="absolute w-0 h-0 opacity-0"
                        disabled={size.stock === null}
                        onClick={() => {
                          setErrorQuantitySize(false);
                          setErrorSize(false);
                        }}
                        onChange={() => setSelectedSize(size)}
                      />
                      <span className="text-sm font-medium">{size.name}</span>
                    </label>
                  ))}
                </div>
                {errorSize && (
                  <div className="flex items-center my-[16px]">
                    <span className="font-medium text-[#FF424F]">
                      Vui lòng chọn Phân loại hàng
                    </span>
                  </div>
                )}

                {errorQuantitySize && (
                  <div className="flex items-center my-[16px]">
                    <span className="font-medium text-[#FF424F]">
                      Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                {selectedSize?.stock && (
                  <span className="font-medium text-[#757575]">
                    <CheckCircle className="inline w-4 h-4 mr-1" />
                    {selectedSize?.stock} sản phẩm có sẵn
                  </span>
                )}
              </div>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="w-full font-bold uppercase btn btn-border-reveal"
              >
                Thêm vào giỏ
              </button>
              {/* Form */}
              <form action="" className="my-2.5 w-full md:float-left">
                <div className="w-[134px] md:float-left mb-[15px] quantity-area">
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
                    onChange={(e) => handleOnChangeSize(Number(e.target.value))}
                    min="1"
                  />
                  <input
                    className="qty-btn"
                    type="button"
                    value="+"
                    onClick={() => handleOnClickSize(quantity)}
                  />
                </div>
                <div className="md:pl-[15px] md:float-left ">
                  {/* Khi còn sản phẩm */}
                  <button
                    className="font-bold uppercase w-full btn btn-border-reveal mt-[15px]"
                    type="submit"
                  >
                    Mua ngay
                  </button>
                </div>
              </form>

              {/* Tab Product */}
              <div>
                <Tabs defaultValue="proTabs1" className="w-full">
                  <TabsList>
                    <TabsTrigger value="proTabs1">Mô tả</TabsTrigger>
                    <TabsTrigger value="proTabs2">
                      Chính sách đổi trả tại Nhuu
                    </TabsTrigger>
                    <TabsTrigger value="proTabs3">
                      Hướng dẫn mua hàng
                    </TabsTrigger>
                  </TabsList>
                  <br />
                  <hr className="text-[#888888] md:hidden" />

                  <TabsContent value="proTabs1">
                    <div className="">
                      <p className="mb-[10px] leading-6 text-[#a47b67] ">
                        <strong className="font-bold text-[14px] text-[#a47b67]">
                          Chi tiết sản phẩm
                        </strong>
                        <br />
                        <br />
                        <strong>
                          <strong className="font-bold text-[14px] text-[#a47b67]">
                            {product.description}
                          </strong>
                        </strong>{" "}
                      </p>
                      <p className="block text-center">
                        <img
                          className="object-cover w-full"
                          src="https://file.hstatic.net/1000321269/file/dual_hd_57e4409aee3b41d9ad03dabd81db1ebb_grande.jpg"
                          alt=""
                        />
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="proTabs2">
                    <div>
                      <p className="text-[#231f20] leading-normal text-[15px] font-bold">
                        Khách hàng được đổi hoặc trả sản phẩm trong vòng 07 ngày
                        kể từ ngày nhận được sản phẩm.
                      </p>
                      <br />
                      <br />
                      <p className="text-[#231f20] leading-normal text-[15px] font-bold">
                        Điều kiện đổi/trả sản phẩm:
                      </p>
                      <p className=" leading-normal  text-[#a47b67] text-[14px]">
                        _ Thời gian trong vòng 7 ngày kể từ lúc nhận được hàng
                      </p>
                      <p className=" leading-normal  text-[#a47b67] text-[14px]">
                        _ Sản phẩm chưa qua sử dụng ( mặc, giặt )
                      </p>
                      <p className="mb-[11px] leading-normal  text-[#a47b67] text-[14px]">
                        _ Sản phẩm trong chương trình giảm giá, ưu đãi không
                        được áp dụng{" "}
                      </p>
                      <p className=" leading-normal italic mb-[11px] text-[#a47b67] text-[14px]">
                        * Đối với trường hợp đơn hàng nhận được bị thiếu sản
                        phẩm, thủng rách hoặc dính bẩn sẽ được hỗ trợ giải quyết
                        khi khách hàng cung cấp đầy đủ clip mở hàng, hóa đơn và
                        mạc tag. ( bao đóng gói bên shop đã được dán lưu ý khách
                        hàng vui lòng quay clip trong quá trình mở hàng ).
                      </p>
                      {/* Quy trình đổi trả hàng */}
                      <p className="text-[#231f20] leading-normal text-[15px] font-bold">
                        Quy trình đổi/ trả hàng:
                      </p>
                      <p className=" leading-normal  text-[#333] text-[14px]">
                        Bước 1: Gọi qua số hotline hoặc liên hệ trực tiếp page
                        FB hoặc IG của NHuu
                      </p>
                      <p className=" leading-normal  text-[#333] text-[14px]">
                        Bước 2: NHuu sẽ kiểm tra điều kiện đổi/ trả của đơn hàng
                      </p>
                      <p className=" leading-normal mb-[11px] text-[#333] text-[14px]">
                        Bước 3: NHuu xác nhận với khách hàng về sản phẩm và thời
                        gian đổi/ trả hàng
                      </p>

                      {/* Quy định về thời gian thông báo và gửi sản phẩm đổi trả */}
                      <p className="text-[#231f20] leading-normal text-[15px] font-bold">
                        Quy định về thời gian thông báo và gửi sản phẩm đổi trả
                      </p>
                      <p className=" leading-normal  text-[#333] text-[14px]">
                        _ <strong>Trường hợp đổi hàng:</strong> Ngay khi xác
                        nhận chúng mình sẽ gửi lại cho đơn hàng mới, khách hàng
                        chỉ cần chờ shipper từ 2-4 ngày đến tận nơi để đổi hàng
                        là hoàn tất. Phí dịch vụ đổi hàng là 30,000 với khu vực
                        nội thành HN và 45,000 với khu vực ngoại thành HN.
                      </p>
                      <p className=" mb-[11px]  leading-normal  text-[#333] text-[14px]">
                        _ <strong>Trường hợp trả hàng</strong>: NHuu sẽ hoàn lại
                        tiền hàng ( không bao gồm tiền phí vận chuyển ). Khách
                        hàng vui lòng gửi lại hàng cho NHuu, sau khi xác nhận đã
                        nhận được hàng gửi về, NHuu sẽ hoàn lại tiền cho khách
                        hàng trong vòng 24h qua tài khoản ngân hàng.
                      </p>
                      <p className=" mb-[11px]  leading-normal  text-[#333] text-[14px]">
                        * Chỉ áp dụng cho sản phẩm lỗi từ nhà sản xuất
                      </p>

                      {/* Lưu ý: */}
                      <p className="text-[#231f20] leading-normal text-[15px] font-bold">
                        Lưu ý:
                      </p>
                      <p className=" leading-normal  text-[#333] text-[14px]">
                        _ NHuu hỗ trợ đổi hàng tối đa 1 lần/1 khách hàng.
                      </p>
                      <p className="mb-[11px] leading-normal  text-[#333] text-[14px]">
                        _ NHuu có quyền quyết định dừng việc hỗ trợ đổi trả và
                        trả lại tiền cho khách hàng nếu phát hiện khách hàng sử
                        dụng chính sách để trục lợi ( như việc đổi quá nhiều lần
                        ).
                      </p>

                      {/* Chúng tôi làm gì với hàng đổi trả: */}
                      <p className="text-[#231f20] mb-[11px]  leading-normal text-[15px] font-bold">
                        Chúng tôi làm gì với hàng đổi trả:
                      </p>
                      <p className=" leading-normal   text-[#333] text-[14px]">
                        Các sản phẩm lỗi sẽ được thu gom và gửi cho các chương
                        trình từ thiện.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="proTabs3">
                    <div>
                      <p className="text-[#a47b67] leading-normal text-[15px] font-bold">
                        Hướng dẫn sử dụng website NHuu:
                      </p>
                      <br />

                      <p className=" leading-normal mb-[10px]  text-[#a47b67] text-[14px]">
                        - Các bước mua hàng tại Web NHuu:
                      </p>
                      <p className=" leading-normal mb-[10px]  text-[#a47b67] text-[14px]">
                        <p>
                          + Chọn sản phẩm -&gt; chọn Size sản phẩm -&gt; thêm
                          vào giỏ hàng -&gt; thanh toán
                        </p>
                      </p>
                      <p className=" leading-normal mb-[10px]  text-[#a47b67] text-[14px]">
                        (Trong trường hợp các bạn mua nhiều sản phẩm, các bạn
                        thêm từng sản phẩm vào giỏ hàng, sau khi đã đủ sản phẩm
                        và số lượng , các bạn vui lòng kiểm tra thật kỹ giỏ hàng
                        và ấn THANH TOÁN)
                      </p>
                      <p className=" leading-normal mb-[10px]  text-[#a47b67] text-[14px]">
                        <p>
                          + Chọn sản phẩm -&gt; chọn Size sản phẩm -&gt; thêm
                          vào giỏ hàng -&gt; thanh toán
                        </p>
                      </p>
                      <p className=" leading-normal mb-[10px]  text-[#a47b67] text-[14px]">
                        (Trong trường hợp các bạn mua nhiều sản phẩm, các bạn
                        thêm từng sản phẩm vào giỏ hàng, sau khi đã đủ sản phẩm
                        và số lượng , các bạn vui lòng kiểm tra thật kỹ giỏ hàng
                        và ấn THANH TOÁN)
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center">
            <h2 className="mt-[10px] mb-[50px] font-medium uppercase text-[28px]">
              Sản phẩm liên quan
            </h2>
          </div>
        </div>
        {/* <div className="h-dvh"></div> */}
      </div>
    </div>
  );
}

export default ProductDetail;
