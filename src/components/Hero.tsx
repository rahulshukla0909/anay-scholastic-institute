import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, GraduationCap, Users } from 'lucide-react';

interface HeroProps {
  onScrollToCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCourses }) => {
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
          <div className="flex items-center gap-6 md:gap-8 flex-wrap">
            <button 
              onClick={onScrollToCourses}
              className="px-8 py-4 bg-brand-orange text-white font-bold rounded-2xl hover:bg-brand-orange/90 transition-all shadow-lg shadow-brand-orange/20 flex items-center gap-2 group h-fit"
            >
              <span>Explore Courses</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Floating 360° Rotating Promo Box repositioned next to the button */}
            <motion.div
              className="cursor-pointer shrink-0"
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
                {/* Continuous 360° Rotating outer gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-orange via-amber-400 to-brand-navy rounded-3xl shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                />
                
                {/* Stable, highly legible inner card content */}
                <div className="absolute inset-[3px] bg-brand-navy rounded-[22px] flex flex-col items-center justify-center p-2.5 text-center z-10 select-none border border-white/10">
                  <span className="text-brand-orange text-[9px] font-black uppercase tracking-widest animate-pulse">Special Offer</span>
                  <span className="text-slate-300 text-[10px] font-black leading-tight mt-1 HindiLabel">क्लास शुरू मात्र</span>
                  <span className="text-white text-[10px] font-bold leading-tight">Class starts at</span>
                  <span className="text-2xl font-black text-white mt-0.5 flex items-center justify-center gap-0.5 tracking-tight font-sans">
                    <span className="text-brand-orange text-lg font-extrabold">₹</span>199<span className="text-brand-orange text-base font-extrabold ml-0.5 animate-pulse">*</span>
                  </span>
                  <span className="text-[8px] text-emerald-400 font-extrabold mt-1 uppercase tracking-widest bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                    Admission Open
                  </span>
                </div>
              </div>
            </motion.div>
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
              src="images/home.png" 
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
                  <div className="font-bold"></div>
                  <div className="text-xs opacity-80">Registration Open</div>
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