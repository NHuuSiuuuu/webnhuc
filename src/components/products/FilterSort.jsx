import { ArrowDown, ArrowDownAZ, SlidersHorizontal, X } from "lucide-react";

function FilterSort({ opened, setOpened, filter, setFilter, sort, setSort }) {

  return (
    <div className="mb-[15px]">
 
      <div className="mx-[15px]">
        {/* collection title */}
        <div className="flex justify-between">
          {/* heading collection */}
          <div
            onClick={() => setOpened(true)}
            className=" flex items-center md:col-span-3  md:text-[14px]  cursor-pointer "
          >
            {" "}
            <i>
              <SlidersHorizontal className="size-[16px] md:size-[20px] mr-2.5 text-[#A47B67]" />
            </i>
            <p className="text-[12px] font-bold md:text-[14px]  text-[#A47B67]">
              Bộ lọc
            </p>
          </div>

          {/* Filter */}
          <div className=" text-[12px] flex items-center justify-end md:col-span-3 md:text-[14px] ">
            <div>
              <div className="relative flex items-center">
                {/* Icon */}
                <ArrowDownAZ className="absolute left-3 size-3 md:size-4 text-[#A47B67] pointer-events-none" />

                {/* Select */}
                <select
                  id="sort-by"
                  name="sort-by"
                  defaultValue="title:asc"
                  onChange={(e) => {
                    setSort(e.target.value);
                  }}
                  //   appearance-none tắt css mặc định của option - tắt mũi tên
                  className=" text-[12px]  appearance-none pl-10 pr-8 py-1  md:text-[14px] text-[#A47B67] border border-[#cccc] rounded bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#A47B67]"
                >
                  <option value="price:asc">Giá: Tăng dần</option>
                  <option value="price:desc">Giá: Giảm dần</option>
                  <option value="title:asc">Tên: A-Z</option>
                  <option value="title:desc">Tên: Z-A</option>
                  <option value="createdAt:asc">Cũ nhất</option>
                  <option value="createdAt:desc">Mới nhất</option>
                  <option value="/">Bán chạy nhất</option>
                </select>

                {/* Arrow dropdown */}
                <ArrowDown className="absolute right-3 size-4 text-[#cccc] pointer-events-none" />
              </div>
            </div>
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
            <p
              onClick={() => {
                setOpened(false);
                setFilter("1")();
              }}
              className="text-[#A47B67] text-[14px] py-[5px] px-2.5 py-[#5px] font-medium inline-block"
            >
              Sản phẩm nổi bật
            </p>
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

export default FilterSort;
