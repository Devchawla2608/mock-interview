

import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Calendar, Download, Filter, BarChart3, PieChart } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const PlatformAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const revenueData = [
    { date: '2024-11-01', revenue: 45000, interviews: 18, users: 120 },
    { date: '2024-11-08', revenue: 52000, interviews: 21, users: 135 },
    { date: '2024-11-15', revenue: 48000, interviews: 19, users: 142 },
    { date: '2024-11-22', revenue: 58000, interviews: 23, users: 158 },
    { date: '2024-11-29', revenue: 62000, interviews: 25, users: 167 },
    { date: '2024-12-06', revenue: 68000, interviews: 27, users: 178 },
    { date: '2024-12-13', revenue: 72000, interviews: 29, users: 189 },
    { date: '2024-12-20', revenue: 75000, interviews: 30, users: 195 }
  ];

  const categoryData = [
    { name: 'Category A', value: 45, revenue: 450000, interviews: 180, color: '#ef4444' },
    { name: 'Category B', value: 35, revenue: 315000, interviews: 210, color: '#3b82f6' },
    { name: 'Category C', value: 20, revenue: 140000, interviews: 280, color: '#10b981' }
  ];

  const userGrowthData = [
    { month: 'Jan', candidates: 450, interviewers: 85, total: 535 },
    { month: 'Feb', candidates: 520, interviewers: 92, total: 612 },
    { month: 'Mar', candidates: 580, interviewers: 98, total: 678 },
    { month: 'Apr', candidates: 650, interviewers: 105, total: 755 },
    { month: 'May', candidates: 720, interviewers: 112, total: 832 },
    { month: 'Jun', candidates: 800, interviewers: 120, total: 920 }
  ];

  const geographicData = [
    { region: 'Bangalore', users: 320, revenue: 280000, interviews: 145 },
    { region: 'Mumbai', users: 285, revenue: 245000, interviews: 128 },
    { region: 'Delhi', users: 240, revenue: 210000, interviews: 112 },
    { region: 'Hyderabad', users: 195, revenue: 165000, interviews: 89 },
    { region: 'Pune', users: 150, revenue: 125000, interviews: 67 },
    { region: 'Chennai', users: 135, revenue: 115000, interviews: 58 }
  ];

  const performanceMetrics = {
    totalRevenue: 1250000,
    totalUsers: 1325,
    totalInterviews: 2547,
    averageRating: 4.6,
    completionRate: 94.2,
    customerSatisfaction: 92.8,
    monthlyGrowth: 15.3,
    churnRate: 2.1
  };

  const getMetricData = () => {
    switch (selectedMetric) {
      case 'revenue':
        return revenueData.map(d => ({ ...d, value: d.revenue }));
      case 'users':
        return revenueData.map(d => ({ ...d, value: d.users }));
      case 'interviews':
        return revenueData.map(d => ({ ...d, value: d.interviews }));
      default:
        return revenueData.map(d => ({ ...d, value: d.revenue }));
    }
  };

  const getMetricColor = () => {
    switch (selectedMetric) {
      case 'revenue':
        return '#10b981';
      case 'users':
        return '#3b82f6';
      case 'interviews':
        return '#f59e0b';
      default:
        return '#10b981';
    }
  };

  const formatValue = (value) => {
    switch (selectedMetric) {
      case 'revenue':
        return `₹${value.toLocaleString()}`;
      case 'users':
        return value.toString();
      case 'interviews':
        return value.toString();
      default:
        return value.toString();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{(performanceMetrics.totalRevenue / 100000).toFixed(1)}L
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Total Revenue</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+{performanceMetrics.monthlyGrowth}% this month</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {performanceMetrics.totalUsers.toLocaleString()}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Active Users</p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Churn: {performanceMetrics.churnRate}%</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {performanceMetrics.totalInterviews.toLocaleString()}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Total Interviews</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">{performanceMetrics.completionRate}% completion</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {performanceMetrics.customerSatisfaction}%
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Satisfaction</p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">Avg rating: {performanceMetrics.averageRating}/5</p>
        </Card>
      </div>

      {/* Main Analytics Chart */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Performance Trends</h2>
          <div className="flex space-x-2">
            {['7d', '30d', '90d', '1y'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          {['revenue', 'users', 'interviews'].map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                selectedMetric === metric
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {metric}
            </button>
          ))}
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={getMetricData()}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis className="text-xs" tickFormatter={formatValue} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [formatValue(value), selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)]}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={getMetricColor()}
                fill={getMetricColor()}
                fillOpacity={0.2}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <Bar dataKey="candidates" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="interviewers" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Distribution */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Revenue by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="revenue"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
              </RechartsPieChart>
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
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ₹{(category.revenue / 1000).toFixed(0)}K
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Geographic Distribution</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={geographicData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis type="number" className="text-xs" />
              <YAxis dataKey="region" type="category" className="text-xs" width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [
                  name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : name === 'users' ? 'Users' : 'Interviews'
                ]}
              />
              <Bar dataKey="users" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interview Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
              <span className="font-medium text-gray-900 dark:text-white">{performanceMetrics.completionRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Average Rating</span>
              <span className="font-medium text-gray-900 dark:text-white">{performanceMetrics.averageRating}/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">No-show Rate</span>
              <span className="font-medium text-gray-900 dark:text-white">3.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Avg Duration</span>
              <span className="font-medium text-gray-900 dark:text-white">78 min</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Financial Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Monthly Revenue</span>
              <span className="font-medium text-gray-900 dark:text-white">₹2.8L</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Avg Order Value</span>
              <span className="font-medium text-gray-900 dark:text-white">₹1,850</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Commission Rate</span>
              <span className="font-medium text-gray-900 dark:text-white">15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Refund Rate</span>
              <span className="font-medium text-gray-900 dark:text-white">1.8%</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Engagement</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Daily Active Users</span>
              <span className="font-medium text-gray-900 dark:text-white">342</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Session Duration</span>
              <span className="font-medium text-gray-900 dark:text-white">24 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Return Rate</span>
              <span className="font-medium text-gray-900 dark:text-white">68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">NPS Score</span>
              <span className="font-medium text-gray-900 dark:text-white">72</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlatformAnalytics;