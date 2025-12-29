import { Search } from "lucide-react";

function TopBar() {
  return (
    <div id="topbar">
      <div className=" container px-4 mx-auto ">
        <div className="text-center md:flex justify-center items-center ">
          {/* Liên hệ */}
          <div className="hidden md:flex px-4 flex-1 tracking-wider ">
            <ul>
              <li>
                <span>
                  <a href="">tsunsg@gmail.com</a>
                </span>
                <span className="h-9">|</span>
                <span>
                  <a href="">Hotline: 093 407 6342</a>
                </span>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div className="w-full  md:flex px-4 flex-1 text-center">
            Các đơn hàng giá trị cao sẽ được vận chuyển bằng hộp
          </div>

          {/* Tìm kiếm */}
          <div className="hidden md:flex px-4 flex-1">
            <form action="" className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="float-right w-70 rounded h-[35px] border-1 border-solid border-[#ffff] 
                px-[8px] py-[5px] bg-[#ffff] focus:outline-none"
              />
              <button className="absolute right-4 size-4 top-[9px] opacity-75">
                <Search className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
