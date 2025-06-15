import React, { useState } from 'react';
import { Clock, User, Building2, Calendar, CheckCircle, XCircle, Eye, Filter } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';

function InterviewRequests() {
  const [activeTab, setActiveTab] = useState('pending');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Sample interview requests data
  const requests = [
    {
      id: '1',
      candidateName: 'John Doe',
      candidateEmail: 'john.doe@email.com',
      company: 'Google',
      category: 'A',
      scheduledDate: new Date('2024-12-28T10:00:00'),
      duration: 90,
      price: 2500,
      status: 'pending',
      candidateExperience: '3 years',
      candidateSkills: ['JavaScript', 'React', 'Node.js'],
      candidateResume: 'resume-john-doe.pdf',
      requestedAt: new Date('2024-12-25T09:00:00'),
      notes: 'Looking for feedback on system design and coding skills.'
    },
    {
      id: '2',
      candidateName: 'Jane Smith',
      candidateEmail: 'jane.smith@email.com',
      company: 'Microsoft',
      category: 'A',
      scheduledDate: new Date('2024-12-29T14:00:00'),
      duration: 90,
      price: 2500,
      status: 'pending',
      candidateExperience: '5 years',
      candidateSkills: ['Python', 'Django', 'AWS'],
      candidateResume: 'resume-jane-smith.pdf',
      requestedAt: new Date('2024-12-24T15:30:00'),
      notes: 'Preparing for senior engineer role. Focus on leadership questions.'
    },
    {
      id: '3',
      candidateName: 'Mike Johnson',
      candidateEmail: 'mike.johnson@email.com',
      company: 'Amazon',
      category: 'B',
      scheduledDate: new Date('2024-12-30T11:00:00'),
      duration: 75,
      price: 1500,
      status: 'accepted',
      candidateExperience: '2 years',
      candidateSkills: ['Java', 'Spring Boot', 'MySQL'],
      candidateResume: 'resume-mike-johnson.pdf',
      requestedAt: new Date('2024-12-23T10:15:00'),
      notes: 'First time interviewing for product companies.'
    }
  ];

  const getFilteredRequests = () => {
    return requests.filter(request => request.status === activeTab);
  };

  const handleAcceptRequest = (requestId) => {
    // Handle accept logic
    console.log('Accepting request:', requestId);
  };

  const handleDeclineRequest = (requestId) => {
    // Handle decline logic
    console.log('Declining request:', requestId);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'declined':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredRequests = getFilteredRequests();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Requests</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage incoming interview requests</p>
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {requests.filter(r => r.status === 'pending').length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Pending Requests</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {requests.filter(r => r.status === 'accepted').length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Accepted</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {requests.filter(r => r.status === 'declined').length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Declined</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{requests.length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Requests</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'pending', label: 'Pending', count: requests.filter(r => r.status === 'pending').length },
          { id: 'accepted', label: 'Accepted', count: requests.filter(r => r.status === 'accepted').length },
          { id: 'declined', label: 'Declined', count: requests.filter(r => r.status === 'declined').length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No {activeTab} requests
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {activeTab === 'pending' ? 'New requests will appear here.' : `No ${activeTab} requests found.`}
            </p>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {request.candidateName}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{request.candidateEmail}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Building2 className="w-4 h-4" />
                        <span>{request.company} (Category {request.category})</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{request.scheduledDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{request.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">₹{request.price}</span>
                        <span>({request.duration}min)</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Experience</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{request.candidateExperience}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {request.candidateSkills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                            {request.candidateSkills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
                                +{request.candidateSkills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {request.notes && (
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Notes</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{request.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Requested {request.requestedAt.toLocaleDateString()}
                      </p>
                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(request)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeclineRequest(request.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Decline
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAcceptRequest(request.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Request Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Interview Request Details"
        size="lg"
      >
        {selectedRequest && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Candidate Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</p>
                    <p className="text-gray-900 dark:text-white">{selectedRequest.candidateName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</p>
                    <p className="text-gray-900 dark:text-white">{selectedRequest.candidateEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</p>
                    <p className="text-gray-900 dark:text-white">{selectedRequest.candidateExperience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Resume</p>
                    <Button variant="outline" size="sm">
                      Download {selectedRequest.candidateResume}
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interview Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Company</p>
                    <p className="text-gray-900 dark:text-white">{selectedRequest.company}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</p>
                    <p className="text-gray-900 dark:text-white">Category {selectedRequest.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Date & Time</p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedRequest.scheduledDate.toLocaleDateString()} at{' '}
                      {selectedRequest.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration & Price</p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedRequest.duration} minutes • ₹{selectedRequest.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedRequest.candidateSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {selectedRequest.notes && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Notes</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300">{selectedRequest.notes}</p>
                </div>
              </div>
            )}

            {selectedRequest.status === 'pending' && (
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    handleDeclineRequest(selectedRequest.id);
                    setShowDetailsModal(false);
                  }}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Decline Request
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    handleAcceptRequest(selectedRequest.id);
                    setShowDetailsModal(false);
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept Request
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default InterviewRequests;