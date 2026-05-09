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
    id: 1,
    name: "Vikram Singh",
    exam: "SBI PO Selection",
    year: "2023",
    category: "banking",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
    quote: "Rahul Sir's guidance was the key to my success in bank exams."
  },
  {
    id: 2,
    name: "Priya Sharma",
    exam: "SSC CGL (Tax Assistant)",
    year: "2024",
    category: "ssc",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    quote: "The grammar techniques taught here are unmatched. Highly recommended!"
  },
  {
    id: 3,
    name: "Anand Verma",
    exam: "IBPS Clerk Selected",
    year: "2023",
    category: "banking",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    quote: "Foundation classes helped me clear my basics in record time."
  },
  {
    id: 4,
    name: "Sandeep Kumar",
    exam: "SSC CHSL",
    year: "2023",
    category: "ssc",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    quote: "Best institute in Tikamgarh for SSC preparation."
  },
  {
    id: 5,
    name: "Rahul Mehra",
    exam: "95% in Class 10th",
    year: "2024",
    category: "class10",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    quote: "Individual attention to each subject made the difference."
  },
  {
    id: 6,
    name: "Neha Gupta",
    exam: "92% in Class 9th",
    year: "2024",
    category: "class9",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    quote: "Science and Math are my favorites now thanks to Rahul Sir."
  },
  {
    id: 7,
    name: "Aditya Jain",
    exam: "Topper Class 8th",
    year: "2023",
    category: "class8",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    quote: "Learning here is fun and very effective."
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

        {/* Results Grid with Animation */}
        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <motion.div
                  key={student.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative group h-[450px] rounded-3xl overflow-hidden shadow-lg"
                >
                  <img 
                    src={student.image} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={student.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
                  
                  <div className="absolute bottom-0 p-8 w-full transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="text-brand-orange fill-brand-orange" size={16} />
                      <Star className="text-brand-orange fill-brand-orange" size={16} />
                      <Star className="text-brand-orange fill-brand-orange" size={16} />
                      <Star className="text-brand-orange fill-brand-orange" size={16} />
                      <Star className="text-brand-orange fill-brand-orange" size={16} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{student.name}</h3>
                    <p className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-4">{student.exam} - {student.year}</p>
                    {student.quote && (
                      <p className="text-white/80 text-sm italic line-clamp-3">
                        "{student.quote}"
                      </p>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-200"
              >
                <div className="text-slate-400 mb-2">
                  <TrendingUp size={48} className="mx-auto opacity-20" />
                </div>
                <h3 className="text-xl font-bold text-slate-600">Coming Soon!</h3>
                <p className="text-slate-400">We are currently updating our latest achievers for this category.</p>
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

