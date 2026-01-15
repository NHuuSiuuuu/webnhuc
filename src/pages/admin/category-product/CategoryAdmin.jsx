import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

function CategoryAdmin() {
  const queryClient = useQueryClient();
  const listCategory = async () => {
    const res = await axios.post(
      `http://localhost:3001/api/category-product/productCategories`
    );
    return res.data.productCategories;
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: listCategory,
    queryKey: ["categories"],
  });

  // API Xóa Danh  Mục SP
  const deleteCategory = async (id) => {
    const res = await axios.patch(
      `http://localhost:3001/api/category-product/delete/${id}`
    );

    return res.data;
  };

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      alert("Xóa thành công!");
    },
  });

  const handleRemoveProduct = (id) => {
    if (confirm("Bạn có chắc muốn xóa!")) {
      deleteMutation.mutate(id);
    }
  };
  if (isLoading) return <div>Loading ....</div>;
  if (isError) return <div>Lỗi rồi</div>;
  console.log(data);
  return (
    <div>
      <h3>Trang danh mục sản phẩm</h3>
      <Link
        className="border p-[5px] my-[10px] inline-block"
        to="/admin/product-category/create"
      >
        Tạo mới sản phẩm
      </Link>

      <table className="border">
        <thead className="border">
          <tr>
            <th className="border px-[20px]">Tiêu đề</th>
            <th className="border px-[20px]">Chi tiết</th>
            <th className="border px-[20px]">Sản phẩm nổi bật</th>
            <th className="border px-[20px]">Giá</th>
            <th className="border px-[20px]">Trạng thái</th>
            <th className="border px-[20px]">Ảnh</th>
            <th className="border px-[20px]">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border px-[20px]">{item.title}</td>
              <td className="border px-[20px]">{item.description}</td>
              <td className="border px-[20px]">
                {item.featured == "0" ? "Không nổi bật" : "Nổi bật"}
              </td>
              <td className="border px-[20px]">{item?.position}</td>
              <td className="border px-[20px]">
                {item?.status == "active" ? "Hoạt động" : "Dừng hoạt dộng"}
              </td>
              <td className="border px-[20px]">
                {item?.thumbnail?.map((i, idx) => (
                  <img src={i} key={idx} className="h-[100px]" alt="" />
                ))}
              </td>
              <td>
                <Link
                  to={`/admin/product-category/update/${item._id}`}
                  className="border mx-[5px] px-[10px]"
                >
                  Sửa
                </Link>
                <Link to={`/admin/product-category/detail/${item._id}`} className="border mx-[5px] px-[10px]">Chi tiết</Link>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(item._id)}
                  className="border mx-[5px] px-[10px]"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryAdmin;
