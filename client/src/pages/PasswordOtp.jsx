import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CountdownOtp from "../components/CountdownOtp";
import { AppContent } from "../context/AppContext";
import { assets } from "../assets/assets";

const PasswordOtp = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const email = localStorage.getItem("resetEmail");

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1)
      inputRefs.current[index + 1].focus();
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0)
      inputRefs.current[index - 1].focus();
  };
  const handlePaste = (e) => {
    const pasteArray = e.clipboardData.getData("text").split("");
    pasteArray.forEach((char, i) => {
      if (inputRefs.current[i]) inputRefs.current[i].value = char;
    });

    const lastIndex = Math.min(pasteArray.length, inputRefs.current.length) - 1;
  if (inputRefs.current[lastIndex]) {
    inputRefs.current[lastIndex].focus();
  }

};



  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((e) => e.value).join("");
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-reset-otp`, { email, otp });
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("resetOtp", otp);
        navigate("/new-password");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleResend = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      data.success ? toast.success("OTP resent") : toast.error(data.message);
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
      <form onSubmit={onSubmitOTP} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password OTP</h1>
        <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email</p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer ">Submit</button>
        <div className="text-white mt-4">
          <CountdownOtp onResend={handleResend} localStorageKey="resetOtpExpire" />
        </div>
      </form>
    </div>
  );
};

export default PasswordOtp;
