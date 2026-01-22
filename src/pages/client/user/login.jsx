import { useState } from "react";
import { Link } from "react-router";

function Login() {
  const [formData, setFormData] = useState({});

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
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white p-6 rounded-lg shadow">
        <h1 className="mb-1 text-2xl font-semibold text-center">Xin chào!</h1>
        <h2 className="mb-4 text-lg text-center">Đăng nhập bằng tài khoản</h2>

        <hr className="mb-4" />

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
            className="py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
          >
            Đăng nhập
          </button>
        </form>

        <button className="block mx-auto mt-4 text-sm text-blue-500 hover:underline">
          Quên mật khẩu?
        </button>

        <Link to="http://localhost:5173/register"
          type="button"
          className="py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
        >
          Đăng ký
        </Link>
      </div>
    </div>
  );
}

export default Login;
