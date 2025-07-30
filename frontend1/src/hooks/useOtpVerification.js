import { useState, useCallback } from "react";
import { sendOtpEmail, sendWelcomeEmail } from "../services/emailService";
import { toast } from "react-toastify";

/**
 * Custom hook for OTP verification functionality
 * @returns {Object}
 */
export const useOtpVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");

  /**
   * Send OTP email using EmailJS
   * @param {string} email - User's email address
   * @param {string} name - User's name
   * @returns {Promise<boolean>} Success status
   */
  const sendOtp = useCallback(async (email, name = "User") => {
    setIsLoading(true);
    setError("");

    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const result = await sendOtpEmail(email, otp, name);

      if (result.success) {
        try {
          const backendResponse = await fetch(
            "http://localhost:3001/api/auth/update-otp",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                otp,
                otpExpires: new Date(Date.now() + 60 * 1000), 
              }),
            }
          );

          if (!backendResponse.ok) {
            console.warn("EmailJS sent OTP but backend update failed");
          }
        } catch (backendError) {
          console.warn("Backend update failed:", backendError);
        }

        toast.success("OTP sent to your email successfully!");
        return true;
      } else {
        throw new Error(result.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("OTP sending error:", error);
      setError(error.message || "Failed to send OTP. Please try again.");
      toast.error(error.message || "Failed to send OTP. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Resend OTP email
   * @param {string} email - User's email address
   * @param {string} name - User's name
   * @returns {Promise<boolean>} Success status
   */
  const resendOtp = useCallback(
    async (email, name = "User") => {
      setIsResending(true);
      setError("");

      try {
        const success = await sendOtp(email, name);
        if (success) {
          toast.info("New OTP sent to your email!");
        }
        return success;
      } catch (error) {
        console.error("Resend OTP error:", error);
        setError(error.message || "Failed to resend OTP");
        toast.error(error.message || "Failed to resend OTP");
        return false;
      } finally {
        setIsResending(false);
      }
    },
    [sendOtp]
  );

  /**
   * Verify OTP with backend
   * @param {string} email - User's email address
   * @param {string} otp - OTP code to verify
   * @returns {Promise<boolean>} Verification success status
   */
  const verifyOtp = useCallback(async (email, otp) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:3001/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Email verified successfully!");
        try {
          await sendWelcomeEmail(email, "User");
        } catch (welcomeError) {
          console.warn("Welcome email failed:", welcomeError);
        }

        return true;
      } else {
        throw new Error(data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setError(error.message || "OTP verification failed");
      toast.error(error.message || "OTP verification failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Request OTP from backend (for existing users)
   * @param {string} email - User's email address
   * @returns {Promise<boolean>} Success status
   */
  const requestOtp = useCallback(
    async (email) => {
      setIsLoading(true);
      setError("");

      try {
        console.log("=== Requesting OTP from Backend ===");
        console.log("Email:", email);

        const response = await fetch(
          "http://localhost:3001/api/auth/send-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();
        console.log("Backend response:", data);

        if (response.ok) {
          console.log(
            "Backend OTP request successful, now sending via EmailJS"
          );

          // Generate OTP for EmailJS
          const otp = Math.floor(100000 + Math.random() * 900000).toString();

          // Send OTP via EmailJS
          const emailjsResult = await sendOtpEmail(email, otp, "User");

          if (emailjsResult.success) {
            // Update backend with the new OTP
            try {
              const backendResponse = await fetch(
                "http://localhost:3001/api/auth/update-otp",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email,
                    otp,
                    otpExpires: new Date(Date.now() + 60 * 1000), // 1 minute
                  }),
                }
              );

              if (!backendResponse.ok) {
                console.warn("EmailJS sent OTP but backend update failed");
              }
            } catch (backendError) {
              console.warn("Backend update failed:", backendError);
            }

            toast.success("OTP sent to your email!");
            return true;
          } else {
            throw new Error(
              emailjsResult.message || "Failed to send OTP via EmailJS"
            );
          }
        } else {
          throw new Error(data.message || "Failed to send OTP");
        }
      } catch (error) {
        console.error("Request OTP error:", error);
        setError(error.message || "Failed to send OTP");
        toast.error(error.message || "Failed to send OTP");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [sendOtpEmail]
  );

  const clearError = useCallback(() => {
    setError("");
  }, []);

  return {
    sendOtp,
    resendOtp,
    verifyOtp,
    requestOtp,
    clearError,
    isLoading,
    isResending,
    error,
  };
};

export default useOtpVerification;
