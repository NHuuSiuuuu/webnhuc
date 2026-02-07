import { Search } from "lucide-react";

function TopBar() {
  return (
    <div id="topbar">
      <div className="container px-4 mx-auto ">
        <div className="items-center justify-center text-center md:flex ">
          {/* Liên hệ */}
          <div className="flex-1 hidden px-4 tracking-wider md:flex ">
            <ul>
              <li>
                <span>
                  <a href="">nhuu@gmail.com</a>
                </span>
                <span className="h-9">|</span>
                <span>
                  <a href="">Hotline: 012 456 789</a>
                </span>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div className="flex-1 w-full px-4 text-center md:flex">
            Các đơn hàng giá trị cao sẽ được vận chuyển bằng hộp
          </div>

          {/* Tìm kiếm */}
          <div className="flex-1 hidden px-4 md:flex">
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
