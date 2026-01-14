import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductAdmin() {
  const queryClient = useQueryClient();
  /* =======================
    API danh sách product
  =======================*/
  const fetchApi = async () => {
    const res = await axios.get(
      "http://localhost:3001/api/product/products?page=1"
    );
    return res.data;
  };

  /* =======================
    API xóa product
  =======================*/
  const deleteProduct = async (id) => {
    const res = await axios.patch(
      `http://localhost:3001/api/product/delete/${id}`
    );
    return res.data;
  };

  /* =======================
    Load product
  =======================*/
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchApi,
  });

  /* =======================
    Mutation delete
  =======================*/
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  /* =======================
    Hàm xóa product
  =======================*/
  const handleRemoveProduct = (id) => {
    if (confirm("Bạn có chắc muốn xóa!")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Lỗi rồi</div>;

  return (
    <div>
      <h1> Trang sản phẩm</h1>
      <Link to="/admin/product/create">Tạo mới sản phẩm</Link>

      <table className="border">
        <thead className="border">
          <tr>
            <th className="border px-[20px]">Tiêu đề</th>
            <th className="border px-[20px]">Chi tiết</th>
            <th className="border px-[20px]">Sản phẩm nổi bật</th>
            <th className="border px-[20px]">Giá</th>
            <th className="border px-[20px]">Giảm giá</th>
            <th className="border px-[20px]">Còn lại</th>
            <th className="border px-[20px]">Vị trí</th>
            <th className="border px-[20px]">Trạng thái</th>
            <th className="border px-[20px]">Ảnh</th>
            <th className="border px-[20px]">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {data.products.map((item, index) => (
            <tr key={index}>
              <td className="border px-[20px]">{item.title}</td>
              <td className="border px-[20px]">{item.description}</td>
              <td className="border px-[20px]">
                {item.featured == "0" ? "Không nổi bật" : "Nổi bật"}
              </td>
              <td className="border px-[20px]">{item.price}</td>
              <td className="border px-[20px]">{item.discountPercentage}</td>
              <td className="border px-[20px]">{item.stock}</td>
              <td className="border px-[20px]">{item.position}</td>
              <td className="border px-[20px]">
                {item.status == "active" ? "Hoạt động" : "Dừng hoạt dộng"}
              </td>
              <td className="border px-[20px]">
                {item?.thumbnail?.map((item, index) => (
                  <img key={index} className="size-[50px] " src={item} alt="" />
                ))}
              </td>
              <td className="border px-[20px]">
                <Link
                  to={`/admin/product/update/${item._id}`}
                  className="border mx-[5px] px-[10px]"
                >
                  Sửa
                </Link>
                <button className="border mx-[5px] px-[10px]">Chi tiết</button>
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

export default ProductAdmin;
