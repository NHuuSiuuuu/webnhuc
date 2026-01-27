import { useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";

import { useState } from "react";
import { useParams } from "react-router";

function CategoryDetail() {
  const { id } = useParams();
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
  if (isLoading) return <div>Đang load</div>;
  if (isError) return <div>Lỗi</div>;
  console.log(data);

  return (
    <div>
      <h1>Trang chi tiết danh mục</h1>
      <h1>Danh mục: {data.title}</h1>
    </div>
  );
}

export default CategoryDetail;
