import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Zap, BrainCircuit, MessageSquare, MapPin, Calendar, Award, Linkedin,
  ArrowRight, Star, X, Server, Code, CheckCircle, AlertTriangle, Cpu,
  Video, Brain, Image as ImageIcon, Mic, Sparkles, Mail, Phone,
  Heart, Activity, Users, Lightbulb, Send, Loader2, Play
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// ==========================================
// 1. TIPI ORIGINALI
// ==========================================
interface Project {
  id: string;
  title: string;
  shortDescription: string;
  stack: string[];
  image: string;
  isFeatured: boolean;
  technicalSheet: {
    objective: string;
    architecture: string[];
    keyCompetencies: string[];
    technicalChallenges?: { problem: string; solution: string; }[];
    results: string;
  };
}

interface Skill {
  category: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  tools: string;
  businessImpact: string;
}

interface SoftSkill {
  title: string;
  context: string;
  value: string;
  hobbyConnection?: string;
}

// ==========================================
// 2. COSTANTI ORIGINALI (Full Data)
// ==========================================
const BIO_DATA = {
  name: "Sabrina Detommaso",
  role: "AI Automation Architect & Workflow Strategist",
  birthDate: "1996-09-17",
  location: "Monopoli (Bari), Italia",
  photoUrl: "https://i.imgur.com/oAdStUi.png", 
  email: "sabryf.27@gmail.com",
  phone: "3283476376",
  linkedInUrl: "https://www.linkedin.com/in/sabrina-detommaso-56582a384/",
  summary: `Aiuto le aziende a trasformare processi manuali lenti e costosi in ecosistemi digitali autonomi. Il mio focus non è l'automazione fine a se stessa, ma la creazione di asset aziendali scalabili che riducono il carico operativo e garantiscono un flusso dati privo di errori umani.\n\nHo un background non lineare che spazia dall'ambito sanitario al service industry, il che mi ha fornito una resilienza operativa unica. Ho consolidato le mie competenze tecniche attraverso il percorso intensivo in AI & Business Automation di AcademyRapido (Settembre - Dicembre 2025).`,
  academyExperience: "Il corso AcademyRapido mi ha fornito una padronanza completa di n8n, la logica dei nodi, la struttura dei flussi no-code/low-code e l'uso avanzato di AI Agents. Ho imparato a integrare piattaforme come ElevenLabs, Flow, Gemini e ChatGPT per creare soluzioni multimediali e decisionali complesse."
};

const SKILLS: Skill[] = [
  { category: "Workflow Orchestration", tools: "n8n", level: "Intermediate", businessImpact: "Eliminazione dei Silos: Integro stack frammentati (CRM, ERP, AI) creando un'unica 'autostrada' dati che riduce del 70% il tempo di attraversamento dei processi." },
  { category: "Generative AI", tools: "Gemini, OpenAI, AI Agents", level: "Intermediate", businessImpact: "Forza Lavoro Digitale: Configuro 'Agenti Cognitivi' capaci di valutare lead, generare strategie editoriali e analizzare report." },
  { category: "Vector DB & RAG", tools: "Supabase, Vector Stores", level: "Intermediate", businessImpact: "Assistenza Scalabile: Trasformo la conoscenza aziendale statica (PDF/Manuali) in assistenti attivi 24/7." },
  { category: "Database", tools: "AirTable, PostgreSQL", level: "Intermediate", businessImpact: "Data Integrity: Strutturo database relazionali autopopolanti che eliminano il data entry manuale." },
  { category: "Support & Ticketing", tools: "Zendesk, Slack", level: "Intermediate", businessImpact: "Operational Continuity: Creo sistemi di notifica Human-in-the-loop per intervenire solo quando necessario." }
];

const SOFT_SKILLS: SoftSkill[] = [
  { title: "Resilienza & Pivot Rapido", context: "Background in Infermieristica e Service.", value: "Gestione delle emergenze tech. Quando un'API cambia o un flusso si rompe, analizzo l'errore e applico il fix.", hobbyConnection: "Meditazione/Yoga: Mi aiuta a mantenere la lucidità sotto pressione." },
  { title: "Pensiero Sistemico", context: "Scrittura analitica.", value: "Scompongo workflow complessi in piccoli nodi logici risolvibili.", hobbyConnection: "Scrittura: Organizzo le idee con logica per 'deframmentare' la mente." },
  { title: "Empatia Operativa", context: "Lavoro in team.", value: "Progetto flussi user-friendly perché la tecnologia deve servire l'umano.", hobbyConnection: "Lettura: Migliora la capacità di comprendere le esigenze del team." }
];

const PROJECTS: Project[] = [
  {
    id: "p5",
    title: "RAG Chatbot Customer Service",
    shortDescription: "Un assistente virtuale intelligente che conosce a memoria i tuoi manuali tecnici. Risponde ai clienti 24/7 risolvendo dubbi complessi all'istante e apre automaticamente un ticket se incerto.",
    stack: ["n8n", "Supabase", "Gemini", "Zendesk"],
    image: "https://i.imgur.com/qVviCHO.png",
    isFeatured: true,
    technicalSheet: {
      objective: "Chatbot RAG che risponde da PDF tecnici e scala all'umano se incerto.",
      architecture: ["PDF -> Split -> Gemini Embedding -> Supabase", "Webhook -> Vector Retrieve -> Gemini Answer", "Failover su Ticket Zendesk Automatico"],
      keyCompetencies: ["Architettura RAG", "Full-Stack Automation", "Error Handling"],
      results: "Gestione autonoma dell'80% delle richieste standard.",
      technicalChallenges: [{ problem: "Upload vettori lunghi", solution: "Modifica query SQL vector dimensions." }]
    }
  },
  {
    id: "p6",
    title: "Orchestratore Marketing Multi-Agente",
    shortDescription: "Un intero team di marketing automatizzato. Crea strategie, scrive post e controlla la coerenza del brand consegnando campagne pronte in pochi minuti.",
    stack: ["n8n", "Gemini", "Google Docs", "Notion"],
    image: "https://i.imgur.com/DSfvLfD.png",
    isFeatured: true,
    technicalSheet: {
      objective: "Automatizzare strategia e copy replicando un team umano.",
      architecture: ["Agente Direttore Creativo", "Router verso 3 Agenti Copy", "Agente Revisore Brand Tone"],
      keyCompetencies: ["Multi-Agent Systems", "Advanced Logic", "Circuit Breaker Pattern"],
      results: "Riduzione del 90% del tempo di ideazione."
    }
  },
  {
    id: "p3",
    title: "Lead Generation & Scoring",
    shortDescription: "Sonda il web, analizza i profili e segnala solo i contatti 'caldi' pronti all'acquisto su AirTable.",
    stack: ["n8n", "Gemini", "AirTable", "PhantomBuster"],
    image: "https://i.imgur.com/5JLqgXh.png",
    isFeatured: true,
    technicalSheet: {
      objective: "Consegnare ai venditori solo lead qualificati (Score > 4).",
      architecture: ["Scraping dati LinkedIn", "Normalizzazione JSON", "AI Scoring (0-5)", "Sync su AirTable"],
      keyCompetencies: ["Data Transformation", "Decision Making AI"],
      results: "Database autopopolante con lead ad alta conversione."
    }
  }
];

const CREATIVE_SPOT = {
  title: "AI Commercial: Termoconvettore Future-Gen",
  description: "Spot prodotto integralmente con AI. Gestione del ciclo creativo: dalla ricerca materiali alla generazione visuale e sonora.",
  videoUrl: "https://res.cloudinary.com/ddqn6m8z7/video/upload/v1765880729/spot_wntjp7.mp4", 
  coverUrl: "https://i.imgur.com/NhRNbS1.png",
  steps: [
    { label: "Ideazione", desc: "Ricerca concept design tramite ChatGPT.", icon: "Brain" },
    { label: "Visual", desc: "Reference video animate con Flow.", icon: "Image" },
    { label: "Audio", desc: "Voce neurale ElevenLabs.", icon: "Mic" },
    { label: "Editing", desc: "Montaggio e sync su CapCut.", icon: "Video" }
  ],
  tools: ["Gemini Pro", "Google Flow", "ElevenLabs", "CapCut"]
};

// ==========================================
// 3. LOGICA AI (Gemini Service)
// ==========================================
const SYSTEM_INSTRUCTION = `Sei l'assistente di Sabrina Detommaso, AI Architect. Rispondi in italiano in modo professionale. Dati: ${JSON.stringify(BIO_DATA)}, Competenze: ${JSON.stringify(SKILLS)}, Progetti: ${JSON.stringify(PROJECTS)}. Enfatizza n8n e AI Agents.`;

const sendMessageToGemini = async (history: { role: string; text: string }[], newMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 },
      history: history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
    });
    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Non ho potuto generare una risposta.";
  } catch (e) { return "Assistente momentaneamente offline."; }
};

// ==========================================
// 4. COMPONENTI UI (Premium Restoration)
// ==========================================

const Hero = () => (
  <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-techGreen/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
    </div>
    <div className="container mx-auto px-6 relative z-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slateBlue border border-techGreen/30 text-techGreen text-sm font-medium mb-6">
        <Zap size={16} /> <span>AI Automation Architect & Workflow Strategist</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Il Futuro dell'AI, <span className="text-techGreen">Più Umano.</span></h1>
      <p className="text-xl md:text-2xl text-pearlGray/80 max-w-3xl mx-auto mb-8 leading-relaxed">
        Aiuto le aziende a trasformare processi manuali lenti in <span className="text-white font-semibold">ecosistemi digitali autonomi</span>.
      </p>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 text-left">
        <div className="p-6 bg-slateBlue/50 border border-slate-700 rounded-xl backdrop-blur-sm hover:border-techGreen/50 transition-colors">
          <Bot className="text-techGreen mb-4" size={32} /><h3 className="text-lg font-bold text-white mb-2">Workflow Orchestration</h3>
          <p className="text-coolGray text-sm">Eliminazione dei Silos e integrazione di stack frammentati.</p>
        </div>
        <div className="p-6 bg-slateBlue/50 border border-slate-700 rounded-xl backdrop-blur-sm hover:border-techGreen/50 transition-colors">
          <BrainCircuit className="text-techGreen mb-4" size={32} /><h3 className="text-lg font-bold text-white mb-2">Agenti Cognitivi</h3>
          <p className="text-coolGray text-sm">Configurazione di forza lavoro digitale capace di agire.</p>
        </div>
        <div className="p-6 bg-slateBlue/50 border border-slate-700 rounded-xl backdrop-blur-sm hover:border-techGreen/50 transition-colors">
          <Zap className="text-techGreen mb-4" size={32} /><h3 className="text-lg font-bold text-white mb-2">ROI Tangibile</h3>
          <p className="text-coolGray text-sm">Asset scalabili che riducono il carico operativo.</p>
        </div>
      </div>
    </div>
  </section>
);

const SkillStack = () => (
  <section className="py-16 bg-deepBlue">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-white mb-2">Metodo, Core Stack & Business Value</h2>
      <p className="text-techGreen mb-8">Dalla tecnica al fatturato: ecco come trasformo il codice in ROI.</p>
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slateBlue border-b border-slate-700">
              <th className="p-4 text-white font-semibold">Tecnologia</th>
              <th className="p-4 text-white font-semibold">Livello</th>
              <th className="p-4 text-white font-semibold">Business Impact</th>
            </tr>
          </thead>
          <tbody>
            {SKILLS.map((skill, i) => (
              <tr key={i} className={`border-b border-slate-800 hover:bg-slateBlue/30 transition-colors ${i % 2 === 0 ? 'bg-deepBlue' : 'bg-[#050B1E]'}`}>
                <td className="p-4 text-pearlGray font-medium">{skill.tools} <span className="block text-xs text-coolGray mt-1 font-normal">{skill.category}</span></td>
                <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-semibold ${skill.level === 'Expert' ? 'bg-techGreen/20 text-techGreen' : 'bg-blue-500/20 text-blue-400'}`}>{skill.level}</span></td>
                <td className="p-4 text-coolGray text-sm">{skill.businessImpact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const ProjectsGrid = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical'>('overview');

  return (
    <section id="projects" className="py-16 bg-[#050B1E]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-10">Case Studies & Progetti</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {PROJECTS.map(p => (
            <div key={p.id} onClick={() => { setSelected(p); setActiveTab('overview'); }} className="group bg-slateBlue border border-slate-800 rounded-xl overflow-hidden hover:border-techGreen/50 transition-all cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img src={p.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={p.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slateBlue to-transparent opacity-80" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-coolGray text-sm line-clamp-3 mb-4">{p.shortDescription}</p>
                <div className="text-techGreen text-sm font-bold flex items-center">Scheda Tecnica <ArrowRight size={16} className="ml-2"/></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-slateBlue border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700 flex justify-between items-start">
              <h2 className="text-2xl font-bold text-white">{selected.title}</h2>
              <X className="cursor-pointer text-white" onClick={() => setSelected(null)} />
            </div>
            <div className="flex border-b border-slate-700 px-6">
              <button onClick={() => setActiveTab('overview')} className={`py-3 px-4 text-sm border-b-2 ${activeTab === 'overview' ? 'border-techGreen text-techGreen' : 'border-transparent text-coolGray'}`}>Panoramica</button>
              <button onClick={() => setActiveTab('technical')} className={`py-3 px-4 text-sm border-b-2 ${activeTab === 'technical' ? 'border-techGreen text-techGreen' : 'border-transparent text-coolGray'}`}>Dettagli Tecnici</button>
            </div>
            <div className="p-6">
              {activeTab === 'overview' ? (
                <div className="space-y-6">
                  <img src={selected.image} className="w-full h-64 object-cover rounded-xl" alt={selected.title}/>
                  <p className="text-pearlGray">{selected.technicalSheet.objective}</p>
                  <div className="bg-techGreen/10 p-4 rounded-lg text-techGreen font-bold">Risultato: {selected.technicalSheet.results}</div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div><h4 className="text-white font-bold flex items-center gap-2 mb-4"><Server size={20}/> Architettura</h4>
                    <ul className="space-y-2 text-pearlGray">{selected.technicalSheet.architecture.map((a,i)=><li key={i} className="flex gap-2"><span className="text-techGreen">•</span> {a}</li>)}</ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const CreativeSpot = () => {
  const icons = { Brain: Brain, Image: ImageIcon, Mic: Mic, Video: Video };
  return (
    <section className="py-20 bg-deepBlue relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-8"><Sparkles className="text-purple-400" size={28} /><h2 className="text-3xl font-bold text-white">AI Creative Studio</h2></div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <video className="w-full h-full object-cover" controls poster={CREATIVE_SPOT.coverUrl}>
              <source src={CREATIVE_SPOT.videoUrl} type="video/mp4" />
            </video>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{CREATIVE_SPOT.title}</h3>
            <p className="text-pearlGray mb-8 border-l-4 border-purple-500 pl-4">{CREATIVE_SPOT.description}</p>
            <div className="space-y-6">
              {CREATIVE_SPOT.steps.map((s,i) => {
                const Icon = icons[s.icon as keyof typeof icons] || Sparkles;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400 border border-slate-700"><Icon size={20}/></div>
                    <div><h4 className="text-white font-semibold text-sm">{s.label}</h4><p className="text-coolGray text-sm">{s.desc}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SoftSkills = () => {
  const [exp, setExp] = useState<number | null>(null);
  const icons = [Activity, Lightbulb, Users];
  return (
    <section className="py-16 bg-[#0F172A]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-10">Soft Skills "Ingegnerizzate"</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {SOFT_SKILLS.map((s,i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={i} className="bg-deepBlue border border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4"><div className="p-3 bg-slate-800 rounded-lg text-techGreen"><Icon size={24}/></div><h3 className="text-lg font-bold text-white">{s.title}</h3></div>
                <div className="space-y-4">
                  <div><span className="text-xs text-coolGray font-bold uppercase tracking-wider">Business Value</span><p className="text-pearlGray text-sm mt-1">{s.value}</p></div>
                  <button onClick={() => setExp(exp === i ? null : i)} className="flex items-center gap-2 text-xs text-techGreen"><Heart size={12} fill={exp===i?"currentColor":"none"}/> {exp===i?"Nascondi Origine":"Scopri Origine"}</button>
                  {exp === i && <p className="text-xs italic text-coolGray bg-slate-800 p-2 rounded animate-fadeIn">"{s.hobbyConnection}"</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: 'model', text: 'Ciao! Sono l\'assistente AI di Sabrina. Come posso aiutarti?' }]);
  const [input, setInput] = useState('');
  const [load, setLoad] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [msgs]);
  const send = async () => {
    if(!input.trim() || load) return;
    const m = { role: 'user', text: input };
    setMsgs(p => [...p, m]); setInput(''); setLoad(true);
    const res = await sendMessageToGemini(msgs.slice(-6), m.text);
    setMsgs(p => [...p, { role: 'model', text: res }]); setLoad(false);
  };
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-8 right-8 z-[100] bg-techGreen text-deepBlue p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 font-bold">{isOpen ? <X size={24}/> : <MessageSquare size={24}/><span className="hidden md:inline">Chiedi all'AI</span></button>
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-80 md:w-96 h-[500px] bg-slateBlue border border-slate-700 rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden animate-slideUp">
          <div className="bg-[#020617] p-4 border-b border-slate-700 flex items-center gap-3"><div className="p-2 bg-techGreen/10 rounded-full"><Bot className="text-techGreen" size={20}/></div><h3 className="text-white font-bold text-sm">Sabrina's AI Agent</h3></div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4">{msgs.map((m,i)=><div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}><div className={`p-3 rounded-xl text-sm max-w-[85%] ${m.role==='user'?'bg-techGreen text-deepBlue font-medium':'bg-slate-700 text-pearlGray'}`}>{m.text}</div></div>)}{load && <Loader2 className="animate-spin text-techGreen mx-auto"/>}<div ref={endRef}/></div>
          <div className="p-3 bg-[#020617] flex gap-2"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} className="flex-grow bg-slate-800 text-white text-sm p-3 rounded-lg" placeholder="Scrivi qui..."/><button onClick={send} className="bg-techGreen p-3 rounded-lg text-deepBlue"><Send size={20}/></button></div>
        </div>
      )}
    </>
  );
};

// ==========================================
// 5. MAIN APP
// ==========================================
export default function App() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="min-h-screen bg-deepBlue text-pearlGray font-sans selection:bg-techGreen/30">
      <nav className="fixed top-0 w-full z-50 bg-deepBlue/80 backdrop-blur border-b border-slate-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white tracking-tighter">Sabrina<span className="text-techGreen">.AI</span></div>
          <div className="flex gap-6 text-sm font-medium">
            <button onClick={() => scroll('bio')} className="hover:text-techGreen transition-colors">Bio</button>
            <button onClick={() => scroll('projects')} className="hover:text-techGreen transition-colors">Progetti</button>
            <button onClick={() => scroll('contact')} className="hover:text-techGreen transition-colors">Contatti</button>
          </div>
        </div>
      </nav>
      <main>
        <Hero />
        <section id="bio" className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-6 flex flex-col md:flex-row gap-12 items-start">
            <div className="relative group shrink-0">
              <div className="absolute inset-0 bg-techGreen rounded-2xl rotate-3 opacity-20 group-hover:rotate-0 transition-transform"></div>
              <img src={BIO_DATA.photoUrl} className="relative w-64 h-64 rounded-2xl border-2 border-slate-700 shadow-2xl object-cover" alt="Sabrina" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Chi Sono</h2>
              <p className="text-lg text-pearlGray/80 whitespace-pre-line leading-relaxed mb-6">{BIO_DATA.summary}</p>
              <div className="bg-slateBlue/50 p-6 rounded-xl border border-slate-700 flex gap-4"><Award className="text-techGreen shrink-0"/><p className="text-sm text-coolGray">{BIO_DATA.academyExperience}</p></div>
            </div>
          </div>
        </section>
        <ProjectsGrid />
        <CreativeSpot />
        <SkillStack />
        <SoftSkills />
        <section id="contact" className="py-24 border-t border-slate-800 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Contatti</h2>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            <a href={`mailto:${BIO_DATA.email}`} className="flex flex-col items-center gap-2 group"><Mail className="text-techGreen group-hover:scale-125 transition-transform" size={32}/><span>Email</span></a>
            <a href={BIO_DATA.linkedInUrl} target="_blank" className="flex flex-col items-center gap-2 group"><Linkedin className="text-techGreen group-hover:scale-125 transition-transform" size={32}/><span>LinkedIn</span></a>
            <div className="flex flex-col items-center gap-2"><Phone className="text-techGreen" size={32}/><span>{BIO_DATA.phone}</span></div>
          </div>
        </section>
      </main>
      <footer className="py-8 text-center text-coolGray text-xs border-t border-slate-800">© 2025 Sabrina Detommaso</footer>
      <ChatBot />
    </div>
  );
}