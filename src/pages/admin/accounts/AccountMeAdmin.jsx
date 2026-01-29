import { useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";

function AccountMeAdmin() {
  const fetchGetMe = async () => {
    const res = await axios.get("http://localhost:3001/api/account/getMe");
    return res.data.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getMe"],
    queryFn: fetchGetMe,
  });

  if (isLoading) return <div>Đang loading ...</div>;
  if (isError) return <div>Lỗi</div>;
  console.log(data);

  return (
    <div>
      {" "}
      <h1> Trang chủ</h1>
      <h1>{data.fullName}</h1>
      {data.email}
      {data.role_id.title}
      {data.role_id.description}
      <h1></h1>
    </div>
  );
}

export default AccountMeAdmin;
