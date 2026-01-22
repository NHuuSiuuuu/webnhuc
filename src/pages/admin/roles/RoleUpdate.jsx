import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function RoleUpdate() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const fetchRolesDetail = async () => {
    const res = await axios.get(`http://localhost:3001/api/roles/detail/${id}`);
    return res.data.data;
  };

  // Api update
  const updateRole = async (payload) => {
    const res = await axios.patch(
      `http://localhost:3001/api/roles/update/${id}`,
      payload,
    );
    return res.data;
  };

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] }); // gọi lại api bên trang kia khi có thay đổi
      alert("Cập nhật thành công!");
      navigate("/admin/roles/");
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["role", id],
    queryFn: fetchRolesDetail,
  });
  console.log(data);
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        description: data.description,
      });
    }
  }, [data]);

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    mutate(formData);
  };

  if (isLoading) return <div>Đang loading ....</div>;
  if (isError) return <div>Lỗi</div>;
  console.log(formData);

  return (
    <div>
      <h1>Chỉnh sửa quyền</h1>
      <form onSubmit={handleOnSubmit}>
        <h1>Tiêu đề</h1>
        <input
          type="text"
          name="title"
          onChange={handleOnChange}
          className="border"
          value={formData.title}
        />{" "}
        <h1>Chi tiết</h1>
        <input
          type="text"
          name="description"
          className="border"
          onChange={handleOnChange}
          value={formData.description}
        />
        <button>{isPending ? "Đang thây đổi" : "Tày"}</button>
      </form>
    </div>
  );
}

export default RoleUpdate;
