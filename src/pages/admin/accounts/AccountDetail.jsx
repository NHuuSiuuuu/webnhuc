import { useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function AccountDetail() {
  const [roles, setRoles] = useState({});

  const { id } = useParams();
  const fetchDetail = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/account/detail/${id}`,
    );
    return res.data.data;
  };
  const fetchRoles = async () => {
    const res = await axios.get("http://localhost:3001/api/roles/index");
    return res.data.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Account"],
    queryFn: fetchDetail,
  });
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

  if (isLoading) return <div>Đang load ...</div>;
  if (isError) return <div>Lỗi</div>;
  console.log(data);

  return (
    <div>
      <h1>Trang chi tiết tài khoản</h1>
      {data.fullName}
      {data.email}
      {data.phone}
      {data.fullName}
      {roles[data.role_id]}
    </div>
  );
}

export default AccountDetail;
