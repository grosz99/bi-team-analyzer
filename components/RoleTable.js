import React, { useState } from 'react';
import { Trash2, Plus, Edit2, Check, X } from 'lucide-react';

export default function RoleTable({ roles, setRoles }) {
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});

  const handleEdit = (role) => {
    setEditingId(role.id);
    setEditingData(role);
  };

  const handleSave = () => {
    setRoles(roles.map(role => 
      role.id === editingId ? { ...editingData } : role
    ));
    setEditingId(null);
    setEditingData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingData({});
  };

  const handleDelete = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleAdd = () => {
    const newRole = {
      id: Math.max(...roles.map(r => r.id), 0) + 1,
      title: 'New Role',
      description: 'Enter role description',
      currentWork: 'Enter current work',
      headcount: 1
    };
    setRoles([...roles, newRole]);
    handleEdit(newRole);
  };

  const handleFieldChange = (field, value) => {
    setEditingData({ ...editingData, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-bcg-navy text-white px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Current Team Roles</h2>
        <button
          onClick={handleAdd}
          className="bg-bcg-blue hover:bg-bcg-light-blue transition-colors px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          Add Role
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-bcg-gray border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-bcg-dark-gray uppercase tracking-wider">
                Role Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-bcg-dark-gray uppercase tracking-wider">
                Role Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-bcg-dark-gray uppercase tracking-wider">
                Current Work
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-bcg-dark-gray uppercase tracking-wider">
                How Many Needed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-bcg-dark-gray uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === role.id ? (
                    <input
                      type="text"
                      value={editingData.title}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bcg-blue"
                    />
                  ) : (
                    <div className="text-sm font-medium text-bcg-dark-gray">
                      {role.title}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === role.id ? (
                    <textarea
                      value={editingData.description}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bcg-blue"
                      rows="2"
                    />
                  ) : (
                    <div className="text-sm text-gray-600 max-w-xs">
                      {role.description}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === role.id ? (
                    <textarea
                      value={editingData.currentWork}
                      onChange={(e) => handleFieldChange('currentWork', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bcg-blue"
                      rows="2"
                    />
                  ) : (
                    <div className="text-sm text-gray-600 max-w-xs">
                      {role.currentWork}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === role.id ? (
                    <input
                      type="number"
                      value={editingData.headcount || 1}
                      onChange={(e) => handleFieldChange('headcount', parseInt(e.target.value) || 1)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bcg-blue"
                      min="1"
                      max="99"
                    />
                  ) : (
                    <div className="text-sm font-semibold text-bcg-dark-gray">
                      {role.headcount || 1}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    {editingId === role.id ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="text-bcg-green hover:text-green-700 transition-colors"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-bcg-red hover:text-red-700 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(role)}
                          className="text-bcg-blue hover:text-bcg-navy transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(role.id)}
                          className="text-bcg-red hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}