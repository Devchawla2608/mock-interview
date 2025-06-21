import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/contexts/AuthContext.jsx';
import { ThemeProvider } from './components/contexts/ThemeContext.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProfileCompletion from './pages/shared/ProfileCompletion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import BookingFlow from './pages/candidate/BookingFlow.jsx';

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const needsProfileCompletion = user && parseInt(user.profileCompletion) < 80;
  console.log("User Profile Completion Status:", needsProfileCompletion);
  return (
    <Router>
      <Routes>
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
        />
        <Route 
          path="/complete-profile" 
          element={
            user ? (
              needsProfileCompletion ? <ProfileCompletion /> : <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />
        <Route 
          path="/dashboard/*" 
          element={
            user ? (
              needsProfileCompletion ? <Navigate to="/complete-profile" replace /> : <Dashboard />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />
        <Route 
          path="/" 
          element={
            <Navigate 
              to={
                user 
                  ? needsProfileCompletion 
                    ? "/complete-profile" 
                    : "/dashboard"
                  : "/auth"
              } 
              replace 
            />
          } 
        />
      </Routes>
    </Router>
  );
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