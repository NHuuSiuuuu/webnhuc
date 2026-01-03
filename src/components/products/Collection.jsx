import { ArrowDown, ArrowDownAZ, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

function Collection() {
  const [opened, setOpened] = useState(false);
  console.log(opened);

  return (
    <div className="container mx-auto bg-white ">
      <div className="section-container">
        {/* collection title */}
        <div className="grid grid-cols-12">
          {/* heading collection */}
          <div className="flex items-center col-span-3 px-[15px] ">
            {" "}
            <i>
              <SlidersHorizontal
                onClick={() => setOpened(true)}
                className="size-[20px] mr-2.5 text-[#A47B67]"
              />
            </i>
            <p className="font-bold text-[14px]  text-[#A47B67]">Bộ lọc</p>
          </div>

          {/* Title */}
          <div className="col-span-6">
            <h1 className="text-[#A47B67] font-bold text-[27px] text-center">
              clearance sale
            </h1>
          </div>

          {/* Filter */}
          <div className="flex items-center justify-end col-span-3 px-[15px]">
            <form>
              <div className="relative flex items-center">
                {/* Icon */}
                <ArrowDownAZ className="absolute left-3 size-4 text-[#A47B67] pointer-events-none" />

                {/* Select */}
                <select
                  id="sort-by"
                  name="sort-by"
                  defaultValue="title-ascending"
                  //   appearance-none tắt css mặc định của option
                  className=" appearance-none pl-10 pr-8 py-1 text-[14px] text-[#A47B67] border border-[#cccc] rounded bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#A47B67]"
                >
                  <option value="manual">Sản phẩm nổi bật</option>
                  <option value="price-ascending">Giá: Tăng dần</option>
                  <option value="price-descending">Giá: Giảm dần</option>
                  <option value="title-ascending">Tên: A-Z</option>
                  <option value="title-descending">Tên: Z-A</option>
                  <option value="created-ascending">Cũ nhất</option>
                  <option value="created-descending">Mới nhất</option>
                  <option value="best-selling">Bán chạy nhất</option>
                </select>

                {/* Arrow dropdown */}
                <ArrowDown className="absolute right-3 size-4 text-[#cccc] pointer-events-none" />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Lớp phủ */}
      <div
        onClick={() => setOpened(false)}
        className={`${
          opened ? "opacity-100 visible" : "opacity-0 invisible"
        } fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ease-in-out`}
      ></div>
      {/* Menu */}
      <div
        className={`${
          opened ? "translate-x-0 " : "-translate-x-full "
        } fixed top-0 left-0 z-50 h-dvh w-[400px] p-3.5 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-bold uppercase p-2.5">
            {" "}
            Danh mục sản phẩm
          </span>
          <X
            onClick={() => setOpened(false)}
            className="text-[#88888888] px-[10px] size-[50px] cursor-pointer"
          />
        </div>
        <ul>
          <li>
            <a
              className="text-[#A47B67] text-[14px] py-[5px] px-2.5 py-[#5px] font-medium inline-block"
              href=""
            >
              Sản phẩm khuyến mãi
            </a>
          </li>
          <li>
            <a
              className="text-[#A47B67] text-[14px] py-[5px]  px-2.5 py-[#5px] font-medium inline-block "
              href=""
            >
              Tất cả sản phẩm
            </a>
          </li>
          <hr className="mx-2.5 border-[#88888888]" />
        </ul>
      </div>
    </div>
  );
}

export default Collection;
