import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/contexts/AuthContext.jsx';
import { ThemeProvider } from './components/contexts/ThemeContext.jsx';
import AuthPage from './pages/AuthPage.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';

const AppContent = () => {
  const { user, isLoading } = useAuth();
  console.log("User in AppContent:", user);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />}
        />
        <Route
          path="/dashboard/*"
          element={user ? <Dashboard /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/auth"} replace />}
        />
      </Routes>
    </Router>
  );
};

  const showToast = () => {
    toast.success('🚀 Welcome to the app!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
  };

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastContainer />
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;  