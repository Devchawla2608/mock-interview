import React, { useState } from 'react';
import { UserCheck, X, Eye, Download, Filter, Search, Star, Award } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';

const InterviewerApprovals = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Sample applicant data
  const applicants = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      experience: 8,
      currentCompany: 'Google',
      currentRole: 'Senior Software Engineer',
      categories: ['A', 'B'],
      skills: ['JavaScript', 'Python', 'System Design', 'React', 'Node.js'],
      codingProfiles: {
        codeforces: 'sarah_cf',
        leetcode: 'sarah_codes',
        github: 'sarahjohnson'
      },
      qualificationScores: {
        dsa: 95,
        systemDesign: 88,
        development: 92,
        communication: 90,
        mockInterview: 94
      },
      status: 'pending',
      appliedDate: new Date('2024-12-20'),
      bio: 'Experienced software engineer with expertise in full-stack development and system design.',
      resume: 'sarah-johnson-resume.pdf'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      experience: 6,
      currentCompany: 'Microsoft',
      currentRole: 'Software Engineer',
      categories: ['B'],
      skills: ['Java', 'Spring Boot', 'AWS', 'Microservices'],
      codingProfiles: {
        codeforces: 'mike_cf',
        leetcode: 'mike_codes',
        github: 'mikechen'
      },
      qualificationScores: {
        dsa: 85,
        systemDesign: 82,
        development: 88,
        communication: 85,
        mockInterview: 87
      },
      status: 'pending',
      appliedDate: new Date('2024-12-19'),
      bio: 'Backend engineer specializing in microservices and cloud architecture.',
      resume: 'mike-chen-resume.pdf'
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      experience: 5,
      currentCompany: 'Amazon',
      currentRole: 'Software Development Engineer',
      categories: ['A'],
      skills: ['Python', 'Django', 'PostgreSQL', 'Redis'],
      codingProfiles: {
        codeforces: 'emily_cf',
        leetcode: 'emily_codes',
        github: 'emilydavis'
      },
      qualificationScores: {
        dsa: 92,
        systemDesign: 85,
        development: 90,
        communication: 88,
        mockInterview: 91
      },
      status: 'approved',
      appliedDate: new Date('2024-12-18'),
      bio: 'Full-stack developer with strong backend expertise and system design skills.',
      resume: 'emily-davis-resume.pdf'
    }
  ];

  const getFilteredApplicants = () => {
    return applicants.filter(applicant => {
      const matchesSearch = applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           applicant.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = applicant.status === activeTab;
      return matchesSearch && matchesStatus;
    });
  };

  const handleApprove = (applicantId) => {
    console.log('Approving applicant:', applicantId);
    // Handle approval logic
  };

  const handleReject = (applicantId) => {
    console.log('Rejecting applicant:', applicantId);
    // Handle rejection logic
  };

  const handleViewDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getQualificationColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const filteredApplicants = getFilteredApplicants();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interviewer Approvals</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Review and approve interviewer applications</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <UserCheck className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {applicants.filter(a => a.status === 'pending').length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Pending Review</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {applicants.filter(a => a.status === 'approved').length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Approved</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <X className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {applicants.filter(a => a.status === 'rejected').length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Rejected</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{applicants.length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Applications</p>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
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
          { id: 'pending', label: 'Pending', count: applicants.filter(a => a.status === 'pending').length },
          { id: 'approved', label: 'Approved', count: applicants.filter(a => a.status === 'approved').length },
          { id: 'rejected', label: 'Rejected', count: applicants.filter(a => a.status === 'rejected').length }
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

      {/* Applicants List */}
      <div className="space-y-4">
        {filteredApplicants.length === 0 ? (
          <Card className="text-center py-12">
            <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No {activeTab} applications found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {activeTab === 'pending' ? 'New applications will appear here.' : `No ${activeTab} applications match your search.`}
            </p>
          </Card>
        ) : (
          filteredApplicants.map((applicant) => (
            <Card key={applicant.id} className="hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                      {applicant.name.charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {applicant.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{applicant.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(applicant.status)}`}>
                        {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Experience</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{applicant.experience} years</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Current Role</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{applicant.currentRole}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Company</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{applicant.currentCompany}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Categories</p>
                        <div className="flex space-x-1">
                          {applicant.categories.map((category) => (
                            <span
                              key={category}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Qualification Scores</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {Object.entries(applicant.qualificationScores).map(([key, score]) => (
                          <div key={key} className="text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className={`text-lg font-bold ${getQualificationColor(score)}`}>
                              {score}%
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {applicant.skills.slice(0, 5).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {applicant.skills.length > 5 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
                            +{applicant.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Applied {applicant.appliedDate.toLocaleDateString()}
                      </p>
                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(applicant)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {applicant.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(applicant.id)}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(applicant.id)}
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Approve
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

      {/* Applicant Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Applicant Details"
        size="xl"
      >
        {selectedApplicant && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</p>
                    <p className="text-gray-900 dark:text-white">{selectedApplicant.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</p>
                    <p className="text-gray-900 dark:text-white">{selectedApplicant.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</p>
                    <p className="text-gray-900 dark:text-white">{selectedApplicant.experience} years</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Position</p>
                    <p className="text-gray-900 dark:text-white">
                      {selectedApplicant.currentRole} at {selectedApplicant.currentCompany}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Coding Profiles</h3>
                <div className="space-y-3">
                  {Object.entries(selectedApplicant.codingProfiles).map(([platform, username]) => (
                    <div key={platform}>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{platform}</p>
                      <p className="text-gray-900 dark:text-white">{username}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bio</h3>
              <p className="text-gray-700 dark:text-gray-300">{selectedApplicant.bio}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedApplicant.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Qualification Scores</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(selectedApplicant.qualificationScores).map(([key, score]) => (
                  <div key={key} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className={`text-2xl font-bold ${getQualificationColor(score)}`}>
                      {score}%
                    </p>
                    <div className="flex items-center justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= Math.floor(score / 20)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resume</h3>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download {selectedApplicant.resume}
              </Button>
            </div>

            {selectedApplicant.status === 'pending' && (
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    handleReject(selectedApplicant.id);
                    setShowDetailsModal(false);
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject Application
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    handleApprove(selectedApplicant.id);
                    setShowDetailsModal(false);
                  }}
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Approve Application
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InterviewerApprovals;