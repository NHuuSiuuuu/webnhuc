import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../../utils/axios";

import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";

function ProductUpdateAdmin() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  /* =======================
    State form data
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
    category_id: "",
    thumbnail: [], // Ảnh cũ (string hoặc {id, url})
    newThumbnail: [], // Ảnh mới (File)
  });

  /* =======================
    Hàm onchange
  =======================*/
  const handleOnchange = (e) => {
    const { name, type, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type == "number" ? Number(value) : value, // input kiểu num nhưng nhập vào nó là string vào đổi sang num để mongo hiểu
    }));
  };

  /* =======================
    Hàm xử lý khi chọn ảnh mới
  =======================*/
  const handleThumbChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      newThumbnail: [...prev.newThumbnail, ...files],
    }));
  };

  /* =======================
    Hàm xử lý xóa ảnh cũ
  =======================*/
  const handleRemoveThumb = (indexRemove) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: prev.thumbnail.filter((item, idx) => {
        if (idx == indexRemove) {
          return false;
        } else {
          return true;
        }
      }),
    }));
  };

  /* =======================
    Hàm xử lý xóa ảnh mới
  =======================*/
  const handleRemoveNewThumb = (indexRemove) => {
    setFormData((prev) => ({
      ...prev,
      newThumbnail: prev.newThumbnail.filter((item, idx) => {
        if (idx == indexRemove) {
          return false;
        } else {
          return true;
        }
      }),
    }));
  };
  /* =======================
    Load sản phẩm
  =======================*/
  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/product/detail/${id}`,
    );
    return res.data.product;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchData,
  });

  /* =======================
    APi tree category
  =======================*/
  const fetchCategoriesTree = async () => {
    const res = await axios.get(
      "http://localhost:3001/api/category-product/tree",
    );
    return res.data.data;
  };
  const { data: categoriesTree } = useQuery({
    queryKey: ["category-tree"],
    queryFn: fetchCategoriesTree,
  });
  // console.log(categoriesTree);

  // Render option category tree
  const renderOptionCategory = (categories, level = 0) => {
    return categories.map((item) => (
      <Fragment key={item._id}>
        <option value={item._id}>
          {"-".repeat(level)} {item.title}
        </option>
        {item.children?.length > 0 &&
          renderOptionCategory(item.children, level + 1)}
      </Fragment>
    ));
  };

  /* =======================
    SET FORM KHI CÓ DATA
  =======================*/
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title ?? "", // nếu vế trái là null or undefind thì lấy vế phải
        description: data.description ?? "",
        featured: String(data.featured),
        price: data.price ?? "",
        discountPercentage: data.discountPercentage ?? "",
        stock: data.stock ?? "",
        position: data.position ?? "",
        status: data.status ?? "active",
        category_id: data.category_id ?? null,
        thumbnail: data.thumbnail ?? [],
        newThumbnail: [],
      });
    }
  }, [data]);

  /* =======================
    API upldate product
  =======================*/
  const updateProduct = async (payload) => {
    const res = await axios.patch(
      `http://localhost:3001/api/product/update/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  };

  /* =======================
    useMutation: thực hiện các tao tác POST PUT ....
    - quản lý trạng thái mutation (loading, error, success)
  =======================*/
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);

      alert("Cập nhật thành công!");
    },
  });

  /* =======================
    Hàm submit form
  =======================*/
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    // Dữ liệu text
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("featured", formData.featured);
    form.append("price", formData.price);
    form.append("discountPercentage", formData.discountPercentage);
    form.append("stock", formData.stock);
    form.append("status", formData.status);
    form.append("position", formData.position);
    if (formData.category_id) {
      form.append("category_id", formData.category_id);
    }

    // Ảnh cũ
    form.append("oldThumbnail", JSON.stringify(formData.thumbnail));

    // Ảnh mới
    formData.newThumbnail.forEach((thumb) => form.append("thumbnail", thumb));

    mutation.mutate(form);
  };
  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Lỗi</div>;
  console.log("data:", formData);

  return (
    <div className="w-full p-6 mx-auto wg-gray-1060">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Sửa sản phẩm</h1>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 bg-white rounded-lg shadow"
      >
        {/* title */}
        <input
          name="title"
          value={formData.title}
          placeholder="Tiêu đề"
          onChange={handleOnchange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <h1>Chọn danh mục</h1>
        <select
          name="category_id"
          onChange={handleOnchange}
          value={formData.category_id || ""}
        >
          {renderOptionCategory(categoriesTree)}
        </select>

        {/* description */}
        <input
          value={formData.description}
          onChange={handleOnchange}
          name="description"
          placeholder="Mô tả"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* featured */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="featured"
              value="1"
              onChange={handleOnchange}
              checked={formData.featured == "1"}
            />
            <span>Nổi bật</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="featured"
              value="0"
              onChange={handleOnchange}
              checked={formData.featured == "0"}
            />
            <span>Không nổi bật</span>
          </label>
        </div>

        {/* price */}
        <label htmlFor="price">price</label>
        <input
          id="price"
          type="number"
          name="price"
          placeholder="Giá"
          value={formData.price}
          onChange={handleOnchange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* discount */}
        <label htmlFor="discountPercentage">discountPercentage</label>
        <input
          id="discountPercentage"
          type="number"
          name="discountPercentage"
          placeholder="Giảm giá (%)"
          value={formData.discountPercentage}
          onChange={handleOnchange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* stock */}
        <label htmlFor="stock">stock</label>
        <input
          id="stock"
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleOnchange}
          placeholder="Số lượng"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* position */}
        <label htmlFor="position">position</label>
        <input
          id="position"
          type="number"
          name="position"
          value={formData.position}
          onChange={handleOnchange}
          placeholder="Vị trí"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* status */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="active"
              onChange={handleOnchange}
              checked={formData.status == "active"}
            />
            <span>Hoạt động</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="inactive"
              onChange={handleOnchange}
              checked={formData.status == "inactive"}
            />
            <span>Không hoạt động</span>
          </label>
        </div>

        {/* image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbChange}
          multiple // cho phép chọn nhiều ảnh
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
        />
        {/* Hiển thị ảnh cũ */}
        <div>
          {formData.thumbnail.map((item, index) => (
            <div key={index}>
              <img className="size-[50px]" src={item} alt="" />
              <button
                type="button"
                onClick={() => handleRemoveThumb(index)}
                className="border p-[10px]"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
        {/* Hiển thị ảnh mới nó là mảng file*/}
        <h1>Hiển thị ảnh mới</h1>
        <div>
          {formData.newThumbnail.map((newThumb, index) => (
            <div key={index}>
              <img
                className="h-[50px]"
                src={URL.createObjectURL(newThumb)}
                alt="preview"
              />
              <button type="button" onClick={() => handleRemoveNewThumb(index)}>
                Xóa
              </button>
            </div>
          ))}
        </div>

        {/* submit */}
        <button
          type="submit"
          className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
}

export default ProductUpdateAdmin;
