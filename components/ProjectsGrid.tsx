import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import ProjectModal from './ProjectModal';
import { Project } from '../types';
import { ArrowRight, Star } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [imgSrc, setImgSrc] = useState(project.image);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      // Fallback placeholder if the local image is not found (e.g. user hasn't moved file yet)
      setImgSrc(`https://placehold.co/800x450/0F172A/4ADE80?text=${encodeURIComponent(project.title)}`);
      setHasError(true);
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-slateBlue border border-slate-800 rounded-xl overflow-hidden hover:border-techGreen/50 transition-all duration-300 hover:shadow-lg hover:shadow-techGreen/10 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden bg-[#020617]">
        <img 
          src={imgSrc} 
          alt={project.title} 
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slateBlue to-transparent opacity-80" />
        {project.isFeatured && (
          <div className="absolute top-4 right-4 bg-techGreen text-deepBlue text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow-md">
            <Star size={12} fill="currentColor" /> Featured
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-techGreen transition-colors">
          {project.title}
        </h3>
        <p className="text-coolGray text-sm mb-4 line-clamp-6 flex-grow leading-relaxed">
          {project.shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.slice(0, 3).map(tech => (
            <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-[#020617] text-gray-400 border border-slate-800">
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="text-[10px] px-2 py-1 text-gray-500">+{project.stack.length - 3}</span>
          )}
        </div>

        <div className="flex items-center text-techGreen text-sm font-medium mt-auto pt-4 border-t border-slate-800 group-hover:pl-2 transition-all">
          Scheda Tecnica <ArrowRight size={16} className="ml-2" />
        </div>
      </div>
    </div>
  );
};

const ProjectsGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-16 bg-[#050B1E]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-2">Case Studies & Progetti</h2>
        <p className="text-coolGray mb-10">Clicca su un progetto per visualizzare la scheda tecnica dettagliata con il workflow.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default ProjectsGrid;