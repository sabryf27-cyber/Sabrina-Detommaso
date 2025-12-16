import React, { useState } from 'react';
import { BIO_DATA } from '../constants';
import { MapPin, Calendar, Award, Linkedin } from 'lucide-react';

const Bio: React.FC = () => {
  // Use state to handle image fallback gracefully
  const [imgSrc, setImgSrc] = useState(BIO_DATA.photoUrl);

  const formattedDate = new Date(BIO_DATA.birthDate).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section className="py-16 bg-deepBlue border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Photo & Key Info */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
              <div className="absolute inset-0 bg-techGreen rounded-2xl rotate-3 opacity-20"></div>
              <img 
                src={imgSrc} 
                alt={BIO_DATA.name}
                onError={() => setImgSrc("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400")} // Fallback professional image
                className="relative w-full h-full object-cover rounded-2xl border-2 border-slate-700 shadow-2xl bg-[#0F172A]"
              />
            </div>
            
            <div className="space-y-3 w-full">
              <div className="flex items-center gap-3 text-coolGray">
                <Calendar size={18} className="text-techGreen" />
                <span>Nata il {formattedDate}</span>
              </div>
              <div className="flex items-center gap-3 text-coolGray">
                <MapPin size={18} className="text-techGreen" />
                <span>{BIO_DATA.location}</span>
              </div>
              <a 
                href={BIO_DATA.linkedInUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-coolGray hover:text-techGreen transition-colors group"
              >
                <Linkedin size={18} className="text-techGreen group-hover:scale-110 transition-transform" />
                <span>Profilo LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-bold text-white mb-6">Chi Sono</h2>
            
            <div className="prose prose-invert max-w-none text-pearlGray leading-relaxed space-y-6">
              <p className="whitespace-pre-line">
                {BIO_DATA.summary}
              </p>
              
              <div className="bg-slateBlue/50 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="text-techGreen" size={24} />
                  <h3 className="text-xl font-semibold text-white">AcademyRapido Experience</h3>
                </div>
                <p className="text-sm text-coolGray">
                  {BIO_DATA.academyExperience}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Bio;