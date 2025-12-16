import React, { useState } from 'react';
import { Project } from '../types';
import { X, Server, Code, CheckCircle, AlertTriangle, Cpu } from 'lucide-react';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'technical'>('overview');

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose} // Close when clicking background
    >
      <div 
        className="bg-slateBlue border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
      >
        
        {/* Header */}
        <div className="sticky top-0 bg-slateBlue/95 backdrop-blur z-10 border-b border-slate-700 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className="text-xs px-2 py-1 rounded bg-slate-800 text-coolGray border border-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-700 rounded-full transition-colors text-coolGray hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700 px-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'overview' 
                ? 'border-techGreen text-techGreen' 
                : 'border-transparent text-coolGray hover:text-white'
            }`}
          >
            Panoramica
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`py-3 px-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'technical' 
                ? 'border-techGreen text-techGreen' 
                : 'border-transparent text-coolGray hover:text-white'
            }`}
          >
            Scheda Tecnica (Dettagli)
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-64 object-cover rounded-xl border border-slate-700"
              />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Obiettivo</h3>
                <p className="text-pearlGray leading-relaxed">{project.technicalSheet.objective}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Risultati</h3>
                <div className="bg-techGreen/10 border border-techGreen/20 p-4 rounded-lg text-techGreen">
                  {project.technicalSheet.results}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'technical' && (
            <div className="space-y-8">
              
              {/* Architecture */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Server className="text-blue-400" size={20} />
                  <h3 className="text-xl font-semibold text-white">Architettura della Soluzione</h3>
                </div>
                <div className="bg-[#020617] p-5 rounded-xl border border-slate-800">
                  <ul className="space-y-3">
                    {project.technicalSheet.architecture.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-pearlGray">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-coolGray flex items-center justify-center text-xs border border-slate-700">{idx + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Challenges (STAR) */}
              {project.technicalSheet.technicalChallenges && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="text-purple-400" size={20} />
                    <h3 className="text-xl font-semibold text-white">Sfide Tecniche & Soluzioni</h3>
                  </div>
                  <div className="grid gap-4">
                    {project.technicalSheet.technicalChallenges.map((challenge, idx) => (
                      <div key={idx} className="bg-[#020617] border border-slate-800 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-slate-800 flex gap-3">
                           <AlertTriangle className="text-amber-500 shrink-0" size={18} />
                           <p className="text-sm text-pearlGray"><span className="text-amber-500 font-semibold">Problema:</span> {challenge.problem}</p>
                        </div>
                        <div className="p-4 bg-techGreen/5 flex gap-3">
                           <CheckCircle className="text-techGreen shrink-0" size={18} />
                           <p className="text-sm text-pearlGray"><span className="text-techGreen font-semibold">Soluzione:</span> {challenge.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Competencies */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="text-pink-400" size={20} />
                  <h3 className="text-xl font-semibold text-white">Competenze Chiave</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technicalSheet.keyCompetencies.map((comp, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-700/50 text-white rounded-md text-sm border border-slate-600">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;