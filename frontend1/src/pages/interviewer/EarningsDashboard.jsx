import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, CreditCard, Wallet, ArrowUpRight } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

function EarningsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const earningsData = [
    { month: 'Jan', earnings: 15000, interviews: 6 },
    { month: 'Feb', earnings: 18000, interviews: 7 },
    { month: 'Mar', earnings: 22000, interviews: 9 },
    { month: 'Apr', earnings: 25000, interviews: 10 },
    { month: 'May', earnings: 28000, interviews: 11 },
    { month: 'Jun', earnings: 32000, interviews: 13 }
  ];

  const categoryData = [
    { name: 'Category A', value: 65, earnings: 45000, color: '#ef4444' },
    { name: 'Category B', value: 25, earnings: 18000, color: '#3b82f6' },
    { name: 'Category C', value: 10, earnings: 7000, color: '#10b981' }
  ];

  const recentTransactions = [
    {
      id: '1',
      type: 'interview',
      candidate: 'John Doe',
      company: 'Google',
      amount: 2500,
      date: new Date('2024-12-20'),
      status: 'completed'
    },
    {
      id: '2',
      type: 'interview',
      candidate: 'Jane Smith',
      company: 'Microsoft',
      amount: 2500,
      date: new Date('2024-12-18'),
      status: 'completed'
    },
    {
      id: '3',
      type: 'withdrawal',
      candidate: 'Bank Transfer',
      company: 'Withdrawal',
      amount: -15000,
      date: new Date('2024-12-15'),
      status: 'completed'
    },
    {
      id: '4',
      type: 'interview',
      candidate: 'Mike Johnson',
      company: 'Amazon',
      amount: 1500,
      date: new Date('2024-12-12'),
      status: 'completed'
    }
  ];

  const totalEarnings = 185000;
  const monthlyEarnings = 32000;
  const availableBalance = 47000;
  const pendingAmount = 5000;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Earnings Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your interview earnings and manage withdrawals</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Wallet className="w-4 h-4 mr-2" />
            Withdraw Funds
          </Button>
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalEarnings.toLocaleString()}</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Earnings</p>
          <div className="flex items-center justify-center mt-2 text-green-600 dark:text-green-400">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span className="text-sm">+12% from last month</span>
          </div>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹{monthlyEarnings.toLocaleString()}</h3>
          <p className="text-gray-600 dark:text-gray-400">This Month</p>
          <div className="flex items-center justify-center mt-2 text-blue-600 dark:text-blue-400">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span className="text-sm">+8% from last month</span>
          </div>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹{availableBalance.toLocaleString()}</h3>
          <p className="text-gray-600 dark:text-gray-400">Available Balance</p>
          <Button size="sm" className="mt-2">
            Withdraw
          </Button>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹{pendingAmount.toLocaleString()}</h3>
          <p className="text-gray-600 dark:text-gray-400">Pending</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Processing...</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Trend */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Earnings Trend</h2>
              <div className="flex space-x-2">
                {['week', 'month', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors capitalize ${
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
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
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
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Earnings']}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Earnings by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value}%`,
                    `₹${props.payload.earnings.toLocaleString()}`
                  ]}
                />
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
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ₹{category.earnings.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{category.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Interview Performance */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Interview Performance</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earningsData}>
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
              <Bar dataKey="interviews" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'interview'
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-blue-100 dark:bg-blue-900'
                }`}>
                  {transaction.type === 'interview' ? (
                    <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {transaction.type === 'interview' ? 'Interview Payment' : 'Withdrawal'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {transaction.candidate} • {transaction.company}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${
                  transaction.amount > 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {transaction.date.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Withdrawal Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Withdrawal Methods</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Bank Transfer</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">**** 1234</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                Primary
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Wallet className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">UPI</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">user@paytm</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Set Primary
              </Button>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Add New Method
          </Button>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Withdrawal</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                max={availableBalance}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Available: ₹{availableBalance.toLocaleString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Withdrawal Method
              </label>
              <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option>Bank Transfer (**** 1234)</option>
                <option>UPI (user@paytm)</option>
              </select>
            </div>
            <Button className="w-full">
              Withdraw Funds
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Withdrawals are processed within 1-2 business days
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default EarningsDashboard;