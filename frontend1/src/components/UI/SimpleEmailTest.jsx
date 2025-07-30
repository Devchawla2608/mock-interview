import React, { useState } from "react";
import { sendOtpEmail } from "../../services/emailService";
import { EMAILJS_CONFIG } from "../../config/emailConfig";

const SimpleEmailTest = () => {
  const [testEmail, setTestEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleTestEmail = async () => {
    if (!testEmail) {
      setResult({
        type: "error",
        message: "Please enter a test email address",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const testOtp = "123456";
      const response = await sendOtpEmail(testEmail, testOtp, "Test User");

      if (response.success) {
        setResult({
          type: "success",
          message: `Test email sent successfully to ${testEmail}. Check your inbox (and spam folder).`,
        });
      } else {
        setResult({ type: "error", message: response.message });
      }
    } catch (error) {
      setResult({ type: "error", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
        Email Test (Debug)
      </h3>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Test Email Address
          </label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="Enter your Gmail address"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <button
          onClick={handleTestEmail}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-md transition-colors">
          {isLoading ? "Sending..." : "Send Test Email"}
        </button>
      </div>

      {result && (
        <div
          className={`mt-3 p-3 rounded-lg ${
            result.type === "success"
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          }`}>
          <div
            className={`text-sm ${
              result.type === "success"
                ? "text-green-800 dark:text-green-200"
                : "text-red-800 dark:text-red-200"
            }`}>
            {result.message}
          </div>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        <div>Service ID: {EMAILJS_CONFIG.SERVICE_ID}</div>
        <div>Template ID: {EMAILJS_CONFIG.TEMPLATE_ID}</div>
        <div>Public Key: {EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 10)}...</div>
      </div>
    </div>
  );
};

export default SimpleEmailTest;
