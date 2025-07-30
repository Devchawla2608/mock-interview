import emailjs from "@emailjs/browser";
import {
  EMAILJS_CONFIG,
  EMAIL_CONTENT,
  isEmailJSConfigured,
} from "../config/emailConfig";
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

/**
 * Send OTP email using EmailJS
 * @param {string} userEmail - The recipient's email address
 * @param {string} otp - The OTP code to send
 * @param {string} userName - The user's name
 * @returns {Promise} - Promise that resolves when email is sent
 */
export const sendOtpEmail = async (userEmail, otp, userName = "User") => {
  try {
    console.log("=== EmailJS Debug Info ===");
    console.log("Service ID:", EMAILJS_CONFIG.SERVICE_ID);
    console.log("Template ID:", EMAILJS_CONFIG.TEMPLATE_ID);
    console.log(
      "Public Key:",
      EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 10) + "..."
    );
    console.log("Recipient Email:", userEmail);
    console.log("User Name:", userName);
    console.log("OTP Code:", otp);

    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      otp_code: otp,
      app_name: EMAIL_CONTENT.APP_NAME,
      support_email: EMAIL_CONTENT.SUPPORT_EMAIL,
      otp_expiry: EMAIL_CONTENT.OTP_EXPIRY,
    };

    console.log("Template Parameters:", templateParams);
    console.log("==========================");

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log("EmailJS response:", response);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("=== EmailJS Error Details ===");
    console.error("Error message:", error.message);
    console.error("Error text:", error.text);
    console.error("Error status:", error.status);
    console.error("Full error:", error);
    console.error("============================");

    throw new Error(
      `EmailJS error: ${error.text || error.message || "Unknown error"}`
    );
  }
};

/**
 * Send welcome email after successful verification
 * @param {string} userEmail - The recipient's email address
 * @param {string} userName - The user's name
 * @returns {Promise} - Promise that resolves when email is sent
 */
export const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const templateParams = {
      to_email: userEmail,
      to_name: userName,
      app_name: EMAIL_CONTENT.APP_NAME,
      login_url: `${window.location.origin}/auth`,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.WELCOME_TEMPLATE_ID,
      templateParams
    );

    console.log("Welcome email sent:", response);
    return { success: true, message: "Welcome email sent successfully" };
  } catch (error) {
    console.error("Welcome email error:", error);
    console.error("Error message:", error.message);
    return { success: false, message: "Welcome email failed to send" };
  }
};

export default {
  sendOtpEmail,
  sendWelcomeEmail,
};
