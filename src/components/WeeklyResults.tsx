import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Award, 
  Trophy, 
  TrendingUp, 
  Printer, 
  CheckCircle, 
  AlertCircle, 
  Star, 
  Crown, 
  ChevronRight, 
  X,
  FileCheck,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SubjectScore {
  score: string; // e.g., "34/45" or "Absent"
  numericScore: number | null;
  maxScore: number;
}

interface StudentResult {
  id: string;
  name: string;
  math: SubjectScore;
  science: SubjectScore;
  hindi: SubjectScore;
  english: SubjectScore;
  socialScience: SubjectScore;
  total: number;
  percentage: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'Incomplete';
  remark: string;
  rank: number;
}

const RESULTS_DATA: StudentResult[] = [
  {
    id: '1',
    name: 'Ayush',
    math: { score: '45/45', numericScore: 45, maxScore: 45 },
    science: { score: '42.5/45', numericScore: 42.5, maxScore: 45 },
    hindi: { score: '23/24', numericScore: 23, maxScore: 24 },
    english: { score: '40/42', numericScore: 40, maxScore: 42 },
    socialScience: { score: '43/45', numericScore: 43, maxScore: 45 },
    total: 193.5,
    percentage: 96.27,
    grade: 'A+',
    remark: 'Excellent! Keep it up.',
    rank: 1
  },
  {
    id: '2',
    name: 'Dev',
    math: { score: '43.5/45', numericScore: 43.5, maxScore: 45 },
    science: { score: '43/45', numericScore: 43, maxScore: 45 },
    hindi: { score: '23.5/24', numericScore: 23.5, maxScore: 24 },
    english: { score: '39/42', numericScore: 39, maxScore: 42 },
    socialScience: { score: '43/45', numericScore: 43, maxScore: 45 },
    total: 192,
    percentage: 95.52,
    grade: 'A+',
    remark: 'Excellent! Keep it up.',
    rank: 2
  },
  {
    id: '3',
    name: 'Yash',
    math: { score: '44/45', numericScore: 44, maxScore: 45 },
    science: { score: '44/45', numericScore: 44, maxScore: 45 },
    hindi: { score: '22/24', numericScore: 22, maxScore: 24 },
    english: { score: '37/42', numericScore: 37, maxScore: 42 },
    socialScience: { score: '41/45', numericScore: 41, maxScore: 45 },
    total: 188,
    percentage: 93.53,
    grade: 'A+',
    remark: 'Excellent! Keep it up.',
    rank: 3
  },
  {
    id: '4',
    name: 'Gauri',
    math: { score: '36/45', numericScore: 36, maxScore: 45 },
    science: { score: '43/45', numericScore: 43, maxScore: 45 },
    hindi: { score: '17/24', numericScore: 17, maxScore: 24 },
    english: { score: '40/42', numericScore: 40, maxScore: 42 },
    socialScience: { score: '42/45', numericScore: 42, maxScore: 45 },
    total: 178,
    percentage: 88.56,
    grade: 'A',
    remark: 'Very good. A little more practice.',
    rank: 4
  },
  {
    id: '5',
    name: 'Kratika',
    math: { score: '35/45', numericScore: 35, maxScore: 45 },
    science: { score: '31/45', numericScore: 31, maxScore: 45 },
    hindi: { score: '21/24', numericScore: 21, maxScore: 24 },
    english: { score: '34/42', numericScore: 34, maxScore: 42 },
    socialScience: { score: '38/45', numericScore: 38, maxScore: 45 },
    total: 159,
    percentage: 79.10,
    grade: 'B+',
    remark: 'Very good. A little more practice.',
    rank: 5
  },
  {
    id: '6',
    name: 'Naitik',
    math: { score: '20/45', numericScore: 20, maxScore: 45 },
    science: { score: '23/45', numericScore: 23, maxScore: 45 },
    hindi: { score: '7/24', numericScore: 7, maxScore: 24 },
    english: { score: '29/42', numericScore: 29, maxScore: 42 },
    socialScience: { score: '23/45', numericScore: 23, maxScore: 45 },
    total: 102,
    percentage: 50.75,
    grade: 'C',
    remark: 'Needs more practice in weak subjects.',
    rank: 6
  },
  {
    id: '7',
    name: 'Nandini',
    math: { score: '24/45', numericScore: 24, maxScore: 45 },
    science: { score: '26/45', numericScore: 26, maxScore: 45 },
    hindi: { score: '11/24', numericScore: 11, maxScore: 24 },
    english: { score: '14/42', numericScore: 14, maxScore: 42 },
    socialScience: { score: '16/45', numericScore: 16, maxScore: 45 },
    total: 91,
    percentage: 45.27,
    grade: 'D',
    remark: 'Needs a lot of hard work and daily study.',
    rank: 7
  },
  {
    id: '8',
    name: 'Paras Rai',
    math: { score: '34/45', numericScore: 34, maxScore: 45 },
    science: { score: '28/45', numericScore: 28, maxScore: 45 },
    hindi: { score: '8/24', numericScore: 8, maxScore: 24 },
    english: { score: 'Absent', numericScore: null, maxScore: 42 },
    socialScience: { score: '18/45', numericScore: 18, maxScore: 45 },
    total: 88,
    percentage: 55.35,
    grade: 'Incomplete',
    remark: 'Absent in one or more subjects. Re-test required.',
    rank: 8
  },
  {
    id: '9',
    name: 'Paras Chat',
    math: { score: '27.5/45', numericScore: 27.5, maxScore: 45 },
    science: { score: '38.5/45', numericScore: 38.5, maxScore: 45 },
    hindi: { score: '22/25', numericScore: 22, maxScore: 25 },
    english: { score: 'Absent', numericScore: null, maxScore: 42 },
    socialScience: { score: 'Absent', numericScore: null, maxScore: 45 },
    total: 88,
    percentage: 76.52,
    grade: 'Incomplete',
    remark: 'Absent in one or more subjects. Re-test required.',
    rank: 9
  }
];

export const WeeklyResults: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);
  const [filterGrade, setFilterGrade] = useState<string>('all');

  // Filter students
  const filteredStudents = useMemo(() => {
    return RESULTS_DATA.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade = filterGrade === 'all' || student.grade === filterGrade;
      return matchesSearch && matchesGrade;
    });
  }, [searchTerm, filterGrade]);

  // Podium Students (Rank 1, 2, 3)
  const podiumStudents = useMemo(() => {
    const sorted = [...RESULTS_DATA].sort((a, b) => b.total - a.total);
    return {
      first: sorted[0],
      second: sorted[1],
      third: sorted[2],
    };
  }, []);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'A': return 'bg-teal-500/10 text-teal-600 border-teal-500/20';
      case 'B+': return 'bg-sky-500/10 text-sky-600 border-sky-500/20';
      case 'B': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'C': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'D': return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const handlePrint = (student: StudentResult) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${student.name} - Report Card</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Inter', sans-serif;
              color: #0c1a30;
              margin: 40px;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              border-bottom: 4px double #F59B1E;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 28px;
              font-weight: 800;
              color: #002D42;
              letter-spacing: -1px;
            }
            .subtitle {
              color: #F59B1E;
              font-weight: 600;
              text-transform: uppercase;
              font-size: 14px;
              letter-spacing: 2px;
              margin-top: 5px;
            }
            .report-title {
              font-size: 22px;
              font-weight: 800;
              margin: 30px 0 10px 0;
              text-align: center;
              text-transform: uppercase;
            }
            .student-info {
              display: flex;
              justify-content: space-between;
              background: #f8fafc;
              padding: 15px 20px;
              border-radius: 12px;
              margin-bottom: 30px;
              border: 1px solid #e2e8f0;
            }
            .student-info div {
              font-size: 15px;
            }
            .student-info strong {
              color: #002D42;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 35px;
            }
            th, td {
              border: 1px solid #e2e8f0;
              padding: 12px 15px;
              text-align: center;
            }
            th {
              background: #002D42;
              color: white;
              font-weight: 600;
            }
            tr:nth-child(even) {
              background: #f8fafc;
            }
            .summary-box {
              display: flex;
              justify-content: space-around;
              margin-bottom: 40px;
              gap: 20px;
            }
            .card {
              flex: 1;
              background: #fff;
              border: 2px solid #e2e8f0;
              border-radius: 12px;
              padding: 15px;
              text-align: center;
            }
            .card h4 {
              margin: 0 0 5px 0;
              color: #64748b;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .card p {
              margin: 0;
              font-size: 22px;
              font-weight: 800;
              color: #002D42;
            }
            .remark-box {
              background: #f0fdf4;
              border: 1px solid #bbf7d0;
              padding: 15px;
              border-radius: 12px;
              margin-bottom: 40px;
              color: #166534;
              font-weight: 600;
            }
            .footer {
              margin-top: 80px;
              display: flex;
              justify-content: space-between;
              font-size: 14px;
            }
            .signature {
              border-top: 1px solid #cbd5e1;
              width: 200px;
              text-align: center;
              padding-top: 8px;
              font-weight: 600;
              color: #64748b;
            }
            @media print {
              body { margin: 20px; }
              button { display: none; }
            }
          </style>
        </head>
        <body onload="window.print()">
          <div class="header">
            <div class="logo">ANAY SCHOLASTIC INSTITUTE</div>
            <div class="subtitle">Pathway to conceptual excellence</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 6px;">Plot No. 12, Zone-II, Maharana Pratap Nagar, Bhopal</div>
          </div>

          <div class="report-title">Student Weekly Test Performance Report</div>

          <div class="student-info">
            <div>Student Name: <strong>${student.name}</strong></div>
            <div>Class: <strong>10th Standard</strong></div>
            <div>Test Type: <strong>Comprehensive Test (Bilingual)</strong></div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Marks Obtained</th>
                <th>Maximum Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mathematics (गणित)</td>
                <td><strong>${student.math.score}</strong></td>
                <td>45</td>
              </tr>
              <tr>
                <td>Science (विज्ञान)</td>
                <td><strong>${student.science.score}</strong></td>
                <td>45</td>
              </tr>
              <tr>
                <td>Hindi (हिंदी)</td>
                <td><strong>${student.hindi.score}</strong></td>
                <td>${student.hindi.maxScore}</td>
              </tr>
              <tr>
                <td>English (अंग्रेज़ी)</td>
                <td><strong>${student.english.score}</strong></td>
                <td>42</td>
              </tr>
              <tr>
                <td>Social Science (सामाजिक विज्ञान)</td>
                <td><strong>${student.socialScience.score}</strong></td>
                <td>45</td>
              </tr>
            </tbody>
          </table>

          <div class="summary-box">
            <div class="card" style="border-top: 4px solid #F59B1E;">
              <h4>Grand Total</h4>
              <p>${student.total} Marks</p>
            </div>
            <div class="card" style="border-top: 4px solid #002D42;">
              <h4>Percentage</h4>
              <p>${student.percentage}%</p>
            </div>
            <div class="card" style="border-top: 4px solid #10b981;">
              <h4>Final Grade</h4>
              <p>${student.grade}</p>
            </div>
          </div>

          <div class="remark-box">
            <strong>Teacher's Remark:</strong> ${student.remark}
          </div>

          <div class="footer">
            <div class="signature">Class Teacher Signature</div>
            <div class="signature">Director Signature</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <section id="student-results" className="py-24 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-12 left-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-0 w-96 h-96 bg-brand-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange text-xs font-black tracking-widest uppercase rounded-full mb-4 border border-brand-orange/20"
          >
            <TrendingUp size={14} />
            <span>Latest Performance Board / परीक्षा परिणाम</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-brand-navy mb-4 tracking-tight"
          >
            STUDENT TEST <span className="text-brand-orange">RESULTS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto font-bold text-base leading-relaxed"
          >
            Our students consistently demonstrate conceptual clarity and academic rigors. Check out the latest weekly comprehensive test scores below!
          </motion.p>
        </div>

        {/* Podium/Top Performers Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 items-end max-w-5xl mx-auto">
          {/* 2nd Rank */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative order-2 md:order-1 text-center flex flex-col items-center group hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg border border-slate-200">
              🥈
            </div>
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center font-extrabold text-2xl text-slate-700 shadow-inner mb-4 mt-2">
              D
            </div>
            <h3 className="text-2xl font-black text-brand-navy mb-1">{podiumStudents.second.name}</h3>
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Rank 2 / द्वितीय स्थान</span>
            <div className="mt-4 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-sm font-black text-brand-navy">
              {podiumStudents.second.total} / 201 Marks
            </div>
            <div className="mt-2 text-brand-orange font-extrabold text-lg">
              {podiumStudents.second.percentage}%
            </div>
            <p className="text-xs text-slate-400 italic mt-3 font-bold">"{podiumStudents.second.remark}"</p>
          </motion.div>

          {/* 1st Rank */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-b from-brand-navy to-slate-900 text-white rounded-3xl p-10 border border-brand-orange/30 shadow-2xl relative order-1 md:order-2 text-center flex flex-col items-center group hover:shadow-brand-orange/10 transition-all hover:-translate-y-2 transform md:scale-105"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-orange text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl shadow-brand-orange/40">
              <Crown className="text-white animate-bounce" size={28} />
            </div>
            <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-full flex items-center justify-center font-black text-3xl text-brand-orange shadow-inner mb-4 mt-2">
              A
            </div>
            <h3 className="text-3xl font-black mb-1">{podiumStudents.first.name}</h3>
            <span className="text-xs font-black uppercase text-brand-orange tracking-widest flex items-center gap-1.5">
              <Star size={14} fill="currentColor" /> Rank 1 / प्रथम स्थान <Star size={14} fill="currentColor" />
            </span>
            <div className="mt-4 bg-white/10 border border-white/10 px-5 py-2 rounded-xl text-base font-black text-white">
              {podiumStudents.first.total} / 201 Marks
            </div>
            <div className="mt-2 text-brand-orange font-extrabold text-2xl animate-pulse">
              {podiumStudents.first.percentage}%
            </div>
            <p className="text-xs text-slate-300 italic mt-3 font-bold">"{podiumStudents.first.remark}"</p>
          </motion.div>

          {/* 3rd Rank */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative order-3 text-center flex flex-col items-center group hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg border border-amber-200">
              🥉
            </div>
            <div className="w-16 h-16 bg-amber-50/50 border border-amber-100 rounded-full flex items-center justify-center font-extrabold text-2xl text-amber-700 shadow-inner mb-4 mt-2">
              Y
            </div>
            <h3 className="text-2xl font-black text-brand-navy mb-1">{podiumStudents.third.name}</h3>
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Rank 3 / तृतीय स्थान</span>
            <div className="mt-4 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-sm font-black text-brand-navy">
              {podiumStudents.third.total} / 201 Marks
            </div>
            <div className="mt-2 text-brand-orange font-extrabold text-lg">
              {podiumStudents.third.percentage}%
            </div>
            <p className="text-xs text-slate-400 italic mt-3 font-bold">"{podiumStudents.third.remark}"</p>
          </motion.div>
        </div>

        {/* Live Search and Report Card Lookup Widget */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div>
              <h3 className="text-xl font-black text-brand-navy mb-1 flex items-center gap-2">
                <FileCheck className="text-brand-orange" size={22} />
                <span>Verify Your Report Card / अपना रिजल्ट देखें</span>
              </h3>
              <p className="text-sm text-slate-500 font-bold">
                Enter student name to download printable marksheet directly.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Student Name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm text-brand-navy outline-none focus:border-brand-orange transition-all placeholder:text-slate-400"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Quick Match Suggestion Panel */}
          {searchTerm && filteredStudents.length > 0 && (
            <div className="mt-6 border-t border-slate-100 pt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredStudents.map(student => (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-brand-orange/10 rounded-2xl transition-all cursor-pointer border border-slate-100 hover:border-brand-orange/30 group text-left"
                >
                  <span className="font-extrabold text-sm text-brand-navy group-hover:text-brand-navy-light">{student.name}</span>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-brand-orange transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Master Performance Leaderboard Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-7xl mx-auto">
          <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
            <div>
              <h3 className="text-lg md:text-xl font-black text-brand-navy uppercase tracking-tight">Comprehensive Test Merit List</h3>
              <p className="text-xs text-slate-500 font-bold mt-0.5">Bilingual Scoreboard • Class Average: 129.5 Marks</p>
            </div>
            
            {/* Filter by Grade Category */}
            <div className="flex gap-2 w-full sm:w-auto">
              {['all', 'A+', 'A', 'B+', 'C', 'D', 'Incomplete'].map(grade => (
                <button
                  key={grade}
                  onClick={() => setFilterGrade(grade)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    filterGrade === grade 
                      ? 'bg-brand-navy text-white shadow-md' 
                      : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-brand-navy border border-slate-100'
                  }`}
                >
                  {grade === 'all' ? 'All Grades' : grade}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-brand-navy text-white font-sans text-xs uppercase tracking-widest border-b border-slate-100">
                  <th className="py-5 px-6 font-black text-center w-16">Rank</th>
                  <th className="py-5 px-6 font-black">Student Name</th>
                  <th className="py-5 px-4 font-black text-center">Mathematics</th>
                  <th className="py-5 px-4 font-black text-center">Science</th>
                  <th className="py-5 px-4 font-black text-center">Hindi</th>
                  <th className="py-5 px-4 font-black text-center">English</th>
                  <th className="py-5 px-4 font-black text-center">Social Science</th>
                  <th className="py-5 px-6 font-black text-center">Grand Total</th>
                  <th className="py-5 px-6 font-black text-center">Percent</th>
                  <th className="py-5 px-6 font-black text-center">Grade</th>
                  <th className="py-5 px-6 font-black text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, idx) => (
                    <tr 
                      key={student.id} 
                      className={`border-b border-slate-100 hover:bg-slate-50/70 transition-colors group ${
                        student.grade === 'A+' ? 'bg-emerald-50/10' : ''
                      }`}
                    >
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${
                          student.rank === 1 ? 'bg-amber-100 text-amber-700 font-extrabold ring-2 ring-amber-400/30' :
                          student.rank === 2 ? 'bg-slate-200 text-slate-700 font-extrabold' :
                          student.rank === 3 ? 'bg-amber-50 text-amber-800 font-extrabold' :
                          'bg-slate-50 text-slate-500 border border-slate-200'
                        }`}>
                          {student.rank}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <span className="font-extrabold text-brand-navy block text-base group-hover:text-brand-navy-light transition-colors">
                            {student.name}
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-500 font-black px-2 py-0.5 rounded uppercase tracking-wider mt-1 inline-block">
                            Class 10th
                          </span>
                        </div>
                      </td>
                      
                      {/* Subject Marks */}
                      <td className="py-4 px-4 text-center font-bold text-slate-600 text-sm">
                        {student.math.score}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-slate-600 text-sm">
                        {student.science.score}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-slate-600 text-sm">
                        {student.hindi.score}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-slate-600 text-sm">
                        <span className={student.english.score === 'Absent' ? 'text-rose-500 font-black uppercase text-xs' : ''}>
                          {student.english.score}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-slate-600 text-sm">
                        <span className={student.socialScience.score === 'Absent' ? 'text-rose-500 font-black uppercase text-xs' : ''}>
                          {student.socialScience.score}
                        </span>
                      </td>

                      {/* Summary Metrics */}
                      <td className="py-4 px-6 text-center">
                        <span className="font-extrabold text-brand-navy text-sm">
                          {student.total}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="font-extrabold text-brand-orange text-sm">
                          {student.percentage}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-2.5 py-1 text-xs font-black rounded-lg border uppercase tracking-wider ${getGradeColor(student.grade)}`}>
                          {student.grade}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setSelectedStudent(student)}
                            className="p-2 bg-slate-50 hover:bg-slate-100 text-brand-navy rounded-xl border border-slate-100 transition-colors cursor-pointer"
                            title="Quick View Report Card"
                          >
                            <BookOpen size={16} />
                          </button>
                          <button 
                            onClick={() => handlePrint(student)}
                            className="p-2 bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange rounded-xl border border-brand-orange/10 transition-colors cursor-pointer"
                            title="Download/Print Certificate"
                          >
                            <Printer size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="py-12 px-6 text-center text-slate-400 font-bold">
                      No student results match your filters. Please try another search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Report Card Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden relative"
            >
              <button 
                onClick={() => setSelectedStudent(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer z-20"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-10">
                {/* School Header */}
                <div className="text-center border-b-2 border-dashed border-slate-100 pb-6 mb-6">
                  <span className="text-brand-orange font-black text-xs uppercase tracking-widest block mb-1">Weekly Test Evaluation</span>
                  <h3 className="text-2xl font-black text-brand-navy">ANAY SCHOLASTIC INSTITUTE</h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Bhopal • Conceptual Excellence Center</p>
                </div>

                {/* Student Details Info */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">Student Name</span>
                    <span className="font-extrabold text-brand-navy text-lg">{selectedStudent.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">Class / Section</span>
                    <span className="font-extrabold text-brand-navy text-lg">Class 10th Standard</span>
                  </div>
                </div>

                {/* Subject breakdown */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Subject-Wise Performance</h4>
                  
                  {/* Math */}
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="font-bold text-slate-700 text-sm">Mathematics (गणित)</span>
                    <span className="font-black text-brand-navy text-sm">{selectedStudent.math.score}</span>
                  </div>

                  {/* Science */}
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="font-bold text-slate-700 text-sm">Science (विज्ञान)</span>
                    <span className="font-black text-brand-navy text-sm">{selectedStudent.science.score}</span>
                  </div>

                  {/* Hindi */}
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="font-bold text-slate-700 text-sm">Hindi (हिंदी)</span>
                    <span className="font-black text-brand-navy text-sm">{selectedStudent.hindi.score}</span>
                  </div>

                  {/* English */}
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="font-bold text-slate-700 text-sm">English (अंग्रेज़ी)</span>
                    <span className={`font-black text-sm ${selectedStudent.english.score === 'Absent' ? 'text-rose-500' : 'text-brand-navy'}`}>
                      {selectedStudent.english.score}
                    </span>
                  </div>

                  {/* Social Science */}
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="font-bold text-slate-700 text-sm">Social Science (सामाजिक विज्ञान)</span>
                    <span className={`font-black text-sm ${selectedStudent.socialScience.score === 'Absent' ? 'text-rose-500' : 'text-brand-navy'}`}>
                      {selectedStudent.socialScience.score}
                    </span>
                  </div>
                </div>

                {/* Score Summary badges */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl text-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Total Marks</span>
                    <span className="font-black text-brand-navy text-base">{selectedStudent.total}</span>
                  </div>
                  <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl text-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Percentage</span>
                    <span className="font-black text-brand-orange text-base">{selectedStudent.percentage}%</span>
                  </div>
                  <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl text-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Final Grade</span>
                    <span className={`font-black text-base block uppercase ${
                      selectedStudent.grade === 'Incomplete' ? 'text-rose-500' : 'text-emerald-500'
                    }`}>{selectedStudent.grade}</span>
                  </div>
                </div>

                {/* Teachers Remark alert */}
                <div className="p-4 bg-emerald-50/50 border border-emerald-500/20 rounded-2xl flex items-start gap-3 mb-8">
                  <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h5 className="font-black text-xs text-emerald-800 uppercase tracking-wider mb-0.5">Teacher Evaluation Remark</h5>
                    <p className="text-sm font-bold text-emerald-700 leading-relaxed">{selectedStudent.remark}</p>
                  </div>
                </div>

                {/* Actions button */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handlePrint(selectedStudent)}
                    className="flex-1 bg-brand-orange text-white font-black uppercase tracking-widest text-xs py-4 px-6 rounded-2xl shadow-xl shadow-brand-orange/20 hover:bg-brand-orange/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer size={16} />
                    <span>Print Report Card</span>
                  </button>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="flex-1 bg-brand-navy text-white font-black uppercase tracking-widest text-xs py-4 px-6 rounded-2xl hover:bg-brand-navy-light transition-all text-center cursor-pointer"
                  >
                    Close
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
