import { Project, Skill, SoftSkill } from './types';

export const BIO_DATA = {
  name: "Sabrina Detommaso",
  role: "AI Automation Architect & Workflow Strategist",
  birthDate: "1996-09-17",
  location: "Monopoli (Bari), Italia",
  photoUrl: "/profile/sabrina.jpg",
  email: "sabryf.27@gmail.com",
  phone: "3283476376",
  linkedInUrl: "https://www.linkedin.com/in/sabrina-detommaso-56582a384/",
  summary: `Aiuto le aziende a trasformare processi manuali lenti e costosi in ecosistemi digitali autonomi. 
  Il mio focus non è l'automazione fine a se stessa, ma la creazione di asset aziendali scalabili che riducono il carico operativo e garantiscono un flusso dati privo di errori umani.
  
  Ho un background non lineare che spazia dall'ambito sanitario al service industry, il che mi ha fornito una resilienza operativa unica.
  Ho consolidato le mie competenze tecniche attraverso il percorso intensivo in AI & Business Automation di AcademyRapido (Settembre - Dicembre 2025).`,
  academyExperience: "Il corso AcademyRapido mi ha fornito una padronanza completa di n8n, la logica dei nodi, la struttura dei flussi no-code/low-code e l'uso avanzato di AI Agents. Ho imparato a integrare piattaforme come ElevenLabs, Flow, Gemini e ChatGPT per creare soluzioni multimediali e decisionali complesse."
};

export const CREATIVE_SPOT = {
  title: "AI Commercial: Termoconvettore Future-Gen",
  description: "Ideazione e produzione integrale di uno spot pubblicitario per un prodotto concettuale futuristico. Il progetto dimostra come l'AI Generativa possa abbattere i costi di produzione video, gestendo l'intero ciclo creativo: dalla ricerca scientifica dei materiali alla generazione di asset visuali e sonori.",
  videoUrl: "/spot.mp4", // Put your video file in public/spot.mp4
  coverUrl: "/spot-cover.jpg", // Optional cover image
  steps: [
    {
      label: "Ideazione & Ricerca",
      desc: "Ricerca scientifica su materiali innovativi e concept design tramite ChatGPT e Gemini.",
      icon: "Brain"
    },
    {
      label: "Visual Generation",
      desc: "Creazione reference video, moodboard e clip animate con Gemini Pro e Google Labs (Flow).",
      icon: "Image"
    },
    {
      label: "Audio Engineering",
      desc: "Voce narrante neurale ed effetti sonori generati con ElevenLabs.",
      icon: "Mic"
    },
    {
      label: "Editing Finale",
      desc: "Montaggio, color correction e sincronizzazione audio/video su CapCut.",
      icon: "Video"
    }
  ],
  tools: ["Gemini Pro", "ChatGPT", "Google Flow", "ElevenLabs", "CapCut"]
};

export const SKILLS: Skill[] = [
  {
    category: "Workflow Orchestration",
    tools: "n8n",
    level: "Intermediate",
    businessImpact: "Eliminazione dei Silos: Integro stack frammentati (CRM, ERP, AI) creando un'unica 'autostrada' dati che riduce del 70% il tempo di attraversamento dei processi."
  },
  {
    category: "Generative AI",
    tools: "Gemini, OpenAI, AI Agents",
    level: "Intermediate",
    businessImpact: "Forza Lavoro Digitale: Configuro 'Agenti Cognitivi' capaci di valutare lead, generare strategie editoriali e analizzare report."
  },
  {
    category: "Vector DB & RAG",
    tools: "Supabase, Vector Stores",
    level: "Intermediate",
    businessImpact: "Assistenza Scalabile: Trasformo la conoscenza aziendale statica (PDF/Manuali) in assistenti attivi 24/7."
  },
  {
    category: "Database",
    tools: "AirTable, PostgreSQL",
    level: "Intermediate",
    businessImpact: "Data Integrity: Strutturo database relazionali autopopolanti che eliminano il data entry manuale."
  },
  {
    category: "Support & Ticketing",
    tools: "Zendesk, Slack",
    level: "Intermediate",
    businessImpact: "Operational Continuity: Creo sistemi di notifica Human-in-the-loop per intervenire solo quando necessario."
  }
];

export const SOFT_SKILLS: SoftSkill[] = [
  {
    title: "Resilienza & Pivot Rapido (Antifragilità)",
    context: "Background in Infermieristica e Service Industry.",
    value: "Gestione delle emergenze applicata al Tech. Quando un'API cambia o un flusso si rompe (come successo con Supabase), analizzo l'errore e applico il fix.",
    hobbyConnection: "Meditazione/Yoga: Mi aiuta a mantenere la lucidità sotto pressione e trovare soluzioni critiche."
  },
  {
    title: "Pensiero Sistemico & Debugging Mentale",
    context: "Scrittura analitica.",
    value: "Scompongo workflow complessi in piccoli nodi logici risolvibili. Tratto il fallimento come un dato utile per l'iterazione successiva.",
    hobbyConnection: "Scrittura: Sfogo le emozioni e organizzo le idee con logica per 'deframmentare' la mente."
  },
  {
    title: "Empatia Operativa",
    context: "Lavoro in team.",
    value: "Non costruisco automazioni 'perfette' ma inutilizzabili. Progetto flussi user-friendly (notifiche chiare, escalation) perché la tecnologia deve servire l'umano.",
    hobbyConnection: "Lettura: Apre la mente a nuove prospettive, migliorando la capacità di comprendere le esigenze del team."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p5",
    title: "RAG Chatbot Customer Service",
    shortDescription: "Un assistente virtuale intelligente che conosce a memoria i tuoi manuali tecnici. Risponde ai clienti 24/7 risolvendo dubbi complessi all'istante e, solo quando non è sicuro della risposta, apre automaticamente un ticket per il supporto umano. Riduce drasticamente i tempi di attesa e libera il tuo team dalle domande ripetitive.",
    stack: ["n8n", "Supabase (Vector)", "Gemini", "Zendesk", "PostgreSQL"],
    image: "/workflows/p5-rag-chatbot.png", 
    isFeatured: true,
    technicalSheet: {
      objective: "Creare un chatbot che risponde da PDF tecnici e scala all'umano se incerto.",
      architecture: [
        "Flusso A (Indicizzazione): PDF -> Split Text -> Gemini Embedding -> Supabase Vector Store.",
        "Flusso B (Chat): Webhook -> Embedding Domanda -> Vector Retrieve -> Gemini Answer -> Response.",
        "Flusso C (Failover): Se la risposta è incerta o fallisce -> Ticket Zendesk Automatico.",
        "Reportistica: Analisi dei ticket falliti su Google Docs per il management."
      ],
      keyCompetencies: [
        "Architettura RAG End-to-End",
        "Full-Stack Automation (Input, Processo, Storage, Output)",
        "AI for Business Intelligence"
      ],
      technicalChallenges: [
        {
          problem: "Supabase bloccava l'upload di vettori lunghi.",
          solution: "Modifica manuale query SQL: `query_embedding vector(768)` nel SQL Editor di Supabase."
        },
        {
          problem: "Output AI 'sporco' con caratteri speciali.",
          solution: "Script JavaScript personalizzato (AI-assisted) per regex cleaning prima dell'invio all'utente."
        }
      ],
      results: "Gestione autonoma dell'80% delle richieste standard. Reportistica automatica sulle lacune documentali."
    }
  },
  {
    id: "p6",
    title: "Orchestratore Marketing Multi-Agente",
    shortDescription: "Un intero team di marketing digitale automatizzato in una scatola. Dall'idea iniziale alla pubblicazione, questo sistema crea strategie, scrive i post e controlla la coerenza del brand (Tone of Voice), consegnandoti campagne pronte all'uso in pochi minuti invece che giorni. Elimina il blocco dello scrittore e accelera la produzione.",
    stack: ["n8n", "Gemini", "Google Docs", "Notion", "Google Calendar"],
    image: "/workflows/p6-marketing-agent.png",
    isFeatured: true,
    technicalSheet: {
      objective: "Automatizzare strategia, copy e pubblicazione replicando un team umano.",
      architecture: [
        "Workflow Stratega: Input argomento -> Agente 'Direttore Creativo' -> Strategia su GDocs.",
        "Workflow Esecutore: Legge strategia -> Router verso 3 Agenti (Social, Storyteller, Sales).",
        "Quality Assurance: Agente 'Revisore' controlla Brand Tone.",
        "Feedback Loop: Se bocciato -> Torna al creatore. Max 3 tentativi (Circuit Breaker)."
      ],
      keyCompetencies: [
        "Swarm Intelligence / Multi-Agent Systems",
        "Advanced Logic (Loop, Switch, Merge)",
        "Circuit Breaker Pattern per evitare loop infiniti"
      ],
      technicalChallenges: [
        {
          problem: "Tempi di approvazione biblici e perdita del Tono di Voce.",
          solution: "Agente Revisore dedicato che blocca contenuti fuori target."
        },
        {
          problem: "Loop infiniti di correzione.",
          solution: "Logica di interruzione (Circuit Breaker) dopo 3 tentativi falliti."
        }
      ],
      results: "Riduzione del 90% del tempo di ideazione. Campagne coerenti generate in minuti."
    }
  },
  {
    id: "p3",
    title: "Lead Generation & Scoring Intelligente",
    shortDescription: "Smetti di sprecare tempo su contatti freddi. Questo sistema cerca potenziali clienti online, analizza i loro profili e ti segnala solo quelli 'caldi' e pronti all'acquisto (con un punteggio di qualità). Il tuo team vendite riceve una lista pulita su cui lavorare, aumentando le conversioni e riducendo lo stress.",
    stack: ["n8n", "Google Search/PhantomBuster", "Gemini", "AirTable"],
    image: "/workflows/p3-lead-scoring.png",
    isFeatured: true,
    technicalSheet: {
      objective: "Consegnare ai venditori solo lead 'caldi' (Score > 4).",
      architecture: [
        "Trigger Giornaliero",
        "Estrazione: Google Search o PhantomBuster per dati LinkedIn.",
        "Normalizzazione: Agente AI converte HTML grezzo in JSON pulito.",
        "Scoring: Secondo Agente AI valuta affinità (0-5).",
        "Filtraggio: Solo Score >= 4 salvati su AirTable."
      ],
      keyCompetencies: [
        "Data Transformation (HTML -> JSON)",
        "AI for Decision Making (Scoring)",
        "Automazione B2B"
      ],
      technicalChallenges: [
        {
          problem: "Duplicazione dati e allucinazioni nel loop JavaScript.",
          solution: "Bug Fix: Impostazione nodo Code su 'Execute Once' per ottimizzare le chiamate API e prevenire loop errati."
        }
      ],
      results: "Database autopopolante. I venditori lavorano solo su lead qualificati, aumentando il tasso di conversione."
    }
  },
  {
    id: "p1",
    title: "Gestione Documentale Automatica",
    shortDescription: "Metti in ordine i file aziendali senza usare il mouse. Basta inviare un comando in chat (es. 'Archivia fattura') e il sistema salva il file nella cartella giusta su Google Drive, notificando i colleghi. Garantisce un archivio sempre perfetto e accessibile, eliminando l'errore umano e i documenti persi.",
    stack: ["n8n", "Gmail", "Google Drive", "Slack"],
    image: "/workflows/p1-document-management.png",
    isFeatured: false,
    technicalSheet: {
      objective: "Automatizzare salvataggio e notifiche file con comandi via chat.",
      architecture: [
        "Workflow Base: Gmail -> Download Binario -> Drive -> Notifica Slack.",
        "Workflow Inverso: Slack Trigger -> Crea File Drive -> Invia Email.",
        "Logica Avanzata: Regex per estrarre comandi come 'Crea cartella: NOME' dal testo."
      ],
      keyCompetencies: [
        "Gestione I/O Binario (Files)",
        "Integrazione Sincrona Multi-Cloud",
        "Logica Condizionale (IF/Regex)"
      ],
      results: "Sistema bi-direzionale resiliente capace di interpretare comandi testuali per organizzare cartelle."
    }
  },
  {
    id: "p2",
    title: "Content Factory & SEO Score",
    shortDescription: "Trasforma una semplice lista di argomenti su un foglio di calcolo in articoli completi e ottimizzati per Google. Il sistema scrive, formatta e prepara i contenuti per il tuo blog mentre tu ti occupi d'altro. Garantisce una presenza online costante e professionale senza dover assumere copywriter esterni per le bozze.",
    stack: ["n8n", "Google Sheets", "Gemini", "Notion"],
    image: "/workflows/p2-content-factory.png",
    isFeatured: false,
    technicalSheet: {
      objective: "Fabbrica di contenuti automatica che legge temi e pubblica post/blog.",
      architecture: [
        "Loop su righe Google Sheets.",
        "Agente Creator: Genera contenuto.",
        "Agente SEO: Estrae keyword.",
        "Notion: Crea pagina formattata.",
        "Error Handling: Notifica Slack se l'AI fallisce."
      ],
      keyCompetencies: [
        "Looping & Iterazione sicura",
        "Prompt Engineering per dati strutturati",
        "Error Handling (Trigger Errore dedicato)"
      ],
      results: "Sistema 'set-and-forget' che trasforma idee grezze in libreria di contenuti pronti."
    }
  },
  {
    id: "p4",
    title: "Lead Qualification & Funnel (FormBricks)",
    shortDescription: "Capire cosa vuole il cliente all'istante. Questo sistema legge le risposte aperte dei sondaggi e capisce il budget e l'urgenza del cliente. Invia automaticamente offerte premium ai clienti 'alto-spendenti' e email di cortesia agli altri, massimizzando i profitti e personalizzando l'esperienza utente in tempo reale.",
    stack: ["n8n", "FormBricks", "Gemini", "Zendesk", "Slack"],
    image: "/workflows/p4-lead-qualification.png",
    isFeatured: false,
    technicalSheet: {
      objective: "Valutare automaticamente risposte aperte ai sondaggi.",
      architecture: [
        "Webhook FormBricks (Nuova risposta).",
        "AI Sentiment Analysis: Valuta 'Perché sei interessato?'.",
        "Split Funnel: Se Budget alto & Sentiment Positivo -> Email Follow-up Aggressivo. Altrimenti -> Email Cortesia.",
        "Reportistica: Sintesi giornaliera ticket su Google Doc."
      ],
      keyCompetencies: [
        "Real-time Processing (Webhooks)",
        "Funnel Logic Condizionale",
        "Automazione Documentale"
      ],
      results: "Qualificazione immediata e smistamento automatico dei prospect in base al valore potenziale."
    }
  }
];