import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import CandidateDashboard from './candidate/CandidateDashboard';
import InterviewerDashboard from './interviewer/InterviewerDashboard';
import AdminDashboard from './admin/AdminDashboard';
import BookingFlow from './candidate/BookingFlow';
import InterviewManagement from './candidate/InterviewManagement';
import FeedbackReviews from './candidate/FeedbackReviews';
import PaymentHistory from './candidate/PaymentHistory';
import ProfileSettings from './shared/ProfileSettings'
import CalendarAvailability from './interviewer/CalendarAvailability';
import InterviewRequests from './interviewer/InterviewRequests';
import EarningsDashboard from './interviewer/EarningsDashboard';
import InterviewerReviews from './interviewer/InterviewerReviews';
import NotApprovedDashboard from './interviewer/NotApprovedDashboard';
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
  const [interviews, setInterviews] = useState([])
  const [completedInterviews, setCompletedInterviews] = useState([])
  const [activeInterviews, setActiveInterviews] = useState([])

  useEffect(() => {
    async function getUserInterviews() {
      let user = JSON.parse(localStorage.getItem('user'))
      let response = await fetch(`http://localhost:3001/api/interview/interviews/${user.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      response = await response.json()
      let myInterviews;
      if (user.role == 'candidate') {
        myInterviews = response?.interviews?.filter(
          interview => interview.candidateEmail === user.email
        );
        console.log("myInterviews", myInterviews)
      } else {
        myInterviews = response?.interviews?.filter(
          interview => interview.interviewerEmail == "dev.chawla2608@gmail.com"
        );
        console.log("myInterviews", myInterviews, user.email)

      }
      setInterviews(myInterviews)
      const mycompletedInterviews = myInterviews?.filter(
        interview => interview.completed == true
      );
      const myActiveInterviews = myInterviews?.filter(
        interview => interview.completed != true
      );
      setCompletedInterviews(mycompletedInterviews)
      setActiveInterviews(myActiveInterviews)
    }
    getUserInterviews()
  }, [])

  const renderContent = () => {
    switch (user && user.role) {
      case 'candidate':
        switch (activeItem) {
          case 'dashboard':
            return <CandidateDashboard
              setActiveItem={setActiveItem}
              interviews={interviews}
              setInterviews={setInterviews}
              activeInterviews={activeInterviews}
              setActiveInterviews={setActiveInterviews}
              completedInterviews={completedInterviews}
              setCompletedInterviews={setCompletedInterviews}
            />;
          case 'book-interview':
            return <BookingFlow />;
          case 'interviews':
            return <InterviewManagement
              setActiveItem={setActiveItem}
              interviews={interviews}
              setInterviews={setInterviews}
              activeInterviews={activeInterviews}
              setActiveInterviews={setActiveInterviews}
              completedInterviews={completedInterviews}
              setCompletedInterviews={setCompletedInterviews}
            />;
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
          case 'not-approved-dashboard':
            return <NotApprovedDashboard
              setActiveItem={setActiveItem}
              interviews={interviews}
              setInterviews={setInterviews}
              activeInterviews={activeInterviews}
              setActiveInterviews={setActiveInterviews}
              completedInterviews={completedInterviews}
              setCompletedInterviews={setCompletedInterviews}
            />;
          case 'dashboard':
            return <InterviewerDashboard
              setActiveItem={setActiveItem}
              interviews={interviews}
              setInterviews={setInterviews}
              activeInterviews={activeInterviews}
              setActiveInterviews={setActiveInterviews}
              completedInterviews={completedInterviews}
              setCompletedInterviews={setCompletedInterviews}
            />;
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
      case 'admin':
        switch (activeItem) {
          case 'dashboard':
            return <AdminDashboard />;
          // case 'interviewers':
          //   return <InterviewerApprovals />;
          // case 'interviews':
          //   return <LiveInterviews />;
          // case 'companies':
          //   return <CompanyManagement />;
          // case 'disputes':
          //   return <DisputeResolution />;
          // case 'analytics':
          //   return <PlatformAnalytics />;
          // case 'settings':
          //   return <PlatformSettings />;
          // default:
          //   return <AdminDashboard />;
        }
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