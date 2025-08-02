


import React, { useState } from 'react';
import { Building2, Plus, Edit, Trash2, Search, Filter, Upload } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { companies } from '../../components/data/sampleData.js';

const CompanyManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({
    name: '',
    category: 'A',
    difficulty: 'Medium',
    averagePackage: '',
    description: '',
    roles: [''],
    locations: ['']
  });

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddCompany = () => {
    // Handle add company logic
    console.log('Adding company:', newCompany);
    setShowAddModal(false);
    setNewCompany({
      name: '',
      category: 'A',
      difficulty: 'Medium',
      averagePackage: '',
      description: '',
      roles: [''],
      locations: ['']
    });
  };

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
    setShowEditModal(true);
  };

  const handleDeleteCompany = (companyId) => {
    // Handle delete company logic
    console.log('Deleting company:', companyId);
  };

  const addRole = () => {
    setNewCompany({
      ...newCompany,
      roles: [...newCompany.roles, '']
    });
  };

  const removeRole = (index) => {
    setNewCompany({
      ...newCompany,
      roles: newCompany.roles.filter((_, i) => i !== index)
    });
  };

  const updateRole = (index, value) => {
    const updatedRoles = [...newCompany.roles];
    updatedRoles[index] = value;
    setNewCompany({
      ...newCompany,
      roles: updatedRoles
    });
  };

  const addLocation = () => {
    setNewCompany({
      ...newCompany,
      locations: [...newCompany.locations, '']
    });
  };

  const removeLocation = (index) => {
    setNewCompany({
      ...newCompany,
      locations: newCompany.locations.filter((_, i) => i !== index)
    });
  };

  const updateLocation = (index, value) => {
    const updatedLocations = [...newCompany.locations];
    updatedLocations[index] = value;
    setNewCompany({
      ...newCompany,
      locations: updatedLocations
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'A':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'B':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'C':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Company Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage companies and their interview categories</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{companies.length}</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Companies</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-red-600 dark:text-red-400 font-bold text-lg">A</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {companies.filter(c => c.category === 'A').length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Category A</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">B</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {companies.filter(c => c.category === 'B').length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Category B</p>
        </Card>

        <Card className="text-center" hover>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-green-600 dark:text-green-400 font-bold text-lg">C</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {companies.filter(c => c.category === 'C').length}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">Category C</p>
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

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{company.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Popularity: {company.popularity}%
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditCompany(company)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCompany(company.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(company.category)}`}>
                  Category {company.category}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Difficulty:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(company.difficulty)}`}>
                  {company.difficulty}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Package:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {company.averagePackage}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Roles:</p>
              <div className="flex flex-wrap gap-1">
                {company.roles.slice(0, 2).map((role, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                  >
                    {role}
                  </span>
                ))}
                {company.roles.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
                    +{company.roles.length - 2} more
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Locations:</p>
              <div className="flex flex-wrap gap-1">
                {company.locations.slice(0, 2).map((location, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs"
                  >
                    {location}
                  </span>
                ))}
                {company.locations.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
                    +{company.locations.length - 2} more
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Company Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Company"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={newCompany.name}
                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={newCompany.category}
                onChange={(e) => setNewCompany({ ...newCompany, category: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="A">Category A</option>
                <option value="B">Category B</option>
                <option value="C">Category C</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={newCompany.difficulty}
                onChange={(e) => setNewCompany({ ...newCompany, difficulty: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Average Package
              </label>
              <input
                type="text"
                value={newCompany.averagePackage}
                onChange={(e) => setNewCompany({ ...newCompany, averagePackage: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., ₹15-25 LPA"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={newCompany.description}
              onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter company description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Roles
            </label>
            {newCompany.roles.map((role, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={role}
                  onChange={(e) => updateRole(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter role"
                />
                {newCompany.roles.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeRole(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addRole}>
              <Plus className="w-4 h-4 mr-2" />
              Add Role
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Locations
            </label>
            {newCompany.locations.map((location, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => updateLocation(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter location"
                />
                {newCompany.locations.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeLocation(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addLocation}>
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleAddCompany}>
              Add Company
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Company Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Company"
        size="lg"
      >
        {selectedCompany && (
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400">
              Edit company details for {selectedCompany.name}
            </p>
            {/* Similar form structure as Add Company Modal */}
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1">
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CompanyManagement;