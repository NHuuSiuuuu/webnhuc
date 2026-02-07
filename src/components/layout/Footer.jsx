function Footer() {
  return (
    <div>
      {/* main footer */}
      <div className="bg-[#232323] py-10">
        {/* grid-cols-[repeat(auto-fit,minmax(220px,1fr))] */}
        <div className="mx-auto container grid gap-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          <div className="footer-content1">
            <div className="footerTitle">
              <h4>hộ kinh doanh Nhuu</h4>
            </div>
            <div className="footerContent mb-[20px]">
              <p>
                Giấy chứng nhận ĐKKD số 41O8035777 do UBND Bình Thạnh cấp lần
                đầu ngày 28/02/2018
                <br />
                Địa chỉ:350 Điện Biên Phủ, phường 17, Hồ Chí Minh
                <br />
                Email: tsunsg@gmail.com
                <br />
                Hotline: 093 407 6342
              </p>
            </div>
            <div className="logoFooter">
              <a href="">
                <img
                  className="object-cover max-w-[230px]"
                  src="https://file.hstatic.net/1000321269/file/hexcmkulyhczmakrdo-i8c6l8vaiyqtm4w_003a610e882947d9a02d2766cc1ef8f5.png"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="footer-content2">
            <div className="footerTitle">
              <h4>Liên kết</h4>
            </div>
            <div className="footerContent">
              <ul>
                <li>
                  <p>Chính sách bảo mật</p>
                </li>
                <li>
                  <p>Hướng dẫn mua hàng</p>
                </li>
                <li>
                  <p>Hướng dẫn thanh toán</p>
                </li>
                <li>
                  <p>Chính sách đổi trả</p>
                </li>
                <li>
                  <p>Chính sách vận chuyển</p>
                </li>
                <li>
                  <p>Chính sách kiểm hàng</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-content3">
            <div className="footerTitle">
              <h4>thông tin liên hệ</h4>
            </div>
            <div className="footerContent">
              <ul>
                <li>
                  <p>* Floor B1, Vincom center Đồng Khởi, Q.1, Tp.HCM</p>
                </li>
                <li>
                  <p>
                    * 26 Trần Quang Diệu, Q.3, Tp.HCM
                    https://www.facebook.com/TSUN.SG
                  </p>
                </li>
                <li>
                  <p>093 407 6342</p>
                </li>
                <li>
                  <p>tsunsg@gmail.com</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content3">
            <div className="footerTitle">
              <h4>thông tin liên hệ</h4>
            </div>
            <div className="footerContent"></div>
          </div>
        </div>
      </div>

      {/* bottom footer */}
      <div className="bg-black bottomFooter">
        <div className="container mx-auto text-center">
          <p class="text-[#9f9f9f] text-[14px] py-5 block ">
            Copyright © 2026 <a href="">nhuu</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
