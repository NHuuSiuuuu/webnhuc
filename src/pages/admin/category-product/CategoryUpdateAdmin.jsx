import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CategoryUpdateAdmin() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  /* =======================
    State form data
  =======================*/
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
    position: "",
    thumbnail: [],
    newThumbnail: [],
  });

  /* =======================
    API chi tiết danh mục
  =======================*/
  const fetchData = async () => {
    const res = await axios.post(
      `http://localhost:3001/api/category-product/detail/${id}`
    );
    return res.data.productCategory;
  };
  const { data, isLoading, isError } = useQuery({
    queryFn: fetchData,
    queryKey: ["category", id],
  });

  /* =======================
    Set form khi có data
  =======================*/
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title ?? "",
        description: data.description ?? "",
        status: data.status ?? "",
        position: data.position ?? "",
        thumbnail: data.thumbnail ?? "",
        newThumbnail: [],
      });
    }
  }, [data]);
  /* =======================
    Hàm xử lý thay đổi
  =======================*/
  const handleOnchange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type == "number" ? Number(value) : value,
    }));
  };

  /* =======================
  Hàm xử lý thay đổi file
  =======================*/
  /*   
  Lần chọn ảnh đầu tiên
  prev.newThumbnail = []
  files = [A, B]
  Kết quả: newThumbnail [A, B]
  Lần chọn ảnh thứ 2
  prev.newThumbnail = [A, B]
  files = [C]
  Kết quả là: newThumbnail = [A, B, C]

  */
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      // prev.newThumbnail là mảng cũ và files là mảng mới cần ghép 2 mảng nên là dùng [...,..]
      newThumbnail: [...prev.newThumbnail, ...files], // giữ ảnh cũ + thêm ảnh mới
    }));
  };

  /* =======================
    Hàm xóa preview ảnh cũ
  =======================*/
  const handleRemoveThumb = (indexRemove) => {
    setFormData((prev) => ({
      ...prev,
      // prev.thumbnail = [img1, img2, img3]
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
    Hàm xóa preview ảnh mới
  =======================*/
  const handleRemoveThumbNew = (idxRemove) => {
    setFormData((prev) => ({
      ...prev,
      newThumbnail: prev.newThumbnail.filter((_, idx) => {
        if (idx == idxRemove) {
          return false;
        } else {
          return true;
        }
      }),
    }));
  };

  /* =======================
    API update
  =======================*/
  const updateCategory = async (payload) => {
    const res = await axios.patch(
      `http://localhost:3001/api/category-product/update/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  };
  /* =======================
    mutation
  =======================*/
  const { mutate, isPending } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      alert("Cập nhật thành công");
      navigate("/admin/products-category");
    },
  });

  /* =======================
    hàm submit
  =======================*/
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("status", formData.status);
    form.append("position", formData.position);

    // Xóa ảnh trong cloud <Chưa làm>
    // form.append("oldThumbnail", JSON.stringify(formData.thumbnail));

    // newThumbnail: [],
    formData.newThumbnail.forEach((item) => form.append("thumbnail", item));
    mutate(form);
  };
  console.log(formData);
  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Lỗi</div>;
  return (
    <div>
      <h3>Trang sửa danh mục sản phẩm</h3>
      <form onSubmit={handleSubmitForm}>
        {/* title */}
        <h1>Tiêu đề</h1>
        <input
          name="title"
          placeholder="Tiêu đề"
          onChange={handleOnchange}
          required
          value={formData.title}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <h1>description</h1>
        <input
          name="description"
          onChange={handleOnchange}
          placeholder="description"
          value={formData.description}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <h1>status</h1>
        <label htmlFor="active">Hoạt động</label>
        <input
          type="radio"
          defaultChecked
          value="active"
          checked={formData.status == "active"}
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
          checked={formData.status == "inactive"}
          value="inactive"
          id="inactive"
        />
        <input
          type="number"
          name="position"
          value={formData.position}
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
        {/* Ảnh cũ */}
        {formData.thumbnail.map((item, index) => (
          <div key={index}>
            <img className="h-[50px]" src={item} alt="" />
            <button
              type="button"
              onClick={() => handleRemoveThumb(index)}
              className="border"
            >
              Xóa
            </button>
          </div>
        ))}

        {/* Ảnh mới */}
        {formData.newThumbnail.map((item, index) => (
          <div key={item}>
            <img src={URL.createObjectURL(item)} alt="" />
            <button
              type="button"
              onClick={() => handleRemoveThumbNew(index)}
              className="border"
            >
              Xóa
            </button>
          </div>
        ))}

        <button
          className="mt-[50px] w-full py-2 font-semibold text-white transition bg-blue-600 rounded  hover:bg-blue-700"
          type="submit"
        >
          {isPending ? "Đang sửa" : "Sửa danh mục phẩm"}
        </button>
      </form>
    </div>
  );
}

export default CategoryUpdateAdmin;
