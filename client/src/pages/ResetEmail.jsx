import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetEmail = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("resetEmail", email);
        navigate("/password-otp");
      } else {
        toast.error(data.message);
      }
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
      <form onSubmit={onSubmitEmail} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
        <p className="text-center mb-6 text-indigo-300">Enter your registered email</p>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] focus-within:ring-2 focus-within:ring-indigo-500">
          <img src={assets.mail_icon} alt="" className="w-3 h-3" />
          <input
            type="email"
            placeholder="Email id"
            className="bg-transparent outline-none text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading} // disable while loading
          className={`w-full py-2.5 rounded-full mt-3 cursor-pointer transition-all duration-300 ${
            loading
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-indigo-900 text-white hover:to-indigo-950"
          }`}
        >
          {loading ? "Sending OTP..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ResetEmail;
