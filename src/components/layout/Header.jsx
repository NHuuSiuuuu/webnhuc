import { ChevronDown, Menu, ShoppingBag, User, X } from "lucide-react";
import Tippy from "@tippyjs/react/headless";
import { useState } from "react";
import { Link } from "react-router";

function Header({ active }) {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  return (
    <div>
      <div
        className={`
        fixed z-40 top-0 left-1/2 w-full -translate-x-1/2
        bg-white shadow-2xl
        transition-transform duration-300 ease-out
        ${active ? "fixed top-0 left-0 z-50" : "relative"}
      `}
      >
        {/* className={`
            container mx-auto h-full
            transition-all duration-300
            ${active ? "py-0" : "py-4"}
          `}> */}
        <div className={`container mx-auto md:px-4 `}>
          <div
            className={`flex justify-between  md:flex transition-all duration-300 ${
              active ? "py-0" : "py-[15px]"
            }`}
          >
            {/* Logo */}
            <div className="flex-3 md:flex md:flex-1 justify-center items-center px-[15px]">
              <a href="" className="block">
                <img src="./logo.png" alt="" className="mx-auto size-20" />
              </a>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex flex-2">
              <nav className="nav">
                <ul className="text-center">
                  <Tippy
                    placement="bottom"
                    // interactive
                    // visible
                    interactive
                    className="shadow-lg "
                    delay={[100, 150]}
                    offset={[0, 8]}
                    render={(attrs) => (
                      <div className="box" tabIndex="-1" {...attrs}>
                        <ul className="flex flex-col bg-[#ffff] outline-1 outline-amber-50">
                          <li className="border-b-[1px] border-[#cccccc]">
                            <a className="clearanceSale">Áo thun 179k</a>
                          </li>
                          <li className="border-b-[1px] border-[#cccccc]">
                            <a className="clearanceSale">Áo khoác</a>
                          </li>
                          <li className="border-b-[1px] border-[#cccccc]">
                            <a className="clearanceSale">Quần</a>
                          </li>
                          <li className="border-b-[1px] border-[#cccccc]">
                            <a className="clearanceSale">Váy</a>
                          </li>
                        </ul>
                      </div>
                    )}
                  >
                    <li className="inline-block py-5 group">
                      <a className="inline-flex items-center ">
                        Clearance Sale{" "}
                        <ChevronDown className="transition-transform duration-300 group-hover:rotate-180 h-[18px] font-bold" />
                      </a>
                    </li>
                  </Tippy>
                  <li class="inline-block py-5">
                    <a>Mới nhất</a>
                  </li>
                  <li class="inline-block py-5">
                    <a>ALL</a>
                  </li>
                  <li class="inline-block py-5">
                    <a>Áo nữ</a>
                  </li>
                  <li class="inline-block py-5">
                    <a>Váy</a>
                  </li>
                  <li class="inline-block py-5">
                    <a>Set Nữ</a>
                  </li>
                  <li class="inline-block py-5">
                    <a>Bikibi</a>
                  </li>
                  <li className="inline-block py-5 group">
                    <a className="inline-flex items-center ">
                      Quần{" "}
                      <ChevronDown className="transition-transform duration-300 group-hover:rotate-180 h-[18px]" />
                    </a>
                  </li>
                  <li className="inline-block py-5 group">
                    <a className="inline-flex items-center ">
                      Áo khoác{" "}
                      <ChevronDown className="transition-transform duration-300 group-hover:rotate-180 h-[18px]" />
                    </a>
                  </li>
                  <li class="inline-block py-5">
                    <a>Phụ kiện</a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Nav mobile */}
            <div class="flex pl-[15px] order-first flex-1 justify-start items-center md:hidden">
              <button onClick={() => setOpen(!open)}>
                <Menu />
              </button>
            </div>

            {/* User */}
            <div className="flex justify-end pr-[15px] sm:flex flex-1 md:justify-center items-center flex-wrap gap-1.5">
              <a className="inline-flex items-center">
                <User className="size-8 pr-[10px]" />{" "}
                <p className="hidden sm:text-[#a47b67] sm:block">
                  Hi, Huu Nguyen
                </p>
              </a>
              <a className="inline-flex items-center">
                <span>
                  <div className="relative">
                    <ShoppingBag
                      onClick={() => {
                        setOpenCart(true);
                      }}
                      className="size-8 pr-[10px]"
                    />
                    <div className="absolute top-0 right-0">
                      <span className="font-bold">1</span>
                    </div>
                  </div>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lớp phủ khi hiện nav */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed z-9 inset-0 bg-black/50  transition-opacity  duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible" // open ? "opacity-100 " : "hidden": có thể viết như này. Nưng sẽ mất
        }`}
      />

      {/* Nav Mobile */}
      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } fixed z-10 top-0 w-[480px] h-dvh bg-white transform transition-transform duration-300 ease-in shadow-md`}
      >
        <ul className="flex flex-col pt-[60px] pr-[70px] p-[70px] pb-[250px] ">
          <div className="absolute right-0 pr-[70px]">
            <X onClick={() => setOpen(false)} className="size-8" />
          </div>
          <h3 className="block px-4 py-3">Menu</h3>
          <li className="">
            <a className="block px-4 py-3 font-bold">Clearance Sale</a>
          </li>
          <li className="">
            <a className="block px-4 py-3 font-bold">Mới nhất</a>
          </li>
          <li className="">
            <a className="block px-4 py-3 font-bold">ALL</a>
          </li>
          <li className="">
            <a className="block px-4 py-3 font-bold">Áo nữ</a>
          </li>
          <li className="">
            <a className="block px-4 py-3 font-bold">Váy</a>
          </li>
        </ul>
      </aside>

      {/* Cart Drawer */}
      {/* Phân nav giỏ hàng : Giỏ hàng trượt cạnh màn hình */}
      <div
        className={`${
          openCart ? "translate-x-0 " : "translate-x-full pointer-events-none"
        } fixed bg-white w-[550px] z-50 transition-transform  duration-300 top-0 h-full right-0`}
      >
        {/* Giỏ hàng */}
        <div className="pt-[60px] px-[70px] pb-[250px] overflow-hidden">
          <p className="text-[14px] uppercase mt-[3px] text-[#a47b67] font-medium leading-[21px]">
            Giỏ hàng
          </p>
          {/* Sản phẩm */}
          <div className="mt-[50px]">
            <table className="w-full">
              <tbody>
                <tr className="border-b-[#bcbcbc] border-b-[1px] border-dotted">
                  <td className="p-[10px] ">
                    <a href="/">
                      <img
                        className="w-[70px] border-solid border-[#ededed] mr-[10px] object-cover overflow-hidden"
                        src="https://cdn.hstatic.net/products/1000321269/k_ch_th__c_web_to_195fd56c3f7c4c9abf666f7401eb46e2_small.jpg"
                        alt=""
                      />
                    </a>
                  </td>
                  <td className="p-[25px] relative">
                    <a
                      href="/"
                      className="float-left w-full text-[13px] font-semibold uppercase text-[#a47b67]"
                    >
                      TSUN Áo Ngực Hiệu Ứng Da Đính Tag Kim Loại - Triangle
                      Leather-effect Bra
                    </a>
                    {/* Size */}
                    <span className="text-[12px] float-end w-full mt-[5px] mb-3 uppercase">
                      S
                    </span>
                    {/* Số lượng */}
                    <span className="float-left w-auto bg-[#ededed] text-center px-3 py-[6px] text-[12px] mr-3 inline-block">
                      1
                    </span>
                    {/* Giá */}
                    <span className="block float-left text-center leading-[26px] text-[#a47b67] font-medium opacity-70">
                      299,000d
                    </span>
                    {/* Nút xóa sản phẩm trong giỏ hàng */}
                    <span
                      onClick={() => deleteCart()}
                      className="  text-[#a47b67] font-medium absolute right-[10px]"
                    >
                      <X />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <span className="float-left w-full border-t-[#000000] my-[10px] border-t-[2px]"></span>

            {/* Tổng tiền */}
            <table className="w-full">
              <tbody>
                <tr className="">
                  <td className="py-[10px] pr-2.5 text-[14px] text-[#a47b67] uppercase ">
                    Tổng tiền:
                  </td>
                  <td className="py-[10px] pl-2.5 text-[14px] text-right text-[#a47b67] uppercase block ">
                    700,000d
                  </td>
                </tr>

                <tr className="">
                  <td className="">
                    <Link to="/cart">
                      <button
                        className="font-bold uppercase btn btn-border-reveal cl w90 "
                        type="submit"
                      >
                        Xem giỏ hàng
                      </button>
                    </Link>
                  </td>
                  <td className="text-right">
                    <button
                      className="font-bold uppercase btn btn-border-reveal w90"
                      type="submit"
                    >
                      Thanh toán
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="absolute top-0 mt-[50px] right-0 pr-[70px]">
          <X onClick={() => setOpenCart(false)} className="size-8" />
        </div>
      </div>
      <div
        onClick={() => setOpenCart(false)}
        className={`fixed z-40 inset-0 bg-black/50  transition-opacity  duration-300 ${
          openCart ? "opacity-100 visible" : "opacity-0 invisible" // open ? "opacity-100 " : "hidden": có thể viết như này. Nưng sẽ mất
        }`}
      />
    </div>
  );
}

export default Header;
