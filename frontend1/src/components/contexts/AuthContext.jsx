import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleCandidate, sampleInterviewer } from "../data/sampleData";
import { toast } from 'react-toastify';
import { Cookie } from 'lucide-react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (userData) => {
    setIsLoading(true);
    
    // Simulate API call
    let response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if(response.status != 200){
      toast.error("Ops, We are facing some issues, please try again");
      setIsLoading(false);
      return false;
    }
    response = await response.json()
    localStorage.setItem("access_token" , response?.token)
    toast.success("Logged in succesfully")
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(response?.user));
    setIsLoading(false);
    return true;
  };

  const updateProfile = async (formData) =>{
    setIsLoading(true);
    console.log("Form Data: ", formData);

    let userData; 
    if(formData?.role == 'candidate'){
      userData = {  
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        location: formData.location,
        profileCompletion: formData.profileCompletion,
        bio: formData.bio,
        experience: formData.experience,
        skills: formData.skills,
        codeForces: formData.codeForces,
        codeChef: formData.codeChef,
        github: formData.github,
        linkedin: formData.linkedin,
        leetcode: formData.leetcode,
        location: formData.location,
        currentRole: formData.currentRole,
        currentCompany: formData.currentCompany,
      }
    }else if(formData?.role == 'interviewer'){
      userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        profileCompletion: formData.profileCompletion,
        bio: formData.bio,
        experience: formData.experience,
        skills: formData.skills,
        codeforces: formData.codeforces,
        codechef: formData.codechef,
        linkedin: formData.linkedin,
        leetcode: formData.leetcode,
        github: formData.github,
        interviewerRole: formData.interviewerRole,
        category: formData.categories[0],
        location: formData.location,
        currentRole: formData.currentRole,
        currentCompany: formData.currentCompany,
      }
    }
    let response = await fetch('http://localhost:3001/api/auth/update-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if(response.status != 200){
      toast.error("Ops, We are facing some issues, please try again");
      setIsLoading(false);
      return false;
    }
    response = await response.json()
    console.log(response)
    toast.success("Profile updated successfully");
    setUser(response?.user);
    localStorage.setItem('user', JSON.stringify(response?.user));
    setIsLoading(false);
    return true;
  }

  const register = async (userData) => {
    try{
    setIsLoading(true);
    
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if(response.status != 200){
      toast.error("Ops, We are facing some issues, please try again");
      setIsLoading(false);
      return false;
    }
    setIsLoading(false);
    toast.success("User is registed succesfully")
    return true;
  }catch(err){
    toast.error("Ops! We are facing some issues, Please try again later")
    return false;
  }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const switchRole = (role) => {
    if (!user) return;
    
    let updatedUser;
    if (role === 'interviewer') {
      updatedUser = { ...sampleInterviewer };
    } else if (role === 'admin') {
      updatedUser = {
        id: '3',
        email: user.email,
        name: 'Admin User',
        role: 'admin',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        profileCompletion: 100,
        createdAt: new Date(),
        permissions: ['all']
      };
    } else {
      updatedUser = { ...sampleCandidate, email: user.email };
    }
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    register,
    isLoading,
    switchRole,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };