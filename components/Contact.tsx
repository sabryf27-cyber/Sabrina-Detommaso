import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { BIO_DATA } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-[#020617] border-t border-slate-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-12">Contatti</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            
            {/* Phone */}
            <div className="flex flex-col items-center gap-3 group">
                <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-full text-techGreen group-hover:bg-techGreen group-hover:text-deepBlue transition-all duration-300">
                    <Phone size={28} />
                </div>
                <h3 className="text-white font-semibold">Telefono</h3>
                <p className="text-coolGray">{BIO_DATA.phone}</p>
            </div>

             {/* Email */}
             <a href={`mailto:${BIO_DATA.email}`} className="flex flex-col items-center gap-3 group hover:opacity-100">
                <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-full text-techGreen group-hover:bg-techGreen group-hover:text-deepBlue transition-all duration-300">
                    <Mail size={28} />
                </div>
                <h3 className="text-white font-semibold">Email</h3>
                <p className="text-coolGray group-hover:text-techGreen transition-colors">{BIO_DATA.email}</p>
            </a>

            {/* LinkedIn */}
             <a href={BIO_DATA.linkedInUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group hover:opacity-100">
                <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-full text-techGreen group-hover:bg-techGreen group-hover:text-deepBlue transition-all duration-300">
                    <Linkedin size={28} />
                </div>
                <h3 className="text-white font-semibold">LinkedIn</h3>
                <p className="text-coolGray group-hover:text-techGreen transition-colors">Visualizza Profilo</p>
            </a>

        </div>
      </div>
    </section>
  );
};

export default Contact;