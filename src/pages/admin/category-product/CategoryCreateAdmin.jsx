import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

function CategoryCreateAdmin() {
  const navigate = useNavigate();
  /* =======================
    State lưu form
  =======================*/
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
    position: "",
    thumbnail: [],
    parent_id: null,
  });

  // State preview ảnh
  const [preview, setPreview] = useState([]);

  /* =======================
    useQueryClient
  =======================*/
  const queryClient = useQueryClient();

  /* =======================
    Handle onchange
  =======================*/
  const handleOnchange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type == "number" ? Number(value) : value,
    }));
  };

  /* =======================
    Handle change file
  =======================*/
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));

    if (preview) URL.revokeObjectURL(preview); // nếu có ảnh cũ thì clear nó
    setPreview(URL.createObjectURL(file));
  };

  /* =======================
    Handle Remove Thumb Prev
  =======================*/
  const handleRemoveThumb = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFormData((prev) => ({
      ...prev,
      thumbnail: [],
    }));
  };

  /* =======================
    API hàm tạo
  =======================*/
  const createCategory = async (data) => {
    const res = await axios.post(
      "http://localhost:3001/api/category-product/create",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  };

  /* =======================
    useMutation
  =======================*/
  const { mutate, isPending, isError } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      alert("Tạo sản danh mục sản phẩm thành công!");
      // refetch lại api danh sách danh mục
      queryClient.invalidateQueries(["categories"]);

      setFormData({
        title: "",
        description: "",
        status: "active",
        position: "",
        thumbnail: null,
      });
      navigate("http://localhost:5173/admin/products-category");
    },
    onError: (error) => {
      (console.log(error), alert("Tạo danh mục sản phẩm thất bại"));
    },
  });

  /* =======================
    Hàm fetch danh mục
  =======================*/
  const fetchCategoryTree = async () => {
    const res = await axios.get(
      "http://localhost:3001/api/category-product/tree",
    );
    return res.data.data;
  };

  /* =======================
    Usequery
  =======================*/
  const { data: categoryTree = [] } = useQuery({
    queryKey: ["category-tree"],
    queryFn: fetchCategoryTree,
  });

  console.log(categoryTree);

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

  /* =======================
    Hàm submit form
  =======================*/
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("status", formData.status);
    form.append("position", formData.position);
    form.append("thumbnail", formData.thumbnail);

    if (formData.parent_id) {
      form.append("parent_id", formData.parent_id);
    }

    mutate(form);
  };

  console.log(formData);
  return (
    <div>
      <h3>Trang tạo danh mục sản phẩm</h3>

      <form onSubmit={handleSubmitForm}>
        {/* title */}
        <h1>Tiêu đề</h1>
        <input
          name="title"
          placeholder="Tiêu đề"
          onChange={handleOnchange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <h1>Danh mục cha</h1>
        <select
          name="parent_id"
          value={formData.parent_id || ""}
          onChange={handleOnchange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">-- Danh mục gốc --</option>
          {renderCategoryOptions(categoryTree)}
        </select>

        <h1>description</h1>
        <input
          name="description"
          onChange={handleOnchange}
          placeholder="description"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <h1>status</h1>
        <label htmlFor="active">Hoạt động</label>
        <input
          type="radio"
          defaultChecked
          value="active"
          onChange={handleOnchange}
          name="status"
          id="active"
        />
        <br />
        <label htmlFor="inactive">Dừng hoạt động</label>
        <input
          type="radio"
          onChange={handleOnchange}
          name="status"
          value="inactive"
          id="inactive"
        />
        <input
          type="number"
          name="position"
          onChange={handleOnchange}
          placeholder="position"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <h1>Ảnh</h1>
        <input
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          type="file"
          name="thumbnail"
          id=""
          onChange={handleFileChange}
        />
        {formData.thumbnail && (
          <div>
            <img className="h-[50px]" src={preview} alt="" />
            <button
              type="button"
              onClick={handleRemoveThumb}
              className="border"
            >
              Xóa
            </button>
          </div>
        )}
        <button
          className="mt-[50px] w-full py-2 font-semibold text-white transition bg-blue-600 rounded  hover:bg-blue-700"
          type="submit"
        >
          {isPending ? "Loading ..." : "Tạo sản phẩm"}
        </button>
      </form>
    </div>
  );
}

export default CategoryCreateAdmin;
