import { ChevronDown, Menu, ShoppingBag, User, X } from "lucide-react";
import Tippy from "@tippyjs/react/headless";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { Trash2 } from "lucide-react";
import { Slide, toast, ToastContainer } from "react-toastify";
import { formatPrice, calculateDiscountedPrice } from "../../utils/price";

function Header({ active }) {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const queryClient = useQueryClient();

  // Đảm bảo luôn có cart_id ngay khi Header được mount và chỉ chạy 1 lần
  const cart_id = useMemo(() => {
    let id = localStorage.getItem("cart_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("cart_id", id);
    }
    return id;
  }, []); // Chỉ chạy logic này 1 lần khi component này mount

  const fetchCart = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BACKEND}/cart/get`,
      {
        cart_id,
      },
    );
    return res.data.cart;
  };

  const deleteProductInCartMutation = useMutation({
    mutationFn: (payload) =>
      axios.post(`${import.meta.env.VITE_API_BACKEND}/cart/delete`, payload),

    onSuccess: () => {
      toast.success("Xóa thành công sản phẩm trong giỏ hàng!");
      queryClient.invalidateQueries({
        queryKey: ["cart", cart_id],
      });
    },

    onError: (error) => {
      console.error("Xóa thất bại:", error);
    },
  });

  const handleDeleteProduct = (product_id, size_id) => {
    deleteProductInCartMutation.mutate({
      cart_id: cart_id,
      product_id: product_id,
      size_id: size_id,
    });
  };

  // console.log(cart_id);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", cart_id],
    queryFn: fetchCart,
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
  {
    isLoading && (
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }
  {
    isError && (
      <p className="p-4 text-sm text-red-500">Không thể tải giỏ hàng</p>
    );
  }

  // console.log(data);
  return (
    <div>
      <div
        className={`
        fixed z-40 top-0 left-1/2 w-full -translate-x-1/2
        bg-white shadow-xs
        transition-transform duration-300 ease-out
        ${active ? "fixed top-0 left-0 z-50 shadow-sm" : "relative"}
      `}
      >
        <div className={`container mx-auto md:px-4 `}>
          <div
            className={`flex justify-between md:flex transition-all duration-300 ${
              active ? "py-0" : "py-[15px]"
            }`}
          >
            {/* Logo */}
            <div className="flex-3 md:flex md:flex-1 justify-center items-center px-[15px]">
              <a href="/" className="block text-[40px] text-[20px] text-center">
                {/* <img src="./logo.png" alt="" className="mx-auto size-20" /> */}
                NHUU
              </a>
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
                            <a className="clearanceSale">Jacket</a>
                          </li>
                          <li className="border-b-[1px] border-[#cccccc]">
                            <a className="clearanceSale">Hoodie</a>
                          </li>
                        </ul>
                      </div>
                    )}
                  >
                    <li className="inline-block py-5 group">
                      <a className="inline-flex items-center ">
                        Outerwear
                        <ChevronDown className="transition-transform duration-300 group-hover:rotate-180 h-[18px] font-bold" />
                      </a>
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
                      <span className="font-bold">{data?.products.length}</span>
                    </div>
                  </div>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lớp phủ khi hiện nav */}
      {/* <div
        onClick={() => setOpen(false)}
        className={`fixed z-40 inset-0 bg-black/50  transition-opacity  duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible" // open ? "opacity-100 " : "hidden": có thể viết như này. Nưng sẽ mất
        }`}
      /> */}

      {/* Nav Mobile */}
      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } fixed z-40 top-0 w-full h-dvh bg-white transform transition-transform duration-200 ease-in shadow-md`}
      >
        <ul className="flex flex-col pt-[60px]  p-[50px] pb-[250px] ">
          <div className="absolute right-0 pr-[50px]">
            <X onClick={() => setOpen(false)} className="size-8" />
          </div>
          <h3 className="block px-4 py-3 font-bold">Menu</h3>
          <li className="">
            <Link
              to=""
              onClick={() => setOpen(false)}
              className="block px-4 py-3 "
            >
              Clearance Sale
            </Link>
          </li>
          <li className="">
            <Link
              className="block px-4 py-3 "
              to="/products/san-pham-moi"
              onClick={() => setOpen(false)}
            >
              New Arrivals
            </Link>
          </li>
          <li className="">
            <Link
              to="/products/"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 "
            >
              ALL
            </Link>
          </li>
          <li className="">
            <Link
              onClick={() => setOpen(false)}
              to="/products/"
              className="block px-4 py-3 "
            >
              TOP
            </Link>
          </li>
          <li className="">
            <Link
              to="/products/"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 "
            >
              Skirts
            </Link>
          </li>
          <li className="">
            <Link to="/products/" className="block px-4 py-3 ">
              SET
            </Link>
          </li>
        </ul>
      </aside>

      {/* Cart Drawer */}
      {/* Phân nav giỏ hàng : Giỏ hàng trượt cạnh màn hình */}
      <div
        className={`${
          openCart ? "translate-x-0 " : "translate-x-full pointer-events-none"
        } fixed bg-white md:w-[550px] z-50 transition-transform  duration-300 top-0 h-full right-0`}
      >
        {/* Giỏ hàng */}
        <div className="pt-[60px] px-[40px] md:px-[70px] pb-[250px] overflow-hidden">
          <p className="text-[14px] uppercase mt-[3px] text-[#a47b67] font-medium leading-[21px]">
            Giỏ hàng
          </p>
          {/* Sản phẩm */}

          <>
            <div id="layout-cart">
              <div className="container mx-auto ">
                {/* Cart Container */}
                <div className="px-[15px]">
                  <div>
                    {data?.products?.length === 0 || !data?.products ? (
                      <div className="flex flex-col items-center justify-center gap-4 py-16">
                        <ShoppingBag
                          className="text-[#a47b67] opacity-30"
                          size={48}
                        />
                        <p className="text-[13px] md:text-[15px] uppercase text-[#a47b67]  tracking-widest">
                          Giỏ hàng trống
                        </p>
                        <Link
                          to="/products"
                          className="mt-2 text-[12px] md:text-[13px] uppercase font-semibold border border-[#a47b67] text-[#a47b67] px-6 py-2 hover:bg-[#a47b67] hover:text-white transition-colors"
                          onClick={() => setOpenCart(false)}
                        >
                          Mua sắm ngay
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-col w-full overflow-hidden">
                        {/* Danh sách sản phẩm */}
                        <div className="flex flex-col divide-y divide-dashed divide-[#bcbcbc] overflow-y-auto max-h-[60vh]">
                          {data?.products?.map((item) => {
                            const size = item.product_id?.sizes.find(
                              (s) => s._id === item.size_id,
                            );
                            return (
                              <div
                                key={item?.product_id?._id}
                                className="flex items-start w-full min-w-0 gap-2 py-3 md:gap-3"
                              >
                                {/* Ảnh sản phẩm */}
                                <Link
                                  to={`/products/${item?.product_id?.slug}`}
                                  className="shrink-0"
                                >
                                  <div className="w-[50px] md:w-[65px] aspect-[3/4] overflow-hidden border border-[#ededed]">
                                    <img
                                      className="object-cover w-full h-full"
                                      src={item?.product_id?.thumbnail[0]}
                                      alt={item?.product_id?.title}
                                    />
                                  </div>
                                </Link>

                                {/* Thông tin sản phẩm */}
                                <div className="flex flex-col flex-1 min-w-0 gap-1 overflow-hidden">
                                  <Link
                                    to={`/products/${item?.product_id?.slug}`}
                                    className="block text-[12px] md:text-[14px] font-semibold uppercase text-[#a47b67] leading-tight break-words line-clamp-2"
                                  >
                                    {item?.product_id?.title}
                                  </Link>

                                  {size?.name && (
                                    <span className="text-[11px] md:text-[13px] uppercase text-gray-400 truncate">
                                      Size: {size?.name}
                                    </span>
                                  )}

                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="shrink-0 bg-[#ededed] px-2 py-0.5 text-[11px] md:text-[13px] text-center">
                                      x{item.quantity}
                                    </span>
                                    <span className="text-[12px] md:text-[14px] text-[#a47b67] font-medium truncate">
                                      {formatPrice(
                                        item?.quantity *
                                          calculateDiscountedPrice(
                                            item?.product_id?.price,
                                            item?.product_id
                                              ?.discountPercentage,
                                          ),
                                      )}
                                    </span>
                                  </div>
                                </div>

                                {/* Nút xóa */}
                                <button
                                  onClick={() =>
                                    handleDeleteProduct(
                                      item?.product_id._id,
                                      item?.size_id,
                                    )
                                  }
                                  className=" p-1 text-[#a47b67] hover:opacity-60 transition-opacity"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        {/* Divider */}
                        <div className="w-full mt-2 mb-3 border-t-2 border-black" />

                        {/* Tổng tiền */}
                        <div className="flex items-center justify-between w-full min-w-0 py-1">
                          <span className="text-[13px] md:text-[15px] uppercase text-[#a47b67] shrink-0">
                            Tổng tiền:
                          </span>
                          <span className="text-[13px] md:text-[15px] uppercase text-[#a47b67] font-semibold ml-2 truncate text-right">
                            {formatPrice(
                              data?.products?.reduce((acc, curr) => {
                                return (
                                  acc +
                                  calculateDiscountedPrice(
                                    curr.product_id.price,
                                    curr.product_id.discountPercentage,
                                  ) *
                                    curr.quantity
                                );
                              }, 0),
                            )}
                          </span>
                        </div>

                        {/* Nút hành động */}
                        <div className="flex flex-col w-full gap-2 mt-3">
                          <Link
                            to={`/checkouts/${cart_id}`}
                            className="block w-full text-center font-bold uppercase text-[12px] md:text-[14px] bg-[#94292a] text-white py-2.5 md:py-3 px-4 hover:opacity-80 transition-opacity"
                            onClick={() => setOpenCart(false)}
                          >
                            Thanh toán
                          </Link>
                          <Link
                            to="/cart"
                            className="block w-full"
                            onClick={() => setOpenCart(false)}
                          >
                            <button className="w-full font-bold uppercase text-[12px] md:text-[14px] border border-[#a47b67] text-[#a47b67] py-2.5 md:py-3 hover:bg-[#a47b67] hover:text-white transition-colors">
                              Xem giỏ hàng
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>

        <div className="absolute top-0 mt-[20px] md:mt-[50px] right-0 pr-[20px] md:pr-[70px]">
          <X onClick={() => setOpenCart(false)} className="size-8" />
        </div>
      </div>
    </div>
  );
}

export default Header;
