// src/components/common/SeoHead.jsx
import { Helmet } from 'react-helmet-async';

function SeoHead({ title, description, image, url, type = 'website' }) {
  const siteName = 'Nhuu Shop';
  const defaultDesc = 'Shop thời trang nữ Nhuu - Áo, váy, set đồ thời thượng';
  const defaultImage = 'https://nhuu.com/banner.jpg'; // ⚠️ thay bằng URL ảnh thật, phải là link tuyệt đối

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      {/* <meta name="description" content={description || defaultDesc} /> */}

      {/* <meta property="og:site_name" content={siteName} /> */}




      <meta property="og:image:width" content="1200" />   {/* Facebook khuyến nghị */}
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
}

export default SeoHead;