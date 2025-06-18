import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Calendar, ArrowRight, Building2 } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { companies, categoryInfo, timeSlots } from '../../components/data/sampleData';
import { Calendar as CalendarIcon } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {toast} from 'react-toastify'

function BookingFlow() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookingData, setBookingData] = useState({});
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [customDate, setCustomDate] = useState(null);
  const [customTime, setCustomTime] = useState(null);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });


  const handleCustomSlotConfirm = () => {
  if (!customDate || !customTime) {
    alert('Please select both date and time');
    return;
  }

  const combinedDateTime = new Date(customDate);
  combinedDateTime.setHours(customTime.getHours());
  combinedDateTime.setMinutes(customTime.getMinutes());

  const newSlot = {
    id: `custom-${Date.now()}`,
    date: combinedDateTime,
    startTime: combinedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date(combinedDateTime.getTime() + 30 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    price: bookingData.price,
    interviewerId: 'custom',
  };

  handleSlotSelect(newSlot);
  setShowSlotModal(false);
  };


  const handleCompanySelect = (company) => {
    setBookingData({ 
      ...bookingData, 
      companyName: company.name,
      companyId: company.id, 
      category: company.category,
      price: categoryInfo.find(c => c.category === company.category)?.price
    });
    setShowSlotModal(true);
  };

  const handleSlotSelect = (slot) => {
    setBookingData({ 
      ...bookingData, 
      selectedSlot: slot,
      selectedDate: slot.date,
      interviewerId: slot.interviewerId,
      price: slot.price
    });
    setShowSlotModal(false);
    setShowConfirmModal(true);
  };

  const handleBookingConfirm = async() => {
    // Handle booking confirmation
      console.log('Booking confirmed:', bookingData);
      bookingData['completed'] = false
      bookingData['candidateEmail'] = JSON.parse(localStorage.getItem('user'))?.email
      const response = await fetch('http://localhost:3001/api/interview/bookInterview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(bookingData),
      });
    if(response.status != 200){
      toast.error("Ops, We are facing some issues, please try again");
      setShowConfirmModal(false);
      return false;
    }
    toast.success("Ohh Wow, Your interview booked")
    setShowConfirmModal(false);

  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Book Your Interview</h1>
        <p className="text-primary-100 text-lg">Choose from top companies and experienced interviewers</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['all', 'A', 'B', 'C'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Category {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Category Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryInfo.map((category) => (
          <Card key={category.category} className="border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-800 transition-all" hover>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                category.category === 'A' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                category.category === 'B' ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                'bg-gradient-to-r from-green-500 to-teal-500'
              }`}>
                <span className="text-2xl font-bold text-white">{category.category}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Price:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">₹{category.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{category.duration}min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Difficulty:</span>
                  <span className={`font-semibold ${
                    category.difficulty === 'Very Hard' ? 'text-red-600' :
                    category.difficulty === 'Hard' ? 'text-orange-600' :
                    'text-green-600'
                  }`}>{category.difficulty}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Companies Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {searchQuery ? `Search Results (${filteredCompanies.length})` : 'Popular Companies'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="cursor-pointer border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-800 transition-all" hover>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{company.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Category {company.category}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  company.difficulty === 'Hard' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  company.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {company.difficulty}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Average Package:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{company.averagePackage}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Popularity:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{company.popularity}%</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleCompanySelect(company)}
                className="w-full"
                size="sm"
              >
                Book Interview
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Company Not Found Section */}
      <Card>
        <div className="text-center py-8">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Company Not Found?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Let our AI analyze the company and recommend the best interview category for you
          </p>
          <Button variant="outline">
            Analyze Company
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>

      {/* Time Slot Selection Modal */}
<Modal
  isOpen={showSlotModal}
  onClose={() => setShowSlotModal(false)}
  title="Select Time Slot"
  size="lg"
>
  <div className="space-y-8">
    {/* Header */}
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {companies.find(c => c.id === bookingData.companyId)?.name} Interview
      </h3>
      <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
        Category: <span className="font-medium">{bookingData.category}</span> &bull; ₹{bookingData.price}
      </p>
    </div>

    {/* Time Slot Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {timeSlots.map((slot) => (
        <div
          key={slot.id}
          onClick={() => handleSlotSelect(slot)}
          className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-800 cursor-pointer shadow-sm hover:shadow-md hover:border-primary-500 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-semibold text-gray-800 dark:text-white">
                {slot.date.toLocaleDateString()}
              </span>
            </div>
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">Available</span>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-5 h-5 text-primary-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {slot.startTime} - {slot.endTime}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Interviewer ID: {slot.interviewerId}</span>
            <span className="font-semibold text-gray-900 dark:text-white">₹{slot.price}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Custom Slot Section */}
    <div className="border-t pt-6 mt-6 space-y-4">
      <label className="block text-sm font-semibold text-gray-800 dark:text-white">
        Or Select Custom Date & Time
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date Picker */}
        <div className="flex items-center border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-2">
          <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
          <DatePicker
            selected={customDate}
            onChange={(date) => setCustomDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
            className="w-full bg-transparent outline-none dark:text-white"
          />
        </div>

        {/* Time Picker */}
        <div className="flex items-center border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-2">
          <Clock className="w-5 h-5 mr-2 text-gray-500" />
          <DatePicker
            selected={customTime}
            onChange={(time) => setCustomTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Select time"
            className="w-full bg-transparent outline-none dark:text-white"
          />
        </div>
      </div>

      <button
        onClick={handleCustomSlotConfirm}
        className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-5 rounded-md shadow transition-all"
      >
        Confirm Custom Slot
      </button>
    </div>
  </div>
</Modal>


      {/* Booking Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Booking"
        size="md"
      >

        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Interview Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Company:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {companies.find(c => c.id === bookingData.companyId)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Category:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  Category {bookingData.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Date & Time:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {bookingData.selectedDate?.toLocaleDateString()} at {bookingData.selectedSlot?.startTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {categoryInfo.find(c => c.category === bookingData.category)?.duration} minutes
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900 dark:text-white">Total Amount:</span>
                  <span className="font-bold text-2xl text-primary-600">₹{bookingData.price}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleBookingConfirm}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BookingFlow;