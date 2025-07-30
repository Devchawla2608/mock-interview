import React, { useState } from "react";
import { Calendar, Clock, Star, Video, FileText, Search } from "lucide-react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import { sampleInterviews, companies } from "../../components/data/sampleData";

<<<<<<< Updated upstream
function  InterviewManagement({setActiveItem , interviews , setInterviews , activeInterviews , setActiveInterviews , completedInterviews , setCompletedInterviews , requestedInterviews , setRequestedInterviews , approvedInterviews , setApprovedInterviews, forceRender , setForceRender}) {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredInterviews = () => {
      switch (activeTab) {
        case 'active':
          return activeInterviews
        case 'completed':
          return completedInterviews
        case 'approved':
          return approvedInterviews
        case 'requested':
          return requestedInterviews
=======
function InterviewManagement({
  setActiveItem,
  interviews,
  setInterviews,
  activeInterviews,
  setActiveInterviews,
  completedInterviews,
  setCompletedInterviews,
}) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  const getFilteredInterviews = () => {
    return sampleInterviews.filter((interview) => {
      const company = companies.find((c) => c.id === interview.companyId);
      const matchesSearch =
        company?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        false;
      switch (activeTab) {
        case "upcoming":
          return interview.status === "scheduled" && matchesSearch;
        case "completed":
          return interview.status === "completed" && matchesSearch;
        case "cancelled":
          return interview.status === "cancelled" && matchesSearch;
>>>>>>> Stashed changes
        default:
          return [];
      }
  };

  const getStatusColor = (status) => {
    switch (status) {
<<<<<<< Updated upstream
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'requested':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'approved':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
=======
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "ongoing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
>>>>>>> Stashed changes
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "refunded":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const filteredInterviews = getFilteredInterviews();
  console.log("filteredInterviews" , filteredInterviews)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Interviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track your interview schedule
          </p>
        </div>
             <Button size="lg" onClick={() => { setActiveItem('book-interview') }}>
                <Calendar/>
                Book New Interview
              </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by company name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
<<<<<<< Updated upstream
          { id: 'active', label: 'Active', count: activeInterviews.length },
          { id: 'completed', label: 'Completed', count: completedInterviews.length },
          { id: 'approved', label: 'Approved', count: approvedInterviews.length},
          { id: 'requested', label: 'Requested', count: requestedInterviews?.length}
=======
          {
            id: "upcoming",
            label: "Upcoming",
            count: sampleInterviews.filter((i) => i.status === "scheduled")
              .length,
          },
          {
            id: "completed",
            label: "Completed",
            count: sampleInterviews.filter((i) => i.status === "completed")
              .length,
          },
          {
            id: "cancelled",
            label: "Cancelled",
            count: sampleInterviews.filter((i) => i.status === "cancelled")
              .length,
          },
>>>>>>> Stashed changes
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}>
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Interviews List */}
      <div className="space-y-4">
        {filteredInterviews.length == 0 ? (
          <Card className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No {activeTab} interviews found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {activeTab === "upcoming"
                ? "Book your first interview to get started!"
                : "No interviews match your search criteria."}
            </p>
<<<<<<< Updated upstream
            {activeTab == 'upcoming' && (
             <Button size="lg" onClick={() => { setActiveItem('book-interview') }}>
                <Calendar />
                Book New Interview
              </Button>
            )}
          </Card>
        ) : (
          filteredInterviews.map((interview) => {
            const isUpcoming = interview.status == 'scheduled';
            const isCompleted = interview.status == 'completed';
            const showInterviewerEmail = ['active', 'completed', 'approved'].includes(activeTab) && interview.interviewerEmail;
=======
            {activeTab === "upcoming" && <Button>Book New Interview</Button>}
          </Card>
        ) : (
          filteredInterviews.map((interview) => {
            const company = companies.find((c) => c.id === interview.companyId);
            const isUpcoming = interview.status === "scheduled";
            const isCompleted = interview.status === "completed";

>>>>>>> Stashed changes
            return (
              <Card
                key={interview.id}
                className="hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          {/* Show company name here */}
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {interview?.companyName} Interview
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
<<<<<<< Updated upstream
                            Category {interview.category}
=======
                            Category {interview.category} • {interview.duration}{" "}
                            minutes
>>>>>>> Stashed changes
                          </p>
                          {showInterviewerEmail && (
                            <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                              Interviewer: <span className="font-medium">{interview.interviewerEmail}</span>
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                              interview.status
                            )}`}>
                            {interview.status.charAt(0).toUpperCase() +
                              interview.status.slice(1)}
                          </span>
<<<<<<< Updated upstream
                          {/* <span className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(interview.paymentStatus)}`}>
                            {interview.paymentStatus.charAt(0).toUpperCase() + interview.paymentStatus.slice(1)}
                          </span> */}
=======
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(
                              interview.paymentStatus
                            )}`}>
                            {interview.paymentStatus.charAt(0).toUpperCase() +
                              interview.paymentStatus.slice(1)}
                          </span>
>>>>>>> Stashed changes
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
<<<<<<< Updated upstream
                          <span>{new Date(interview?.selectedDate).toLocaleDateString()}</span>
=======
                          <span>
                            {interview.scheduledDate.toLocaleDateString()}
                          </span>
>>>>>>> Stashed changes
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>
<<<<<<< Updated upstream
                            {interview?.startTime
                              ? (() => {
                                  const date = new Date(`1970-01-01T${interview.startTime}`);
                                  return isNaN(date.getTime())
                                    ? interview.startTime
                                    : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                })()
                              : ''}
=======
                            {interview.scheduledDate.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
>>>>>>> Stashed changes
                          </span>
                        </div>
                        {isCompleted && interview?.feedback && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>Rating: {interview.feedback.rating}/5</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">
                            ₹{interview.price}
                          </span>
                        </div>
                      </div>

                      {isCompleted && interview?.feedback && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            Feedback Summary
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {interview.feedback.comments}
                          </p>
                          <div className="flex flex-wrap gap-2">
<<<<<<< Updated upstream
                            {interview?.feedback?.strengths.map((strength, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs"
                              >
                                {strength}
                              </span>
                            ))}
=======
                            {interview.feedback.strengths.map(
                              (strength, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                                  {strength}
                                </span>
                              )
                            )}
>>>>>>> Stashed changes
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        {isUpcoming && (
                          <>
                            <Button size="sm">
                              <Video className="w-4 h-4 mr-2" />
                              Join Interview
                            </Button>
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                          </>
                        )}
                        {isCompleted && (
                          <>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              View Feedback
                            </Button>
                            <Button variant="outline" size="sm">
                              Download Report
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

export default InterviewManagement;
