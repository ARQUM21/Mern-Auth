import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";

const CountdownOtp = ({ onResend, localStorageKey }) => {
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(null);

  // Initialize timer on mount
  useEffect(() => {
    const expireTime = localStorage.getItem(localStorageKey);
    if (expireTime && Number(expireTime) > Date.now()) {
      setTimer(Number(expireTime));
    } else {
      // If no expiry....start new timer 2 min
      const newExpire = Date.now() + 2 * 60 * 1000;
      localStorage.setItem(localStorageKey, newExpire);
      setTimer(newExpire);
    }
  }, [localStorageKey]);

  // Step 2: Resend OTP
  const resendOtp = async () => {
    if (isResending) return;
    setIsResending(true);

    await onResend();

    const newExpire = Date.now() + 2 * 60 * 1000;
    localStorage.setItem(localStorageKey, newExpire);
    setTimer(newExpire);

    setIsResending(false);
  };

  if (!timer) return null; // Safety fallback

  return (
    <Countdown
      key={timer} // Re-render countdown when timer changes
      date={timer}
      renderer={({ minutes, seconds, completed }) => {
        if (completed) {
          return (
            <button
              type="button"
              onClick={resendOtp}
              disabled={isResending}
              className={`mt-2 cursor-pointer ${
                isResending ? "text-white cursor-not-allowed" : "text-indigo-400 hover:text-white"
              }`}
            >
              {isResending ? "Please wait..." : "Resend OTP"}
            </button>
          );
        } else {
          return (
            <span>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          );
        }
      }}
    />
  );
};

export default CountdownOtp;
