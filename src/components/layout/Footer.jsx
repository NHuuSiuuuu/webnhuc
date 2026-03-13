import { useState } from "react";
import {
  faChevronDown,
  faChevronUp,
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  const [open, setOpen] = useState(null);

  return (
    <div>
      {/* main footer */}
      <div className="bg-[#232323] mt-[100px] py-4 md:py-10 px-[30px]">
        <div className="container grid grid-cols-1 gap-4 mx-auto md:grid-cols-3">
          {/* logo */}
          <div className="">
            <a href="">
              <img
                className="object-cover w-0 md:w-[230px]"
                src="https://file.hstatic.net/1000321269/file/hexcmkulyhczmakrdo-i8c6l8vaiyqtm4w_003a610e882947d9a02d2766cc1ef8f5.png"
                alt=""
              />
            </a>
          </div>

          {/* liên kết */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer md:cursor-default"
              onClick={() => setOpen(open === 1 ? null : 1)}
            >
              <h4
                className={`font-medium md:text-[20px] md:text-white  text-[14px] ${open === 1 ? " text-white" : "text-[#9f9f9f]"} uppercase`}
              >
                Liên kết
              </h4>
              <span className="text-white md:hidden">
                {open === 1 ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </span>
            </div>

            <div
              className={`overflow-hidden transition-all
                ${open === 1 ? "max-h-[300px]" : "max-h-0 md:max-h-full"}
              `}
            >
              <ul className="mt-3 text-[#9f9f9f] md:text-[14px]">
                <li>Chính sách bảo mật</li>
                <li>Hướng dẫn mua hàng</li>
                <li>Hướng dẫn thanh toán</li>
                <li>Chính sách đổi trả</li>
                <li>Chính sách vận chuyển</li>
                <li>Chính sách kiểm hàng</li>
              </ul>
            </div>
          </div>

          {/* thông tin liên hệ */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer md:cursor-default"
              onClick={() => setOpen(open === 2 ? null : 2)}
            >
              <h4
                className={`font-medium md:text-[20px] md:text-white text-[14px] ${open === 2 ? " text-white" : "text-[#9f9f9f]"} uppercase`}
              >
                Thông tin liên hệ
              </h4>
              <span className="text-white md:hidden">
                {open === 2 ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </span>
            </div>

            <div
              className={`overflow-hidden transition-all
                ${open === 2 ? "max-h-[300px]" : "max-h-0 md:max-h-full"}
              `}
            >
              <ul className="mt-3 text-[#9f9f9f] space-y-3">
                <li className="flex gap-4 md:text-[14px]">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p>
                    * Địa chỉ abc 1 <br />
                    * Địa chỉ abc 2 <br />
                    https://www.facebook.com
                  </p>
                </li>

                <li className="flex gap-4">
                  <FontAwesomeIcon icon={faPhone} />
                  <p>9999999999</p>
                </li>

                <li className="flex gap-4">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <p>Admin@gmail.com</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* bottom footer */}
      <div className="bg-black">
        <div className="container mx-auto text-center">
          <p className="text-[#9f9f9f] text-[14px] py-5">
            Copyright © 2026 <a href="">nhuu</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
