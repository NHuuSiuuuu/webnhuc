import { ChevronDown, Menu, ShoppingBag, User, X } from "lucide-react";
import Tippy from "@tippyjs/react/headless";
import { useState } from "react";
import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { Trash2 } from "lucide-react";
import { Slide, toast, ToastContainer } from "react-toastify";
import { formatPrice, calculateDiscountedPrice } from "../../utils/price";

function Header({ active }) {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const cart_id = localStorage.getItem("cart_id");
  const queryClient = useQueryClient();
  const [errorQuantitySize, setErrorQuantitySize] = useState(false);

  const fetchCart = async () => {
    const res = await axios.post(`http://localhost:3001/api/cart/get`, {
      cart_id,
    });
    return res.data.cart;
  };

  const deleteProductInCartMutation = useMutation({
    mutationFn: (payload) =>
      axios.post(`http://localhost:3001/api/cart/delete`, payload),

    onSuccess: () => {
      toast.success("Xóa thành công sản phẩm trong giỏ hàng!");
      queryClient.invalidateQueries(["cart", cart_id]);
    },

    onError: (error) => {
      console.error("Xóa thất bại:", error);
    },
  });

  const updateProductInCartMutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(`http://localhost:3001/api/cart/update`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", cart_id]);
      console.log("Cập nhật số lượng thành công!");
    },

    onError: (error) => {
      console.error("Cập nhật thất bại", error);
    },
  });

  const handleDeleteProduct = (product_id, size_id) => {
    deleteProductInCartMutation.mutate({
      cart_id: cart_id,
      product_id: product_id,
      size_id: size_id,
    });
  };

  const handleUpdateQuantity = (
    product_id,
    size_id,
    quantity,
    quantitySize,
  ) => {
    if (quantity > quantitySize) {
      toast.error("Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này");
      return;
    }

    updateProductInCartMutation.mutate({
      cart_id: cart_id,
      product_id: product_id,
      size_id: size_id,
      quantity: quantity,
    });
  };
  console.log(cart_id);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", cart_id],
    queryFn: fetchCart,
    enabled: !!cart_id, // chỉ gội api khi tồn tại cart_id
  });
  if (isLoading) return <div>Đang loading ...</div>;
  if (isError) return <div>lỗi</div>;
  console.log(data);
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
        <div className="pt-[60px] px-[70px] pb-[250px] overflow-hidden">
          <p className="text-[14px] uppercase mt-[3px] text-[#a47b67] font-medium leading-[21px]">
            Giỏ hàng
          </p>
          {/* Sản phẩm */}
          <div className="mt-[50px]">
            <table className="w-full">
              <tbody>
                <tr className="border-b-[#bcbcbc] border-b-[1px] border-dotted">
                  <td className="p-[10px] aspect-[3/4]">
                    <a href="/" className="block">
                      <div className="aspect-[3/4] overflow-hidden border border-[#ededed]">
                        <img
                          className="md:w-[70px]    w-[90px] border-solid border-[#ededed] md:mr-[10px] object-cover overflow-hidden"
                          src="https://cdn.hstatic.net/products/1000321269/k_ch_th__c_web_to_195fd56c3f7c4c9abf666f7401eb46e2_small.jpg"
                          alt=""
                        />
                      </div>
                    </a>
                  </td>
                  <td className="p-[10px] md:p-[25px] relative">
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

          <>
            <div id="layout-cart">
              <div className="container mx-auto ">
                {/* Cart Container */}
                <div className="px-[15px]">
                  <form action="/cart">
                    {/* table cart */}
                    <div>
                      <table className="w-full">
                        <tbody>
                          {data?.products?.map((item) => {
                            const size = item.product_id?.sizes.find(
                              (s) => s._id === item.size_id,
                            );
                            return (
                              <tr
                                key={item._id}
                                className=" border-b-[#ededed] my-[10px] border-dotted border-b-[1px] "
                              >
                                {/* Ảnh */}
                                <td>
                                  <Link
                                    to={`/products/${item?.product_id?.slug}`}
                                  >
                                    <img
                                      className="max-w-[100px]"
                                      src={item?.product_id?.thumbnail[0]}
                                      alt={item?.product_id?.title}
                                    />
                                  </Link>
                                </td>
                                {/* Tên sản phẩm giá ... */}
                                <td className="py-[20px] pl-[15px]">
                                  <Link
                                    to={`/products/${item?.product_id?.slug}`}
                                  >
                                    <h3 className="mb-[5px] text-[16px] font-bold inline text-left text-[#a47b67]">
                                      {item?.product_id?.title}
                                    </h3>
                                  </Link>
                                  <p className="mb-[5px] text-left text-[#a47b67] leading-[21px]">
                                    {formatPrice(
                                      calculateDiscountedPrice(
                                        item?.product_id?.price,
                                        item?.product_id?.discountPercentage,
                                      ),
                                    )}
                                  </p>
                                  <p className="mb-[5px] text-left text-[#a47b67] leading-[21px] uppercase">
                                    {size?.name} {size?.stock}
                                  </p>

                                  <div className="flex items-center justify-between">
                                    <div className="quantity-area quantity-cart">
                                      {item.quantity}
                                    </div>

                                    <p className="font-medium text-left text-[16px] leading-[21px] text-[#a47b67]">
                                      {formatPrice(
                                        item?.quantity *
                                          calculateDiscountedPrice(
                                            item?.product_id?.price,
                                            item?.product_id
                                              ?.discountPercentage,
                                          ),
                                      )}
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Thanh toán */}
                    <div className=" md:flex mt-[40px]">
                      <div className="flex-1 px-[15px] text-right">
                        <p className="text-[16px] leading-[21px] text-[#a47b67] mt-[20px] font-medium mb-[40px] ">
                          Tổng tiền:{" "}
                          <b className="font-bold text-[30px] ml-[7px]">
                            {formatPrice(
                              data?.products?.reduce((acc, curr) => {
                                return (
                                  Number(acc) +
                                  calculateDiscountedPrice(
                                    curr.product_id.price,
                                    curr.product_id.discountPercentage,
                                  ) *
                                    curr.quantity
                                );
                              }, 0),
                            )}
                          </b>
                        </p>
                        <div>
                          <div className="md:flex md:w-[70%] justify-between md:float-right gap-[10px]">
                            <Link
                              to={`/checkouts/${cart_id}`}
                              className="items-center justify-center flex-1 inline-block font-bold text-center uppercase btn btn-border-reveal "
                            >
                              Thanh toán
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
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
