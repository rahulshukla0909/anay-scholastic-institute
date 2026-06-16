import React from 'react';
import { motion } from 'motion/react';
import { Award, Briefcase, GraduationCap, Users, Heart, Star } from 'lucide-react';

export const Founder: React.FC = () => {
  return (
    <section id="founder-section" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-brand-navy mb-4">Meet Our Foundfer</h2>
          <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full mb-4" />
          <p className="text-slate-600 max-w-2xl mx-auto">The visionary behind Anay Scholastic Institute, dedicated to transforming educational landscapes.</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-orange/10 rounded-[3rem] -rotate-3" />
              <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden group">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src="/images/founder.jpg" 
                    alt="Rahul Shukla" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-3xl font-bold mb-1">Rahul Shukla</h3>
                    <p className="text-brand-orange font-medium">Founder & Director</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">Educator</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">Mentor</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">Entrepreneur</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange shrink-0">
                        <GraduationCap size={20} />
                      </div>
                      <p className="text-sm">Qualified SBI, IBPS & LIC Exams</p>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-10 h-10 bg-brand-navy/5 rounded-xl flex items-center justify-center text-brand-navy shrink-0">
                        <Users size={20} />
                      </div>
                      <p className="text-sm">Trained 500+ Students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Journey & Bio */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-brand-navy mb-6">A Journey of Excellence</h3>
              <div className="prose prose-lg text-slate-600 max-w-none space-y-4">
                <p>
                  A passionate educator, mentor, and lifelong learner, <strong>Rahul Shukla</strong> has built his journey through dedication, discipline, and continuous growth. He has successfully qualified multiple prestigious competitive examinations, including <strong>SBI, IBPS, and LIC</strong>, showcasing his strong command over aptitude, reasoning, and banking concepts.
                </p>
                <p>
                  Rahul Sir has worked as an English Teacher at Modern English School, Bhopal, where he helped students strengthen their communication skills and confidence. He also gained corporate experience as a Junior Data Scientist at AD3 Infotech, Kochi, blending analytical thinking with modern technology and problem-solving skills.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-brand-orange transition-colors">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-orange mb-4 group-hover:bg-brand-orange group-hover:text-white transition-all">
                  <Briefcase size={24} />
                </div>
                <h4 className="font-bold text-brand-navy mb-2">Corporate Expertise</h4>
                <p className="text-sm text-slate-500">Junior Data Scientist at AD3 Infotech & Professional training from Coding Ninjas.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-brand-navy transition-colors">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-navy mb-4 group-hover:bg-brand-navy group-hover:text-white transition-all">
                  <Star size={24} />
                </div>
                <h4 className="font-bold text-brand-navy mb-2">Technical Foundation</h4>
                <p className="text-sm text-slate-500">Strong foundations in programming, logical thinking & problem solving.</p>
              </div>
            </div>

            <div className="prose prose-lg text-slate-600 max-w-none space-y-4">
              <p>
                With a deep passion for teaching and personality development, Rahul Shukla has successfully trained <strong>500+ students</strong> in spoken English, communication, and confidence building, helping many students transform their personalities and career opportunities.
              </p>
              <div className="bg-brand-orange/5 p-6 rounded-2xl border-l-4 border-brand-orange">
                <p className="text-brand-navy font-semibold italic text-lg">
                  "Driven by a vision to provide quality education with personal mentorship, he established his own coaching institute, ANAY SCHOLASTIC INSTITUTE, in 2023."
                </p>
              </div>
              <p>
                Since then, the institute has been committed to guiding students for banking exams, spoken English, and overall career development with a practical and student-focused approach.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
