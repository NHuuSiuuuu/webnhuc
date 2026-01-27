import { useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";

import { useEffect, useState } from "react";
import { Link } from "react-router";

function AccountAdmin() {
  const [roles, setRoles] = useState({});
  const fetchAccounts = async () => {
    const res = await axios.get("http://localhost:3001/api/account/index");
    return res.data.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });

  // Permission
  const fetchRoles = async () => {
    const res = await axios.get("http://localhost:3001/api/roles/index");
    return res.data.data;
  };

  const { data: dataRoles } = useQuery({
    queryKey: ["Roles"],
    queryFn: fetchRoles,
  });
  useEffect(() => {
    if (!dataRoles) return;

    const initRoles = {};
    dataRoles.forEach((item) => {
      initRoles[item._id] = item.title;
    });
    setRoles(initRoles);
  }, [dataRoles]);
  console.log(roles); //{6970e4b7a256f3df7e634104: 'Quản Trị Viên', 6971f3d8399f2db6cf3caf48: 'Quản trị nội dung'}
  if (isLoading) return <div>Đang loading ...</div>;
  if (isError) return <div>Lỗi</div>;
  return (
    <div>
      <h1>Trang tài khoản ADMIN</h1>
      <Link to="/admin/accounts/create" className="border">
        Thêm
      </Link>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Avatar</th>
            <th>Họ tên</th>
            <th>Phân quyền</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td></td>
              <td>{item.fullName}</td>
              <td>{roles[item.role_id]}</td>
              <td>{item.email}</td>
              <td>
                <Link
                  to={`/admin/accounts/detail/${item._id}`}
                  className="border"
                >
                  Chi tiết
                </Link>
                <Link
                  to={`/admin/accounts/update/${item._id}`}
                  className="border"
                >
                  Sửa
                </Link>
                <button className="border">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountAdmin;
