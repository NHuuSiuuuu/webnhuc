import { calculateDiscountedPrice, formatPrice } from "@/utils/price";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { X } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { deleteCartItem } from "@/apis/cart.api";
function CartDrawer({ cartMounted, cart_id, data, openCart, setOpenCart }) {
  const queryClient = useQueryClient();

  const deleteProductInCartMutation = useMutation({
    mutationFn: (payload) => deleteCartItem(payload),

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
  return (
    <div
      className={`${cartMounted ? "transition-transform duration-300" : ""}
                  ${openCart ? "translate-x-0" : "translate-x-full pointer-events-none"}
                   fixed bg-white md:w-[550px] z-50 top-0 h-full right-0`}
    >
      {/* Giỏ hàng */}
      <div className="pt-[60px] px-[40px] md:px-[70px] pb-[250px]  overflow-y-auto h-full">
        <p className="text-[14px] uppercase mt-[3px] text-[#a47b67] font-medium leading-[21px]">
          Giỏ hàng
        </p>
        {/* Sản phẩm */}
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
                  <div className="flex flex-col w-full lg:overflow-hidden">
                    {/* Danh sách sản phẩm */}
                    <div className="flex flex-col divide-y divide-dashed divide-[#bcbcbc] lg:overflow-y-auto lg:max-h-[60vh]">
                      {data?.products?.map((item) => {
                        const size = item?.product_id?.sizes.find(
                          (s) => s._id === item?.size_id,
                        );
                        return (
                          <div
                            key={`${item?.product_id._id}-${item?.size_id}`}
                            className="flex items-start w-full min-w-0 gap-2 py-3 md:gap-3"
                          >
                            {/* Ảnh sản phẩm */}
                            <Link
                              to={`/products/${item?.product_id?.slug}`}
                              className="shrink-0"
                            >
                              <div className="w-[50px] md:w-[65px] aspect-[3/4] overflow-y-auto border border-[#ededed]">
                                <img
                                  className="object-cover w-full h-full"
                                  src={item?.product_id?.thumbnail?.[0]}
                                  alt={item?.product_id?.title}
                                />
                              </div>
                            </Link>

                            {/* Thông tin sản phẩm */}
                            <div className="flex flex-col flex-1 min-w-0 gap-1 overflow-y-auto">
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
                                  x{item?.quantity}
                                </span>
                                <span className="text-[12px] md:text-[14px] text-[#a47b67] font-medium truncate">
                                  {formatPrice(
                                    item?.quantity *
                                      calculateDiscountedPrice(
                                        item?.product_id?.price,
                                        item?.product_id?.discountPercentage,
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
                        <button
                          className="
                         w-full font-bold uppercase text-[12px] md:text-[14px] border border-[#a47b67] text-[#a47b67] py-2.5 md:py-3 hover:bg-[#a47b67] hover:text-white transition-colors
                         "
                        >
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
      </div>

      <div className="absolute top-0 mt-[20px] md:mt-[50px] right-0 pr-[20px] md:pr-[70px]">
        <X onClick={() => setOpenCart(false)} className="size-8" />
      </div>
    </div>
  );
}

export default CartDrawer;
