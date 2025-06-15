import React, { useState } from 'react';
import { Star, TrendingUp, Target, Award, Download, Filter } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { sampleInterviews, companies } from '../../components/data/sampleData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

function FeedbackReviews() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const completedInterviews = sampleInterviews.filter(i => i.status === 'completed' && i.feedback);
  
  const averageRating = completedInterviews.reduce((sum, interview) => 
    sum + (interview.feedback?.rating || 0), 0) / completedInterviews.length || 0;

  const skillsData = [
    { skill: 'Technical Skills', score: 4.2, maxScore: 5 },
    { skill: 'Communication', score: 4.5, maxScore: 5 },
    { skill: 'Problem Solving', score: 3.8, maxScore: 5 },
    { skill: 'System Design', score: 3.5, maxScore: 5 },
    { skill: 'Coding', score: 4.0, maxScore: 5 },
    { skill: 'Behavioral', score: 4.3, maxScore: 5 }
  ];

  const progressData = [
    { month: 'Jan', rating: 3.2 },
    { month: 'Feb', rating: 3.5 },
    { month: 'Mar', rating: 3.8 },
    { month: 'Apr', rating: 4.0 },
    { month: 'May', rating: 4.2 },
    { month: 'Jun', rating: 4.2 }
  ];

  const radarData = [
    { subject: 'Technical', A: 4.2, fullMark: 5 },
    { subject: 'Communication', A: 4.5, fullMark: 5 },
    { subject: 'Problem Solving', A: 3.8, fullMark: 5 },
    { subject: 'Leadership', A: 3.5, fullMark: 5 },
    { subject: 'Creativity', A: 4.0, fullMark: 5 },
    { subject: 'Teamwork', A: 4.3, fullMark: 5 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feedback & Reviews</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your progress and improvement areas</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{averageRating.toFixed(1)}</h3>
          <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">+0.8</h3>
          <p className="text-gray-600 dark:text-gray-400">Improvement</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{completedInterviews.length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Reviews Received</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">92%</h3>
          <p className="text-gray-600 dark:text-gray-400">Positive Feedback</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Rating Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" domain={[0, 5]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="rating" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Skills Radar */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Skills Assessment</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" className="text-xs" />
                <PolarRadiusAxis angle={90} domain={[0, 5]} className="text-xs" />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Skills Breakdown */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Skills Breakdown</h2>
        <div className="space-y-4">
          {skillsData.map((skill) => (
            <div key={skill.skill}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.skill}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{skill.score.toFixed(1)}/5</span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= skill.score
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
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(skill.score / skill.maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Feedback */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Feedback</h2>
        <div className="space-y-6">
          {completedInterviews.slice(0, 3).map((interview) => {
            const company = companies.find(c => c.id === interview.companyId);
            const feedback = interview.feedback;
            
            return (
              <div key={interview.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={company?.logo}
                      alt={company?.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{company?.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {interview.scheduledDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= feedback.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                      {feedback.rating}/5
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">{feedback.comments}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {feedback.strengths.map((strength, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Areas for Improvement</h4>
                    <div className="flex flex-wrap gap-2">
                      {feedback.areasForImprovement.map((area, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded text-xs"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recommendation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feedback.recommendation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default FeedbackReviews;