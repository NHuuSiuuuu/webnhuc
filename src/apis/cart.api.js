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
