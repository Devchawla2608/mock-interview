import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Save, Upload, CheckCircle, ArrowRight } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../components/contexts/AuthContext.jsx';

const ProfileCompletion = () => {
  const { user, updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role,
    phoneNumber: user?.phoneNumber || '',
    profileCompletion: '100',
    bio: '',
    experience: '',
    skills: [],
    codeforces: '',
    codechef: '',
    github: '',
    linkedin: '',
    leetcode: '',
    interviewerRole: '',
    categories: [],
    location: '',
    currentRole: '',
    currentCompany: '',
  });

  const categoryDetails = {
    A: {
      name: 'Category A',
      price: 149,
      rounds: {
        'Software Developer': [
          'DSA Round 1',
          'DSA Round 2',
          'DSA Round 3',
          'System Design 1',
          'System Design 2 + HR'
        ],
        'Data Scientist': [
          'Statistics & ML Concepts',
          'DSA Round',
          'ML Case Study',
          'SQL & Data Wrangling',
          'Final Technical + HR'
        ],
        'AI/ML': [
          'ML Concepts',
          'Deep Learning Systems',
          'DSA Round',
          'Paper Review + Problem Solving',
          'HR + Deployment Cases'
        ],
        'Data Analyst': [
          'SQL Round 1',
          'SQL Round 2',
          'Business Case Study',
          'Excel + Data Viz',
          'HR + Aptitude'
        ]
      }
    },
    B: {
      name: 'Category B',
      price: 99,
      rounds: {
        'Software Developer': [
          'DSA Round 1',
          'DSA Round 2',
          'System Design',
          'HR'
        ],
        'Data Scientist': [
          'ML Quiz',
          'Python Round',
          'SQL Test',
          'Final Interview'
        ],
        'AI/ML': [
          'ML Practical',
          'DL Architectures',
          'Case Based Round',
          'HR Discussion'
        ],
        'Data Analyst': [
          'Excel Test',
          'SQL Querying',
          'Scenario-Based Test',
          'HR'
        ]
      }
    },
    C: {
      name: 'Category C',
      price: 79,
      rounds: {
        'Software Developer': ['Coding Round', 'Technical Round', 'HR'],
        'Data Scientist': ['ML Basics', 'Coding + Case Study', 'HR'],
        'AI/ML': ['DL Q&A', 'Practical Round', 'HR'],
        'Data Analyst': ['Excel + Aptitude', 'SQL Basic', 'HR']
      }
    }
  };


  const totalSteps = user?.role === 'interviewer' ? 4 : 3;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSkillAdd = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleCategoryToggle = (category) => {
    const updatedCategories = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category];
    setFormData({ ...formData, categories: updatedCategories });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await updateProfile(formData);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStepProgress = () => (currentStep / totalSteps) * 100;

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phoneNumber && formData.location;
      case 2:
        return formData.skills.length > 2;
      case 3:
        if (user?.role === 'interviewer') {
          return formData.categories.length > 0;
        }
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">TM</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">TechMock</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Complete Your Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Help us personalize your experience by completing your profile</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(getStepProgress())}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-500 h-2 rounded-full transition-all duration-500" style={{ width: `${getStepProgress()}%` }} />
          </div>
        </div>

        <Card className="p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <User className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
                <p className="text-gray-600 dark:text-gray-400">Tell us about yourself</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700 dark:text-gray-300"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700 dark:text-gray-300"
                      placeholder="e.g., Bangalore, India"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700 dark:text-gray-300"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          )}

          {/* Step 2: Professional Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Briefcase className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Information</h2>
                <p className="text-gray-600 dark:text-gray-400">Share your work experience</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Company
                  </label>
                  <input
                    type="text"
                    value={formData.currentCompany}
                    onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Role
                  </label>
                  <input
                    type="text"
                    value={formData.currentRole}
                    onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Years of Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-8">5-8 years</option>
                    <option value="8+">8+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills *
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm flex items-center space-x-1"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => handleSkillRemove(skill)}
                        className="text-primary-600 hover:text-primary-800 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a skill and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSkillAdd(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Add at least 3 skills. Press Enter after typing each skill.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Role-specific Information */}
          {currentStep === 3 && user?.role === 'interviewer' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center mb-6">
                <CheckCircle className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Interviewer Setup</h2>
                <p className="text-gray-600 dark:text-gray-400">Configure your interviewing preferences</p>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Your Role *
                </label>
                <select
                  value={formData.interviewerRole}
                  onChange={(e) => setFormData({ ...formData, interviewerRole: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">-- Select Role --</option>
                  <option value="Software Developer">Software Developer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Data Analyst">Data Analyst</option>
                </select>
                <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-1">
                  By selecting a role, you agree to provide accurate information regarding your expertise.
                </p>
              </div>

              {/* Category Selection with Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Interview Categories *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'A',
                      name: 'Category A',
                      desc: 'Premium Companies (Google, Meta, etc.)',
                      price: '₹149/hr',
                      rounds: 5
                    },
                    {
                      id: 'B',
                      name: 'Category B',
                      desc: 'Product Companies (Uber, Airbnb, etc.)',
                      price: '₹99/hr',
                      rounds: 4
                    },
                    {
                      id: 'C',
                      name: 'Category C',
                      desc: 'Service Companies (TCS, Infosys, etc.)',
                      price: '₹79/hr',
                      rounds: 3
                    }
                  ].map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.categories.includes(category.id)
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                    >
                      <div className="text-center">
                        <div
                          className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${category.id === 'A'
                              ? 'bg-red-100 dark:bg-red-900'
                              : category.id === 'B'
                                ? 'bg-blue-100 dark:bg-blue-900'
                                : 'bg-green-100 dark:bg-green-900'
                            }`}
                        >
                          <span
                            className={`font-bold text-sm ${category.id === 'A'
                                ? 'text-red-600 dark:text-red-400'
                                : category.id === 'B'
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-green-600 dark:text-green-400'
                              }`}
                          >
                            {category.id}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white">{category.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{category.desc}</p>
                        <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mt-2">{category.price}</p>

                        {/* Buttons */}
                        <div className="mt-4 flex justify-center gap-2 flex-wrap">
                          <button
                            className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              const selectedRole = formData.interviewerRole || 'Software Developer';
                              const details = categoryDetails[category.id];

                              const rounds = details.rounds[selectedRole] || [];
                              const totalCost = rounds.length * details.price;

                              setModalContent({
                                category: details.name,
                                role: selectedRole,
                                pricePerRound: details.price,
                                totalCost,
                                rounds
                              });
                              setOpenModal(true);
                            }}
                          >
                            View Process
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Select the categories you're qualified to interview for.
                </p>
                <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-1">
                  By selecting categories, you agree to participate in the minimum required interviews for approval.
                </p>
              </div>

              {/* Modal */}
              {openModal && modalContent && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-2xl w-full shadow-2xl">
                    {/* Header */}
                    <div className="mb-6 text-center">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {modalContent.category} – {modalContent.role}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Roadmap to becoming an approved interviewer
                      </p>
                    </div>

                    {/* Steps Section */}
                    <div className="space-y-6">
                      {modalContent.rounds.map((round, index) => {
                        const icons = ['🧠', '💻', '🛠️', '📐', '🤝'];
                        return (
                          <div key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-200 rounded-full flex items-center justify-center text-xl font-bold">
                                {icons[index % icons.length]}
                              </div>
                            </div>
                            <div>
                              <p className="text-base font-medium text-gray-800 dark:text-white">
                                Step {index + 1}: {round}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">This round evaluates key skills for {modalContent.role.toLowerCase()}s.</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Cost Section */}
                    <div className="mt-8 border-t pt-4 text-sm text-gray-700 dark:text-gray-300">
                      <p>🧠 <strong>Total Rounds:</strong> {modalContent.rounds.length}</p>
                      <p>💰 <strong>Cost per Round:</strong> ₹{modalContent.pricePerRound}</p>
                      <p className="text-lg font-semibold text-primary-700 dark:text-primary-400 mt-2">
                        Total Cost: ₹{modalContent.totalCost}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-right">
                      <button
                        className="px-5 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition"
                        onClick={() => setOpenModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>


          )}

          {/* Step 3: Social Links (for candidates) or Step 4 (for interviewers) */}
          {((currentStep === 3 && user?.role === 'candidate') || (currentStep === 4 && user?.role === 'interviewer')) && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <CheckCircle className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Social Links</h2>
                <p className="text-gray-600 dark:text-gray-400">Connect your professional profiles (Optional)</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LeetCode Profile
                  </label>
                  <input
                    type="url"
                    value={formData.leetcode}
                    onChange={(e) => setFormData({ ...formData, leetcode: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Github Profile
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://github.com/yourusername"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    codeForces Profile
                  </label>
                  <input
                    type="url"
                    value={formData.codeforces}
                    onChange={(e) => setFormData({ ...formData, codeforces: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Code Chef Profile
                  </label>
                  <input
                    type="url"
                    value={formData.codechef}
                    onChange={(e) => setFormData({ ...formData, codechef: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>Previous</Button>
            {currentStep === totalSteps ? (
              <Button onClick={handleSubmit} isLoading={isLoading} disabled={!isStepValid()}>
                <Save className="w-4 h-4 mr-2" /> Complete Profile
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!isStepValid()}>
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCompletion;