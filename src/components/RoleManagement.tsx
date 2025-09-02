'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User, Department } from '@/types';
import { 
  UserGroupIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function RoleManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load all users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData: User[] = [];
      usersSnapshot.forEach((doc) => {
        usersData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as User);
      });
      setUsers(usersData);

      // Load departments
      const departmentsSnapshot = await getDocs(query(
        collection(db, 'departments'),
        where('isActive', '==', true)
      ));
      const departmentsData: Department[] = [];
      departmentsSnapshot.forEach((doc) => {
        departmentsData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        } as Department);
      });
      setDepartments(departmentsData);

    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Error loading user data');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'citizen' | 'officer' | 'admin', departmentId?: string) => {
    try {
      const updateData: any = {
        role: newRole,
        updatedAt: new Date(),
      };

      // Add or remove departmentId based on role
      if (newRole === 'officer' && departmentId) {
        updateData.departmentId = departmentId;
      } else if (newRole === 'citizen' || newRole === 'admin') {
        updateData.departmentId = null;
      }

      await updateDoc(doc(db, 'users', userId), updateData);

      // Update local state
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, role: newRole, departmentId: updateData.departmentId || undefined, updatedAt: new Date() }
          : user
      ));

      setSelectedUser(null);
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'officer':
        return 'bg-blue-100 text-blue-800';
      case 'citizen':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
    user.name.toLowerCase().includes(searchEmail.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-body">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-heading">Role Management</h3>
          <p className="text-body mt-1">Manage user roles and department assignments</p>
        </div>
        <UserGroupIcon className="h-6 w-6 text-blue-600" />
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search users by email or name..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="pl-10 input-field w-full"
        />
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="font-semibold text-heading">{user.name}</h4>
                    <p className="text-sm text-body">{user.email}</p>
                    <p className="text-xs text-caption">NIC: {user.nic}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                  {user.departmentId && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {departments.find(d => d.id === user.departmentId)?.name || 'Department'}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(user)}
                className="btn-secondary text-sm px-4 py-2"
              >
                Change Role
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && searchEmail && (
        <div className="text-center py-8">
          <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-body">No users found matching "{searchEmail}"</p>
        </div>
      )}

      {/* Role Change Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="card-elevated p-8 m-4 max-w-md w-full animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-heading">Change User Role</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-heading mb-2">{selectedUser.name}</h4>
              <p className="text-sm text-body">{selectedUser.email}</p>
              <p className="text-sm text-body">Current role: <span className="font-medium">{selectedUser.role}</span></p>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-heading mb-3">Select new role:</h5>
                <div className="space-y-2">
                  <button
                    onClick={() => updateUserRole(selectedUser.id, 'citizen')}
                    className="w-full text-left p-3 border-2 border-green-200 rounded-lg hover:bg-green-50 hover:border-green-400 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-green-800">Citizen</div>
                        <div className="text-sm text-green-600">Standard user access</div>
                      </div>
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    </div>
                  </button>

                  <div>
                    <button
                      onClick={() => {
                        const departmentSelect = document.getElementById('department-select') as HTMLSelectElement;
                        const departmentId = departmentSelect?.value;
                        if (departmentId) {
                          updateUserRole(selectedUser.id, 'officer', departmentId);
                        } else {
                          toast.error('Please select a department for officer role');
                        }
                      }}
                      className="w-full text-left p-3 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-blue-800">Officer</div>
                          <div className="text-sm text-blue-600">Department-specific access</div>
                        </div>
                        <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                      </div>
                    </button>
                    <select
                      id="department-select"
                      className="mt-2 input-field w-full text-sm"
                      defaultValue={selectedUser.departmentId || ''}
                    >
                      <option value="">Select department...</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => updateUserRole(selectedUser.id, 'admin')}
                    className="w-full text-left p-3 border-2 border-red-200 rounded-lg hover:bg-red-50 hover:border-red-400 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-red-800">Admin</div>
                        <div className="text-sm text-red-600">Full system access</div>
                      </div>
                      <CheckCircleIcon className="h-5 w-5 text-red-600" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}