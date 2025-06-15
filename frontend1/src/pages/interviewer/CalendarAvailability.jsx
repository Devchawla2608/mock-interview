import React, { useState } from 'react';
import { Calendar, Clock, Plus, Save, Trash2, Copy } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';

function CalendarAvailability() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
    isRecurring: false,
    recurringDays: []
  });

  // Sample availability data
  const [availability, setAvailability] = useState([
    {
      id: '1',
      date: new Date('2024-12-28'),
      startTime: '09:00',
      endTime: '11:00',
      isBooked: false,
      price: 2500
    },
    {
      id: '2',
      date: new Date('2024-12-28'),
      startTime: '14:00',
      endTime: '16:00',
      isBooked: true,
      price: 2500,
      candidateName: 'John Doe'
    },
    {
      id: '3',
      date: new Date('2024-12-29'),
      startTime: '10:00',
      endTime: '12:00',
      isBooked: false,
      price: 2500
    }
  ]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const getAvailabilityForDate = (date) => {
    if (!date) return [];
    return availability.filter(slot => 
      slot.date.toDateString() === date.toDateString()
    );
  };

  const handleAddSlot = () => {
    // Add new slot logic
    setShowAddSlotModal(false);
    setNewSlot({
      date: '',
      startTime: '',
      endTime: '',
      isRecurring: false,
      recurringDays: []
    });
  };

  const handleDeleteSlot = (slotId) => {
    setAvailability(availability.filter(slot => slot.id !== slotId));
  };

  const days = getDaysInMonth(selectedDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar & Availability</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your interview schedule and availability</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Copy Last Week
          </Button>
          <Button onClick={() => setShowAddSlotModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Time Slot
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {availability.filter(s => !s.isBooked).length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Available Slots</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {availability.filter(s => s.isBooked).length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Booked Slots</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">24</h3>
          <p className="text-gray-600 dark:text-gray-400">This Month</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">32h</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Hours</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h2>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                >
                  ←
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                >
                  →
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {weekDays.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const dayAvailability = getAvailabilityForDate(day);
                const hasAvailability = dayAvailability.length > 0;
                const hasBookedSlots = dayAvailability.some(slot => slot.isBooked);
                const isToday = day && day.toDateString() === new Date().toDateString();

                return (
                  <div
                    key={index}
                    className={`aspect-square p-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      isToday ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800' : ''
                    }`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-medium ${
                          isToday ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'
                        }`}>
                          {day.getDate()}
                        </div>
                        <div className="mt-1 space-y-1">
                          {hasAvailability && (
                            <div className="flex space-x-1">
                              {dayAvailability.slice(0, 2).map((slot, slotIndex) => (
                                <div
                                  key={slotIndex}
                                  className={`w-2 h-2 rounded-full ${
                                    slot.isBooked 
                                      ? 'bg-red-400' 
                                      : 'bg-green-400'
                                  }`}
                                />
                              ))}
                              {dayAvailability.length > 2 && (
                                <div className="text-xs text-gray-500">+{dayAvailability.length - 2}</div>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Availability Details */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              {getAvailabilityForDate(new Date()).length === 0 ? (
                <div className="text-center py-6">
                  <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">No slots scheduled for today</p>
                </div>
              ) : (
                getAvailabilityForDate(new Date()).map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-3 rounded-lg border ${
                      slot.isBooked
                        ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                        : 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {slot.startTime} - {slot.endTime}
                        </p>
                        {slot.isBooked && slot.candidateName && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            with {slot.candidateName}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          slot.isBooked
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {slot.isBooked ? 'Booked' : 'Available'}
                        </span>
                        {!slot.isBooked && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSlot(slot.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" onClick={() => setShowAddSlotModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Time Slot
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Copy className="w-4 h-4 mr-2" />
                Copy Previous Week
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Bulk Update
              </Button>
            </div>
          </Card>

          {/* Availability Settings */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Default Hourly Rate
                </label>
                <input
                  type="number"
                  defaultValue="2500"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Buffer Time (minutes)
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoAccept"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="autoAccept" className="text-sm text-gray-700 dark:text-gray-300">
                  Auto-accept interview requests
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Add Slot Modal */}
      <Modal
        isOpen={showAddSlotModal}
        onClose={() => setShowAddSlotModal(false)}
        title="Add Time Slot"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              value={newSlot.date}
              onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={newSlot.startTime}
                onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={newSlot.endTime}
                onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="recurring"
              checked={newSlot.isRecurring}
              onChange={(e) => setNewSlot({ ...newSlot, isRecurring: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="recurring" className="text-sm text-gray-700 dark:text-gray-300">
              Repeat weekly
            </label>
          </div>

          {newSlot.isRecurring && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Repeat on
              </label>
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      const updatedDays = newSlot.recurringDays.includes(day)
                        ? newSlot.recurringDays.filter(d => d !== day)
                        : [...newSlot.recurringDays, day];
                      setNewSlot({ ...newSlot, recurringDays: updatedDays });
                    }}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      newSlot.recurringDays.includes(day)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowAddSlotModal(false)}
            >
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleAddSlot}>
              <Save className="w-4 h-4 mr-2" />
              Save Slot
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CalendarAvailability;