import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface Poster {
  id: number;
  url: string;
  title: string;
  category: string;
}

const posters: Poster[] = [
  {
    id: 1,
    url: '/posters/poster_ssc.png',
    title: 'SSC & Banking Special',
    category: 'Competitive Exams'
  },
  {
    id: 2,
    url: '/posters/poster_spoken.png',
    title: 'English Spoken Classes',
    category: 'Language Skills'
  },
  {
    id: 3,
    url: '/posters/poster_class10.png',
    title: 'Class 10th MP Board',
    category: 'School Education'
  }
];

export const PosterGallery: React.FC = () => {
  const whatsappUrl = `https://wa.me/918602306316?text=${encodeURIComponent("Hello! I am interested in enrolling for one of your courses. Please guide me with the process.")}`;

  return (
    <section id="poster-gallery" className="py-24 bg-brand-navy relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange opacity-5 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange opacity-5 rounded-full blur-[120px] -ml-48 -mb-48" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Explore Our <span className="text-brand-orange">Courses</span>
            </h2>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full mb-6" />
            <p className="text-slate-300 text-xl italic font-medium">
              “Coaching नहीं, <span className="text-brand-orange">Confidence</span> बनाते हैं!”
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posters.map((poster, index) => (
            <motion.div
              key={poster.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-white/5 rounded-[2rem] p-4 border border-white/10 hover:border-brand-orange/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(242,125,38,0.15)] group-hover:-translate-y-2">
                {/* Image Container with 4:5 Aspect Ratio */}
                <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-slate-900 shadow-inner">
                  <motion.img
                    src={poster.url}
                    alt={poster.title}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    className="w-full h-full object-contain p-2"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                      {poster.category}
                    </span>
                  </div>
                </div>

                <div className="mt-6 px-2 pb-2">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-orange transition-colors">
                    {poster.title}
                  </h3>
                  
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-sm font-bold group/btn"
                  >
                    Enroll Now
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-slate-400 text-sm mb-6 uppercase tracking-[0.2em] font-bold">
            Admission Focus • Results Oriented • Proven Strategy
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="text-white font-medium flex items-center gap-2">
              For manual inquiries: <span className="text-brand-orange">+91 8602306316</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
