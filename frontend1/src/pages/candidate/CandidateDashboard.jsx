import React from 'react';
import { Calendar, Star, TrendingUp, Clock, ArrowRight, BookOpen, Users, Target } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../components/contexts/AuthContext';
import { sampleInterviews, companies } from '../../components/data/sampleData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function CandidateDashboard() {
  const { user } = useAuth();
  const candidate = user;

  const performanceData = [
    { month: 'Jan', score: 3.2 },
    { month: 'Feb', score: 3.5 },
    { month: 'Mar', score: 3.8 },
    { month: 'Apr', score: 4.0 },
    { month: 'May', score: 4.2 },
    { month: 'Jun', score: 4.2 }
  ];

  const upcomingInterview = sampleInterviews.find(i => i.status === 'scheduled');
  const recentInterviews = sampleInterviews.filter(i => i.status === 'completed').slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {candidate?.name}! 👋</h1>
            <p className="text-primary-100 text-lg">Ready to ace your next interview?</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-right">
                <p className="text-sm text-primary-100">Profile Completion</p>
                <p className="text-2xl font-bold">{candidate?.profileCompletion}%</p>
              </div>
              <div className="w-32 bg-white/20 rounded-full h-2 mt-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${candidate?.profileCompletion}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{candidate?.interviewsCompleted || 0}</h3>
          <p className="text-gray-600 dark:text-gray-400">Interviews Completed</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{candidate?.averageScore || 0}</h3>
          <p className="text-gray-600 dark:text-gray-400">Average Score</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">+12%</h3>
          <p className="text-gray-600 dark:text-gray-400">Improvement</p>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Interview */}
          {upcomingInterview && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Interview</h2>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                  Confirmed
                </span>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={companies.find(c => c.id === upcomingInterview.companyId)?.logo}
                      alt="Company"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {companies.find(c => c.id === upcomingInterview.companyId)?.name} Interview
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">Category {upcomingInterview.category}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{upcomingInterview.scheduledDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{upcomingInterview.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">
                    Join Interview
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Performance Chart */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Performance Trends</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
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
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Recent Interviews */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Interviews</h2>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentInterviews.map((interview) => {
                const company = companies.find(c => c.id === interview.companyId);
                return (
                  <div key={interview.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={company?.logo}
                        alt={company?.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{company?.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {interview.scheduledDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {interview.feedback?.rating || 0}
                        </span>
                      </div>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs font-medium">
                        Completed
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full justify-start" size="lg">
                <Calendar className="w-5 h-5 mr-3" />
                Book New Interview
              </Button>
            </div>
          </Card>

          {/* Skills Progress */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills Progress</h2>
            <div className="space-y-4">
              {[
                { skill: 'Data Structures', progress: 85, color: 'bg-blue-500' },
                { skill: 'Algorithms', progress: 78, color: 'bg-green-500' },
                { skill: 'System Design', progress: 65, color: 'bg-yellow-500' },
                { skill: 'Communication', progress: 90, color: 'bg-purple-500' }
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{item.skill}</span>
                    <span className="text-gray-500 dark:text-gray-400">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;