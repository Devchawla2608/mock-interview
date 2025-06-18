import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Star,
  TrendingUp,
  UserCheck,
  FileText,
  Building2,
  ClipboardCheck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Sidebar({ activeItem, onItemClick }) {
  const { user } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'candidate':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'book-interview', label: 'Book Interview', icon: Calendar },
          // { id: 'interviews', label: 'My Interviews', icon: BookOpen },
          // { id: 'feedback', label: 'Feedback & Reviews', icon: Star },
          // { id: 'payments', label: 'Payments', icon: CreditCard },
          // { id: 'profile', label: 'Profile', icon: Settings },
        ];
      case 'interviewer':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'calendar', label: 'Calendar & Availability', icon: Calendar },
          // { id: 'interviews', label: 'Interview Requests', icon: BookOpen },
          // { id: 'earnings', label: 'Earnings', icon: TrendingUp },
          // { id: 'feedback', label: 'Reviews', icon: Star },
          { id: 'profile', label: 'Profile', icon: Settings },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'interviewers', label: 'Interviewer Approvals', icon: UserCheck },
          { id: 'interviews', label: 'Live Interviews', icon: BookOpen },
          { id: 'companies', label: 'Company Management', icon: Building2 },
          { id: 'disputes', label: 'Dispute Resolution', icon: FileText },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'settings', label: 'Platform Settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  activeItem === item.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${
                  activeItem === item.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
                }`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;