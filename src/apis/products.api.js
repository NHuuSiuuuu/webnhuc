import axios from "axios";

/* =======================
    API chi tiết sản phẩm
  =======================*/
export const getProductDetail = async (slug) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_BACKEND}/product/detail/${slug}`,
  );
  return res.data.product;
};
