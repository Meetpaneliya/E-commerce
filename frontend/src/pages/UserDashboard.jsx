import React from 'react';
import { useAuth } from '../context/AuthContext';

function UserDashboard() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center gap-6 mb-8">
              <img
                src={currentUser.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=10B981&color=fff`}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{currentUser.name}</h1>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={currentUser.name}
                      readOnly
                      className="mt-1 input-field bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={currentUser.email}
                      readOnly
                      className="mt-1 input-field bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <button className="w-full btn-secondary">
                    Change Password
                  </button>
                  <button className="w-full btn-secondary">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order History</h2>
            <div className="text-center py-8 text-gray-500">
              No orders yet
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;