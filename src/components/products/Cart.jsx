import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";
import { formatPrice, calculateDiscountedPrice } from "../../utils/price";
import { deleteCartItem, getCart } from "@/apis/cart.api";

function Cart() {
  const cart_id = localStorage.getItem("cart_id");
  const queryClient = useQueryClient();

  const deleteProductInCartMutation = useMutation({
    mutationFn: (payload) => deleteCartItem(payload),

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
      updateCartItem(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", cart_id] });
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
    queryFn: () => getCart(cart_id),
    enabled: !!cart_id, // chỉ gội api khi tồn tại cart_id
  });
  if (isLoading) return <div>Đang loading ...</div>;
  if (isError) return <div>lỗi</div>;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div id="layout-cart">
        <div className="container mx-auto ">
          <div className="pb-[30px] after:w-[60px] after:h-[4px] after:bg-[#252a2b] after:mt-[25px] after:content-[''] after:block after:mx-auto">
            <h1 className="text-[30px] mt-[10px] text-center font-bold">
              Giỏ hàng của bạn
            </h1>
            <p className="mb-2.5 text-[14px] text-[#a47b67] text-center leading-[21px]">
              Có <strong>{data?.products.length} sản phẩm</strong> trong giỏ
              hàng
            </p>
          </div>

          {/* Cart Container */}
          <div className="px-[15px]">
            <div>
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
                            <Link to={`/products/${item?.product_id?.slug}`}>
                              <img
                                className="max-w-[100px]"
                                src={item?.product_id?.thumbnail[0]}
                                alt={item?.product_id?.title}
                              />
                            </Link>
                          </td>
                          {/* Tên sản phẩm giá ... */}
                          <td className="py-[20px] pl-[15px]">
                            <Link to={`/products/${item?.product_id?.slug}`}>
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
                                <input
                                  className="text-[#abafb2] qty-btn "
                                  type="button"
                                  value="-"
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item?.product_id._id,
                                      item?.size_id,
                                      Math.max(1, item?.quantity - 1),
                                      size?.stock,
                                    )
                                  }
                                />
                                <input
                                  className="text-[16px] bg-[#ededed] text-[#a47b67]"
                                  id="quantity_quickview"
                                  type="text"
                                  value={item.quantity}
                                  min="1"
                                />
                                <input
                                  className=" text-[#abafb2] qty-btn"
                                  type="button"
                                  value="+"
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item?.product_id._id,
                                      item?.size_id,
                                      item?.quantity + 1,
                                      size?.stock,
                                    )
                                  }
                                />
                              </div>

                              <p className="font-medium text-left text-[16px] leading-[21px] text-[#a47b67]">
                                {formatPrice(
                                  item?.quantity *
                                    calculateDiscountedPrice(
                                      item?.product_id?.price,
                                      item?.product_id?.discountPercentage,
                                    ),
                                )}
                              </p>
                            </div>
                          </td>
                          {/* Xóa sản phẩm trong giỏ */}
                          <td>
                            <p
                              onClick={() =>
                                handleDeleteProduct(
                                  item?.product_id._id,
                                  item?.size_id,
                                )
                              }
                              title="Xóa sản phẩm này"
                            >
                              <Trash2 className="text-[#FF0000] md:size-[50px] cursor-p" />
                            </p>
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
                      <Link to="/" className="flex-1 block mb-[10px] md:mb-0">
                        <button
                          className="font-bold uppercase btn btn-border-reveal cl "
                          type="submit"
                        >
                          Tiếp tục mua hàng
                        </button>
                      </Link>

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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
