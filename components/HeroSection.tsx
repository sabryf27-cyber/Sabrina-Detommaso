import React from 'react';
import { Bot, Zap, BrainCircuit, MessageSquare } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-techGreen/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slateBlue border border-techGreen/30 text-techGreen text-sm font-medium mb-6">
          <Zap size={16} />
          <span>AI Automation Architect & Workflow Strategist</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Il Futuro dell'AI, <span className="text-techGreen">Più Umano.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-pearlGray/80 max-w-3xl mx-auto mb-8 leading-relaxed">
          Aiuto le aziende a trasformare processi manuali lenti in <span className="text-white font-semibold">ecosistemi digitali autonomi</span>. 
          Progetto architetture AI che non si limitano ad eseguire, ma prendono decisioni logiche.
        </p>

        {/* CTA for Chatbot */}
        <div className="flex justify-center items-center gap-2 mb-10 text-coolGray animate-pulse">
           <MessageSquare size={18} className="text-techGreen" />
           <p className="text-sm">Non sai da dove iniziare? <span className="text-techGreen font-semibold">Chiedi al mio Assistente AI in basso a destra!</span></p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-4 text-left">
          <div className="p-6 bg-slateBlue/50 border border-slate-700 rounded-xl backdrop-blur-sm hover:border-techGreen/50 transition-colors">
            <Bot className="text-techGreen mb-4" size={32} />
            <h3 className="text-lg font-bold text-white mb-2">Workflow Orchestration</h3>
            <p className="text-coolGray text-sm">Eliminazione dei Silos e integrazione di stack frammentati per un'unica autostrada dati.</p>
          </div>
          <div className="p-6 bg-slateBlue/50 border border-slate-700 rounded-xl backdrop-blur-sm hover:border-techGreen/50 transition-colors">
            <BrainCircuit className="text-techGreen mb-4" size={32} />
            <h3 className="text-lg font-bold text-white mb-2">Agenti Cognitivi</h3>
            <p className="text-coolGray text-sm">Configurazione di forza lavoro digitale capace di valutare, decidere e agire.</p>
          </div>
          <div className="p-6 bg-slateBlue/50 border border-slate-700 rounded-xl backdrop-blur-sm hover:border-techGreen/50 transition-colors">
            <Zap className="text-techGreen mb-4" size={32} />
            <h3 className="text-lg font-bold text-white mb-2">ROI Tangibile</h3>
            <p className="text-coolGray text-sm">Focus su asset aziendali scalabili che riducono il carico operativo e gli errori umani.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;