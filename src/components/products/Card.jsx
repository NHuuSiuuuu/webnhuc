import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

function Cart() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div id="layout-cart">
      <div className="container mx-auto ">
        <div className="pb-[30px] after:w-[60px] after:h-[4px] after:bg-[#252a2b] after:mt-[25px] after:content-[''] after:block after:mx-auto">
          <h1 className="text-[30px] mt-[10px] text-center font-bold">
            Giỏ hàng của bạn
          </h1>
          <p className="mb-2.5 text-[14px] text-[#a47b67] text-center leading-[21px]">
            Có <strong>2 sản phẩm</strong> trong giỏ hàng
          </p>
        </div>

        {/* Cart Container */}
        <div className="px-[15px]">
          <form action="/cart">
            {/* table cart */}
            <div>
              <table className="w-full">
                <tbody>
                  <tr className=" border-b-[#ededed] my-[10px] border-dotted border-b-[1px]">
                    {/* Ảnh */}
                    <td>
                      <a href="">
                        <img
                          className="max-w-[100px]"
                          src="https://cdn.hstatic.net/products/1000321269/k_ch_th__c_web_to_195fd56c3f7c4c9abf666f7401eb46e2_medium.jpg"
                          alt=""
                        />
                      </a>
                    </td>
                    {/* Tên sản phẩm giá ... */}
                    <td className="py-[20px] pl-[15px]">
                      <a href="">
                        <h3 className="mb-[5px] text-[16px] font-bold inline text-left text-[#a47b67]">
                          TSUN Áo Ngực Hiệu Ứng Da Đính Tag Kim Loại - Triangle
                          Leather-effect Bra
                        </h3>
                      </a>
                      <p className="mb-[5px] text-left text-[#a47b67] leading-[21px]">
                        299,000
                      </p>
                      <p className="mb-[5px] text-left text-[#a47b67] leading-[21px] uppercase">
                        S
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="quantity-area quantity-cart">
                          <input
                            className="text-[#abafb2] qty-btn "
                            type="button"
                            value="-"
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                          />
                          <input
                            className="text-[16px] bg-[#ededed] text-[#a47b67]"
                            id="quantity_quickview"
                            type="text"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                            min="1"
                          />
                          <input
                            className=" text-[#abafb2] qty-btn"
                            type="button"
                            value="+"
                            onClick={() => setQuantity(quantity + 1)}
                          />
                        </div>

                        <p className="font-medium text-left text-[16px] leading-[21px] text-[#a47b67]">
                          {quantity * Number(299)}
                        </p>
                      </div>
                    </td>
                    {/* Xóa sản phẩm trong giỏ */}
                    <td>
                      <a href="" title="Xóa sản phẩm này">
                        <Trash2 className="text-[#FF0000] size-[20px]" />
                      </a>
                    </td>
                  </tr>

                  <tr className=" border-b-[#ededed] my-[10px] border-dotted border-b-[1px]">
                    {/* Ảnh */}
                    <td>
                      <a href="">
                        <img
                          className="max-w-[100px]"
                          src="https://cdn.hstatic.net/products/1000321269/k_ch_th__c_web_to_195fd56c3f7c4c9abf666f7401eb46e2_medium.jpg"
                          alt=""
                        />
                      </a>
                    </td>
                    {/* Tên sản phẩm giá ... */}
                    <td className="py-[20px] pl-[15px]">
                      <a href="">
                        <h3 className="mb-[5px] text-[16px] font-bold inline text-left text-[#a47b67]">
                          TSUN Áo Ngực Hiệu Ứng Da Đính Tag Kim Loại - Triangle
                          Leather-effect Bra
                        </h3>
                      </a>
                      <p className="mb-[5px] text-left text-[#a47b67] leading-[21px]">
                        299,000
                      </p>
                      <p className="mb-[5px] text-left text-[#a47b67] leading-[21px] uppercase">
                        S
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="quantity-area quantity-cart">
                          <input
                            className="text-[#abafb2] qty-btn "
                            type="button"
                            value="-"
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                          />
                          <input
                            className="text-[16px] bg-[#ededed] text-[#a47b67]"
                            id="quantity_quickview"
                            type="text"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                            min="1"
                          />
                          <input
                            className=" text-[#abafb2] qty-btn"
                            type="button"
                            value="+"
                            onClick={() => setQuantity(quantity + 1)}
                          />
                        </div>

                        <p className="font-medium text-left text-[16px] leading-[21px] text-[#a47b67]">
                          {quantity * Number(299)}
                        </p>
                      </div>
                    </td>
                    {/* Xóa sản phẩm trong giỏ */}
                    <td>
                      <a href="" title="Xóa sản phẩm này">
                        <Trash2 className="text-[#FF0000] size-[20px]" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Thanh toán */}
            <div className=" md:flex mt-[40px]">
              <div className="flex-1 ">
                <textarea
                  name=""
                  id="note"
                  placeholder="Ghi chú"
                  className="bg-[#ededed] focus:ring-0 w-full h-[130px] outline-none border-solid border-[1px] border-transparent text-[#a47b67] text-[15px] resize-none p-[20px] font-medium"
                ></textarea>
              </div>
              <div className="flex-1 px-[15px] text-right">
                <p className="text-[16px] leading-[21px] text-[#a47b67] mt-[20px] font-medium mb-[40px] ">
                  Tổng tiền:{" "}
                  <b className="font-bold text-[30px] ml-[7px]">1,492,000₫</b>
                </p>
                <div>
                  <div className="md:flex md:w-[70%] justify-between md:float-right gap-[10px]">
                    <Link to="/cart" className="flex-1 block mb-[10px] md:mb-0">
                      <button
                        className="font-bold uppercase btn btn-border-reveal cl "
                        type="submit"
                      >
                        Tiếp tục mua hàng
                      </button>
                    </Link>

                    <button
                      className="flex-1 font-bold uppercase btn btn-border-reveal "
                      type="submit"
                    >
                      Thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="h-dvh"></div>
      </div>
    </div>
  );
}

export default Cart;
