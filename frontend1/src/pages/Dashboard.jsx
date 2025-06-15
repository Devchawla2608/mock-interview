import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import CandidateDashboard from './candidate/CandidateDashboard';
import InterviewerDashboard from './interviewer/InterviewerDashboard';
// import AdminDashboard from './admin/AdminDashboard';
import BookingFlow from './candidate/BookingFlow';
import InterviewManagement from './candidate/InterviewManagement';
import FeedbackReviews from './candidate/FeedbackReviews';
import PaymentHistory from './candidate/PaymentHistory';
import ProfileSettings from './shared/ProfileSettings'
import CalendarAvailability from './interviewer/CalendarAvailability';
import InterviewRequests from './interviewer/InterviewRequests';
import EarningsDashboard from './interviewer/EarningsDashboard';
import InterviewerReviews from './interviewer/InterviewerReviews';
// import InterviewerApprovals from './admin/InterviewerApprovals';
// import LiveInterviews from './admin/LiveInterviews';
// import CompanyManagement from './admin/CompanyManagement';
// import DisputeResolution from './admin/DisputeResolution';
// import PlatformAnalytics from './admin/PlatformAnalytics';
// import PlatformSettings from './admin/PlatformSettings';
import { useAuth } from '../components/contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const [activeItem, setActiveItem] = useState('dashboard');

  const renderContent = () => {
    switch (user && user.role) {
      case 'candidate':
        switch (activeItem) {
          case 'dashboard':
            return <CandidateDashboard />;
          case 'book-interview':
            return <BookingFlow />;
          case 'interviews':
            return <InterviewManagement />;
          case 'feedback':
            return <FeedbackReviews />;
          case 'payments':
            return <PaymentHistory />;
          case 'profile':
            return <ProfileSettings />;
          default:
            return <CandidateDashboard />;
        }
      case 'interviewer':
        switch (activeItem) {
          case 'dashboard':
            return <InterviewerDashboard />;
          case 'calendar':
            return <CalendarAvailability />;
          case 'interviews':
            return <InterviewRequests />;
          case 'earnings':
            return <EarningsDashboard />;
          case 'feedback':
            return <InterviewerReviews />;
          case 'profile':
            return <ProfileSettings />;
          default:
            return <InterviewerDashboard />;
        }
      // case 'admin':
      //   switch (activeItem) {
      //     case 'dashboard':
      //       return <AdminDashboard />;
      //     case 'interviewers':
      //       return <InterviewerApprovals />;
      //     case 'interviews':
      //       return <LiveInterviews />;
      //     case 'companies':
      //       return <CompanyManagement />;
      //     case 'disputes':
      //       return <DisputeResolution />;
      //     case 'analytics':
      //       return <PlatformAnalytics />;
      //     case 'settings':
      //       return <PlatformSettings />;
      //     default:
      //       return <AdminDashboard />;
      //   }
      default:
        return <CandidateDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;