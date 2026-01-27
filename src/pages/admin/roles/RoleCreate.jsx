import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../../utils/axios";

import { useState } from "react";
import { useNavigate } from "react-router";

function RoleCreate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const fetchCreateRole = async (data) => {
    const res = await axios.post(
      "http://localhost:3001/api/roles/create",
      data,
    );
    return res.data;
  };

  const { mutate, isPending, isError } = useMutation({
    mutationFn: fetchCreateRole,
    onSuccess: () => {
      alert("Tạo quyền mới thành công!");
      queryClient.invalidateQueries(["roles"]);

      setFormData({
        title: "",
        description: "",
      });
      navigate("/admin/roles/");
    },
  });

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gửi mỗi text không cần formData

    mutate(formData);
  };
  if (isError) return <div>Lỗi rồi!</div>;
  return (
    <div>
      Tạo quyền
      <form onSubmit={handleSubmit}>
        <h1>Tiêu đề</h1>
        <input
          name="title"
          onChange={handleOnChange}
          className="w-full px-3 py-2 border"
          type="text"
        />
        <h1>Mô tả</h1>
        <input
          name="description"
          onChange={handleOnChange}
          className="w-full px-3 py-2 border"
          type="text"
        />
        <button className="border my-[50px] p-[20px]">
          {isPending ? "Đang tạo" : "Tạo"}
        </button>
      </form>
    </div>
  );
}

export default RoleCreate;
