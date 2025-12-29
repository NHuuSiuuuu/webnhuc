import { ChevronDown, Menu, ShoppingBag, User } from "lucide-react";
import Tippy from "@tippyjs/react/headless";

function Header() {
  return (
    <div className="bg-[#ffff] shadow-2xs ">
      <div className="container mx-auto md:px-4 ">
        <div className="flex justify-between py-[15px] md:flex">
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
          <div class="flex order-first flex-1 justify-start items-center md:hidden">
            <button>
              <Menu/>
            </button>
          </div>

          {/* User */}
          <div className="flex justify-end md:flex flex-1 md:justify-center items-center flex-wrap gap-1.5">
            <a className="inline-flex items-center">
              <User className="size-8 pr-[10px]" />{" "}
              <p className=" text-[#a47b67]">Hi, Huu Nguyen</p>
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
  );
}

export default Header;
