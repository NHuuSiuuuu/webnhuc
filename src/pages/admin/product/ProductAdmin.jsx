import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductAdmin() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);
  /* =======================
    API danh sách product
  =======================*/
  const fetchApi = async ({ queryKey }) => {
    // Lấy dữ liệu từ queryKey của ReactQuery ra để dùng
    const [, sort, filter, statusFilter] = queryKey;
    let url = `http://localhost:3001/api/product/products?page=${page}`;

    // 2 thằng này dùng find để tìm bên database chứ không dùng hàm filter
    if (statusFilter) url += `&filter=status:${statusFilter}`;
    if (filter) url += `&filter=featured:${filter}`;

    if (sort) url += `&sort=${sort}`;

    const res = await axios.get(url);
    return res.data;
  };

  /* =======================
    Load product
  =======================*/
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", sort, filter, statusFilter],
    queryFn: fetchApi,
  });

  /* =======================
    API xóa product
  =======================*/
  const deleteProduct = async (id) => {
    const res = await axios.patch(
      `http://localhost:3001/api/product/delete/${id}`,
    );
    return res.data;
  };

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

  /* =======================
    Hàm lọc trạng thái
  =======================*/
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    console.log(e.target.value);
  };
  /* =======================
    Hàm lọc trạng thái nổi bật
  =======================*/
  const handleFeaturedFilter = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Lỗi rồi</div>;

  return (
    <div>
      {/* Bộ lọc trạng thái */}
      <div>
        <label htmlFor="status">
          <h1 className="font-bold">Trạng thái hoạt động</h1>
        </label>
        <select
          value={statusFilter}
          onChange={handleStatusFilter}
          name=""
          id="status"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Dừng hoạt động</option>
        </select>
      </div>
      <hr />
      {/* Bộ lọc sản phẩm nổi bật */}
      <div>
        <label htmlFor="featured">
          <h1 className="font-bold">Trạng thái nội bật</h1>
        </label>
        <select
          value={filter}
          onChange={handleFeaturedFilter}
          name="featured"
          id="filter"
        >
          <option value="">Tất cả</option>
          <option value="1">Nổi bật</option>
          <option value="0">Không nổi bật</option>
        </select>
      </div>
      <hr />
      {/* Bộ Sắp Xếp*/}
      <div>
        <label htmlFor="sort">
          <h1 className="font-bold">Sắp xếp</h1>
        </label>
        <select value={sort} onChange={handleSort} id="sort">
          <option value="">Mặc định</option>
          <option value="title:asc">A - Z</option>
          <option value="title:desc">Z - A</option>
          <option value="price:desc">Giá: Cao - Thấp</option>
          <option value="price:asc">Giá: Thấp - Cao</option>
        </select>
      </div>
      <hr />

      {/* Reset bộ lọc */}
      <button
        onClick={() => {
          (setFilter(""), setSort(""), setStatusFilter(""));
        }}
        className="border my-[5px]"
      >
        Reset Bộ lọc
      </button>
      <hr />
      {/* Hiển thị trạng thái lọc hiện tại */}
      <div>
        {statusFilter && (
          <div>
            <h1 className="font-bold text-black">Trạng thái lọc hiện tại: </h1>
            {statusFilter == "active" ? "Đang hoạt động" : "Dừng hoạt động"}
          </div>
        )}
        {filter && (
          <div>
            <h1 className="font-bold text-black">Sản phẩm nổi bật: </h1>
            {filter == "0" ? "Có" : "Không"}
          </div>
        )}
        {sort && (
          <div>
            <h1 className="font-bold text-black">Sắp xếp: </h1>
            {sort.includes("price") ? "Giá: " : "Tên"}
            {sort.includes("asc") ? "↑" : "↓"}
          </div>
        )}
      </div>

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
