import React, { useState } from 'react';
import { SOFT_SKILLS } from '../constants';
import { Heart, Activity, Users, Lightbulb } from 'lucide-react';

const icons = [Activity, Lightbulb, Users];

const SoftSkills: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-[#0F172A]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-2">Soft Skills "Ingegnerizzate"</h2>
        <p className="text-coolGray mb-10">Il mio "Sistema Operativo" umano, forgiato in ambienti ad alta pressione.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {SOFT_SKILLS.map((skill, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div 
                key={idx} 
                className={`bg-deepBlue border border-slate-800 rounded-xl p-6 transition-all duration-300 ${expandedIndex === idx ? 'ring-2 ring-techGreen/50 shadow-lg shadow-techGreen/5' : 'hover:border-slate-600'}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-slate-800 rounded-lg text-techGreen">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{skill.title}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase text-coolGray font-bold tracking-wider">Contesto</span>
                    <p className="text-pearlGray text-sm mt-1">{skill.context}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase text-coolGray font-bold tracking-wider">Valore Tech</span>
                    <p className="text-pearlGray text-sm mt-1">{skill.value}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-800 mt-4">
                    <button 
                      onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                      className="flex items-center gap-2 text-xs text-techGreen hover:underline w-full"
                    >
                      <Heart size={12} fill={expandedIndex === idx ? "currentColor" : "none"} />
                      {expandedIndex === idx ? "Nascondi Origine (Hobby)" : "Scopri Origine (Hobby)"}
                    </button>
                    
                    {expandedIndex === idx && (
                       <div className="mt-3 bg-slate-800/50 p-3 rounded text-sm text-coolGray italic animate-fadeIn">
                         "{skill.hobbyConnection}"
                       </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SoftSkills;