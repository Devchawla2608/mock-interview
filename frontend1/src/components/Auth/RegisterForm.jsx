import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone , Info } from 'lucide-react';
import Button from '../UI/Button';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'


const RegisterForm = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }else if(passwordStrength != 'Strong'){
        newErrors.password = 'Your Password is Week';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill the form succesfully")
      return;
    }

    setIsLoading(true);
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign Up 
  // const handleGoogleSignup = () => {
  //   // Simulate Google OAuth
  //   register({
  //     name: 'Google User',
  //     email: 'user@gmail.com',
  //     role: formData.role
  //   });
  // };

  // Password Strength
  const getPasswordStrength = (password) => {
  if (!password) return '';
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})');
  const mediumRegex = new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.{6,})');

  if (strongRegex.test(password)) return 'Strong';
  if (mediumRegex.test(password)) return 'Medium';
  return 'Weak';
};

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Join TechMock today</p>
      </div>

      {/* Role Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          I want to join as:
        </label>
        <div className="flex space-x-4">
          <label className="flex-1">
            <input
              type="radio"
              name="role"
              value="candidate"
              checked={formData.role == 'candidate'}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="sr-only"
            />
            <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              formData.role == 'candidate'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}>
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="font-medium text-gray-900 dark:text-white">Candidate</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Take mock interviews</p>
              </div>
            </div>
          </label>
          
          <label className="flex-1">
            <input
              type="radio"
              name="role"
              value="interviewer"
              checked={formData.role == 'interviewer'}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="sr-only"
            />
            <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              formData.role === 'interviewer'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}>
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                </div>
                <p className="font-medium text-gray-900 dark:text-white">Interviewer</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Conduct interviews</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.name ? 'border-red-300 dark:border-red-600' : 'border-gray-200 dark:border-gray-700 dark:text-white'
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white focus:border-transparent ${
                errors.email ? 'border-red-300 dark:border-red-600' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
        </div>
        <div>
                  <Tooltip id="my-tooltip" />
          <div  className='flex items-center justify-start gap-[8px] mb-1'>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password 
          </label>
<Info className="w-4 h-4 text-white cursor-pointer" data-tooltip-id="my-tooltip"   data-tooltip-html={`
    <ul style="padding-left: 1rem; margin: 0;">
      <li>At least 8 characters</li>
      <li>One uppercase letter (A–Z)</li>
      <li>One lowercase letter (a–z)</li>
      <li>One number (0–9)</li>
      <li>One special character (!@#$%^&*)</li>
    </ul>
  `}/>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
onChange={(e) => {
  const value = e.target.value;
  setFormData({ ...formData, password: value });
  setPasswordStrength(getPasswordStrength(value));
  setPasswordMatch(formData.confirmPassword === value);
}}              className={`w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border rounded-lg focus:outline-none dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.password ? 'border-red-300 dark:border-red-600' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
{passwordStrength && (
  <p
    className={`mt-1 text-sm ${
      passwordStrength === 'Strong'
        ? 'text-green-600'
        : passwordStrength === 'Medium'
        ? 'text-yellow-600'
        : 'text-red-600'
    }`}
  >
    Password Strength: {passwordStrength}
  </p>

)}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
onChange={(e) => {
  const value = e.target.value;
  setFormData({ ...formData, confirmPassword: value });
  setPasswordMatch(formData.password === value);
}}              className={`w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border rounded-lg dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.confirmPassword ? 'border-red-300 dark:border-red-600' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>}
{(!passwordMatch)& (
  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
    Passwords do not match.
  </p>
)}
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            I agree to the{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500 dark:hover:text-primary-300 dark:text-primary-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500 dark:hover:text-primary-300 dark:text-primary-500">
              Privacy Policy
            </a>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isLoading}
        >
          Create Account
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-white">Or continue with</span>
          </div>
        </div>

        {/* Sign Up with Google  */}
        {/* <Button
          type="button"
          variant="outline"
          className="w-full"
          size="lg"
          onClick={handleGoogleSignup}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign up with Google
        </Button> */}

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleForm}
            className="text-primary-600 hover:text-primary-500 font-medium dark:hover:text-primary-300 dark:text-primary-500"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;