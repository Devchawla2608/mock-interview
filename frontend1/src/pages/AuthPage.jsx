import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">TM</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">TechMock</span>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Smart Interview Platform</p>
          </div>

          {isLogin ? (
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

