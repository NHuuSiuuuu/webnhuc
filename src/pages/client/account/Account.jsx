import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";

function Account() {
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.get(`${import.meta.env.VITE_API_BACKEND}/logout`);
    },
  });
  return (
    <div>
      <h1> Tài khoản của bạn</h1>
      <button className="border" onClick={mutate}>
        Đăng xuất
      </button>
    </div>
  );
}

export default Account;
