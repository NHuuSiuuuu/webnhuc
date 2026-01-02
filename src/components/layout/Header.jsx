import { ChevronDown, Menu, ShoppingBag, User, X } from "lucide-react";
import Tippy from "@tippyjs/react/headless";
import { useState } from "react";

function Header({active}) {
  const [open, setOpen] = useState(false);
  return (
    <>
       <div
      className={`
        fixed z-50 top-0 left-1/2 w-full -translate-x-1/2
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
          <div className={`flex justify-between  md:flex transition-all duration-300 ${active? "py-0": "py-[15px]"}`}>
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
                    <ShoppingBag className="size-8 pr-[10px]" />
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
    </>
  );
}

export default Header;
