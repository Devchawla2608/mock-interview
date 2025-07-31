import React, { useState } from 'react';
import { ArrowLeft, Video, Star, Copy, RefreshCw, Clock, User, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MeetingRoom = () => {
  const [meetingLink, setMeetingLink] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
  const navigate = useNavigate();

  // Sample suggested questions for different categories
  const questionSets = [
    {
      category: "Technical Skills",
      questions: [
        "Can you explain the difference between let, const, and var in JavaScript?",
        "How would you optimize a slow-performing database query?",
        "Describe your approach to handling errors in a production application.",
        "What are the key principles of RESTful API design?",
        "How do you ensure code quality in your projects?"
      ]
    },
    {
      category: "Problem Solving",
      questions: [
        "Tell me about a challenging technical problem you solved recently.",
        "How do you approach debugging a complex issue?",
        "Describe a time when you had to learn a new technology quickly.",
        "How would you design a system to handle 1 million concurrent users?",
        "Walk me through your thought process for breaking down a large project."
      ]
    },
    {
      category: "Behavioral",
      questions: [
        "Describe a situation where you had to work with a difficult team member.",
        "Tell me about a time you had to make a decision with incomplete information.",
        "How do you handle competing priorities and tight deadlines?",
        "Describe a project where you took initiative beyond your assigned role.",
        "Tell me about a time you received constructive criticism and how you handled it."
      ]
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const generateNewQuestions = () => {
    setCurrentQuestionSet((prev) => (prev + 1) % questionSets.length);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                                    onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TCS Interview</h1>
              <p className="text-sm text-gray-500">Category C • Dec 28, 2024 • 02:00 PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>45 min session</span>
            </div>
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              In Progress
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Meeting & Rating */}
          <div className="lg:col-span-1 space-y-6">
            {/* Meeting Link Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Video className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Meeting Setup</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meeting Link
                  </label>
                  <input
                    type="url"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <button 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  disabled={!meetingLink}
                >
                  Start Interview
                </button>
              </div>
            </div>

            {/* Candidate Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Candidate Info</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">Deepanshu Chawla</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-medium">Software Developer</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">3-5 years</p>
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Rate Interview</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-colors"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your observations and feedback..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Suggested Questions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Suggested Questions</h2>
                    <p className="text-sm text-gray-500">AI-curated questions for this interview</p>
                  </div>
                </div>
                
                <button
                  onClick={generateNewQuestions}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  {questionSets.map((set, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionSet(index)}
                      className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentQuestionSet === index
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {set.category}
                    </button>
                  ))}
                </div>

                {/* Questions List */}
                <div className="space-y-3">
                  {questionSets[currentQuestionSet].questions.map((question, index) => (
                    <div
                      key={index}
                      className="group p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                              {index + 1}
                            </span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">
                              {questionSets[currentQuestionSet].category}
                            </span>
                          </div>
                          <p className="text-gray-900 font-medium leading-relaxed">
                            {question}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => copyToClipboard(question)}
                          className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Copy question"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tips Section */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h3 className="font-medium text-blue-900 mb-2">💡 Interview Tips</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Give the candidate time to think before answering</li>
                    <li>• Ask follow-up questions to dive deeper into their responses</li>
                    <li>• Focus on understanding their thought process, not just the final answer</li>
                    <li>• Create a comfortable environment to get the best from the candidate</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-8 flex justify-end space-x-4">
          <button className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors">
            Save as Draft
          </button>
          <button 
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            disabled={!rating}
          >
            Complete Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;