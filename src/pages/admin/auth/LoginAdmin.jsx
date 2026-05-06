import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../utils/axios";

function LoginAdmin() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        `${import.meta.env.VITE_API_BACKEND}/login`,
        data,
      );
    },
    onSuccess: ({ data }) => {
      navigate("/admin");
      console.log(data);
    },
    onError: () => {
      toast.error("Đăng nhập tài không khoản thành công!");
    },
  });

  const handleRegister = (e) => {
    mutate(formData);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center px-10 py-8 max-w-[460px] mx-auto w-full">
        <p className="text-[16px] tracking-[0.28em] uppercase text-[#aaa] mb-8">
          Đăng nhập
        </p>
        <h1 className="text-[1.4rem] font-medium text-[#111] tracking-[-0.02em] mb-1">
          ADMIN
        </h1>

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

        <button
          type="button"
          onClick={(e) => {
            handleRegister(e);
          }}
          className="w-full mt-4 py-[0.9rem] px-6 bg-[#111] hover:bg-[#333] active:bg-black text-white text-[14px] font-medium tracking-[0.25em] uppercase border-none rounded-none cursor-pointer transition-colors duration-200"
        >
          {isPending ? "Đang đăng nhập" : "Đăng nhập"}
        </button>
      </div>
    </div>
  );
}

export default LoginAdmin;
