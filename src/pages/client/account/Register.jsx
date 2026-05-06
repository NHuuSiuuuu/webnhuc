import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        `${import.meta.env.VITE_API_BACKEND}/account/createUser`,
        data,
      );
    },
    onSuccess: () => {
      toast.success("Tạo tài khoản thành công!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();

    mutate(formData);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left beige panel */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] shrink-0 bg-[#f5f2ec] px-10 py-12">
        <span className="inline-block bg-[#111] text-[#f5f2ec] text-[18px] tracking-[0.3em] uppercase px-2 py-[30px]">
          NHuu · Boutique
        </span>
        <div>
          <p className="text-[2.8rem] font-medium text-[#111] tracking-[-0.03em] leading-none mb-[0.4rem]">
            NHuu
          </p>
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#888]">
            NHuu · Boutique
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center px-10 py-8 max-w-[460px] mx-auto w-full">
        <p className="text-[16px] tracking-[0.28em] uppercase text-[#aaa] mb-8">
          Tạo tài khoản
        </p>
        <h1 className="text-[1.4rem] font-medium text-[#111] tracking-[-0.02em] mb-1">
          Xin chào!
        </h1>
        <p className="text-[14px] text-[#bbb] tracking-[0.02em] mb-8">
          Đăng ký để mua hàng &amp; theo dõi đơn
        </p>
        <form
          onSubmit={(e) => {
            handleRegister(e);
          }}
        >
          <div className="relative shadow-2xs my-[15px]">
            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="Họ và tên"
              className="w-full peer border border-[#888] text-[#111] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#111] focus:placeholder-transparent"
            />
            <label className="text-[#444] pointer-events-none font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-200 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
              Họ và tên
            </label>
          </div>

          <div className="relative shadow-2xs my-[15px]">
            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="w-full peer border border-[#888] text-[#111] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#111] focus:placeholder-transparent"
            />
            <label className="text-[#444] pointer-events-none font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-200 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
              Email
            </label>
          </div>
          <div className="relative shadow-2xs my-[15px]">
            <input
              type="tel"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Số điện thoại"
              className="w-full peer border border-[#888] text-[#111] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#111] focus:placeholder-transparent"
            />
            <label className="text-[#444] pointer-events-none font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-200 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
              Số điện thoại
            </label>
          </div>

          <div className="relative shadow-2xs my-[15px]">
            <input
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Mật khẩu"
              className="w-full peer border border-[#888] text-[#111] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#111] focus:placeholder-transparent"
            />
            <label className="text-[#444] pointer-events-none font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-200 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
              Mật khẩu
            </label>
          </div>
          <div className="relative shadow-2xs my-[15px]">
            <input
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, passwordConfirm: e.target.value })
              }
              placeholder="Nhâp lại mật khẩu"
              className="w-full peer border border-[#888] text-[#111] rounded-[4px] py-[14px] pr-[40px] pl-[26px] focus:outline-[#111] focus:placeholder-transparent"
            />
            <label className="text-[#444] pointer-events-none font-medium left-[22px] peer-focus:-translate-y-1/2 px-[4px] translate-y-1/2 bg-white transition-all duration-200 opacity-0 peer-focus:opacity-100 absolute peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:opacity-100">
              Mật khẩu
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 py-[0.9rem] px-6 bg-[#111] hover:bg-[#333] active:bg-black text-white text-[14px] font-medium tracking-[0.25em] uppercase border-none rounded-none cursor-pointer transition-colors duration-200"
          >
            {isPending ? "Đang tạo..." : "Tạo tài khoản"}
          </button>
        </form>

        <div className="flex items-center gap-2.5 my-6">
          <div className="flex-1 h-px bg-[#ece9e3]" />
          <span className="text-[12px] tracking-[0.2em] uppercase text-[#ccc]">
            hoặc
          </span>
          <div className="flex-1 h-px bg-[#ece9e3]" />
        </div>

        <p className="text-[14px] text-[#aaa] tracking-[0.03em]">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="text-[#111] no-underline border-b border-[#111] pb-px"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
