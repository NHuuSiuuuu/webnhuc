

function ProductUpdateAdmin() {
  return (
    <div className="w-full p-6 mx-auto wg-gray-1060">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Thêm mới sản phẩm
      </h1>

      <form className="p-6 space-y-4 bg-white rounded-lg shadow">
        {/* title */}
        <input
          name="title"
          placeholder="Tiêu đề"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* description */}
        <input
          name="description"
          placeholder="Mô tả"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* featured */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="featured" value="1" />
            <span>Nổi bật</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="featured" value="0" defaultChecked />
            <span>Không nổi bật</span>
          </label>
        </div>

        {/* price */}
        <input
          type="number"
          name="price"
          placeholder="Giá"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* discount */}
        <input
          type="number"
          name="discountPercentage"
          placeholder="Giảm giá (%)"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* stock */}
        <input
          type="number"
          name="stock"
          placeholder="Số lượng"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* position */}
        <input
          type="number"
          name="position"
          placeholder="Vị trí"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* status */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="status" value="active" defaultChecked />
            <span>Hoạt động</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="status" value="inactive" />
            <span>Không hoạt động</span>
          </label>
        </div>

        {/* image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple // cho phép chọn nhiều ảnh
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
        />

        {/* submit */}
        <button
          type="submit"
          className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700"
        ></button>
      </form>
    </div>
  );
}

export default ProductUpdateAdmin;
