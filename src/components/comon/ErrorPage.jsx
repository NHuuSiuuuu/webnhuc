function ErrorPage({ text = "Không thể tải dữ liệu" }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-12">
        <div className="mb-5">...</div>

        <h2 className="text-lg font-semibold text-[#333] mb-2">
          Rất tiếc! Không thể tải dữ liệu
        </h2>
        <p className="text-sm text-[#999] text-center leading-relaxed mb-7 max-w-xs">
          {text}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="px-8 py-2.5 bg-[#a47b67] text-white text-sm font-medium rounded-sm hover:opacity-90 transition-opacity"
        >
          Tải lại
        </button>
      </div>
    </div>
  );
}
export default ErrorPage;
