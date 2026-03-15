import { ChevronDown, Menu, ShoppingBag, User, X } from "lucide-react";
import Tippy from "@tippyjs/react/headless";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/apis/cart.api";
import CartDrawer from "../cart/CartDrawer";
import MobileNav from "../cart/MobileNav";

function Header({ active }) {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [cartMounted, setCartMounted] = useState(false);
  // Fix bug: gắn transition vào cart drawer SAU khi mount xong
  useEffect(() => {
    setCartMounted(true);
  }, []);
  // Đảm bảo luôn có cart_id ngay khi Header được mount và chỉ chạy 1 lần
  const cart_id = useMemo(() => {
    let id = localStorage.getItem("cart_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("cart_id", id);
    }
    return id;
  }, []); // Chỉ chạy logic này 1 lần khi component này mount

  // console.log(cart_id);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", cart_id],
    queryFn: () => getCart(cart_id),
    enabled: !!cart_id, // chỉ gội api khi tồn tại cart_id
    // Dùng staleTime để tránh gọi API liên tục
    /*Header mount
        → gọi API cart
      Chuyển page
        → dùng lại cache
        → KHÔNG gọi API
      Trong 5 phút
        → vẫn dùng cache **/
    staleTime: 1000 * 60 * 5, // 5 phút
  });

  isLoading && (
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
  {
    if (isError)
      return <p className="p-4 text-sm text-red-500">Không thể tải giỏ hàng</p>;
  }

  return (
    <div>
      <div
        className={`
        fixed z-40 top-0 left-1/2 w-full -translate-x-1/2
        bg-white shadow-xs
        ${active ? "fixed top-0 left-0 z-50 shadow-sm" : "relative"}
      `}
      >
        <div className={`container mx-auto py-0 md:px-4 `}>
          <div
            className={`flex justify-between md:flex transition-all duration-300 ${
              active ? "py-0" : "md:py-[15px]"
            }`}
          >
            {/* Logo */}
            <div className="flex-3 md:flex md:flex-1 justify-center items-center px-[15px]">
              <Link
                href="/"
                className="block text-[40px] text-[20px] text-center"
              >
                {/* <img src="./logo.png" alt="" className="mx-auto size-20" /> */}
                NHUU
              </Link>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex flex-2">
              <nav className="nav">
                <ul className="text-center">
                  <li class="inline-block py-5">
                    <Link to="/products/san-pham-moi">New Arrivals</Link>
                  </li>
                  <li class="inline-block py-5">
                    <Link to="/products">ALL</Link>
                  </li>
                  <li class="inline-block py-5">
                    <Link to="/ao-nu">TOPS</Link>
                  </li>
                  <li class="inline-block py-5">
                    <Link to="/vay">SKIRTS</Link>
                  </li>
                  <li class="inline-block py-5">
                    <Link to="/set-quan-ao-nu">SETS</Link>
                  </li>
                  <li class="inline-block py-5">
                    <Link to="/products">BIKINI</Link>
                  </li>
                  <li class="inline-block py-5">
                    <Link to="/products">ACCESORIES</Link>
                  </li>
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
                            <Link className="clearanceSale">Jacket</Link>
                          </li>
                          <li className="border-b-[1px] border-[#cccccc]">
                            <Link className="clearanceSale">Hoodie</Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  >
                    <li className="inline-block py-5 group">
                      <Link className="inline-flex items-center ">
                        Outerwear
                        <ChevronDown className="transition-transform duration-300 group-hover:rotate-180 h-[18px] font-bold" />
                      </Link>
                    </li>
                  </Tippy>

                  <li class="inline-block py-5">
                    <Link to="/tracking" className="">
                      Tra cứu đơn hàng
                    </Link>
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
              <Link className="inline-flex items-center">
                <User className="size-8 pr-[10px]" />{" "}
                <p className="hidden sm:text-[#a47b67] sm:block">
                  Hi, Huu Nguyen
                </p>
              </Link>
              <Link className="inline-flex items-center">
                <span>
                  <div className="relative">
                    <ShoppingBag
                      onClick={() => {
                        setOpenCart(true);
                      }}
                      className="size-8 pr-[10px]"
                    />
                    <div className="absolute top-0 right-0">
                      <span className="font-bold">{data?.products.length}</span>
                    </div>
                  </div>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lớp phủ khi hiện nav */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed z-40 inset-0 bg-black/50  transition-opacity  duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible" // open ? "opacity-100 " : "hidden": có thể viết như này. Nưng sẽ mất
        }`}
      />

      {/* Nav Mobile */}
      <MobileNav setOpen={setOpen} open={open} />

      {/* Cart Drawer */}
      {/* Phân nav giỏ hàng : Giỏ hàng trượt cạnh màn hình */}
      {/* Lớp phủ khi mở giỏ hàng */}
      <div
        onClick={() => setOpenCart(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          openCart ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
      <CartDrawer
        cartMounted={cartMounted}
        cart_id={cart_id}
        data={data}
        openCart={openCart}
        setOpenCart={setOpenCart}
      />
    </div>
  );
}

export default Header;
