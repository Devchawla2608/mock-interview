import React, { useRef, useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { Mail, Clock, AlertCircle } from "lucide-react";

function OtpModal({
  isOpen,
  onClose,
  onVerify,
  onResend,
  loading = false,
  error = "",
  email = "",
  resendLoading = false,
}) {
  const inputsRef = useRef([]);
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute
  const [canResend, setCanResend] = useState(false);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val[val.length - 1];
    setOtp(newOtp);
    if (idx < 5 && val) {
      inputsRef.current[idx + 1]?.focus();
    }
  };
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };
  //Copy OTP from clipboard
  const handlePaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(""));
      setTimeout(() => inputsRef.current[5]?.focus(), 10);
      e.preventDefault();
    }
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join("").length === 6) {
      onVerify(otp.join(""));
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(60); // 1 minute
      setCanResend(false);
    }
  }, [isOpen]);

  // timer
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  //time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
        autoComplete="off">
        <div className="text-center mb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            We've sent a 6-digit code to (expires in 1 minute)
          </p>
          <p className="text-gray-900 dark:text-white font-medium">{email}</p>
        </div>
        <div className="flex gap-2 justify-center mb-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="w-12 h-12 text-center text-xl border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all font-inter"
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              autoFocus={idx === 0}
              disabled={loading}
              aria-label={`OTP digit ${idx + 1}`}
            />
          ))}
        </div>
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm text-center w-full bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={loading || otp.join("").length < 6}
          isLoading={loading}>
          Verify Email
        </Button>

        <div className="flex flex-col items-center gap-3 w-full mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Code expires in: {formatTime(timeLeft)}</span>
          </div>

          <button
            type="button"
            onClick={onResend}
            className={`text-sm font-medium transition-colors ${
              canResend && !resendLoading
                ? "text-primary-600 hover:text-primary-700 hover:underline"
                : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!canResend || resendLoading || loading}>
            {resendLoading ? "Sending..." : "Resend Code"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default OtpModal;
