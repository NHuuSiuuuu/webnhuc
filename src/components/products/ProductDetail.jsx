import { useState } from "react";
// import thư viện tab
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../utils/axios";
import { formatPrice, calculateDiscountedPrice } from "../../utils/price";
import { CheckCircle } from "lucide-react";
import LoadingPage from "../comon/LoadingPage";
import ErrorPage from "../comon/ErrorPage";

import { getProductDetail } from "../../apis/products.api";
import { addToCart } from "@/apis/cart.api";
import SeoHead from "@/components/comon/SeoHead";
import ProductsRelated from "@/components/products/ProductsRelated";

function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorSize, setErrorSize] = useState(false);
  const [errorQuantitySize, setErrorQuantitySize] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);

  /* =======================
    Lấy cart_id từ localStorage
  =======================*/
  let cartId = localStorage.getItem("cart_id");
  if (!cartId) {
    cartId = crypto.randomUUID();
    localStorage.setItem("cart_id", cartId);
  }

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product-detail", slug],
    queryFn: () => getProductDetail(slug),
  });

  /* =======================
    Thêm sản phẩm vào giỏ
  =======================*/
  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
    },
    onError: (error) => {
      alert(error.response?.data.message || "Thêm vào giỏ hàng thất bại");
    },
  });

  /* =======================
    Mua hàng
  =======================*/
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
    // console.log(payload);
    mutate(payload);
  };

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

  const handleBuyNow = async (productId) => {
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
    await axios.post(
      `${import.meta.env.VITE_API_BACKEND}/cart/create`,
      payload,
    );
    // Cập nhật lại dữ liệu giỏ hàng cho Header và cart drawer
    queryClient.invalidateQueries(["cart", cartId]);
    navigate(`/checkouts/${cartId}`);
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;
  return (
    // product detail
    <div id="product" className="mt-[40px]">
      <SeoHead
        title={product?.title}
        image={product?.thumbnail?.[0]}
        description={product?.description}
      />

      <div className="container mx-auto">
        <div className="grid-cols-12 lg:grid mb-[40px]">
          {/* LEFT:  Img Product */}
          <div className="col-span-7 px-[15px]">
            <div className="hidden lg:grid grid-cols-2 aspect-[3/4] gap-[10px]">
              {product.thumbnail.map((item, index) => (
                <div key={index}>
                  <img className="" src={item} alt={product.title} />
                </div>
              ))}
            </div>
            <div className="block mx-auto lg:hidden lg-[10px]">
              <Slider {...settings}>
                {product.thumbnail.map((item, index) => (
                  <div key={index}>
                    <img className="" src={item} alt={product.title} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          {/*END LEFT:  Img Product */}

          {/* RIGH */}
          <div className="col-span-5 px-[15px]">
            <div className="lg:sticky md:top-[100px]">
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
                        disabled={size.stock === null || size.stock === 0}
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

              <div className="my-2.5 w-full items-start gap-6 md:flex ">
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
                <div className="md:flex-1">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="font-bold uppercase w-ful1 btn btn-border-reveal"
                  >
                    {isPending ? "Đang thêm..." : "Thêm vào giỏ"}
                  </button>
                  {/* Khi còn sản phẩm */}
                  <button
                    onClick={() => handleBuyNow(product._id)}
                    className="font-bold uppercase w-full btn btn-border-reveal mt-[15px]"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>

              {/* Tab Product */}
              <div>
                <Tabs defaultValue="proTabs1" className="w-full">
                  <TabsList className="flex flex-wrap gap-x-3 gap-y-2">
                    <TabsTrigger value="proTabs1">Mô tả</TabsTrigger>
                    <TabsTrigger value="proTabs2">
                      Chính sách đổi trả tại Nhuu
                    </TabsTrigger>
                    <TabsTrigger className="" value="proTabs3">
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
            <h2 className="mt-[10px]  font-medium uppercase text-[28px]">
              Sản phẩm liên quan
            </h2>
          </div>
          <ProductsRelated id={product?._id} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
