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
  { id: 'class6', label: 'Class 6th' },
  { id: 'class7', label: 'Class 7th' },
  { id: 'class8', label: 'Class 8th' },
  { id: 'class9', label: 'Class 9th' },
  { id: 'class10', label: 'Class 10th' },
  { id: 'banking', label: 'Banking' },
  { id: 'ssc', label: 'SSC' },
];

const students: ResultCardProps[] = [
  
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

        {/* Results Table */}
        <div className="overflow-hidden bg-white rounded-[2rem] shadow-xl border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider">Student Name</th>
                  <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider">Achievement / Exam</th>
                  <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-right">Session / Date</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-50 hover:bg-brand-orange/5 transition-colors group"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold text-xs">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-brand-navy group-hover:text-brand-orange transition-colors">{student.name}</div>
                              {student.quote && (
                                <div className="text-[10px] text-slate-400 italic mt-0.5 max-w-xs line-clamp-1">
                                  "{student.quote}"
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-200">
                            {student.exam}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-sm font-semibold text-slate-500">
                            {student.year}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-24 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <TrendingUp size={48} className="mb-4 opacity-20" />
                          <h3 className="text-xl font-bold text-slate-600">Coming Soon!</h3>
                          <p className="text-sm">We are currently updating our latest achievers for this category.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
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

