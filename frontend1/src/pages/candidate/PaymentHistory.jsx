import React, { useState } from 'react';
import { CreditCard, Download, Filter, Search, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

function PaymentHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Sample payment data
  const payments = [
    {
      id: '1',
      interviewId: '1',
      company: 'Google',
      amount: 2500,
      currency: 'INR',
      method: 'card',
      status: 'completed',
      transactionId: 'TXN123456789',
      createdAt: new Date('2024-12-20'),
      completedAt: new Date('2024-12-20')
    },
    {
      id: '2',
      interviewId: '2',
      company: 'Microsoft',
      amount: 2500,
      currency: 'INR',
      method: 'upi',
      status: 'completed',
      transactionId: 'TXN987654321',
      createdAt: new Date('2024-12-15'),
      completedAt: new Date('2024-12-15')
    },
    {
      id: '3',
      interviewId: '3',
      company: 'Amazon',
      amount: 2500,
      currency: 'INR',
      method: 'wallet',
      status: 'pending',
      transactionId: 'TXN456789123',
      createdAt: new Date('2024-12-25'),
      completedAt: undefined
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'refunded':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'refunded':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'card':
        return '💳';
      case 'upi':
        return '📱';
      case 'wallet':
        return '👛';
      default:
        return '💰';
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalSpent = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const refundedAmount = payments.filter(p => p.status === 'refunded').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment History</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your interview payments and transactions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <CreditCard className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalSpent.toLocaleString()}</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Spent</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹{pendingAmount.toLocaleString()}</h3>
          <p className="text-gray-600 dark:text-gray-400">Pending</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹{refundedAmount.toLocaleString()}</h3>
          <p className="text-gray-600 dark:text-gray-400">Refunded</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{payments.length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Transactions</p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by company or transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['all', 'completed', 'pending', 'failed', 'refunded'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  selectedStatus === status
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Payment Methods */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Saved Payment Methods</h2>
          <Button variant="outline" size="sm">
            Add New Method
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💳</span>
                <span className="font-medium text-gray-900 dark:text-white">**** 1234</span>
              </div>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                Primary
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Visa ending in 1234</p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">📱</span>
              <span className="font-medium text-gray-900 dark:text-white">UPI</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">user@paytm</p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">👛</span>
              <span className="font-medium text-gray-900 dark:text-white">Wallet</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Balance: ₹500</p>
          </div>
        </div>
      </Card>

      {/* Transactions List */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Transactions</h2>
        <div className="space-y-4">
          {filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No transactions found</h3>
              <p className="text-gray-500 dark:text-gray-400">No transactions match your search criteria.</p>
            </div>
          ) : (
            filteredPayments.map((payment) => (
              <div key={payment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{getMethodIcon(payment.method)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {payment.company} Interview
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {payment.createdAt.toLocaleDateString()} • {payment.transactionId}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      {getStatusIcon(payment.status)}
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{payment.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Payment Method</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{payment.method}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Transaction ID</p>
                      <p className="font-medium text-gray-900 dark:text-white">{payment.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {payment.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Status</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{payment.status}</p>
                    </div>
                  </div>
                </div>

                {payment.status === 'completed' && (
                  <div className="mt-4 flex space-x-3">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt
                    </Button>
                    <Button variant="outline" size="sm">
                      Request Refund
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

export default PaymentHistory;