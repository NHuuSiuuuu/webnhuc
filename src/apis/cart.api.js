import axios from "axios";

/* =======================
    API thêm sản phẩm vào giỏ
  =======================*/
export const addToCart = async (payload) => {
  return await axios.post(
    `${import.meta.env.VITE_API_BACKEND}/cart/create`,
    payload,
  );
};

/* =======================
    API lấy giỏ hàng
  =======================*/
export const getCart = async (cart_id) => {
  const res = await axios.post(`${import.meta.env.VITE_API_BACKEND}/cart/get`, {
    cart_id,
  });
  return res.data.cart;
};

/* =======================
    Xóa sản phẩm trong giỏ hàng
  =======================*/
export const deleteCartItem = async (payload) => {
  return axios.post(`${import.meta.env.VITE_API_BACKEND}/cart/delete`, payload);
};
