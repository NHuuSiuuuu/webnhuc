function CategoryList() {
  return (
    //   {/* Category List */}
    //   {/* <div className="absolute bottom-0 -translate-x-1/2 translate-y-1/2 left-1/2 section-container"> */}

    <div className="absolute z-40 py-[15px] bg-white flex flex-row justify-between gap-2 mx-auto -translate-x-1/2 -translate-y-[50%] section-container left-1/2 ">
      <div className="relative overflow-hidden group">
        <a href="" className="block">
          <img
            src="https://file.hstatic.net/1000321269/file/bannersmallweb2_4ec403296f764ed49d8594dec0e88f79.jpg"
            alt="Áo nữ"
            className="object-cover w-full h-auto"
          />

          {/* Khung đục lỗ */}
          <div className="absolute opacity-0 border border-white inset-7 group-hover:opacity-100 transition-opacity duration-300 ease-in-out shadow-[0_0_0_9999px_rgba(0,0,0,0.2)]"></div>
        </a>
      </div>

      <div className="relative overflow-hidden group">
        <a href="" className="block">
          <img
            src="https://file.hstatic.net/1000321269/file/bannersmallweb2__2__dfb73fc1206e4596a4dec1bba191e0dc.jpg"
            alt="Áo khoác"
            className="object-cover w-full h-auto"
          />
          <div className="absolute opacity-0 border border-white inset-7 group-hover:opacity-100 transition-opacity duration-300 ease-in-out shadow-[0_0_0_9999px_rgba(0,0,0,0.2)]"></div>
        </a>
      </div>

      <div className="relative overflow-hidden group">
        <a href="" className="block">
          <img
            src="https://file.hstatic.net/1000321269/file/bannersmallweb2__1__ab108ac8e4b74ec7a95f8c3bd373ed6f.jpg"
            alt="Váy"
            className="object-cover w-full h-auto"
          />
          <div className="absolute opacity-0 border border-white inset-7 group-hover:opacity-100 transition-opacity duration-300 ease-in-out shadow-[0_0_0_9999px_rgba(0,0,0,0.2)]"></div>
        </a>
      </div>
    </div>
  );
}

export default CategoryList;
