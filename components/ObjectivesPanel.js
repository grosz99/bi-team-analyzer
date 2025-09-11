import React from 'react';
import { Target, Plus, X } from 'lucide-react';

export default function ObjectivesPanel({ objectives, setObjectives }) {
  const handleAddObjective = () => {
    setObjectives([...objectives, '']);
  };

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const handleRemoveObjective = (index) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="bg-bcg-dark-green text-white px-6 py-4 flex items-center gap-2">
        <Target size={20} />
        <h2 className="text-xl font-bold">Strategic Objectives</h2>
      </div>
      
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-4">
          List your team&apos;s strategic objectives and goals. The AI will analyze what skills and roles are needed to achieve them.
        </p>
        
        <div className="space-y-3">
          {objectives.map((objective, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={objective}
                onChange={(e) => handleObjectiveChange(index, e.target.value)}
                placeholder="e.g., Build scalable web application, Implement AI agents, Improve QA processes..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bcg-green"
              />
              <button
                onClick={() => handleRemoveObjective(index)}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
        
        <button
          onClick={handleAddObjective}
          className="mt-4 flex items-center gap-2 text-bcg-green hover:text-bcg-dark-green transition-colors"
        >
          <Plus size={18} />
          Add Objective
        </button>
        
        <div className="mt-6 p-4 bg-bcg-gray rounded-md">
          <p className="text-sm text-gray-700">
            <strong>How it works:</strong> The AI will analyze your objectives against your current team&apos;s capabilities to identify gaps and recommend solutions.
          </p>
        </div>
      </div>
    </div>
  );
}