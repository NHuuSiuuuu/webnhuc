import { ChevronDown, Menu, ShoppingBag, User, X } from "lucide-react";
import Tippy from "@tippyjs/react/headless";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import CartDrawer from "../cart/CartDrawer";
import MobileNav from "../cart/MobileNav";
import useCart from "@/hooks/useCartId";
import useAuth from "@/hooks/useAuth";

function Header({ active }) {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [cartMounted, setCartMounted] = useState(false);
  // Fix bug: gắn transition vào cart drawer SAU khi mount xong
  useEffect(() => {
    setCartMounted(true);
  }, []);

  const { data: user, isLoading: loadingUser } = useAuth();

  const { data, isLoading, isError, cart_id } = useCart();

  console.log("user", user);

  if (isLoading)
    return (
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  if (isError)
    return (
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  return (
    <div>
      <div
        className={`
        fixed z-40 top-0 left-1/2 w-full -translate-x-1/2
        bg-white shadow-xs
        ${active ? "fixed top-0 left-0 z-50 shadow-sm" : "relative"}
      `}
      >
        <div className={`container mx-auto py-0 md:px-4 py-2`}>
          <div
            className={`flex justify-between md:flex transition-all duration-300 ${
              active ? "py-0" : "md:py-[15px]"
            }`}
          >
            {/* Logo */}
            <div className="flex-3 flex md:flex md:flex-1 justify-center items-center px-[15px]">
              <Link
                to="/"
                className="block md:text-[30px] text-[20px] text-center"
              >
                NHUU Boutique
              </Link>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex flex-2">
              <nav className="nav">
                <ul className="text-center">
                  <li className="inline-block py-5">
                    <Link to="/products/san-pham-moi">New Arrivals</Link>
                  </li>
                  <li className="inline-block py-5">
                    <Link to="/products">ALL</Link>
                  </li>
                  <li className="inline-block py-5">
                    <Link to="/ao-nu">TOPS</Link>
                  </li>
                  <li className="inline-block py-5">
                    <Link to="/vay">SKIRTS</Link>
                  </li>
                  <li className="inline-block py-5">
                    <Link to="/set-quan-ao-nu">SETS</Link>
                  </li>
                  <li className="inline-block py-5">
                    <Link to="/products">BIKINI</Link>
                  </li>
                  <li className="inline-block py-5">
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

                  <li className="inline-block py-5">
                    <Link to="/tracking" className="">
                      Tra cứu đơn hàng
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Nav mobile */}
            <div className="flex pl-[15px] order-first flex-1 justify-start items-center md:hidden">
              <button onClick={() => setOpen(!open)}>
                <Menu />
              </button>
            </div>

            {/* User */}
            <div className="flex justify-end pr-[15px] sm:flex flex-1 md:justify-center items-center flex-wrap gap-1.5">
              <div className="inline-flex items-center">
                {loadingUser ? (
                  <p className="hidden sm:text-[#a47b67] sm:block">...</p>
                ) : user?.data ? (
                  <Link
                    to="/account"
                    className=" hidden sm:text-[#a47b67] sm:block"
                  >
                    Hi, {user?.data?.fullName}
                  </Link>
                ) : (
                  <Link to="/login" className="block text-center">
                    <User className="size-8 pr-[10px] mx-auto" />{" "}
                    <p className="hidden md:block">Đăng nhập</p>
                  </Link>
                )}
              </div>
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
                      <span className="font-bold">
                        {data?.products?.length}
                      </span>
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
