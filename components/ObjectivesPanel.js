import React from 'react';
import { Target, Lightbulb, Plus, X } from 'lucide-react';

export default function ObjectivesPanel({ objectives, setObjectives, skills, setSkills }) {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="bg-bcg-navy text-white px-6 py-4 flex items-center gap-2">
          <Target size={20} />
          <h2 className="text-xl font-bold">Strategic Objectives</h2>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            List your BI team&apos;s strategic objectives and goals
          </p>
          
          <div className="space-y-3">
            {objectives.map((objective, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                  placeholder="Enter strategic objective..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bcg-blue"
                />
                <button
                  onClick={() => handleRemoveObjective(index)}
                  className="text-bcg-red hover:text-red-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleAddObjective}
            className="mt-4 flex items-center gap-2 text-bcg-blue hover:text-bcg-navy transition-colors"
          >
            <Plus size={18} />
            Add Objective
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg">
        <div className="bg-bcg-navy text-white px-6 py-4 flex items-center gap-2">
          <Lightbulb size={20} />
          <h2 className="text-xl font-bold">Desired Skills & Capabilities</h2>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            Describe the skills and capabilities your team needs to achieve its objectives
          </p>
          
          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Example: We need machine learning capabilities for predictive analytics, real-time data streaming expertise for live dashboards, and cloud infrastructure knowledge for scalable solutions..."
            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bcg-blue resize-none"
          />
          
          <div className="mt-4 p-3 bg-bcg-gray rounded-md">
            <p className="text-xs text-gray-600">
              <strong>Tip:</strong> Be specific about technical skills (e.g., Python, Tableau, AWS) and soft skills (e.g., stakeholder management, data storytelling)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}