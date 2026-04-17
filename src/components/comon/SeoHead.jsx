import { Helmet } from "react-helmet-async";

function SeoHead({ title, description, image, type = "website" }) {
  const siteName = "Nhuu Boutique";
  const defaultDesc =
    "Shop thời trang nữ Nhuu - Áo, váy, set đồ thời thượng số 1 Việt Nam";
  const defaultImage =
    "https://res.cloudinary.com/dhvyer5es/image/upload/v1776419585/logo_2_tt6pix.png";
  return (
    <Helmet>
      <title>{title ? title : siteName}</title>
      <meta name="description" content={description || defaultDesc} />
      {/* Tên web khi share link */}
      <meta name="og:site_name" content={siteName} />
      {/* Tiêu đề khi share link */}
      <meta property="og:title" content={title || siteName} />
      {/* Mô tả khi share link */}
      <meta property="og:description" content={description || defaultDesc} />
      {/* Ảnh preview khi share link */}
      <meta property="og:image" content={image || defaultImage} />
      {/* Kích thước ảnh (Facebook khuyến nghị) */}
      <meta property="og:image:width" content="1200" />{" "}
      <meta property="og:image:height" content="630" />
      {/* Nói với Fb, Zalo đây là loại nội dung gì: website- page thông thường(home, list sp)
      product - trang chi tiết sản phẩm -> Fb hiểu đây là hàng hóa
      */}
      <meta name="og-type" content={type} />
    </Helmet>
  );
}

export default SeoHead;
