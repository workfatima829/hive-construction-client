import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, Lock, Trash2, User, Camera, Save, X, AlertCircle, Shield, Bell, Edit3 } from 'lucide-react';

const mockUserData = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  username: 'nomoto',
  email: 'john.doe@example.com',
  phoneNumber: '+92 300 1234567',
  gender: 'male',
  city: 'Lahore',
  country: 'Pakistan',
  dateOfBirth: '1990-09-12',
  role: 'user',
  createdAt: '2024-01-15',
  profileImage: null
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUserData);
  const [editForm, setEditForm] = useState({ ...mockUserData });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserData({ ...editForm });
      setIsEditing(false);
      setIsLoading(false);
    }, 500);
  };

  const handleUpdatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsLoading(false);
      alert('Password updated successfully!');
    }, 500);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsLoading(true);
      setTimeout(() => {
        console.log('Account deleted');
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleCancel = () => {
    setEditForm({ ...userData });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">My Account</h1>
                <p className="text-sm text-gray-500">Manage your profile settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition relative ${
                    activeTab === 'profile'
                      ? 'text-slate-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <User className="w-4 h-4" />
                    Profile Information
                  </span>
                  {activeTab === 'profile' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition relative ${
                    activeTab === 'security'
                      ? 'text-slate-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security
                  </span>
                  {activeTab === 'security' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Profile Tab Content */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                      <p className="text-sm text-gray-500 mt-1">Update your personal details and contact information</p>
                    </div>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 active:bg-slate-950 transition shadow-sm hover:shadow font-medium text-sm flex items-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition font-medium text-sm flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isLoading}
                          className="px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 active:bg-slate-950 transition shadow-sm hover:shadow font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Save className="w-4 h-4" />
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={isEditing ? editForm.firstName : userData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={isEditing ? editForm.lastName : userData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={isEditing ? editForm.username : userData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={isEditing ? editForm.email : userData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={isEditing ? editForm.phoneNumber : userData.phoneNumber}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <select
                        name="gender"
                        value={isEditing ? editForm.gender : userData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition disabled:bg-gray-100 disabled:text-gray-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={isEditing ? editForm.country : userData.country}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={isEditing ? editForm.city : userData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab Content */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* Change Password Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                        <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4 max-w-xl">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                        />
                      </div>
                      <button
                        onClick={handleUpdatePassword}
                        disabled={isLoading}
                        className="w-full py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 active:bg-slate-950 transition shadow-sm hover:shadow font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Updating...' : 'Update Password'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Danger Zone Card */}
                <div className="bg-white rounded-xl shadow-sm border border-rose-200">
                  <div className="p-6 border-b border-rose-100 bg-rose-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-rose-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-rose-900">Danger Zone</h3>
                        <p className="text-sm text-rose-700">Permanent actions that cannot be undone</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-5">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-rose-900 font-medium mb-1">Warning: This action is irreversible</p>
                          <p className="text-sm text-rose-700">
                            Once you delete your account, all your data will be permanently removed. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center gap-2 px-5 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 active:bg-rose-800 transition shadow-sm hover:shadow font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
