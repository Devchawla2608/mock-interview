import React, { useState } from 'react';
import { Video, Users, Clock, AlertTriangle, Eye, MessageSquare, Phone } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';

const LiveInterviews = () => {
  const [showMonitorModal, setShowMonitorModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  // Sample live interviews data
  const liveInterviews = [
    {
      id: '1',
      candidateName: 'John Doe',
      candidateEmail: 'john.doe@email.com',
      interviewerName: 'Jane Smith',
      company: 'Google',
      category: 'A',
      startTime: new Date('2024-12-27T10:00:00'),
      duration: 90,
      status: 'ongoing',
      progress: 65,
      currentPhase: 'Coding Round',
      issues: [],
      meetingUrl: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: '2',
      candidateName: 'Alice Brown',
      candidateEmail: 'alice.brown@email.com',
      interviewerName: 'Bob Wilson',
      company: 'Microsoft',
      category: 'A',
      startTime: new Date('2024-12-27T14:00:00'),
      duration: 90,
      status: 'ongoing',
      progress: 30,
      currentPhase: 'System Design',
      issues: ['Audio quality poor'],
      meetingUrl: 'https://teams.microsoft.com/xyz-uvw-rst'
    },
    {
      id: '3',
      candidateName: 'Mike Johnson',
      candidateEmail: 'mike.johnson@email.com',
      interviewerName: 'Sarah Davis',
      company: 'Amazon',
      category: 'B',
      startTime: new Date('2024-12-27T11:30:00'),
      duration: 75,
      status: 'ongoing',
      progress: 80,
      currentPhase: 'Behavioral Questions',
      issues: [],
      meetingUrl: 'https://zoom.us/j/123456789'
    }
  ];

  const upcomingInterviews = [
    {
      id: '4',
      candidateName: 'Emma Wilson',
      interviewerName: 'David Lee',
      company: 'Netflix',
      category: 'A',
      scheduledTime: new Date('2024-12-27T16:00:00'),
      duration: 90
    },
    {
      id: '5',
      candidateName: 'Tom Anderson',
      interviewerName: 'Lisa Chen',
      company: 'Uber',
      category: 'B',
      scheduledTime: new Date('2024-12-27T17:30:00'),
      duration: 75
    }
  ];

  const recentlyCompleted = [
    {
      id: '6',
      candidateName: 'Sophie Taylor',
      interviewerName: 'Mark Johnson',
      company: 'Apple',
      category: 'A',
      completedTime: new Date('2024-12-27T09:30:00'),
      duration: 90,
      rating: 4.5,
      status: 'completed'
    }
  ];

  const handleMonitorInterview = (interview) => {
    setSelectedInterview(interview);
    setShowMonitorModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getElapsedTime = (startTime) => {
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60));
    return `${elapsed}min`;
  };

  const getRemainingTime = (startTime, duration) => {
    const now = new Date();
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);
    const remaining = Math.floor((endTime.getTime() - now.getTime()) / (1000 * 60));
    return remaining > 0 ? `${remaining}min left` : 'Overtime';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Live Interviews</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor ongoing interviews and manage platform activity</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Live monitoring active</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Video className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{liveInterviews.length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Live Interviews</p>
          <div className="flex items-center justify-center mt-2 text-green-600 dark:text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm">Active now</span>
          </div>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingInterviews.length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Upcoming Today</p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Next in 2 hours</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{recentlyCompleted.length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Completed Today</p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">100% success rate</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {liveInterviews.filter(i => i.issues.length > 0).length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Issues Reported</p>
          <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">Needs attention</p>
        </Card>
      </div>

      {/* Live Interviews */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
            Live Interviews
          </h2>
          <Button variant="outline" size="sm">
            Refresh
          </Button>
        </div>
        
        {liveInterviews.length === 0 ? (
          <div className="text-center py-12">
            <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No live interviews</h3>
            <p className="text-gray-500 dark:text-gray-400">All interviews are currently completed or scheduled for later.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {liveInterviews.map((interview) => (
              <div key={interview.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {interview.candidateName} × {interview.interviewerName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {interview.company} • Category {interview.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(interview.status)}`}>
                      Live
                    </span>
                    {interview.issues.length > 0 && (
                      <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded text-xs font-medium">
                        {interview.issues.length} Issue{interview.issues.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Phase</p>
                    <p className="text-gray-900 dark:text-white">{interview.currentPhase}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Elapsed Time</p>
                    <p className="text-gray-900 dark:text-white">{getElapsedTime(interview.startTime)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Remaining</p>
                    <p className="text-gray-900 dark:text-white">{getRemainingTime(interview.startTime, interview.duration)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${interview.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">{interview.progress}%</span>
                    </div>
                  </div>
                </div>

                {interview.issues.length > 0 && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-medium text-orange-900 dark:text-orange-200 mb-2">
                      Reported Issues:
                    </h4>
                    <ul className="space-y-1">
                      {interview.issues.map((issue, index) => (
                        <li key={index} className="text-sm text-orange-800 dark:text-orange-300">
                          • {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMonitorInterview(interview)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Monitor
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Join Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Upcoming Interviews */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Upcoming Interviews</h2>
        <div className="space-y-4">
          {upcomingInterviews.map((interview) => (
            <div key={interview.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {interview.candidateName} × {interview.interviewerName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {interview.company} • Category {interview.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">
                  {interview.scheduledTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {interview.duration} minutes
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recently Completed */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recently Completed</h2>
        <div className="space-y-4">
          {recentlyCompleted.map((interview) => (
            <div key={interview.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {interview.candidateName} × {interview.interviewerName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {interview.company} • Category {interview.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">
                  Rating: {interview.rating}/5
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completed at {interview.completedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Monitor Interview Modal */}
      <Modal
        isOpen={showMonitorModal}
        onClose={() => setShowMonitorModal(false)}
        title="Interview Monitor"
        size="xl"
      >
        {selectedInterview && (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedInterview.candidateName} × {selectedInterview.interviewerName}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 dark:text-green-400">Live</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Company</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedInterview.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                  <p className="font-medium text-gray-900 dark:text-white">Category {selectedInterview.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedInterview.duration} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedInterview.progress}%</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Candidate Information</h4>
                <div className="space-y-2">
                  <p><span className="text-gray-600 dark:text-gray-400">Name:</span> {selectedInterview.candidateName}</p>
                  <p><span className="text-gray-600 dark:text-gray-400">Email:</span> {selectedInterview.candidateEmail}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Interviewer Information</h4>
                <div className="space-y-2">
                  <p><span className="text-gray-600 dark:text-gray-400">Name:</span> {selectedInterview.interviewerName}</p>
                  <p><span className="text-gray-600 dark:text-gray-400">Current Phase:</span> {selectedInterview.currentPhase}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Interview Progress</h4>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                  style={{ width: `${selectedInterview.progress}%` }}
                >
                  <span className="text-xs text-white font-medium">{selectedInterview.progress}%</span>
                </div>
              </div>
            </div>

            {selectedInterview.issues.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Reported Issues</h4>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <ul className="space-y-2">
                    {selectedInterview.issues.map((issue, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-orange-800 dark:text-orange-300">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <Button className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Join Interview
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LiveInterviews;
