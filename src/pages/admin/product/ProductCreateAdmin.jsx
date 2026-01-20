import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useState } from "react";

// 1️⃣ useState – khai báo state
// 2️⃣ useQueryClient – lấy client
// 3️⃣ handleOnChange / handleFileChange / handleRemoveThumb – hàm xử lý UI
// 4️⃣ createProduct (API)
// 5️⃣ useMutation
// 6️⃣ handleSubmit

function ProductCreateAdmin() {
  /* =======================
    State lưu form
  =======================*/
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    featured: "0",
    price: "",
    discountPercentage: "",
    stock: "",
    position: "",
    status: "active",
    thumbnail: [],
    category_id: "",
  });
  console.log(formData);

  /* =======================
   Query client: Đơn giản dùng để refesh lại sau khi tạo mới vì khi tạo xong sản phẩm frontend cần hiển thị danh sách sản phẩm và gọi lại api
    Nếu không gọi lại thì bắt buộc phải load lại trang mới thấy sp mới
   =======================*/
  const queryClient = useQueryClient();

  /* =======================
    Hàm xử lý thay đổi
  =======================*/
  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,

      // [name] nghĩa là: lấy giá trị của biến name làm key cho object
      [name]: type == "number" ? Number(value) : value, // convert value nào dạng number về number tránh lỗi trong db
    }));
  };

  /* =======================
    Hàm xử lý file
  =======================*/
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // FileList chuyển sang  Array
    setFormData((prev) => ({
      ...prev,
      thumbnail: files,
    }));
  };

  /* =======================
    Hàm xử lý xỏa ảnh preview
  =======================*/
  const handleRemoveThumb = (index) => {
    console.log("click");
    setFormData((prev) => ({
      ...prev,
      thumbnail: prev.thumbnail.filter((item, i) => {
        if (i == index) {
          return false;
        } else {
          return true;
        }
      }),
    }));
  };

  /* =======================
    API create product
  =======================*/
  const createProduct = async (data) => {
    const res = await axios.post(
      "http://localhost:3001/api/product/create",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log("res.data", res.data);
    return res.data;
  };

  /* =======================
    API tree danh mục sản phẩm
  =======================*/
  const fetchCategoryTree = async () => {
    const res = await axios.get(
      "http://localhost:3001/api/category-product/tree",
    );
    return res.data.data;
  };

  /* =======================
    Load category tree
  =======================*/
  const { data: categoryTree = [] } = useQuery({
    queryKey: ["category-tree"],
    queryFn: fetchCategoryTree,
  });

  /* =======================
    useMutation: thực hiện các tao tác POST PUT ....
    - quản lý trạng thái mutation (loading, error, success)
  =======================*/
  const { mutate, isPending, isError } = useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      alert("Tạo sản phẩm thành công!");

      // refetch lại danh sách sản phẩm
      queryClient.invalidateQueries(["products"]); // products tên api

      // reset form
      setFormData({
        title: "",
        description: "",
        featured: "0",
        price: "",
        discountPercentage: "",
        stock: "",
        position: "",
        status: "active",
        thumbnail: [],
      });
    },

    onError: (error) => {
      console.error(error);
      alert("Tạo sản phẩm thất bại!");
    },
  });

  /* =======================
    Hàm xử lý submit form
  =======================*/
  const handleSubmit = (e) => {
    e.preventDefault();

    // Tạo 1 form data để gửi text và file lên backend (OBJ đặc biệt của js)
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("featured", formData.featured);
    data.append("price", formData.price);
    data.append("discountPercentage", formData.discountPercentage);
    data.append("stock", formData.stock);
    data.append("status", formData.status);
    data.append("position", formData.position);
    data.append("category_id", formData.category_id);

    // Nhiều ảnh thì phải lặp qua
    formData.thumbnail.forEach((file) => {
      data.append("thumbnail", file);
    });
    mutate(data);
    console.log("formData:", data);
  };

  // Hàm render option theo tree
  const renderCategoryOptions = (categories, level = 0) => {
    return categories.map((item) => (
      <Fragment key={item._id}>
        <option value={item._id}>
          {"— ".repeat(level)} {/* Lặp chuỗi (-) đó level lần */}
          {item.title}
        </option>

        {/* Nếu danh mục có children (độ dài length > 0)*/}
        {item.children?.length > 0 &&
          renderCategoryOptions(item.children, level + 1)}
      </Fragment>
    ));
  };

  return (
    <div className="w-full p-6 mx-auto wg-gray-1060">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Thêm mới sản phẩm
      </h1>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 bg-white rounded-lg shadow"
      >
        {/* title */}
        <input
          name="title"
          placeholder="Tiêu đề"
          onChange={handleOnChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Danh mục */}
        <h1>Danh mục</h1>
        <select
          name="category_id"
          value={formData.parent_id || ""}
          onChange={handleOnChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">-- Chọn danh mục --</option>
          {renderCategoryOptions(categoryTree)}
        </select>

        {/* description */}
        <input
          name="description"
          placeholder="Mô tả"
          onChange={handleOnChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* featured */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="featured"
              onChange={handleOnChange}
              value="1"
            />
            <span>Nổi bật</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="featured"
              value="0"
              onChange={handleOnChange}
              defaultChecked
            />
            <span>Không nổi bật</span>
          </label>
        </div>

        {/* price */}
        <input
          type="number"
          name="price"
          placeholder="Giá"
          onChange={handleOnChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* discount */}
        <input
          type="number"
          name="discountPercentage"
          placeholder="Giảm giá (%)"
          onChange={handleOnChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* stock */}
        <input
          type="number"
          name="stock"
          placeholder="Số lượng"
          onChange={handleOnChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* position */}
        <input
          type="number"
          name="position"
          placeholder="Vị trí"
          onChange={handleOnChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* status */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="active"
              onChange={handleOnChange}
              defaultChecked
            />
            <span>Hoạt động</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              onChange={handleOnChange}
              value="inactive"
            />
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
        {/* Preview ảnh */}
        {formData.thumbnail.length > 0 && (
          <div className="grid grid-cols-5 gap-2">
            {formData.thumbnail.map((thumb, index) => (
              <div key={index}>
                <img
                  className="object-cover w-full border rounded"
                  src={URL.createObjectURL(thumb)}
                  alt="preview"
                />
                <button onClick={() => handleRemoveThumb(index)}>Xóa</button>{" "}
                {/* Dựa vào index để xóa */}
              </div>
            ))}
          </div>
        )}

        {/* submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          {isPending ? "Đang tạo ..." : "Tạo mới"}
        </button>
        {isError && <h1>Có lỗi xảy ra khi tạo sản phẩm</h1>}
      </form>
    </div>
  );
}

export default ProductCreateAdmin;
