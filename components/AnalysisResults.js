import React, { useState } from 'react';
import { TrendingUp, AlertCircle, Users, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export default function AnalysisResults({ analysis, onAddRole }) {
  const [expandedSections, setExpandedSections] = useState({
    gaps: true,
    roles: true,
    enhancements: true,
    insights: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'High': return 'text-bcg-red border-bcg-red bg-red-50';
      case 'Medium': return 'text-bcg-orange border-bcg-orange bg-orange-50';
      case 'Low': return 'text-bcg-green border-bcg-green bg-green-50';
      default: return 'text-gray-600 border-gray-300 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-bcg-red';
      case 'Medium': return 'bg-bcg-orange';
      case 'Low': return 'bg-bcg-green';
      default: return 'bg-gray-400';
    }
  };

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {analysis.currentGaps && analysis.currentGaps.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div 
            className="bg-bcg-navy text-white px-6 py-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('gaps')}
          >
            <div className="flex items-center gap-2">
              <AlertCircle size={20} />
              <h3 className="text-xl font-bold">Identified Gaps</h3>
            </div>
            {expandedSections.gaps ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSections.gaps && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.currentGaps.map((gap, index) => (
                  <div key={index} className={`border-2 rounded-lg p-4 ${getImpactColor(gap.impact)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-bcg-dark-gray">{gap.area}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(gap.impact)}`}>
                        {gap.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{gap.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {analysis.recommendedRoles && analysis.recommendedRoles.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div 
            className="bg-bcg-navy text-white px-6 py-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('roles')}
          >
            <div className="flex items-center gap-2">
              <Users size={20} />
              <h3 className="text-xl font-bold">Recommended New Roles</h3>
            </div>
            {expandedSections.roles ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSections.roles && (
            <div className="p-6">
              <div className="space-y-4">
                {analysis.recommendedRoles.map((role, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-bcg-navy">{role.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                      </div>
                      <button
                        onClick={() => onAddRole(role)}
                        className="bg-bcg-blue text-white px-4 py-2 rounded-md hover:bg-bcg-light-blue transition-colors text-sm"
                      >
                        Add to Team
                      </button>
                    </div>
                    
                    <div className="bg-bcg-gray rounded-md p-3">
                      <p className="text-sm text-gray-700">
                        <strong>Reasoning:</strong> {role.reasoning}
                      </p>
                    </div>
                    
                    <div className="flex gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(role.priority)}`}></div>
                        <span className="text-xs text-gray-600">Priority: {role.priority}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">Timeline: {role.timeframe}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {analysis.roleEnhancements && analysis.roleEnhancements.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div 
            className="bg-bcg-navy text-white px-6 py-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('enhancements')}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={20} />
              <h3 className="text-xl font-bold">Role Enhancement Recommendations</h3>
            </div>
            {expandedSections.enhancements ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSections.enhancements && (
            <div className="p-6">
              <div className="space-y-4">
                {analysis.roleEnhancements.map((enhancement, index) => (
                  <div key={index} className="border-l-4 border-bcg-accent pl-4">
                    <h4 className="font-semibold text-bcg-dark-gray">{enhancement.existingRole}</h4>
                    <div className="mt-2 space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Additional Skills Needed:</span>
                        <p className="text-sm text-gray-600">{enhancement.additionalSkills}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Training Recommendations:</span>
                        <p className="text-sm text-gray-600">{enhancement.trainingNeeded}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {analysis.strategicInsights && analysis.strategicInsights.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div 
            className="bg-bcg-navy text-white px-6 py-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('insights')}
          >
            <div className="flex items-center gap-2">
              <TrendingUp size={20} />
              <h3 className="text-xl font-bold">Strategic Insights</h3>
            </div>
            {expandedSections.insights ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSections.insights && (
            <div className="p-6">
              <ul className="space-y-3">
                {analysis.strategicInsights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-bcg-blue rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-gray-700">{insight}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}