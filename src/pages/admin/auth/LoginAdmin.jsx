import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function LoginAdmin() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //   Api đăng nhập
  const fetchLogin = async (data) => {
    const res = await axios.post(`http://localhost:3001/api/login`, data);
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: fetchLogin,

    // API hoạt động [STATUS 200, 201, ...], chỉ là logic lỗi: email sai, k tồn tại, ....
    onSuccess: (data) => {
      if (data.status === "OK") {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        // Set lại nếu những lần trước người đăng nhập lỗi
        setErrorMessage("");
        console.log(data);
        navigate("/admin");
      } else if (data.status === "ERR") {
        setErrorMessage(data.message);
      }
    },

    //[STATUS 4xx, 5xx, 400, 500, 404...] Khi không connect được APi (Server chết, mất mạng,...)
    onError: () => {
      setErrorMessage("Không thể kết nối đến server!");
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
    console.log(formData);
    mutate(formData);
  };
  //   console.log(data);
  console.log("errorMessage:", errorMessage);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white p-6 rounded-lg shadow">
        <h1 className="mb-1 text-2xl font-semibold text-center">Xin chào!</h1>
        <h2 className="mb-4 text-lg text-center">Đăng nhập bằng tài khoản</h2>

        <hr className="mb-4" />
        {errorMessage && <div className="text-[#f00]">{errorMessage} !</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              onChange={handleOnChange}
              name="email"
              type="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập email"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Mật khẩu</label>
            <input
              onChange={handleOnChange}
              name="password"
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
          >
            {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <button className="block mx-auto mt-4 text-sm text-blue-500 hover:underline">
          Quên mật khẩu?
        </button>

        <Link
          to="http://localhost:5173/register"
          type="button"
          className="py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
        >
          Đăng ký
        </Link>
      </div>
    </div>
  );
}

export default LoginAdmin;
