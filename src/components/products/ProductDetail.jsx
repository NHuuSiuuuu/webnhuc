import { useState } from "react";
// import thư viện tab
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    // product detail
    <div id="product" className="mt-[40px]">
      <div className="container mx-auto">
        <div className="grid-cols-12 md:grid mb-[40px]">
          {/* LEFT:  Img Product */}
          <div className="col-span-7 px-[15px]">
            <div className="hidden md:grid grid-cols-2 aspect-[3/4] gap-x-[10px]">
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
              </div>{" "}
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
                  NHuu Dual Line Hoodie - Black
                </h1>
              </div>
              <hr className=" border-[#dfe0e1]  border-dotted mt-[10px] pb-[10px]" />

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
                <div className="font-bold text-black text-[14px] my-3">
                  SIZE:
                </div>
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
              <form action="" className="my-2.5 w-full md:float-left">
                <div className="w-[134px] md:float-left mb-[15px] quantity-area">
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
                <div className="md:pl-[15px] md:float-left ">
                  {/* Khi còn sản phẩm */}
                  <button
                    className="w-full font-bold uppercase btn btn-border-reveal"
                    type="submit"
                  >
                    Thêm vào giỏ
                  </button>

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
                            •&nbsp;Form
                          </strong>
                        </strong>{" "}
                        : Regular-Fit phù hợp cho cả nam và nữ
                        <br />
                        <strong className="font-bold text-[14px] text-[#a47b67]">
                          •&nbsp;Chất liệu
                        </strong>
                        : Nỉ bông
                        <br />
                        <strong className="font-bold text-[14px] text-[#a47b67]">
                          •&nbsp;Họa tiết
                        </strong>
                        : Thêu nổi
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
                        - Các bước mua hàng tại Web TSUN:
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
            <h2 className="mt-[10px] mb-[50px]">Sản phâm liên quan</h2>
          </div>
        </div>
        <div className="h-dvh"></div>
      </div>
    </div>
  );
}

export default ProductDetail;
