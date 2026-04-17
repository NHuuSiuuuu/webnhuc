import { useQuery } from "@tanstack/react-query";
import {  Search } from "lucide-react";
import { useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css"; // optional
import useDebounce from "@/hooks/useDebounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { calculateDiscountedPrice, formatPrice } from "../../utils/price";
import { searchProducts } from "@/apis/products.api";

function TopBar() {
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(true);
  const debounceValue = useDebounce(searchValue, 500);

  const { data: searchData, isLoading: searchLoading } = useQuery({
    queryKey: ["searchProducts", debounceValue],
    queryFn: () => searchProducts(debounceValue),

    enabled: debounceValue.trim() !== "", // Điều kiện dể query chạy
  });

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleClear = () => {
    setShowResult(false);
    setSearchValue("");
  };

  return (
    <div id="topbar">
      <div className="container hidden px-4 mx-auto md:block ">
        <div className="block">
          <div className="items-center justify-center text-center md:flex ">
            {/* Liên hệ */}
            <div className="flex-1 hidden px-4 tracking-wider md:flex ">
              <ul>
                <li>
                  <span>
                    <Link to="">nhuu@gmail.com</Link>
                  </span>
                  <span className="h-9">|</span>
                  <span>
                    <Link to="">Hotline: 012 456 789</Link>
                  </span>
                </li>
              </ul>
            </div>

            {/* Content */}
            <div className="flex-1 w-full px-4 text-center md:flex">
              Các đơn hàng giá trị cao sẽ được vận chuyển bằng hộp
            </div>

            {/* Tìm kiếm */}
            <div className="justify-end flex-1 hidden px-4 md:flex">
              <HeadlessTippy
                appendTo={() => document.body}
                interactive
                visible={showResult && debounceValue.trim() !== ""}
                onClickOutside={handleHideResult}
                placement="bottom"
                // offset={[0, 0]} // Dịch tooltip 10px sang phải, 5px xuống
                render={(attrs) =>
                  searchData?.products.length === 0 ? (
                    <div
                      className="bg-white w-[90vw] md:w-[30vw] shadow-sm overflow-hidden"
                      tabIndex="-1"
                      {...attrs}
                    >
                      <div className="flex flex-col items-center justify-center gap-2 px-6 py-2 text-center">
                        <p className="text-[13px] font-medium text-[#333]">
                          Không tìm thấy sản phẩm
                        </p>
                        <p className="text-[11px] text-[#999]">
                          Thử tìm với từ khóa khác nhé
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="bg-[#fff]  overflow-y-scroll max-h-[50vh] rounded-md shadow-md "
                      tabIndex="-1"
                      {...attrs}
                    >
                      {searchData?.products.map((item) => (
                        <div
                          key={item?.slug}
                          className="flex items-start border-b border-dotted border-[#dfe0e1] gap-4 p-[14px] hover:bg-[#fdf8f6] transition-colors"
                        >
                          <Link
                            onClick={handleClear}
                            to={`/products/${item?.slug}`}
                            className="shrink-0"
                          >
                            <img
                              alt={item?.title}
                              src={item?.thumbnail?.[1]}
                              className="object-cover w-[60px] h-[80px] "
                            />
                          </Link>
                          <div className="flex-1 flex flex-col justify-between h-[80px]">
                            <Link
                              onClick={handleClear}
                              className="text-[#a47b67] text-[14px] font-medium mb-[4px] whitespace-pre-line block"
                              to={`/products/${item?.slug}`}
                            >
                              {item?.title}
                            </Link>
                            <div>
                              <p className="inline-block text-[14px] text-[#a47b67] font-normal">
                                {formatPrice(item?.price)}
                              </p>
                              <p className="inline ml-[5px] text-[13px] text-[#797979] line-through">
                                {formatPrice(
                                  calculateDiscountedPrice(
                                    item?.price,
                                    item?.discountPercentage,
                                  ),
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                }
              >
                <div className="relative bg-white ">
                  <div className="flex items-center ">
                    <input
                      onChange={(e) => setSearchValue(e.target.value)}
                      type="text"
                      value={searchValue}
                      onFocus={() => setShowResult(true)}
                      placeholder="Tìm kiếm sản phẩm..."
                      spellCheck={false} // tắt gạch chân lỗi chính tả
                      className="w-full h-[40px] pl-[14px] pr-[70px] text-[13px] text-[#333] bg-transparent  outline-none placeholder:text-[#bbb]"
                    />

                    <div className="absolute right-[40px] flex items-center">
                      <div>
                        {!!searchValue && !searchLoading && (
                          <button className="clear" onClick={handleClear}>
                            <FontAwesomeIcon
                              className="text-[#ccc] text-[13px] hover:text-[#999] transition"
                              icon={faCircleXmark}
                            />
                          </button>
                        )}
                        {searchLoading && (
                          <FontAwesomeIcon
                            className="text-[13px] text-[#ccc] animate-spin"
                            icon={faSpinner}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleClear}
                    className="absolute -translate-y-1/2 opacity-75 right-4 top-1/2 size-4"
                  >
                    <Search className="size-4" />
                  </button>
                </div>
              </HeadlessTippy>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
