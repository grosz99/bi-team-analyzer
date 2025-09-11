import React, { useState } from 'react';
import Head from 'next/head';
import RoleTable from '../components/RoleTable';
import ObjectivesPanel from '../components/ObjectivesPanel';
import AnalysisResults from '../components/AnalysisResults';
import ExportButton from '../components/ExportButton';
import { defaultRoles } from '../utils/roleData';
import { analyzeTeam } from '../utils/openai';
import { Brain, Loader, BarChart3 } from 'lucide-react';

export default function Home() {
  const [roles, setRoles] = useState(defaultRoles);
  const [objectives, setObjectives] = useState([
    'Build scalable web application with modern tech stack',
    'Implement CI/CD pipeline for faster deployments',
    'Improve user experience and interface design'
  ]);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeTeam(roles, objectives);
      setAnalysis(result);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze team. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddRole = (newRole) => {
    console.log('Adding new role:', newRole);
    const maxId = roles.length > 0 ? Math.max(...roles.map(r => r.id)) : 0;
    const role = {
      id: maxId + 1,
      title: newRole.title || 'New Role',
      description: newRole.description || 'Role description',
      currentWork: newRole.reasoning || 'To be defined',
      teamSize: 'right-sized'
    };
    console.log('New role object:', role);
    setRoles(prevRoles => [...prevRoles, role]);
    
    // Show success message
    setSuccessMessage(`Added "${newRole.title}" to the team!`);
    setTimeout(() => setSuccessMessage(null), 3000);
    
    // Scroll to top to see the new role
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exportData = {
    roles,
    objectives,
    analysis
  };

  return (
    <>
      <Head>
        <title>Product Team Role Analyzer | BCG</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-bcg-dark-green text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 size={32} />
                <div>
                  <h1 className="text-3xl font-bold">Product Team Role Analyzer</h1>
                  <p className="text-bcg-light-gray text-sm mt-1">Optimize your product development team structure</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {analysis && <ExportButton data={exportData} />}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between">
                <span>{successMessage}</span>
                <button 
                  onClick={() => setSuccessMessage(null)}
                  className="text-green-700 hover:text-green-900"
                >
                  ✕
                </button>
              </div>
            )}
            
            <RoleTable roles={roles} setRoles={setRoles} />
            
            <ObjectivesPanel 
              objectives={objectives}
              setObjectives={setObjectives}
            />
            
            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-bcg-green text-white px-8 py-4 rounded-lg hover:bg-bcg-dark-green transition-colors flex items-center gap-3 text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="animate-spin" size={24} />
                    Analyzing Team Structure...
                  </>
                ) : (
                  <>
                    <Brain size={24} />
                    Analyze Team & Get Recommendations
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            {analysis && (
              <div id="analysis-content">
                <AnalysisResults analysis={analysis} onAddRole={handleAddRole} />
              </div>
            )}
          </div>
        </main>

        <footer className="bg-bcg-dark-gray text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <p className="text-sm">© 2024 BCG - Product Team Role Analyzer</p>
              <p className="text-sm text-bcg-light-gray">Powered by AI Analytics</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}