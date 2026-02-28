import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const NewPassword = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const email = localStorage.getItem("resetEmail");
  const otp = localStorage.getItem("resetOtp");

  const [visible, setVisible] = useState(false);
  const visibleHandler = () => {
    setVisible(!visible);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        { email, otp, newPassword }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form
        onSubmit={onSubmitNewPassword}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          New Password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your new password
        </p>
        <div className="relative mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] focus-within:ring-2 focus-within:ring-indigo-500">
          <img src={assets.lock_icon} alt="" />
          <input
            type={visible ? "text" : "password"}
            placeholder="Password"
            className="bg-transparent outline-none text-white w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span
            onClick={visibleHandler}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          >
            {visible ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3 hover:to-indigo-950 transition-all duration-300 cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPassword;
