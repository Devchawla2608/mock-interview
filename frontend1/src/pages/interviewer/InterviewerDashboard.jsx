import React, { useEffect , useState } from 'react';
import { DollarSign, Calendar, Star, TrendingUp, Users, Clock, Award, Target } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../components/contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

function InterviewerDashboard({setActiveItem , interviews , setInterviews , activeInterviews , setActiveInterviews , completedInterviews , setCompletedInterviews})  {
  const { user } = useAuth();
  const [averageRating , setAverageRating] = useState('')
  const [growth , setGrowth] = useState('')
  function calculateGrowthPercentage(interviews) {
  if (!Array.isArray(interviews)) return null;

  // Filter completed interviews
  const completedInterviews = interviews.filter(
    interview => interview.completed === true
  );

  // Extract and parse candidate ratings
  const ratings = completedInterviews
    .map(interview => parseFloat(interview.candidateRating))
    .filter(rating => !isNaN(rating));

  // Need at least 2 ratings to calculate improvement
  if (ratings.length < 2) return null;

  const firstRating = ratings[0];
  const lastRating = ratings[ratings.length - 1];

  if (firstRating === 0) return 0; // Prevent division by zero

  const growth = ((lastRating - firstRating) / firstRating) * 100;
  setGrowth(parseFloat(growth.toFixed(2)))
}

    useEffect(()=>{
      async function getUserInterviewsDetails(){
        const totalRating = completedInterviews.reduce(
          (sum, interview) => sum + (parseInt(interview.interviewerRating) || 0),
          0
        );
        const avgRating =
          completedInterviews?.length > 0
            ? (totalRating / completedInterviews?.length).toFixed(1)
            : "0.0";
        setAverageRating(avgRating)
      calculateGrowthPercentage(completedInterviews)
      }
    getUserInterviewsDetails()
    },[])
  const interviewer = user;
  const earningsData = [
    { month: 'Jan', earnings: 15000 },
    { month: 'Feb', earnings: 18000 },
    { month: 'Mar', earnings: 22000 },
    { month: 'Apr', earnings: 25000 },
    { month: 'May', earnings: 28000 },
    { month: 'Jun', earnings: 32000 }
  ];

  const interviewsData = [
    { day: 'Mon', interviews: 3 },
    { day: 'Tue', interviews: 5 },
    { day: 'Wed', interviews: 2 },
    { day: 'Thu', interviews: 4 },
    { day: 'Fri', interviews: 6 },
    { day: 'Sat', interviews: 3 },
    { day: 'Sun', interviews: 1 }
  ];

  return (

    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-secondary-600 to-primary-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {interviewer?.name}! 🎯</h1>
            <p className="text-secondary-100 text-lg">Ready to help candidates succeed?</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-right">
                <p className="text-sm text-secondary-100">This Month</p>
                <p className="text-2xl font-bold">₹{interviewer?.monthlyEarnings?.toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Star className="w-4 h-4 text-yellow-300" />
                <span className="text-sm">{interviewer?.rating} ({interviewer?.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          {user?.categories == 'A' && <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{(completedInterviews?.length)*149} Rs.</h3>
}
          {user?.categories == 'B' && <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{(completedInterviews?.length)*99} Rs.</h3>
}
          {user?.categories == 'C' && <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{(completedInterviews?.length)*49} Rs.</h3>
}
          <p className="text-gray-600 dark:text-gray-400">Total Earnings</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{completedInterviews?.length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Interviews This Month</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{averageRating}</h3>
          <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{growth}%</h3>
          <p className="text-gray-600 dark:text-gray-400">Growth Rate</p>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Earnings Chart */}
          {/* <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Monthly Earnings</h2>
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
          </Card> */}

          {/* Weekly Interviews */}
          {/* <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">This Week's Interviews</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={interviewsData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" className="text-xs" />
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
          </Card> */}

          {/* Pending Requests */}
<Card>
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pending Interview Requests</h2>
    <Button variant="ghost" size="sm">View All</Button>
  </div>
  <div className="space-y-4">
    {activeInterviews
      .map((interview, index) => {
        const candidateName = interview.candidateName;
        const category = interview.category || "-";
        const date = interview.selectedDate
          ? new Date(interview.selectedDate).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            })
          : "";
        const time = interview.startTime
          ? new Date(`1970-01-01T${interview.startTime}`).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          : "";

        return (
          <div key={interview._id || index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{interview?.candidateEmail}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {interview?.companyName} • Category {interview?.category}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right text-sm">
                <p className="text-gray-900 dark:text-white font-medium">{date}</p>
                <p className="text-gray-500 dark:text-gray-400">{time}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Decline</Button>
                <Button size="sm">Accept</Button>
              </div>
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
                Manage Availability
              </Button>
              {/* <Button variant="outline" className="w-full justify-start">
                <Clock className="w-5 h-5 mr-3" />
                View Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="w-5 h-5 mr-3" />
                Withdraw Earnings
              </Button> */}
            </div>
          </Card>

          {/* Categories */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Categories</h2>
            <div className="space-y-3">
              {interviewer?.categories?.map((category) => (
                <div key={category} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      category === 'A' ? 'bg-red-100 dark:bg-red-900' :
                      category === 'B' ? 'bg-blue-100 dark:bg-blue-900' :
                      'bg-green-100 dark:bg-green-900'
                    }`}>
                      <span className={`font-bold text-sm ${
                        category === 'A' ? 'text-red-600 dark:text-red-400' :
                        category === 'B' ? 'text-blue-600 dark:text-blue-400' :
                        'text-green-600 dark:text-green-400'
                      }`}>
                        {category}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">Category {category}</span>
                  </div>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs font-medium">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Reviews */}
          {/* <Card>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Reviews</h2>
            <div className="space-y-4">
              {[
                { rating: 5, comment: 'Excellent interviewer! Very thorough and helpful.', candidate: 'John D.' },
                { rating: 4, comment: 'Great feedback and constructive criticism.', candidate: 'Sarah M.' },
                { rating: 5, comment: 'Professional and knowledgeable. Highly recommend!', candidate: 'Mike R.' }
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
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
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{review.candidate}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                </div>
              ))}
            </div>
          </Card> */}

          {/* Achievement Badge */}
          {/* <Card>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Top Interviewer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You're in the top 10% of interviewers this month!
              </p>
            </div>
          </Card> */}
        </div>
      </div>
    </div>
  );
}

export default InterviewerDashboard;