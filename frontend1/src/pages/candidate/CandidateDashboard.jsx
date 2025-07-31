import { React, useEffect, useState } from 'react';
import { Calendar, Star, TrendingUp, Clock, ArrowRight, BookOpen, Users, Target } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../components/contexts/AuthContext';
import { sampleInterviews, companies } from '../../components/data/sampleData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Tooltip } from 'react-tooltip'
import { toast } from 'react-toastify';
import 'react-tooltip/dist/react-tooltip.css'
function CandidateDashboard({ setActiveItem, interviews, setInterviews, activeInterviews, setActiveInterviews, completedInterviews, setCompletedInterviews, requestedInterviews, setRequestedInterviews, approvedInterviews, setApprovedInterviews, forceRender , setForceRender }) {
  const { user } = useAuth();
  const candidate = user;
  const [averageRating, setAverageRating] = useState('')
  const [improvement, setImprovement] = useState('')
  const [companyLogo, setCompanyLogo] = useState("https://images.pexels.com/photos/270549/pexels-photo-270549.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop")
  const [performanceData, setPerformanceData] = useState([])

  function calculateImprovementPercentage(interviews) {
    if (!Array.isArray(interviews)) return null;

    // Filter completed interviews
    const completedInterviews = interviews.filter(
      interview => interview.completed === true
    );

    // Extract and parse candidate ratings
    const ratings = completedInterviews?.map(interview => parseFloat(interview.candidateRating))
      .filter(rating => !isNaN(rating));

    // Need at least 2 ratings to calculate improvement
    if (ratings.length < 2) return null;

    const firstRating = ratings[0];
    const lastRating = ratings[ratings.length - 1];

    if (firstRating === 0) return 0; // Prevent division by zero

    const improvement = ((lastRating - firstRating) / firstRating) * 100;
    setImprovement(parseFloat(improvement.toFixed(2)))
  }

async function handleJoinInterview(interviewId) {
  try {
    // Step 1: Fetch the interview
    const interviewRes = await fetch(`/api/interview/getInterview/${interviewId}`, {
      credentials: "include",
    });
    const interview = await interviewRes.json();

    let meetingLink = interview?.meetingLink;

    // Step 2: If no meeting link, try to create one
    if (!meetingLink) {
      toast.error("Please join after sometime!")
    }
    // Step 3: Open the meeting link
    if (meetingLink) {
      window.open(meetingLink, "_blank");
    } else {
      alert("Meeting link not available.");
    }

  } catch (error) {
    console.error("Error in joining interview:", error);
    alert("Something went wrong while joining the interview.");
  }
}

 

  function generatePerformanceDataByDate(interviews) {
    if (!Array.isArray(interviews)) return [];

    setPerformanceData(interviews
      .filter(interview => interview.completed && interview.selectedDate && interview.candidateRating)
      .map(interview => {
        const date = new Date(interview.selectedDate);
        const formattedDate = date.toISOString().split('T')[0]; // e.g., "2025-06-18"
        const score = parseFloat(interview.candidateRating);
        return {
          date: formattedDate,
          score: isNaN(score) ? 0 : parseFloat(score.toFixed(2))
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date)))
  }


  useEffect(() => {
    async function getUserInterviewsDetails() {
      console.log("completedInterviews", completedInterviews)
      const totalRating = completedInterviews?.reduce(
        (sum, interview) => sum + (parseInt(interview.candidateRating) || 0),
        0
      );
      const avgRating =
        completedInterviews?.length > 0
          ? (totalRating / completedInterviews?.length).toFixed(1)
          : "0.0";
      setAverageRating(avgRating)
      calculateImprovementPercentage(completedInterviews)
      generatePerformanceDataByDate(completedInterviews)
    }
    getUserInterviewsDetails()
  }, [interviews])


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
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{completedInterviews?.length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Interviews Completed</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{averageRating}</h3>
          <p className="text-gray-600 dark:text-gray-400">Average Score</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{improvement}%</h3>
          <p className="text-gray-600 dark:text-gray-400">Improvement</p>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Interview */}
          {activeInterviews?.length != 0 && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Interview</h2>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                  Confirmed
                </span>
              </div>
              <div className="space-y-6">
                {activeInterviews?.map((interview) => {

                  return (
                    <div
                      key={interview._id}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={companyLogo}
                            alt="Company"
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {interview?.companyName || "Unknown Company"} Interview
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              Category {interview.category}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">
                                  {new Date(interview.selectedDate).toLocaleDateString(undefined, {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">
                                  {interview.startTime
                                    ? new Date(`1970-01-01T${interview.startTime}`).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })
                                    : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" 
                        onClick={()=>{handleJoinInterview(interview?.interviewId)}}
                        >
                          Join Interview
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Recent Interviews */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Completed Interviews</h2>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Scrollable container with custom scrollbar */}
            <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
              {completedInterviews?.map((interview) => {
                const formattedDate = interview.selectedDate
                  ? new Date(interview?.selectedDate).toLocaleDateString(undefined, {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                  : '';
                return (
                  <div
                    key={interview._id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={companyLogo}
                        alt={interview?.companyName}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {interview?.companyName || "Unknown Company"}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {interview?.candidateRating || 0}
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
              <Button className="w-full justify-start" size="lg" onClick={() => { setActiveItem('book-interview') }}>
                <Calendar className="w-5 h-5 mr-3" />
                Book New Interview
              </Button>
            </div>
          </Card>

        </div>
      </div>
      <div className="lg:col-span-2 space-y-6">
        {/* Next Interview */}
        {requestedInterviews?.length != 0 && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Requested Interview</h2>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                Confirmed
              </span>
            </div>
            <div className="space-y-6">
              {requestedInterviews?.map((interview) => {

                return (
                  <div
                    key={interview._id}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={companyLogo}
                          alt="Company"
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {interview?.companyName || "Unknown Company"} Interview
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            Category {interview.category}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span className="font-medium">
                                {new Date(interview.selectedDate).toLocaleDateString(undefined, {
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">
                                {interview.startTime
                                  ? new Date(`1970-01-01T${interview.startTime}`).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                  : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Tooltip id="my-tooltip" />
                      <div className="flex items-center space-x-3 cursor-pointer" data-tooltip-id="my-tooltip" data-tooltip-content="No interviewer assigned yet">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
                          Requested
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
      <div className="lg:col-span-2 space-y-6">
        {/* Next Interview */}
        {approvedInterviews?.length != 0 && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Approved Interview</h2>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                Confirmed
              </span>
            </div>
            <div className="space-y-6">
              {approvedInterviews?.map((interview) => {

                return (
                  <div
                  key={interview._id}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6"
                  >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                    <img
                      src={companyLogo}
                      alt="Company"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                      {interview?.companyName || "Unknown Company"} Interview
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                      Category {interview.category}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">
                        {new Date(interview.selectedDate).toLocaleDateString(undefined, {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">
                        {interview.startTime
                          ? new Date(`1970-01-01T${interview.startTime}`).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                          : ''}
                        </span>
                      </div>
                      </div>
                      {interview?.interviewerEmail && (
                      <div className="flex items-center space-x-2 mt-3">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                        Interviewer:&nbsp;
                        </span>
                        <span className="text-sm text-blue-700 dark:text-blue-300 font-semibold bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                        {interview.interviewerEmail}
                        </span>
                      </div>
                      )}
                    </div>
                    </div>
                    <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs font-medium">
                      Approved
                    </span>
                    </div>
                  </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default CandidateDashboard;


