import { useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import { Link } from "react-router";
import Logout from "../auth/Logout";

function Header() {
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
      <Link className="border border-b-black" to="">
        {data.fullName}
      </Link>
      <Logout />
      <h1></h1>
    </div>
  );
}

export default Header;
