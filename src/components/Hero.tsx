import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, GraduationCap, Users } from 'lucide-react';

interface HeroProps {
  onScrollToCourses: () => void;
  onScrollToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCourses, onScrollToContact }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-navy rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-sm font-bold mb-6">
            <GraduationCap size={16} />
            <span>EXCELLENCE IN EDUCATION</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-brand-navy mb-6 leading-[1.1] uppercase">
            Coaching nhi <br />
            <span className="text-brand-orange">Confidence</span> <br />
            Banate hain
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed text-balance">
            Welcome to ANAY SCHOLASTIC INSTITUTE, where we nurture talent and guide students towards academic mastery and professional success. Join our community of high achievers today.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onScrollToCourses}
              className="px-8 py-4 bg-brand-orange text-white font-bold rounded-2xl hover:bg-brand-orange/90 transition-all shadow-lg shadow-brand-orange/20 flex items-center gap-2 group"
            >
              <span>Explore Courses</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onScrollToContact}
              className="px-8 py-4 bg-brand-navy text-white font-bold rounded-2xl hover:bg-brand-navy/90 transition-colors shadow-lg shadow-brand-navy/20"
            >
              Contact Us
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8">
  <div>
    <div className="text-3xl font-bold text-brand-navy">500+</div>
    <div className="text-slate-500 text-sm">Students</div>
  </div>

  <div>
    <div className="text-3xl font-bold text-brand-navy">10+</div>
    <div className="text-slate-500 text-sm">Years Experience</div>
  </div>

  <div>
    <div className="text-3xl font-bold text-brand-navy">95%</div>
    <div className="text-slate-500 text-sm">Success Rate</div>
  </div>
</div>
</motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600" 
              alt="Students Studying"
              className="w-full aspect-[4/3] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
                <div>
                  <div className="font-bold">Next Batch Starts Soon</div>
                  <div className="text-xs opacity-80">Registration Open for Summer 2024</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-orange/20 rounded-2xl -rotate-12 z-0" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-navy/10 rounded-full z-0" />
        </motion.div>
      </div>
    </section>
  );
};
