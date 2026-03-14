function LoadingPage({text="Đang tải dữ liệu..."}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto border-b-2 rounded-full border-[#a47b67] animate-spin"></div>
        <p className="mt-4 text-gray-600">{text}</p>
      </div>
    </div>
  );
}

export default LoadingPage;
