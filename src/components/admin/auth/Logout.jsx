import { useNavigate } from "react-router";
function Logout() {
  const navigate = useNavigate();
  const handleOnClick = () => {
    localStorage.removeItem("access_token");
    navigate("/admin/login");
  };
  return <button onClick={handleOnClick}>Đăng xuất</button>;
}

export default Logout;
