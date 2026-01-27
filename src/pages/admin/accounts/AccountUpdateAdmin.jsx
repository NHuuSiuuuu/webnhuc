import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";

import { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router";

function AccountCreateAdmin() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { id: idAccount } = useParams();

  const fetchRoles = async () => {
    const res = await axios.get("http://localhost:3001/api/roles/index");
    return res.data.data;
  };

  const fetchDetailAccount = async (data) => {
    const res = await axios.get(
      `http://localhost:3001/api/account/detail/${idAccount}`,
      data,
    );
    return res.data.data;
  };

  const fetchUpdateAccount = async (data) => {
    const res = await axios.patch(
      `http://localhost:3001/api/account/update/${idAccount}`,
      data,
    );
  };
  const {
    data: dataAccountDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Account"],
    queryFn: fetchDetailAccount,
  });
  const { data: dataRoles } = useQuery({
    queryKey: ["Roles"],
    queryFn: fetchRoles,
  });

  useEffect(() => {
    if (dataAccountDetail) {
      setFormData({
        fullName: dataAccountDetail.fullName,
        email: dataAccountDetail.email,
        phone: dataAccountDetail.phone,
        role_id: dataAccountDetail.role_id,
      });
    }
  }, [dataAccountDetail]);
  const { mutate, isPending } = useMutation({
    mutationFn: fetchUpdateAccount,
    onSuccess: () => {
      setFormData({});
      navigate("/admin/accounts/");
    },
  });

  // const { data: dataAcount, isLoading, isError } = useQuery({
  //   queryKey: "Account",
  //   queryFn:
  // });
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
      <h1>Sửa tài khoản admin</h1>
      <div>
        <form onSubmit={handleSubmitForm}>
          {/* title */}
          <h1>Họ tên</h1>
          <input
            // value={formData.fullName}
            onChange={handleOnChange}
            name="fullName"
            value={formData.fullName}
            placeholder="Họ tên"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />

          <h1>Email</h1>
          <input
            name="email"
            onChange={handleOnChange}
            value={formData.email}
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
            value={formData.phone}
            onChange={handleOnChange}
            placeholder="phone"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <h1>Phân quyền</h1>
          <select
            name="role_id"
            value={formData.role_id || ""}
            onChange={handleOnChange}
          >
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
            Sửa
          </button>
        </form>
      </div>
    </>
  );
}

export default AccountCreateAdmin;
