import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";
import { formatPrice, calculateDiscountedPrice } from "../../utils/price";

function Cart() {
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
      ;
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

                            {errorQuantitySize && (
                              <div className="flex items-center my-[16px]">
                                <span className="font-medium text-[#FF424F]">
                                  Số lượng bạn chọn đã đạt mức tối đa của sản
                                  phẩm này
                                </span>
                              </div>
                            )}
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
                              <Trash2 className="text-[#FF0000] size-[50px] cursor-p" />
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
                        to="/cart"
                        className="flex-1 block mb-[10px] md:mb-0"
                      >
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
    </>
  );
}

export default Cart;
