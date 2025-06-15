export const categoryInfo = [
    {
      category: 'A',
      name: 'Premium Companies',
      description: 'Top-tier tech companies with highest difficulty',
      difficulty: 'Very Hard',
      price: 2500,
      duration: 90,
      requirements: ['5+ years experience', 'Strong DSA', 'System Design', 'Previous FAANG experience'],
      companies: ['Google', 'Meta', 'Apple', 'Netflix', 'Microsoft', 'Amazon'],
      topics: ['Advanced Algorithms', 'System Design', 'Behavioral', 'Coding']
    },
    {
      category: 'B',
      name: 'Product Companies',
      description: 'Established product companies with good packages',
      difficulty: 'Hard',
      price: 1500,
      duration: 75,
      requirements: ['3+ years experience', 'Good DSA', 'Basic System Design'],
      companies: ['Uber', 'Airbnb', 'Stripe', 'Salesforce', 'Adobe', 'Atlassian'],
      topics: ['Data Structures', 'Algorithms', 'System Design', 'Product Sense']
    },
    {
      category: 'C',
      name: 'Service Companies',
      description: 'Service-based companies and startups',
      difficulty: 'Medium',
      price: 800,
      duration: 60,
      requirements: ['1+ years experience', 'Basic DSA', 'Domain knowledge'],
      companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Capgemini', 'Cognizant'],
      topics: ['Basic DSA', 'Web Development', 'Database', 'Frameworks']
    }
  ];
  
  export const companies = [
    {
      id: '1',
      name: 'Google',
      logo: 'https://images.pexels.com/photos/270549/pexels-photo-270549.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      category: 'A',
      difficulty: 'Hard',
      popularity: 95,
      averagePackage: '₹50-80 LPA',
      roles: ['Software Engineer', 'Senior SDE', 'Staff Engineer'],
      locations: ['Bangalore', 'Hyderabad', 'Mumbai'],
      description: 'Leading technology company focused on search, cloud computing, and AI.'
    },
    {
      id: '2',
      name: 'Microsoft',
      logo: 'https://images.pexels.com/photos/270549/pexels-photo-270549.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      category: 'A',
      difficulty: 'Hard',
      popularity: 90,
      averagePackage: '₹45-70 LPA',
      roles: ['Software Engineer', 'Senior SDE', 'Principal Engineer'],
      locations: ['Bangalore', 'Hyderabad', 'Noida'],
      description: 'Global technology leader in productivity software and cloud services.'
    },
    {
      id: '3',
      name: 'Uber',
      logo: 'https://images.pexels.com/photos/270549/pexels-photo-270549.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      category: 'B',
      difficulty: 'Medium',
      popularity: 85,
      averagePackage: '₹35-50 LPA',
      roles: ['Software Engineer', 'Senior Engineer', 'Staff Engineer'],
      locations: ['Bangalore', 'Hyderabad'],
      description: 'Mobility as a service company revolutionizing transportation.'
    },
    {
      id: '4',
      name: 'TCS',
      logo: 'https://images.pexels.com/photos/270549/pexels-photo-270549.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      category: 'C',
      difficulty: 'Easy',
      popularity: 75,
      averagePackage: '₹8-15 LPA',
      roles: ['Developer', 'Senior Developer', 'Tech Lead'],
      locations: ['Pan India'],
      description: 'Leading IT services and consulting company with global presence.'
    }
  ];
  
  export const sampleCandidate = {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'candidate',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    profileCompletion: 85,
    interviewsCompleted: 12,
    averageScore: 4.2,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
    experience: 3,
    currentRole: 'Software Engineer',
    company: 'Tech Corp',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date()
  };
  
  export const sampleInterviewer = {
    id: '2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'interviewer',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    profileCompletion: 95,
    categories: ['A', 'B'],
    rating: 4.8,
    reviewCount: 145,
    experience: 8,
    hourlyRate: 2500,
    totalEarnings: 185000,
    monthlyEarnings: 45000,
    availability: [],
    qualifications: [
      { id: '1', round: 'DSA', status: 'passed', score: 95, completedAt: new Date('2024-01-10') },
      { id: '2', round: 'System Design', status: 'passed', score: 88, completedAt: new Date('2024-01-12') }
    ],
    isApproved: true,
    approvalStatus: 'approved',
    bio: 'Senior Software Engineer at Google with 8+ years of experience in full-stack development and system design.',
    expertise: ['JavaScript', 'Python', 'System Design', 'Algorithms', 'React'],
    languages: ['English', 'Hindi'],
    codingProfiles: {
      codeforces: 'janesmith_cf',
      leetcode: 'jane_codes',
      github: 'janesmith'
    },
    createdAt: new Date('2023-11-01'),
    lastLogin: new Date()
  };
  
  export const sampleInterviews = [
    {
      id: '1',
      candidateId: '1',
      interviewerId: '2',
      companyId: '1',
      category: 'A',
      scheduledDate: new Date('2024-12-28T10:00:00'),
      duration: 90,
      status: 'scheduled',
      price: 2500,
      paymentStatus: 'paid'
    },
    {
      id: '2',
      candidateId: '1',
      interviewerId: '2',
      companyId: '2',
      category: 'A',
      scheduledDate: new Date('2024-12-20T14:00:00'),
      duration: 90,
      status: 'completed',
      price: 2500,
      paymentStatus: 'paid',
      feedback: {
        id: '1',
        interviewId: '2',
        rating: 4,
        technicalSkills: 4,
        communication: 4,
        problemSolving: 4,
        overallPerformance: 4,
        comments: 'Good performance overall. Strong technical skills and clear communication.',
        areasForImprovement: ['System design concepts', 'Edge case handling'],
        strengths: ['Problem solving approach', 'Code quality', 'Communication'],
        recommendation: 'Continue practicing system design and focus on edge cases.',
        wouldRecommend: true,
        submittedAt: new Date('2024-12-20T16:00:00')
      }
    }
  ];
  
  export const timeSlots = [
    {
      id: '1',
      date: new Date('2024-12-28'),
      startTime: '10:00',
      endTime: '11:30',
      isAvailable: true,
      interviewerId: '2',
      price: 2500
    },
    {
      id: '2',
      date: new Date('2024-12-28'),
      startTime: '14:00',
      endTime: '15:30',
      isAvailable: true,
      interviewerId: '2',
      price: 2500
    },
    {
      id: '3',
      date: new Date('2024-12-29'),
      startTime: '09:00',
      endTime: '10:30',
      isAvailable: true,
      interviewerId: '2',
      price: 2500
    }
  ];
  
  export const notifications = [
    {
      id: '1',
      userId: '1',
      title: 'Interview Confirmed',
      message: 'Your interview with Google has been confirmed for Dec 28, 2024 at 10:00 AM',
      type: 'success',
      isRead: false,
      createdAt: new Date('2024-12-25T12:00:00'),
      actionUrl: '/dashboard/interviews'
    },
    {
      id: '2',
      userId: '1',
      title: 'Interview Reminder',
      message: 'You have an interview tomorrow at 10:00 AM. Make sure to join 5 minutes early.',
      type: 'info',
      isRead: false,
      createdAt: new Date('2024-12-27T09:00:00'),
      actionUrl: '/dashboard/interviews'
    }
  ];
  
  export const platformStats = {
    totalInterviews: 2547,
    completedInterviews: 2156,
    totalRevenue: 3250000,
    activeUsers: 1234,
    pendingApprovals: 45,
    averageRating: 4.6
  };