export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_pjtffbd",
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_c0csvhf",
  PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "95tezLEP8plakkpBx",
  WELCOME_TEMPLATE_ID:
    process.env.REACT_APP_EMAILJS_WELCOME_TEMPLATE_ID || "template_5pn5al1",
};
export const EMAIL_TEMPLATES = {
  OTP: {
    subject: "Your OTP Code - Mock Interview Platform (Expires in 1 minute)",
    template: "otp_verification",
  },
  WELCOME: {
    subject: "Welcome to Mock Interview Platform",
    template: "welcome_email",
  },
};

export const EMAIL_CONTENT = {
  APP_NAME: "Mock Interview Platform",
  SUPPORT_EMAIL: "support@mockinterview.com",
  SUPPORT_PHONE: "+918008718008",
  WEBSITE_URL: "https://mockinterview.com",
  OTP_EXPIRY: "1 minute",
};

export const isEmailJSConfigured = () => {
  return (
    EMAILJS_CONFIG.SERVICE_ID &&
    EMAILJS_CONFIG.TEMPLATE_ID &&
    EMAILJS_CONFIG.PUBLIC_KEY &&
    EMAILJS_CONFIG.SERVICE_ID !== "service_pjtffbd" &&
    EMAILJS_CONFIG.TEMPLATE_ID !== "template_c0csvhf" &&
    EMAILJS_CONFIG.PUBLIC_KEY !== "95tezLEP8plakkpBx"
  );
};

export default {
  EMAILJS_CONFIG,
  EMAIL_TEMPLATES,
  EMAIL_CONTENT,
  isEmailJSConfigured,
};
