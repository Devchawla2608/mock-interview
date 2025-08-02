import React from 'react';
import { Users, Calendar, DollarSign, TrendingUp, UserCheck, AlertTriangle, Building2, Star } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { platformStats } from '../../components/data/sampleData';

const AdminDashboard = () => {
  const revenueData = [
    { month: 'Jan', revenue: 450000, interviews: 180 },
    { month: 'Feb', revenue: 520000, interviews: 208 },
    { month: 'Mar', revenue: 580000, interviews: 232 },
    { month: 'Apr', revenue: 620000, interviews: 248 },
    { month: 'May', revenue: 680000, interviews: 272 },
    { month: 'Jun', revenue: 750000, interviews: 300 }
  ];

  const userGrowthData = [
    { month: 'Jan', candidates: 450, interviewers: 85 },
    { month: 'Feb', candidates: 520, interviewers: 92 },
    { month: 'Mar', candidates: 580, interviewers: 98 },
    { month: 'Apr', candidates: 650, interviewers: 105 },
    { month: 'May', candidates: 720, interviewers: 112 },
    { month: 'Jun', candidates: 800, interviewers: 120 }
  ];

  const categoryData = [
    { name: 'Category A', value: 45, color: '#ef4444' },
    { name: 'Category B', value: 35, color: '#3b82f6' },
    { name: 'Category C', value: 20, color: '#10b981' }
  ];

  const pendingApprovals = [
    { name: 'Sarah Johnson', experience: '8 years', category: 'A', appliedDate: '2024-12-20' },
    { name: 'Mike Chen', experience: '6 years', category: 'B', appliedDate: '2024-12-19' },
    { name: 'Emily Davis', experience: '5 years', category: 'A', appliedDate: '2024-12-18' }
  ];

  const recentDisputes = [
    { id: 'D001', candidate: 'John Doe', interviewer: 'Jane Smith', issue: 'Technical difficulties', status: 'pending' },
    { id: 'D002', candidate: 'Alice Brown', interviewer: 'Bob Wilson', issue: 'Feedback quality', status: 'resolved' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-purple-100 text-lg">Platform overview and management</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-right">
                <p className="text-sm text-purple-100">Platform Health</p>
                <p className="text-2xl font-bold">98.5%</p>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{platformStats.activeUsers.toLocaleString()}</h3>
          <p className="text-gray-600 dark:text-gray-400">Active Users</p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">+12% this month</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{platformStats.totalInterviews.toLocaleString()}</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Interviews</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+8% this month</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹{(platformStats.totalRevenue / 100000).toFixed(1)}L</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Revenue</p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">+15% this month</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{platformStats.averageRating}</h3>
          <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">+0.2 this month</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Revenue & Interview Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => [
                    name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Interviews'
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="interviews"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* User Growth */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">User Growth</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="candidates" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="interviewers" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Category Distribution & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Interview Categories</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{category.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start" size="lg">
              <UserCheck className="w-5 h-5 mr-3" />
              Review Approvals ({platformStats.pendingApprovals})
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <AlertTriangle className="w-5 h-5 mr-3" />
              Handle Disputes (2)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Building2 className="w-5 h-5 mr-3" />
              Manage Companies
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-5 h-5 mr-3" />
              View Analytics
            </Button>
          </div>
        </Card>

        {/* System Health */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Server Uptime</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">99.9%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">API Response</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">120ms</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Healthy</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Payment Gateway</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Online</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Pending Approvals & Recent Disputes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pending Approvals</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {pendingApprovals.map((applicant, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{applicant.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {applicant.experience} • Category {applicant.category}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Decline</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Disputes */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Disputes</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentDisputes.map((dispute) => (
              <div key={dispute.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{dispute.id}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {dispute.candidate} vs {dispute.interviewer}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{dispute.issue}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  dispute.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {dispute.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

