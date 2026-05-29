import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  BookOpen, 
  FileText, 
  ClipboardList, 
  Search, 
  ArrowRight, 
  Book, 
  Layers, 
  CheckCircle, 
  ChevronRight, 
  ExternalLink,
  Sparkles,
  Award
} from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
}

export const Downloads: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'ncert' | 'test-series' | 'notes' | 'pyq'>('all');
  const [pyqBoard, setPyqBoard] = useState<'cbse' | 'mp'>('cbse');
  const [searchQuery, setSearchQuery] = useState('');

  // NCERT Class 10th & 9th Books
  const ncertBooks: ResourceItem[] = [
    {
      id: 'ncert-math-10',
      title: 'Mathematics Textbook (Full Book)',
      subject: 'Mathematics',
      classLevel: 'Class 10th',
      fileSize: '15.4 MB',
      fileType: 'PDF',
      downloadUrl: 'https://ncert.nic.in/textbook.php?jess1=0-15'
    },
    {
      id: 'ncert-sci-10',
      title: 'Science Textbook (Full Book)',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '18.2 MB',
      fileType: 'PDF',
      downloadUrl: 'https://ncert.nic.in/textbook.php?jess2=0-13'
    },
    {
      id: 'ncert-sst-history-10',
      title: 'India & Contemporary World II (History)',
      subject: 'Social Science',
      classLevel: 'Class 10th',
      fileSize: '12.1 MB',
      fileType: 'PDF',
      downloadUrl: 'https://ncert.nic.in/textbook.php?jess3=0-5'
    },
    {
      id: 'ncert-english-10',
      title: 'First Flight (English Textbook)',
      subject: 'English',
      classLevel: 'Class 10th',
      fileSize: '8.5 MB',
      fileType: 'PDF',
      downloadUrl: 'https://ncert.nic.in/textbook.php?jeff1=0-11'
    },
    {
      id: 'ncert-math-9',
      title: 'Mathematics Textbook (Class 9th)',
      subject: 'Mathematics',
      classLevel: 'Class 9th',
      fileSize: '14.1 MB',
      fileType: 'PDF',
      downloadUrl: 'https://ncert.nic.in/textbook.php?iemh1=0-12'
    },
    {
      id: 'ncert-sci-9',
      title: 'Science Textbook (Class 9th)',
      subject: 'Science',
      classLevel: 'Class 9th',
      fileSize: '16.5 MB',
      fileType: 'PDF',
      downloadUrl: 'https://ncert.nic.in/textbook.php?iesc1=0-12'
    }
  ];

  // Revision & Chapter Notes
  const revisionNotes: ResourceItem[] = [
    {
      id: 'notes-chem-reactions',
      title: 'Chemical Reactions and Equations Notes',
      subject: 'Chemistry',
      classLevel: 'Class 10th',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173' // Mock URL to trigger viewing or printing
    },
    {
      id: 'notes-quad-eq',
      title: 'Quadratic Equations Formula Guide & Short Notes',
      subject: 'Mathematics',
      classLevel: 'Class 10th',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    },
    {
      id: 'notes-light',
      title: 'Light - Reflection & Refraction Concise Notes',
      subject: 'Physics',
      classLevel: 'Class 10th',
      fileSize: '3.1 MB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    },
    {
      id: 'notes-life-processes',
      title: 'Biological Life Processes Diagram Study Sheet',
      subject: 'Biology',
      classLevel: 'Class 10th',
      fileSize: '4.2 MB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    },
    {
      id: 'notes-real-nums',
      title: 'Real Numbers Chapter Summary Class 10th',
      subject: 'Mathematics',
      classLevel: 'Class 10th',
      fileSize: '1.2 MB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    }
  ];

  // Test Series & Worksheets
  const testSeries: ResourceItem[] = [
    {
      id: 'test-math-mock1',
      title: 'Class 10th Mathematics Full Syllabus Mock Test - I',
      subject: 'Mathematics',
      classLevel: 'Class 10th',
      fileSize: '1.1 MB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    },
    {
      id: 'test-sci-mock1',
      title: 'Class 10th Science Full Syllabus Board Specimen Paper',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '1.5 MB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    },
    {
      id: 'test-math-chapwise',
      title: 'Algebra and Arithmetic Progression Chapter-wise Worksheet',
      subject: 'Mathematics',
      classLevel: 'Class 10th',
      fileSize: '850 KB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    },
    {
      id: 'test-sci-acid',
      title: 'Acids, Bases, and Salts Complete Chapter Practice Sheet',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '920 KB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    }
  ];

  // Previous Year Papers (PYQ) for CBSE and MP Board
  const previousYearPapers = {
    cbse: [
      {
        id: 'pyq-cbse-math-2024',
        title: 'CBSE Class 10th Mathematics Standard Question Paper 2024',
        subject: 'Mathematics',
        classLevel: 'Class 10th',
        fileSize: '2.1 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      },
      {
        id: 'pyq-cbse-sci-2024',
        title: 'CBSE Class 10th Science Question Paper 2024 (All Sets)',
        subject: 'Science',
        classLevel: 'Class 10th',
        fileSize: '2.5 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      },
      {
        id: 'pyq-cbse-math-2023',
        title: 'CBSE Class 10th Mathematics Question Paper 2023',
        subject: 'Mathematics',
        classLevel: 'Class 10th',
        fileSize: '1.9 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      },
      {
        id: 'pyq-cbse-sci-2023',
        title: 'CBSE Class 10th Science Question Paper 2023',
        subject: 'Science',
        classLevel: 'Class 10th',
        fileSize: '2.3 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      }
    ],
    mp: [
      {
        id: 'pyq-mp-math-2024',
        title: 'MP Board Class 10th Mathematics (Ganit) Question Paper 2024',
        subject: 'Mathematics',
        classLevel: 'Class 10th',
        fileSize: '1.8 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      },
      {
        id: 'pyq-mp-sci-2024',
        title: 'MP Board Class 10th Science (Vigyan) Question Paper 2024',
        subject: 'Science',
        classLevel: 'Class 10th',
        fileSize: '2.0 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      },
      {
        id: 'pyq-mp-math-2023',
        title: 'MP Board Class 10th Mathematics (Ganit) Question Paper 2023',
        subject: 'Mathematics',
        classLevel: 'Class 10th',
        fileSize: '1.7 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      },
      {
        id: 'pyq-mp-sci-2023',
        title: 'MP Board Class 10th Science (Vigyan) Question Paper 2023',
        subject: 'Science',
        classLevel: 'Class 10th',
        fileSize: '2.1 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      }
    ]
  };

  // Handler to force file opening / alert
  const handleDownload = (item: ResourceItem) => {
    window.open(item.downloadUrl, '_blank');
  };

  // Filter Items Based on Tab and Search
  const matchesSearch = (item: ResourceItem) => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query) || 
           item.subject.toLowerCase().includes(query) ||
           item.classLevel.toLowerCase().includes(query);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Hero Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange text-xs font-black tracking-widest uppercase rounded-full mb-4 border border-brand-orange/20"
          >
            <Sparkles size={14} />
            <span>Academic Excellence Resources</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight mb-4"
          >
            Free Study Material & <span className="text-brand-orange underline decoration-wavy decoration-2">Downloads</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed"
          >
            Access official NCERT books class wise, custom mock test series, chapter notes, and past board papers optimized for score acceleration.
          </motion.p>
        </div>

        {/* Search Bar & Primary Navigation Tags */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-12">
          
          {/* Tag Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Resources', icon: <Layers size={16} /> },
              { id: 'ncert', label: 'NCERT Books', icon: <BookOpen size={16} /> },
              { id: 'notes', label: 'Revision Notes', icon: <FileText size={16} /> },
              { id: 'test-series', label: 'Test Series', icon: <ClipboardList size={16} /> },
              { id: 'pyq', label: 'Previous Year Papers', icon: <Award size={16} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 transform active:scale-95 ${
                  activeTab === tab.id 
                    ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20 scale-[1.02]' 
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-brand-navy'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative md:w-80 w-full">
            <input
              type="text"
              placeholder="Search subjects or chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-2xl text-slate-700 font-bold placeholder-slate-400 focus:outline-none transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </div>

        {/* SECTION 1: Previous Year Question Papers (With CBSE & MP Board Separate Options) */}
        {(activeTab === 'all' || activeTab === 'pyq') && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 bg-gradient-to-br from-brand-navy to-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden"
          >
            {/* Ambient Background decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange opacity-10 rounded-full blur-3xl translate-x-12 -translate-y-12" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 opacity-10 rounded-full blur-3xl -translate-x-12 translate-y-12" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10 pb-6 border-b border-white/10">
              <div>
                <span className="text-brand-orange font-black uppercase tracking-widest text-xs inline-block mb-2">Exams & Boards archive</span>
                <h2 className="text-3xl font-extrabold tracking-tight">Previous Year Solved Board Papers</h2>
                <p className="text-slate-350 text-sm mt-1 max-w-lg">
                  Practice authentic question papers from the past 3 seasons to master actual exam patterns.
                </p>
              </div>

              {/* CBSE vs MP Board Selection Controls */}
              <div className="flex bg-white/5 border border-white/15 p-1 rounded-2xl self-stretch sm:self-auto">
                <button
                  onClick={() => setPyqBoard('cbse')}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    pyqBoard === 'cbse' 
                      ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <CheckCircle size={16} className={pyqBoard === 'cbse' ? 'opacity-100' : 'opacity-0'} />
                  <span>CBSE Board</span>
                </button>
                <button
                  onClick={() => setPyqBoard('mp')}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    pyqBoard === 'mp' 
                      ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <CheckCircle size={16} className={pyqBoard === 'mp' ? 'opacity-100' : 'opacity-0'} />
                  <span>MP Board</span>
                </button>
              </div>
            </div>

            {/* PYQ Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="wait">
                {previousYearPapers[pyqBoard]
                  .filter(matchesSearch)
                  .map((paper, idx) => (
                    <motion.div
                      key={paper.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-orange/40 rounded-3xl p-6 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2.5 py-1 bg-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-wider">
                            {paper.subject}
                          </span>
                          <span className="text-white/40 text-xs font-bold">{paper.classLevel}</span>
                        </div>
                        <h4 className="font-extrabold text-lg text-white group-hover:text-brand-orange transition-colors mb-4 line-clamp-2">
                          {paper.title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="text-xs text-slate-450 font-semibold uppercase">
                          Size: {paper.fileSize} | Type: {paper.fileType}
                        </div>
                        <button
                          onClick={() => handleDownload(paper)}
                          className="flex items-center gap-1 text-brand-orange font-black text-sm group-hover:translate-x-1 transition-all"
                        >
                          <span>Download Paper</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                }
              </AnimatePresence>
            </div>
            
            {previousYearPapers[pyqBoard].filter(matchesSearch).length === 0 && (
              <div className="text-center py-12 text-slate-450">
                No question papers matched your search query.
              </div>
            )}
          </motion.div>
        )}

        {/* SECTION 2: NCERT Book Series */}
        {(activeTab === 'all' || activeTab === 'ncert') && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-brand-orange/10 rounded-2xl text-brand-orange">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-brand-navy">Official NCERT Textbooks</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">Direct Download from NCERT servers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ncertBooks.filter(matchesSearch).map((book, idx) => (
                <div 
                  key={book.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-orange/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase border border-emerald-100">
                        {book.subject}
                      </span>
                      <span className="text-slate-400 text-xs font-black uppercase tracking-wider">{book.classLevel}</span>
                    </div>

                    <h4 className="font-extrabold text-lg text-brand-navy group-hover:text-brand-orange transition-colors mb-4">
                      {book.title}
                    </h4>
                  </div>

                  <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-450 font-semibold">{book.fileSize} • Direct Official Link</span>
                    <button
                      onClick={() => handleDownload(book)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-brand-navy hover:bg-brand-orange hover:text-white font-bold text-xs rounded-xl transition-all"
                    >
                      <span>Obtain Book</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {ncertBooks.filter(matchesSearch).length === 0 && (
              <p className="text-slate-500 font-bold text-center py-8">No NCERT books match your query.</p>
            )}
          </div>
        )}

        {/* SECTION 3: Chapter Revision Notes */}
        {(activeTab === 'all' || activeTab === 'notes') && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-brand-orange/10 rounded-2xl text-brand-orange">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-brand-navy">Revision & Chapter Summary Notes</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">Carefully prepared for quick revision</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {revisionNotes.filter(matchesSearch).map((notes) => (
                <div 
                  key={notes.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-orange/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-[10px] font-bold uppercase">
                        {notes.subject}
                      </span>
                      <span className="text-slate-400 text-xs font-black">{notes.classLevel}</span>
                    </div>

                    <h4 className="font-extrabold text-lg text-brand-navy group-hover:text-brand-orange transition-colors mb-4">
                      {notes.title}
                    </h4>
                  </div>

                  <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-450 font-semibold">{notes.fileSize} • PDF format</span>
                    <button
                      onClick={() => handleDownload(notes)}
                      className="inline-flex items-center gap-1.5 text-brand-orange font-bold text-sm"
                    >
                      <span>Download Notes</span>
                      <Download size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {revisionNotes.filter(matchesSearch).length === 0 && (
              <p className="text-slate-500 font-bold text-center py-8">No revision notes match your query.</p>
            )}
          </div>
        )}

        {/* SECTION 4: Mock Test Series */}
        {(activeTab === 'all' || activeTab === 'test-series') && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-brand-orange/10 rounded-2xl text-brand-orange">
                <ClipboardList size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-brand-navy">Sample Papers & Mock Test Series</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">Self-assess your Board level readiness</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {testSeries.filter(matchesSearch).map((test) => (
                <div 
                  key={test.id}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-orange/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full -z-0 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3.5 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold border border-indigo-100">
                        {test.subject}
                      </span>
                      <span className="text-slate-400 text-xs font-black uppercase tracking-widest">{test.classLevel}</span>
                    </div>

                    <h4 className="font-extrabold text-xl text-brand-navy group-hover:text-brand-orange transition-colors mb-4 max-w-md">
                      {test.title}
                    </h4>
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 relative z-10">
                    <span className="text-xs text-slate-450 font-bold uppercase tracking-widest">
                      FILE SIZE: {test.fileSize}
                    </span>
                    <button
                      onClick={() => handleDownload(test)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white hover:bg-brand-orange/90 font-black text-xs rounded-xl shadow-md shadow-brand-orange/15 transition-all"
                    >
                      <span>Download Test Pack</span>
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {testSeries.filter(matchesSearch).length === 0 && (
              <p className="text-slate-500 font-bold text-center py-8">No Test Series matches your query.</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
