import React from 'react';
import { SKILLS } from '../constants';

const SkillStack: React.FC = () => {
  return (
    <section className="py-16 bg-deepBlue">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-2">Metodo, Core Stack & Business Value</h2>
        <p className="text-techGreen mb-8">Dalla tecnica al fatturato: ecco come trasformo il codice in ROI.</p>

        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slateBlue border-b border-slate-700">
                <th className="p-4 text-white font-semibold">Tecnologia / Strumento</th>
                <th className="p-4 text-white font-semibold">Livello</th>
                <th className="p-4 text-white font-semibold">Valore per il Cliente (Business Impact)</th>
              </tr>
            </thead>
            <tbody>
              {SKILLS.map((skill, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-slate-800 hover:bg-slateBlue/30 transition-colors ${index % 2 === 0 ? 'bg-deepBlue' : 'bg-[#050B1E]'}`}
                >
                  <td className="p-4 text-pearlGray font-medium">{skill.tools} <span className="block text-xs text-coolGray mt-1 font-normal">{skill.category}</span></td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold
                      ${skill.level === 'Expert' ? 'bg-techGreen/20 text-techGreen' : 
                        skill.level === 'Advanced' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-gray-300'}`}>
                      {skill.level}
                    </span>
                  </td>
                  <td className="p-4 text-coolGray text-sm">{skill.businessImpact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SkillStack;