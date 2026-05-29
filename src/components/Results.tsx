import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, CheckCircle, Star, TrendingUp, Users } from 'lucide-react';

interface ResultCardProps {
  id: number;
  name: string;
  exam: string;
  year: string;
  image: string;
  category: string;
  quote?: string;
}

const categories = [
  { id: 'all', label: 'All Results' },
  { id: 'banking', label: 'Banking Selections' },
  { id: 'ssc', label: 'SSC Selections' },
  { id: 'class10', label: 'Class 10th' },
];

const students: ResultCardProps[] = [
  {
    id: 1,
    name: "Shubham Pathak",
    exam: "SBI PO / IBPS PO Selection",
    year: "Batch of 2024",
    category: "banking",
    image: "/images/SHUBHAM-PO.jpg",
    quote: "Highly competent guides and superb test material helped me qualify SBI PO."
  },
  {
    id: 2,
    name: "Rahul Shukla",
    exam: "QUALIFIED SBI, IBPS, LIC",
    year: "Director Selection",
    category: "banking",
    image: "/images/rahul_shukla.png",
    quote: "With proper dedication and confidence, any competitive exam can be cleared."
  },
  {
    id: 3,
    name: "Anjali Sharma",
    exam: "SSC CGL Selection",
    year: "Batch of 2024",
    category: "ssc",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    quote: "Consistent test papers and guidance was key to my SSC selection."
  },
  {
    id: 4,
    name: "Manish Bundela",
    exam: "SSC CHSL Qualified",
    year: "Batch of 2024",
    category: "ssc",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 8,
    name: "Naitik Khare",
    exam: "Class 10th (8/16)",
    year: "May 10, 2026",
    category: "class10",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 9,
    name: "Gauri Soni",
    exam: "Class 10th (13.5/16)",
    year: "May 10, 2026",
    category: "class10",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 10,
    name: "Yash Pateriya",
    exam: "Class 10th (15.5/16)",
    year: "May 10, 2026",
    category: "class10",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 11,
    name: "Yuvraj khare",
    exam: "Class 10th (15/16)",
    year: "May 10, 2026",
    category: "class10",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 12,
    name: "Ayush Pathak",
    exam: "Class 10th (15/16)",
    year: "May 10, 2026",
    category: "class10",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 13,
    name: "Paras Rai",
    exam: "Class 10th (13/16)",
    year: "May 10, 2026",
    category: "class10",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 14,
    name: "Ayushii Sen",
    exam: "Class 10th (9/16)",
    year: "May 10, 2026",
    category: "class10",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 15,
    name: "Nandini",
    exam: "Class 10th (7/16)",
    year: "May 10, 2026",
    category: "class10",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 16,
    name: "Paras Chautvedi",
    exam: "Class 10th (12.5/16)",
    year: "May 10, 2026",
    category: "class10",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  }
];

const stats = [
  { icon: <Trophy className="text-brand-orange" />, label: "Exam Selections", value: "150+" },
  { icon: <Users className="text-brand-navy" />, label: "Students Trained", value: "1000+" },
  { icon: <CheckCircle className="text-brand-orange" />, label: "Success Rate", value: "92%" },
  { icon: <TrendingUp className="text-brand-navy" />, label: "Batches Completed", value: "45+" },
];

export const Results: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredStudents = activeCategory === 'all' 
    ? students 
    : students.filter(s => s.category === activeCategory);

  return (
    <section id="results" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-bold tracking-wider uppercase mb-4">
            Our Hall of Fame
          </span>
          <h2 className="text-4xl font-bold text-brand-navy mb-4">Success Stories</h2>
          <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto">
            Witness the transformation of our students from aspirants to successful professionals. Your results are our biggest achievement.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-brand-orange/10 flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-brand-orange/10 transition-colors">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-brand-navy mb-1">{stat.value}</h3>
              <p className="text-slate-500 font-medium text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filtering Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat.id 
                  ? 'bg-brand-navy text-white shadow-lg' 
                  : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Card Grid */}
        <div className="relative">
          <AnimatePresence mode="popLayout">
            {filteredStudents.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                {filteredStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 hover:border-brand-orange/20 transition-all duration-300 group flex flex-col h-full"
                  >
                    {/* Student Photo Container */}
                    <div className="relative h-64 overflow-hidden bg-slate-50 shrink-0 select-none">
                      {student.image ? (
                        <img 
                          src={student.image} 
                          alt={student.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-brand-navy/5 text-brand-navy font-bold text-3xl">
                          {student.name.charAt(0)}
                        </div>
                      )}
                      {/* Category Badge overlay */}
                      <span className="absolute top-4 right-4 bg-brand-navy/90 backdrop-blur-sm text-white text-[10px] uppercase font-black tracking-widest px-3.5 py-1.5 rounded-full shadow-md border border-white/10">
                        {student.category === 'banking' ? 'Banking' : student.category === 'ssc' ? 'SSC' : 'Class 10th'}
                      </span>
                    </div>

                    {/* Detailed Information Box */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="text-xl font-extrabold text-brand-navy group-hover:text-brand-orange transition-colors mb-1.5">
                          {student.name}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-orange/20">
                          {student.exam}
                        </span>
                        
                        {student.quote && (
                          <p className="text-slate-600 font-medium text-xs leading-relaxed italic bg-slate-50 p-4 rounded-2xl border border-slate-100 relative mt-2">
                            "{student.quote}"
                          </p>
                        )}
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-black tracking-wider text-slate-400 uppercase">
                        <span>Session/Date</span>
                        <span className="text-brand-navy font-bold">{student.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center bg-white rounded-[2rem] border border-slate-100 shadow-md"
              >
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <TrendingUp size={48} className="mb-4 opacity-20 text-brand-orange animate-pulse" />
                  <h3 className="text-xl font-bold text-slate-600">Coming Soon!</h3>
                  <p className="text-sm px-4">We are currently updating our latest achievers for this category.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 p-4 bg-brand-navy text-white rounded-2xl shadow-xl">
             <Trophy size={20} className="text-brand-orange" />
             <span className="font-semibold">Join the list of achievers today!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

