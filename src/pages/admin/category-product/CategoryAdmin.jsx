import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../../utils/axios";

import { useState } from "react";
import { Link } from "react-router-dom";

function CategoryAdmin() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const listCategory = async ({ queryKey }) => {
    const [, page, sort, filter] = queryKey;
    let url = `http://localhost:3001/api/category-product/productCategories?page=${page}`;

    if (filter) url += `&filter=status:${filter}`;

    if (sort) url += `&sort=${sort}`;
    const res = await axios.post(url);

    return res.data.productCategories;
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: listCategory,
    queryKey: ["categories", page, sort, filter],
  });

  // API Xóa Danh  Mục SP
  const deleteCategory = async (id) => {
    const res = await axios.patch(
      `http://localhost:3001/api/category-product/delete/${id}`,
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
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  if (isLoading) return <div>Loading ....</div>;
  if (isError) return <div>Lỗi rồi</div>;
  console.log("data", data);
  // lấy id tương ứng với tên danh mục
  const categoryMap = {};
  data.forEach((cat) => {
    categoryMap[cat._id] = cat.title;
  });
  return (
    <div>
      <h3 className="font-bold">Trang danh mục sản phẩm</h3>
      <hr />
      <h3 className="font-bold">Trạng thái hoạt động</h3>
      <select value={filter} onChange={handleFilter} id="">
        <option value="">Tất cả</option>
        <option value="active">Hoạt động</option>
        <option value="inactive">Dừng hoạt động</option>
      </select>
      <br />
      <h3 className="font-bold">Sắp xếp</h3>
      <select value={sort} onChange={handleSort} name="" id="">
        <option value="">Mặc định</option>
        <option value="title:asc">A - Z</option>
        <option value="title:desc">Z - A</option>
        <option value="position:asc">Position: asc </option>
        <option value="position:desc">Position: desc </option>
      </select>
      <br />
      <Link
        className="border p-[5px] my-[10px] inline-block"
        to="/admin/product-category/create"
      >
        Tạo mới danh mục sản phẩm
      </Link>
      {data.length === 0 ? (
        <div>
          <h1>Không có danh mục nào! Hãy tạo mới danh mục sản phẩm!</h1>
        </div>
      ) : (
        <table className="border">
          <thead className="border">
            <tr>
              <th className="border px-[20px]">Tiêu đề</th>
              <th className="border px-[20px]">Danh mục</th>
              <th className="border px-[20px]">Chi tiết</th>
              <th className="border px-[20px]">Vị trí danh mục</th>
              <th className="border px-[20px]">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border px-[20px]">{item.title}</td>
                <td className="border px-[20px]">
                  {item.parent_id
                    ? categoryMap[item.parent_id]
                    : "Danh mục cha"}
                </td>
                <td className="border px-[20px]">{item.description}</td>

                <td className="border px-[20px]">{item?.position}</td>
                <td className="border px-[20px]">
                  {item?.status == "active" ? "Hoạt động" : "Dừng hoạt dộng"}
                </td>
                <td>
                  <Link
                    to={`/admin/product-category/update/${item._id}`}
                    className="border mx-[5px] px-[10px]"
                  >
                    Sửa
                  </Link>
                  <Link
                    to={`/admin/product-category/detail/${item._id}`}
                    className="border mx-[5px] px-[10px]"
                  >
                    Chi tiết
                  </Link>
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
      )}

      <div>
        <button onClick={() => setPage(page - 1)} className="border">
          {" "}
          Prev
        </button>
        <button onClick={() => setPage(page + 1)} className="border">
          {" "}
          Next
        </button>
      </div>
    </div>
  );
}

export default CategoryAdmin;
