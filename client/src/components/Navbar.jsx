import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { MdAdd } from 'react-icons/md'

const Navbar = () => {
  const [isOtpSending, setIsOtpSending] = useState(false);
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      setIsOtpSending(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsOtpSending(false);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 sm:px-12 md:px-24 sm:py-6 absolute top-0">
      <img src={assets.logo} alt="" className="w-24 sm:w-28 md:w-32" />

      {userData ? (
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Notes Button */}
          <button
            onClick={() => navigate("/notes")}
            className="flex items-center gap-1 sm:gap-2 border border-gray-500 rounded-full px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 hover:bg-gray-100 transition-all cursor-pointer"
          >
            <MdAdd size={16} />
            <span className="hidden xs:inline sm:inline">Create Notes</span>
            <span className="inline sm:hidden">Notes</span>
          </button>

          {/* Profile Icon */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 relative group cursor-pointer">
            {userData.picture ? (
              <img
                src={userData.picture}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center rounded-full bg-black text-white text-xs sm:text-sm">
                {userData.name[0].toUpperCase()}
              </div>
            )}

            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-8 sm:pt-10">
              <ul className="list-none m-0 p-2 bg-gray-100 text-xs sm:text-sm rounded-xl">
                {!userData.isAccountVerified && (
                  <li
                    onClick={!isOtpSending ? sendVerificationOtp : null}
                    className={`py-1 px-2 cursor-pointer rounded-xl whitespace-nowrap ${
                      isOtpSending
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {isOtpSending ? "Sending OTP..." : "Verify Email"}
                  </li>
                )}
                <li
                  onClick={logout}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer rounded-xl"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>

        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-1 sm:gap-2 border border-gray-500 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 hover:bg-gray-100 transition-all cursor-pointer"
        >
          Login
          <img src={assets.arrow_icon} alt="" className="w-3 sm:w-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;