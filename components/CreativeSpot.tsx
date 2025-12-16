import React from 'react';
import { CREATIVE_SPOT } from '../constants';
import { Video, Brain, Image, Mic, Sparkles, Play } from 'lucide-react';

const icons = {
  Brain: Brain,
  Image: Image,
  Mic: Mic,
  Video: Video
};

const CreativeSpot: React.FC = () => {
  return (
    <section className="py-20 bg-deepBlue relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="text-purple-400" size={28} />
          <h2 className="text-3xl font-bold text-white">AI Creative Studio</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Video Player Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-techGreen rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl aspect-video">
              <video 
                className="w-full h-full object-cover"
                controls
                poster={CREATIVE_SPOT.coverUrl}
              >
                <source src={CREATIVE_SPOT.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Overlay hint if needed, though standard controls handle it */}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{CREATIVE_SPOT.title}</h3>
            <p className="text-pearlGray mb-8 leading-relaxed border-l-4 border-purple-500 pl-4">
              {CREATIVE_SPOT.description}
            </p>

            <div className="space-y-6">
              {CREATIVE_SPOT.steps.map((step, idx) => {
                const IconComponent = icons[step.icon as keyof typeof icons] || Sparkles;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400 border border-slate-700">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">{step.label}</h4>
                      <p className="text-coolGray text-sm">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {CREATIVE_SPOT.tools.map((tool, i) => (
                <span key={i} className="px-3 py-1 bg-purple-900/30 text-purple-300 border border-purple-800/50 rounded-full text-xs font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CreativeSpot;