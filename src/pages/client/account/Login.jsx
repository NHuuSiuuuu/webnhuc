import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../utils/axios";

function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        `${import.meta.env.VITE_API_BACKEND}/login`,
        data,
      );
    },
    onSuccess: () => {
      navigate("/");
      toast.success("Đăng nhập thành công!");
    },
    onError: () => {
      toast.error("Đăng nhập không thành công!");
    },
  });

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(formData);
        }}
        className="flex-1 flex flex-col justify-center px-10 py-8 max-w-[460px] mx-auto w-full"
      >
        <p className="text-[16px] tracking-[0.28em] uppercase text-[#aaa] mb-8">
          Đăng nhập
        </p>
        <h1 className="text-[1.4rem] font-medium text-[#111] tracking-[-0.02em] mb-1">
          Chào mừng trở lại!
        </h1>
        <p className="text-[14px] text-[#bbb] tracking-[0.02em] mb-8">
          Đăng nhập để tiếp tục mua sắm
        </p>

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

        <div className="flex justify-end mt-1 mb-2">
          <Link
            to="/forgot-password"
            className="text-[12px] text-[#888] hover:text-[#111] transition-colors no-underline border-b border-[#ccc] pb-px"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-[0.9rem] px-6 bg-[#111] hover:bg-[#333] active:bg-black text-white text-[14px] font-medium tracking-[0.25em] uppercase border-none rounded-none cursor-pointer transition-colors duration-200"
        >
          {isPending ? "Đang đăng nhập" : "Đăng nhập"}
        </button>

        <div className="flex items-center gap-2.5 my-6">
          <div className="flex-1 h-px bg-[#ece9e3]" />
          <span className="text-[12px] tracking-[0.2em] uppercase text-[#ccc]">
            hoặc
          </span>
          <div className="flex-1 h-px bg-[#ece9e3]" />
        </div>

        <p className="text-[14px] text-[#aaa] tracking-[0.03em]">
          Chưa có tài khoản?{" "}
          <Link
            to="/account/register"
            className="text-[#111] no-underline border-b border-[#111] pb-px"
          >
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
