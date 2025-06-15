import React, { useState } from 'react';
import { Star, TrendingUp, Award, MessageSquare, Filter, Download } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

function InterviewerReviews() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const ratingData = [
    { month: 'Jan', rating: 4.2, reviews: 8 },
    { month: 'Feb', rating: 4.3, reviews: 10 },
    { month: 'Mar', rating: 4.5, reviews: 12 },
    { month: 'Apr', rating: 4.6, reviews: 15 },
    { month: 'May', rating: 4.7, reviews: 18 },
    { month: 'Jun', rating: 4.8, reviews: 20 }
  ];

  const categoryRatings = [
    { category: 'Technical Skills', rating: 4.9 },
    { category: 'Communication', rating: 4.8 },
    { category: 'Feedback Quality', rating: 4.7 },
    { category: 'Professionalism', rating: 4.8 },
    { category: 'Punctuality', rating: 4.9 }
  ];

  const recentReviews = [
    {
      id: '1',
      candidateName: 'John Doe',
      company: 'Google',
      rating: 5,
      date: new Date('2024-12-20'),
      comment: 'Excellent interviewer! Very thorough and provided detailed feedback. The session was well-structured and helped me identify areas for improvement.',
      categories: {
        technical: 5,
        communication: 5,
        feedback: 5,
        professionalism: 5
      }
    },
    {
      id: '2',
      candidateName: 'Jane Smith',
      company: 'Microsoft',
      rating: 4,
      date: new Date('2024-12-18'),
      comment: 'Great experience overall. The interviewer was knowledgeable and asked relevant questions. Could have provided more specific examples in feedback.',
      categories: {
        technical: 4,
        communication: 4,
        feedback: 4,
        professionalism: 5
      }
    },
    {
      id: '3',
      candidateName: 'Mike Johnson',
      company: 'Amazon',
      rating: 5,
      date: new Date('2024-12-15'),
      comment: 'Outstanding session! The interviewer created a comfortable environment and provided actionable insights. Highly recommend!',
      categories: {
        technical: 5,
        communication: 5,
        feedback: 5,
        professionalism: 5
      }
    }
  ];

  const overallRating = 4.8;
  const totalReviews = 145;
  const positiveReviews = Math.round(totalReviews * 0.92);
  const improvementRate = 15;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reviews & Feedback</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your performance and candidate feedback</p>
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

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{overallRating}</h3>
          <p className="text-gray-600 dark:text-gray-400">Overall Rating</p>
          <div className="flex items-center justify-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= overallRating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalReviews}</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Reviews</p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">+12 this month</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{positiveReviews}</h3>
          <p className="text-gray-600 dark:text-gray-400">Positive Reviews</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">92% positive</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">+{improvementRate}%</h3>
          <p className="text-gray-600 dark:text-gray-400">Rating Improvement</p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">vs last month</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Trend */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Rating Trend</h2>
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
              <LineChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis domain={[0, 5]} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value}/5`, 'Rating']}
                />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#f59e0b', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Review Volume */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Review Volume</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData}>
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
                <Bar dataKey="reviews" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Category Ratings */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Performance by Category</h2>
        <div className="space-y-4">
          {categoryRatings.map((category) => (
            <div key={category.category}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.category}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{category.rating}/5</span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= category.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(category.rating / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Reviews */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Reviews</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="space-y-6">
          {recentReviews.map((review) => (
            <div key={review.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 font-medium">
                      {review.candidateName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{review.candidateName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.company} • {review.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {review.rating}/5
                  </span>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Technical</p>
                  <div className="flex items-center justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.categories.technical
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Communication</p>
                  <div className="flex items-center justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.categories.communication
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Feedback</p>
                  <div className="flex items-center justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.categories.feedback
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Professional</p>
                  <div className="flex items-center justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.categories.professionalism
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Improvement Suggestions */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Areas for Improvement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Strengths</h3>
            <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
              <li>• Excellent technical knowledge</li>
              <li>• Clear communication style</li>
              <li>• Punctual and professional</li>
              <li>• Detailed feedback provision</li>
            </ul>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h3 className="font-medium text-orange-900 dark:text-orange-200 mb-2">Growth Areas</h3>
            <ul className="space-y-1 text-sm text-orange-800 dark:text-orange-300">
              <li>• Provide more specific examples</li>
              <li>• Include industry insights</li>
              <li>• Offer career guidance</li>
              <li>• Share preparation resources</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default InterviewerReviews;