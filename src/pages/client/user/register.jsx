import { useState } from "react";
import { Link } from "react-router";

function Register() {
  const [formData, setFormData] = useState({});

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 ">
      <div className="p-6 bg-white rounded-lg shadow ">
        <h1 className="mb-2 text-2xl font-semibold text-center">Xin chào!</h1>
        <h2 className="mb-4 text-lg text-center">Đăng ký tài khoản</h2>

        <hr className="mb-4" />

        <form className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Họ tên</label>
            <input
              onChange={handleOnChange}
              name="fullName"
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập họ tên"
            />
          </div>

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
            className="py-2 mt-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
          >
            Đăng ký
          </button>
        </form>
        <br />
        <Link
          to="http://localhost:5173/login"
          type="button"
          className="py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
        >
          Đăng Nhập
        </Link>
      </div>
    </div>
  );
}

export default Register;
