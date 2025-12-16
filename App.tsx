import React from 'react';
import Hero from './components/Hero';
import SkillStack from './components/SkillStack';
import ProjectsGrid from './components/ProjectsGrid';
import SoftSkills from './components/SoftSkills';
import Bio from './components/Bio';
import ChatBot from './components/ChatBot';
import CreativeSpot from './components/CreativeSpot';
import Contact from './components/Contact';

function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-deepBlue text-pearlGray font-sans selection:bg-techGreen/30 selection:text-white">
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-40 bg-deepBlue/80 backdrop-blur border-b border-slate-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white tracking-tighter">
            Sabrina<span className="text-techGreen">.AI</span>
          </div>
          {/* Navigation Links - converted to buttons for safe smooth scrolling */}
          <div className="flex gap-4 md:gap-6 text-sm font-medium text-coolGray overflow-x-auto">
            <button 
              onClick={() => scrollToSection('bio')} 
              className="hover:text-techGreen transition-colors whitespace-nowrap focus:outline-none"
            >
              Chi Sono
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="hover:text-techGreen transition-colors whitespace-nowrap focus:outline-none"
            >
              Progetti
            </button>
            <button 
              onClick={() => scrollToSection('skills')} 
              className="hover:text-techGreen transition-colors whitespace-nowrap focus:outline-none"
            >
              Metodo
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-techGreen transition-colors whitespace-nowrap focus:outline-none"
            >
              Contatti
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        
        {/* Bio moved to top as requested */}
        <div id="bio" className="scroll-mt-24">
          <Bio />
        </div>

        <div id="projects" className="scroll-mt-24">
          <ProjectsGrid />
        </div>

        {/* New Creative Spot Section */}
        <CreativeSpot />

        <div id="skills" className="scroll-mt-24">
          <SkillStack />
        </div>
        
        <SoftSkills />

        <div id="contact" className="scroll-mt-24">
          <Contact />
        </div>
      </main>

      <footer className="bg-[#020617] border-t border-slate-800 py-8 text-center text-coolGray text-sm">
        <p>&copy; {new Date().getFullYear()} Sabrina Detommaso. Built with React & Gemini.</p>
      </footer>

      <ChatBot />
    </div>
  );
}

export default App;