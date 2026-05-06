import axios from "../utils/axios";

/* =======================
    API thêm sản phẩm vào giỏ
  =======================*/
export const addToCart = async (payload) => {
  return await axios.post("/cart/create", payload);
};

/* =======================
    API lấy giỏ hàng
  =======================*/
export const getCart = async (cart_id) => {
  const res = await axios.post("/cart/get", {
    cart_id,
  });
  return res.data.cart;
};

/* =======================
    Xóa sản phẩm trong giỏ hàng
  =======================*/
export const deleteCartItem = async (payload) => {
  return axios.post("/cart/delete", payload);
};

/* =======================
    Update sản phẩm trong giỏ hàng
  =======================*/
export const updateCartItem = async (payload) => {
  return axios.post(`${import.meta.env.VITE_API_BACKEND}/cart/update`, payload);
};

/* =======================
    Tạo order
  =======================*/
export const createOrder = async (payload) => {
  return axios.post(
    `${import.meta.env.VITE_API_BACKEND}/order/create`,
    payload,
  );
};

/* =======================
    API lấy phương thức vận chuyển
  =======================*/
export const getshippingMethod = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_BACKEND}/shipping-method/index`,
    {},
  );
  return res.data.data;
};
