import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function AccountCreateAdmin() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const fetchRoles = async () => {
    const res = await axios.get("http://localhost:3001/api/roles/index");
    return res.data.data;
  };

  const fetchCreateAccount = async (data) => {
    const res = await axios.post(
      "http://localhost:3001/api/account/create",
      data,
    );
    return res.data;
  };

  const {
    data: dataRoles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["permissions"],
    queryFn: fetchRoles,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: fetchCreateAccount,
    onSuccess: () => {
      alert("Tạo tài khoản thành công!");
      setFormData({});
      navigate("/admin/accounts/");
    },
  });
  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  console.log(formData);
  if (isLoading) return <div>Đang load</div>;
  if (isError) return <div>Lỗi</div>;

  return (
    <>
      <h1>Tạo tài khoản admin</h1>
      <div>
        <h3>Trang tạo danh mục sản phẩm</h3>

        <form onSubmit={handleSubmitForm}>
          {/* title */}
          <h1>Họ tên</h1>
          <input
            onChange={handleOnChange}
            name="fullName"
            placeholder="Họ tên"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />

          <h1>Email</h1>
          <input
            name="email"
            onChange={handleOnChange}
            placeholder="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <h1>Mật khẩu</h1>
          <input
            name="password"
            onChange={handleOnChange}
            placeholder="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />

          <h1>Xác nhận mật khẩu</h1>
          <input
            name="passwordConfirm"
            onChange={handleOnChange}
            placeholder="passwordConfirm"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />

          <h1>Số điện thoại</h1>
          <input
            name="phone"
            onChange={handleOnChange}
            placeholder="phone"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <h1>Phân quyền</h1>
          <select name="role_id" onChange={handleOnChange}>
            <option value="">Chọn quyền</option>
            {dataRoles.map((item, index) => (
              <option key={index} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>

          {/* Avatar */}
          <button
            className="mt-[50px] w-full py-2 font-semibold text-white transition bg-blue-600 rounded  hover:bg-blue-700"
            type="submit"
          >
            Tạo tài khoản
          </button>
        </form>
      </div>
    </>
  );
}

export default AccountCreateAdmin;
