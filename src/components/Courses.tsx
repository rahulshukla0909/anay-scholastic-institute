import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Languages, Landmark, Monitor, Library, ChevronRight, ArrowLeft, Cpu, Terminal, Code, Globe, Smartphone, Rocket } from 'lucide-react';

const courses = [
  {
    id: 'school',
    title: "School Excellence Program",
    subtitle: "Class 6th, 7th, 8th, 9th & 10th",
    description: "Foundation building and concept-focused learning for school students. We cover all major subjects with a focus on board exam preparation.",
    icon: <BookOpen />,
    image: "images/se.jpg",
    features: ["Subject Wise Experts", "Weekly Unit Tests", "NTSE/Olympiad Prep", "Parent-Teacher Meetings"]
  },
  {
    id: 'spoken',
    title: "English Spoken Classes",
    subtitle: "Master the Art of Communication",
    description: "Build confidence and fluency in English. Our sessions focus on pronunciation, vocabulary expansion, and real-life conversation practice.",
    icon: <Languages />,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
    features: ["Group Discussions", "Personality Development", "Audio-Visual Learning", "Confidence Building"]
  },
  {
    id: 'ssc',
    title: "Competitive English",
    subtitle: "Specialized for SSC & BANKING",
    description: "Targeted English language preparation for competitive exams. Master grammar, comprehension, and vocabulary required specifically for SSC and Banking sectors.",
    icon: <Landmark />,
    image: "https://images.unsplash.com/photo-1509228468518-180dd482195e?auto=format&fit=crop&q=80&w=800",
    features: ["Previous Year Paper Analysis", "Short-cut Methods", "Mock Tests", "Strategy Sessions"]
  },
  {
    id: 'computer',
    title: "Computer Classes",
    subtitle: "Digital Literacy & Skills",
    description: "From basic operations to advanced software skills. We provide hands-on training for MS Office, Programming Basics, and Digital Tools.",
    icon: <Monitor />,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    features: ["1:1 Computer Access", "Modern Lab Facility", "Project Based Learning", "Certificate of Completion"]
  },
  {
    id: 'library',
    title: "Library Facility",
    subtitle: "Scholar's Hub & Silent Zone",
    description: "A peaceful environment dedicated to self-study. Equipped with reference books, high-speed internet, and comfortable seating.",
    icon: <Library />,
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
    features: ["Silent Study Environment", "Vast Book Collection", "High Speed WiFi", "In-Lab Power Backup"]
  }
];

interface CoursesProps {
  initialCategory?: string;
  onEnroll?: () => void;
}

const getCourseCategory = (id: string): string => {
  if (id.startsWith('school')) return 'school';
  if (id === 'ssc') return 'ssc';
  if (id === 'spoken') return 'spoken';
  return 'facilities';
};

const tabs = [
  { id: 'school', name: 'School Preparation' },
  { id: 'ssc', name: 'Bank and SSC preparation' },
  { id: 'spoken', name: 'Spoken English' },
  { id: 'facilities', name: 'Other Facilities' }
];

const classDetails: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  schedule: string;
  focus: string;
}> = {
  '6th': {
    title: "Class 6th Foundation",
    subtitle: "Middle School Concept Building",
    description: "Strong emphasis on building logical and mathematical foundations. We ensure students transition smoothly from primary to middle school by mastering fundamental concepts in Mathematics, Science, and English.",
    features: ["Conceptual Math & Science Labs", "Mental Ability Training", "Regular Doubt Classes", "Interactive Worksheets"],
    schedule: "3 Days a week, 2 hours/day",
    focus: "Critical Thinking & Vocabulary Builder"
  },
  '7th': {
    title: "Class 7th Excellence",
    subtitle: "Nurturing Analytical Skills",
    description: "Empowering students with analytical skills to solve complex problems. We cover School Syllabus comprehensively and introduce competitive math and science foundations.",
    features: ["Olympiad Preparedness", "Science Experiment Sessions", "Weekly Progress Quiz", "Personal Mentorship"],
    schedule: "3 Days a week, 2 hours/day",
    focus: "Analytical Problem Solving"
  },
  '8th': {
    title: "Class 8th Board-Prep",
    subtitle: "Base for Secondary Education",
    description: "A crucial year for national exams and scholarship foundations like NTSE. We prepare students thoroughly for school board patterns and advanced logical questioning.",
    features: ["NTSE Stage 1 Foundation", "Subject-Wise Detailed Study Material", "Bi-Weekly Testing", "Grammar & Spoken English Focus"],
    schedule: "4 Days a week, 2 hours/day",
    focus: "Comprehensive Practice & Concept Mastery"
  },
  '9th': {
    title: "Class 9th Board & Foundation",
    subtitle: "The Gateway to High School",
    description: "Preparing students for senior secondary challenges. Standard textbook concepts are paired with competitive level inputs to prepare a base for IIT-JEE/NEET and Board exams.",
    features: ["Advanced Physics, Chemistry, Biology Modules", "High-Level Math Practice", "Mock Board Test Series", "Time Management Workshops"],
    schedule: "6 Days a week, 2.5 hours/day",
    focus: "Scientific Inquiry & Rigorous Practice"
  },
  '10th': {
    title: "Class 10th Board Achievers",
    subtitle: "Targeting 95%+ in Board Exams",
    description: "Our flagship school program with a proven track record. Guided by board-exam experts, we offer intense syllabus coverage, thorough revision, chapter-wise test series, and past 15 years paper analysis.",
    features: ["15+ Full Length Board Mock Tests", "Special Answer Writing Workshops", "Personal Mock Vivas", "Parent-Teacher Performance Portals"],
    schedule: "6 Days a week + Sunday Tests",
    focus: "Exam Temperament, Speed & 100% Score Strategy"
  }
};

export const Courses: React.FC<CoursesProps> = ({ initialCategory = 'school', onEnroll }) => {
  const [activeTab, setActiveTab] = React.useState<string>('school');
  const [selectedClass, setSelectedClass] = React.useState<string>('all');
  const [selectedFacility, setSelectedFacility] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (initialCategory === 'all') {
      setActiveTab('school');
      setSelectedClass('all');
      setSelectedFacility(null);
    } else if (initialCategory.startsWith('school-')) {
      setActiveTab('school');
      setSelectedClass(initialCategory.replace('school-', '') + 'th');
      setSelectedFacility(null);
    } else if (initialCategory === 'computer' || initialCategory === 'facilities') {
      setActiveTab('facilities');
      setSelectedClass('all');
      setSelectedFacility(initialCategory === 'computer' ? 'computer' : null);
    } else {
      setActiveTab(initialCategory);
      setSelectedClass('all');
      setSelectedFacility(null);
    }
  }, [initialCategory]);

  const filteredCourses = activeTab === 'all' 
    ? courses 
    : courses.filter(course => getCourseCategory(course.id) === activeTab);

  return (
    <section id="courses-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">Our Programs & Facilities</h2>
          <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full" />
          <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Diverse learning pathways designed to cater to every student's academic and professional needs.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-4xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedClass('all');
                setSelectedFacility(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative ${
                activeTab === tab.id
                  ? 'bg-brand-navy text-white shadow-lg shadow-brand-navy/15'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-brand-navy'
              }`}
            >
              <span className="relative z-10">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Class Selection Buttons under School Preparation */}
        {activeTab === 'school' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-2 mb-16 bg-slate-50 p-2.5 rounded-2xl max-w-2xl mx-auto border border-slate-100"
          >
            {['all', '6th', '7th', '8th', '9th', '10th'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                  selectedClass === cls
                    ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/15'
                    : 'text-slate-600 hover:text-brand-orange hover:bg-white'
                }`}
              >
                {cls === 'all' ? 'All Classes (6th-10th)' : `Class ${cls}`}
              </button>
            ))}
          </motion.div>
        )}

        <motion.div layout className="space-y-16">
          {activeTab === 'school' && selectedClass === '6th' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-sm font-sans"
            >
              {/* Back Button to list */}
              <div className="mb-6">
                <button
                  onClick={() => setSelectedClass('all')}
                  className="flex items-center gap-2 text-brand-navy hover:text-brand-orange transition-colors cursor-pointer text-sm font-black"
                >
                  <ArrowLeft size={16} />
                  <span>Back to All Classes / सूची पर वापस जाएं</span>
                </button>
              </div>

              {/* Class 6 Page Header */}
              <div className="text-center mb-10 pb-6 border-b border-slate-200/85">
                <span className="text-4xl block mb-2">📚</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">Class 6 Foundation Course</h3>
                <p className="text-slate-500 mt-2 text-sm font-bold uppercase tracking-widest text-brand-orange">Anay Scholastic Institute</p>
              </div>

              {/* 2x2 Grid for Simple text content */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                
                {/* Subjects Covered */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-brand-orange text-xl">📖</span> Subjects Covered
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'].map((sub, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">✨</span> Features
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Chapter-wise Notes',
                      'Weekly Tests',
                      'Doubt Solving',
                      'Homework Support',
                      'Progress Reports'
                    ].map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-slate-700 font-extrabold text-sm">
                        <span className="text-brand-navy shrink-0 font-normal">✅</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What Students Get */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">🎯</span> What Students Get
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {['Easy Notes', 'Practice Questions', 'MCQ Tests', 'Revision Worksheets'].map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-navy shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why Choose Us? */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">🏆</span> Why Choose Us?
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {['Experienced Teachers', 'Small Batch Size', 'Personal Attention', 'Regular Assessment'].map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Admission Open & Enrollment Button info */}
              <div className="bg-amber-500/5 rounded-2xl p-6 md:p-8 border border-amber-500/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xl">📞</span>
                  <span className="text-brand-orange text-sm font-black uppercase tracking-wider">
                    Admission Open
                  </span>
                </div>
                <p className="text-brand-navy font-black text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-6">
                  Join ANAY SCHOLASTIC INSTITUTE and build a strong foundation for future success.
                </p>
                
                <button 
                  onClick={onEnroll}
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-orange text-white font-black rounded-xl transition-all duration-300 shadow-lg shadow-brand-navy/10 hover:shadow-brand-orange/10 transform hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          ) : activeTab === 'school' && (selectedClass === '7th' || selectedClass === '8th' || selectedClass === '9th') ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-sm font-sans"
            >
              {/* Back Button to list */}
              <div className="mb-6">
                <button
                  onClick={() => setSelectedClass('all')}
                  className="flex items-center gap-2 text-brand-navy hover:text-brand-orange transition-colors cursor-pointer text-sm font-black"
                >
                  <ArrowLeft size={16} />
                  <span>Back to All Classes / सूची पर वापस जाएं</span>
                </button>
              </div>

              {/* Class Header */}
              <div className="text-center mb-10 pb-6 border-b border-slate-200/85">
                <span className="text-4xl block mb-2">📚</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
                  Class {selectedClass === '7th' ? '7' : selectedClass === '8th' ? '8' : '9'} Foundation Course
                </h3>
                <p className="text-slate-500 mt-2 text-sm font-bold uppercase tracking-widest text-brand-orange">Anay Scholastic Institute</p>
              </div>

              {/* 2x2 Grid for Simple text content */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                
                {/* Subjects Covered */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-brand-orange text-xl">📖</span> Subjects Covered
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {['Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Sanskrit (if applicable)'].map((sub, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">✨</span> Features
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Concept-Based Learning',
                      'Chapter-wise Notes',
                      'Weekly Tests',
                      'Doubt Solving Sessions',
                      'Homework Assistance',
                      'Performance Tracking'
                    ].map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-slate-700 font-extrabold text-sm">
                        <span className="text-brand-navy shrink-0 font-normal">✅</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What Students Get */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">🎯</span> What Students Get
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Easy-to-Understand Notes',
                      'Practice Worksheets',
                      'MCQ Tests',
                      'Revision Material',
                      'Exam Preparation Support'
                    ].map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-navy shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why Choose Us? */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">🏆</span> Why Choose Us?
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Experienced Faculty',
                      'Individual Attention',
                      'Regular Assessments',
                      'Student-Friendly Teaching',
                      'Strong Academic Foundation'
                    ].map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Admission Open & Enrollment Button info */}
              <div className="bg-amber-500/5 rounded-2xl p-6 md:p-8 border border-amber-500/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xl">📞</span>
                  <span className="text-brand-orange text-sm font-black uppercase tracking-wider">
                    Admission Open
                  </span>
                </div>
                <p className="text-brand-navy font-black text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-6">
                  Join ANAY SCHOLASTIC INSTITUTE and strengthen your concepts with expert guidance.
                </p>
                
                <button 
                  onClick={onEnroll}
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-orange text-white font-black rounded-xl transition-all duration-300 shadow-lg shadow-brand-navy/10 hover:shadow-brand-orange/10 transform hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          ) : activeTab === 'school' && selectedClass === '10th' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-sm font-sans"
            >
              {/* Back Button to list */}
              <div className="mb-6">
                <button
                  onClick={() => setSelectedClass('all')}
                  className="flex items-center gap-2 text-brand-navy hover:text-brand-orange transition-colors cursor-pointer text-sm font-black"
                >
                  <ArrowLeft size={16} />
                  <span>Back to All Classes / सूची पर वापस जाएं</span>
                </button>
              </div>

              {/* Class Header */}
              <div className="text-center mb-10 pb-6 border-b border-slate-200/85">
                <span className="text-4xl block mb-2">🎓</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
                  Class 10 Board Exam Preparation
                </h3>
                <p className="text-slate-500 mt-2 text-sm font-bold uppercase tracking-widest text-brand-orange">CBSE & MP Board • Anay Scholastic Institute</p>
              </div>

              {/* 2x2 Grid for Simple text content */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                
                {/* Subjects Covered */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-brand-orange text-xl">📚</span> Subjects Covered
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'].map((sub, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Course Highlights */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">🎯</span> Course Highlights
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Complete CBSE & MP Board Syllabus Coverage',
                      'Chapter-wise Notes & Question Banks',
                      'Weekly Tests & Mock Exams',
                      'Important Questions & Previous Year Papers',
                      'Doubt Solving Sessions',
                      'Board Exam Strategy & Time Management'
                    ].map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-slate-700 font-extrabold text-sm">
                        <span className="text-brand-navy shrink-0 font-normal">✅</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Study Material */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">📖</span> Study Material
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Easy Notes',
                      'NCERT Solutions',
                      'Important Questions',
                      'Sample Papers',
                      'Revision Notes',
                      'MCQ Practice Sets'
                    ].map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-navy shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why Choose Us? */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">🏆</span> Why Choose Us?
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Experienced Teachers',
                      'Regular Assessments',
                      'Personal Attention',
                      'Board-Oriented Preparation',
                      'Performance Tracking',
                      'Result-Focused Teaching'
                    ].map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Our Goal & Admission Open & Enrollment Button info */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm text-center">
                  <span className="text-xl block mb-2">🎯</span>
                  <h4 className="text-lg font-bold text-brand-navy mb-2">Our Goal</h4>
                  <p className="text-slate-600 max-w-2xl mx-auto font-medium text-sm">
                    To help students score excellent marks in their Class 10 Board Examinations and build a strong foundation for future competitive exams.
                  </p>
                </div>

                <div className="bg-amber-500/5 rounded-2xl p-6 md:p-8 border border-amber-500/20 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-xl">📞</span>
                    <span className="text-brand-orange text-sm font-black uppercase tracking-wider">
                      Admission Open
                    </span>
                  </div>
                  <p className="text-brand-navy font-black text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-3">
                    Join ANAY SCHOLASTIC INSTITUTE and start your journey towards board exam success.
                  </p>
                  <p className="text-brand-orange text-sm font-black mb-6 uppercase tracking-wider">
                    CBSE & MP Board Batches Available
                  </p>
                  
                  <button 
                    onClick={onEnroll}
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-orange text-white font-black rounded-xl transition-all duration-300 shadow-lg shadow-brand-navy/10 hover:shadow-brand-orange/10 transform hover:-translate-y-0.5 cursor-pointer text-sm"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'facilities' && selectedFacility === 'computer' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-sm font-sans"
            >
              {/* Back Button to list */}
              <div className="mb-6">
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="flex items-center gap-2 text-brand-navy hover:text-brand-orange transition-colors cursor-pointer text-sm font-black"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Other Facilities / सूची पर वापस जाएं</span>
                </button>
              </div>

              {/* Header */}
              <div className="text-center mb-10 pb-6 border-b border-slate-200/85">
                <span className="text-4xl block mb-2">💻</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
                  Coding & Website Development Program
                </h3>
                <p className="text-slate-500 mt-2 text-sm font-bold uppercase tracking-widest text-brand-orange">Build the Skills of the Future • Anay Scholastic Institute</p>
              </div>

              {/* Introduction Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm mb-10 text-center md:text-left">
                <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">
                  At <strong className="text-brand-navy">ANAY SCHOLASTIC INSTITUTE</strong>, students don't just learn technology—they create real projects. Our Coding & Website Development Program helps students develop problem-solving skills, logical thinking, and practical technical knowledge.
                </p>
              </div>

              {/* What You Will Learn Section */}
              <div className="mb-12">
                <h4 className="text-2xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                  <Rocket size={24} className="text-brand-orange" /> 🚀 What You Will Learn
                </h4>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Computer Fundamentals */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-brand-orange/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-4">
                      <Cpu size={20} />
                    </div>
                    <h5 className="font-bold text-brand-navy mb-3 text-base">Computer Fundamentals</h5>
                    <ul className="space-y-2 text-xs font-semibold text-slate-600">
                      <li className="flex items-center gap-1.5"><span className="text-brand-orange">•</span> Computer Basics</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-orange">•</span> Internet & Digital Skills</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-orange">•</span> Safe Use of Technology</li>
                    </ul>
                  </div>

                  {/* Programming Fundamentals */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-brand-orange/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/10 flex items-center justify-center text-brand-navy mb-4">
                      <Terminal size={20} />
                    </div>
                    <h5 className="font-bold text-brand-navy mb-3 text-base">Programming Fundamentals</h5>
                    <ul className="space-y-2 text-xs font-semibold text-slate-600">
                      <li className="flex items-center gap-1.5"><span className="text-brand-navy">•</span> Logic Building</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-navy">•</span> Algorithms & Flowcharts</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-navy">•</span> Introduction to Coding</li>
                    </ul>
                  </div>

                  {/* Website Development */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-brand-orange/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-4">
                      <Code size={20} />
                    </div>
                    <h5 className="font-bold text-brand-navy mb-3 text-base">Website Development</h5>
                    <ul className="space-y-2 text-xs font-semibold text-slate-600">
                      <li className="flex items-center gap-1.5"><span className="text-brand-orange">•</span> HTML</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-orange">•</span> CSS</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-orange">•</span> JavaScript</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-orange">•</span> Responsive Website Design</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-orange">•</span> Portfolio Website Creation</li>
                    </ul>
                  </div>

                  {/* Modern Web Development */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-brand-orange/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/10 flex items-center justify-center text-brand-navy mb-4">
                      <Globe size={20} />
                    </div>
                    <h5 className="font-bold text-brand-navy mb-3 text-base">Modern Web Development</h5>
                    <ul className="space-y-2 text-xs font-semibold text-slate-600">
                      <li className="flex items-center gap-1.5"><span className="text-brand-navy">•</span> Frontend Development</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-navy">•</span> User Interface Design</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-navy">•</span> Website Deployment</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-navy">•</span> Real-World Projects</li>
                    </ul>
                  </div>

                  {/* App Development Basics */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-brand-orange/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-4">
                      <Smartphone size={20} />
                    </div>
                    <h5 className="font-bold text-brand-navy mb-3 text-base">App Development Basics</h5>
                    <ul className="space-y-2 text-xs font-semibold text-slate-600">
                      <li className="flex items-center gap-1.5"><span className="text-brand-orange">•</span> Mobile App Concepts</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-orange">•</span> App Design Fundamentals</li>
                      <li className="flex items-center gap-1.5"><span className="text-brand-orange">•</span> Project-Based Learning</li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Features & Why Learn in 2 Columns */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Course Features */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">🎯</span> Course Features
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Beginner-Friendly Learning',
                      'Practical Project-Based Training',
                      'Live Coding Sessions',
                      'Hands-On Assignments',
                      'Real Website Development Projects',
                      'Industry-Relevant Skills',
                      'Certificate of Completion'
                    ].map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-slate-700 font-extrabold text-sm">
                        <span className="text-emerald-500 shrink-0">✅</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why Learn Coding? */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl text-brand-orange">🏆</span> Why Learn Coding?
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Improves Logical Thinking',
                      'Enhances Problem-Solving Skills',
                      'Builds Creativity',
                      'Prepares Students for Future Careers',
                      'Develops Technical Confidence'
                    ].map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Projects & Who Can Join in 2 Columns */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Projects Students Will Build */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">👨‍💻</span> Projects Students Will Build
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Personal Portfolio Website',
                      'School Project Website',
                      'Business Landing Page',
                      'Interactive Web Pages',
                      'Mini Coding Projects'
                    ].map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-navy shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Who Can Join? */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">🎓</span> Who Can Join?
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'School Students (Class 6–12)',
                      'College Students',
                      'Beginners with No Coding Experience'
                    ].map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Admission Open & Enrollment Button info */}
              <div className="bg-amber-500/5 rounded-2xl p-6 md:p-8 border border-amber-500/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xl">📞</span>
                  <span className="text-brand-orange text-sm font-black uppercase tracking-wider">
                    Admission Open
                  </span>
                </div>
                <p className="text-brand-navy font-black text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-4 font-sans">
                  Start your journey into the world of technology and learn skills that will help you succeed in the digital future.
                </p>
                <p className="text-brand-orange text-xs md:text-sm font-black mb-6 uppercase tracking-widest leading-relaxed">
                  Coding • Website Development • Real Projects • Future Skills
                </p>
                
                <button 
                  onClick={onEnroll}
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-orange text-white font-black rounded-xl transition-all duration-300 shadow-lg shadow-brand-navy/10 hover:shadow-brand-orange/10 transform hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          ) : activeTab === 'facilities' && selectedFacility === 'library' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-sm font-sans"
            >
              {/* Back Button to list */}
              <div className="mb-6">
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="flex items-center gap-2 text-brand-navy hover:text-brand-orange transition-colors cursor-pointer text-sm font-black"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Other Facilities / सूची पर वापस जाएं</span>
                </button>
              </div>

              {/* Header */}
              <div className="text-center mb-10 pb-6 border-b border-slate-200/85">
                <span className="text-4xl block mb-2">📚</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
                  Library Facility & Self-Study Hub
                </h3>
                <p className="text-slate-500 mt-2 text-sm font-bold uppercase tracking-widest text-brand-orange">Scholars Hub & Silent Zone • Anay Scholastic Institute</p>
              </div>

              {/* 2 Columns */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">✨</span> Facilities Offered
                  </h4>
                  <ul className="space-y-4 flex-grow">
                    {[
                      'Silent Self-Study Environment',
                      'Vast Collection of Board Exam & Competitive Reference Books',
                      'High-Speed Unlimited Wi-Fi Connection',
                      'Comfortable and Spacious Seating Arrangements',
                      'In-Lab Continuous Power Backup Support',
                      'Daily Newspapers, Magazines & Academic Journals'
                    ].map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-slate-700 font-extrabold text-sm">
                        <span className="text-brand-orange shrink-0">✅</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl text-brand-orange">💡</span> Why Choose Our Library?
                  </h4>
                  <ul className="space-y-4 flex-grow">
                    {[
                      'Zero disturbance - complete silence zone',
                      'Direct help from mentors when needed',
                      'Safe & secure study cabins',
                      'Convenient timing to suit school & coaching hours',
                      'Air-cooled and highly ventilated cabins'
                    ].map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-navy shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-amber-500/5 rounded-2xl p-6 md:p-8 border border-amber-500/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xl">📞</span>
                  <span className="text-brand-orange text-sm font-black uppercase tracking-wider">
                    Admission Open
                  </span>
                </div>
                <p className="text-brand-navy font-black text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-6 font-sans">
                  Secure your study space today and build perfect self-study habits with peer motivation.
                </p>
                
                <button 
                  onClick={onEnroll}
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-orange text-white font-black rounded-xl transition-all duration-300 shadow-lg shadow-brand-navy/10 hover:shadow-brand-orange/10 transform hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  Join Library Now
                </button>
              </div>
            </motion.div>
          ) : activeTab === 'ssc' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-sm font-sans"
            >
              {/* Header */}
              <div className="text-center mb-10 pb-6 border-b border-slate-200/85">
                <span className="text-4xl block mb-2">📘</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
                  Banking & SSC English Preparation
                </h3>
                <p className="text-slate-500 mt-2 text-sm font-bold uppercase tracking-widest text-brand-orange">
                  Master English for Competitive Exams • Anay Scholastic Institute
                </p>
              </div>

              {/* Introduction Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm mb-10 text-center md:text-left">
                <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium animate-pulse-subtle">
                  <strong className="text-brand-navy">ANAY SCHOLASTIC INSTITUTE</strong> provides specialized English coaching for Banking and SSC examinations. Our goal is to help students improve accuracy, speed, and confidence in the English section.
                </p>
              </div>

              {/* Grid 2x2 for Exams Covered & Topics Covered */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Exams Covered */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">🎯</span> Exams Covered
                  </h4>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-3 flex-grow">
                    {[
                      'IBPS PO',
                      'IBPS Clerk',
                      'SBI PO',
                      'SBI Clerk',
                      'RRB PO & Clerk',
                      'SSC CGL',
                      'SSC CHSL',
                      'SSC MTS',
                      'SSC GD',
                      'SSC CPO'
                    ].map((exam, eIdx) => (
                      <li key={eIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span>{exam}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Topics Covered */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl text-brand-navy">📚</span> Topics Covered
                  </h4>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-3 flex-grow">
                    {[
                      'Grammar',
                      'Error Detection',
                      'Sentence Improvement',
                      'Cloze Test',
                      'Reading Comprehension',
                      'Para Jumbles',
                      'Fill in the Blanks',
                      'Vocabulary',
                      'Word Usage',
                      'Idioms & Phrases'
                    ].map((topic, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-navy shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Grid 2x2 for Course Features & Why Choose This Course? */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Course Features */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">✨</span> Course Features
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Concept-Based Grammar Teaching',
                      'Exam-Oriented Short Tricks',
                      'Daily Practice Questions',
                      'Previous Year Questions',
                      'Weekly Tests',
                      'Vocabulary Building Sessions',
                      'Doubt Solving Support'
                    ].map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-slate-700 font-extrabold text-sm">
                        <span className="text-emerald-500 shrink-0">✅</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why Choose This Course? */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl text-brand-orange">🏆</span> Why Choose This Course?
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Focused Only on English',
                      'Banking & SSC Exam Pattern Based',
                      'Simple Teaching Method',
                      'Regular Practice & Assessment',
                      'Personal Attention to Every Student'
                    ].map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Sections: Our Objective & Admission Open */}
              <div className="space-y-6">
                {/* Our Objective */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm text-center">
                  <span className="text-xl block mb-2">🎯</span>
                  <h4 className="text-lg font-bold text-brand-navy mb-2">Our Objective</h4>
                  <p className="text-slate-600 max-w-2xl mx-auto font-medium text-sm">
                    To help students score maximum marks in the English section and improve their overall exam performance.
                  </p>
                </div>

                {/* Admission Info */}
                <div className="bg-amber-500/5 rounded-2xl p-6 md:p-8 border border-amber-500/20 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-xl">📞</span>
                    <span className="text-brand-orange text-sm font-black uppercase tracking-wider">
                      Admissions Open
                    </span>
                  </div>
                  <p className="text-brand-navy font-black text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-3">
                    Join ANAY SCHOLASTIC INSTITUTE and strengthen your English for Banking & SSC Exams.
                  </p>
                  <p className="text-brand-orange text-sm font-black mb-6 uppercase tracking-wider">
                    English Specialist for Banking & SSC Aspirants
                  </p>
                  
                  <button 
                    onClick={onEnroll}
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-orange text-white font-black rounded-xl transition-all duration-300 shadow-lg shadow-brand-navy/10 hover:shadow-brand-orange/10 transform hover:-translate-y-0.5 cursor-pointer text-sm"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'spoken' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-sm font-sans"
            >
              {/* Header */}
              <div className="text-center mb-10 pb-6 border-b border-slate-200/85">
                <span className="text-4xl block mb-2">🗣️</span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
                  Spoken English Course
                </h3>
                <p className="text-slate-500 mt-2 text-sm font-bold uppercase tracking-widest text-brand-orange">
                  Speak English with Confidence • Anay Scholastic Institute
                </p>
              </div>

              {/* Introduction Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm mb-10 text-center md:text-left">
                <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">
                  At <strong className="text-brand-navy">ANAY SCHOLASTIC INSTITUTE</strong>, our Spoken English Program is designed to help students, job seekers, professionals, and beginners improve their communication skills and speak English fluently in daily life.
                </p>
              </div>

              {/* Grid for Who Can Join & What You Will Learn */}
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                {/* Who Can Join? */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:col-span-1">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">🎯</span> Who Can Join?
                  </h4>
                  <ul className="space-y-3 flex-grow font-sans">
                    {[
                      'School Students',
                      'College Students',
                      'Job Seekers',
                      'Working Professionals',
                      'Beginners'
                    ].map((person, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        <span>{person}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What You Will Learn */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:col-span-2">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl text-brand-navy">📚</span> What You Will Learn
                  </h4>
                  
                  <div className="grid sm:grid-cols-3 gap-4">
                    {/* Basic English */}
                    <div>
                      <h5 className="font-bold text-brand-navy text-xs uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">Basic English</h5>
                      <ul className="space-y-1.5 text-xs font-semibold text-slate-600">
                        <li className="flex items-center gap-1"><span className="text-brand-orange">•</span> Daily Use Sentences</li>
                        <li className="flex items-center gap-1"><span className="text-brand-orange">•</span> Vocabulary Building</li>
                        <li className="flex items-center gap-1"><span className="text-brand-orange">•</span> Correct Pronunciation</li>
                        <li className="flex items-center gap-1"><span className="text-brand-orange">•</span> Basic Grammar</li>
                      </ul>
                    </div>

                    {/* Communication Skills */}
                    <div>
                      <h5 className="font-bold text-brand-navy text-xs uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">Communication</h5>
                      <ul className="space-y-1.5 text-xs font-semibold text-slate-600">
                        <li className="flex items-center gap-1"><span className="text-brand-navy">•</span> Self Introduction</li>
                        <li className="flex items-center gap-1"><span className="text-brand-navy">•</span> Conversation Practice</li>
                        <li className="flex items-center gap-1"><span className="text-brand-navy">•</span> Public Speaking</li>
                        <li className="flex items-center gap-1"><span className="text-brand-navy">•</span> Group Discussions</li>
                        <li className="flex items-center gap-1"><span className="text-brand-navy">•</span> Interview Prep</li>
                      </ul>
                    </div>

                    {/* Fluency Development */}
                    <div>
                      <h5 className="font-bold text-brand-navy text-xs uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">Fluency</h5>
                      <ul className="space-y-1.5 text-xs font-semibold text-slate-600">
                        <li className="flex items-center gap-1"><span className="text-brand-orange">•</span> Speaking Confidence</li>
                        <li className="flex items-center gap-1"><span className="text-brand-orange">•</span> Sentence Formation</li>
                        <li className="flex items-center gap-1"><span className="text-brand-orange">•</span> Real Conversations</li>
                        <li className="flex items-center gap-1"><span className="text-brand-orange">•</span> Personality Dev</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid 2x2 for Course Features & Why Choose Us */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Course Features */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl">✨</span> Course Features
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Daily Speaking Practice',
                      'English Speaking Environment',
                      'Vocabulary Improvement',
                      'Confidence Building Activities',
                      'Interview & Presentation Skills',
                      'Personalized Feedback',
                      'Beginner to Advanced Levels'
                    ].map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-slate-700 font-extrabold text-sm">
                        <span className="text-emerald-500 shrink-0">✅</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                  <h4 className="text-lg font-bold text-brand-navy mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <span className="text-xl text-brand-orange">🏆</span> Why Choose Us?
                  </h4>
                  <ul className="space-y-3 flex-grow">
                    {[
                      'Practical Learning Approach',
                      'Friendly Learning Environment',
                      'Focus on Fluency & Confidence',
                      'Regular Speaking Activities',
                      'Individual Attention'
                    ].map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2.5 text-slate-700 font-extrabold text-sm font-sans">
                        <span className="text-brand-navy shrink-0">✔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Sections: Course Benefits & Admissions Open */}
              <div className="space-y-6">
                {/* Course Benefits */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm text-center">
                  <span className="text-xl block mb-2">🎯</span>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Course Benefits</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      'Speak English Confidently',
                      'Improve Communication Skills',
                      'Perform Better in Interviews',
                      'Enhance Personality Development',
                      'Build Self-Confidence'
                    ].map((benefit, bIdx) => (
                      <span key={bIdx} className="px-3.5 py-1.5 bg-brand-navy/10 text-brand-navy text-xs font-bold rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Admissions Open */}
                <div className="bg-amber-500/5 rounded-2xl p-6 md:p-8 border border-amber-500/20 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-xl">📞</span>
                    <span className="text-brand-orange text-sm font-black uppercase tracking-wider">
                      Admissions Open
                    </span>
                  </div>
                  <p className="text-brand-navy font-black text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-3">
                    Join ANAY SCHOLASTIC INSTITUTE and start your journey towards fluent English communication.
                  </p>
                  <p className="text-brand-orange text-sm font-black mb-6 uppercase tracking-wider">
                    Learn English • Speak Confidently • Succeed Everywhere
                  </p>
                  
                  <button 
                    onClick={onEnroll}
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-navy hover:bg-brand-orange text-white font-black rounded-xl transition-all duration-300 shadow-lg shadow-brand-navy/10 hover:shadow-brand-orange/10 transform hover:-translate-y-0.5 cursor-pointer text-sm"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, idx) => {
                const isSchoolCourse = course.id === 'school';
                const hasSelectedClass = isSchoolCourse && selectedClass !== 'all';
                const displayTitle = hasSelectedClass ? classDetails[selectedClass].title : course.title;
                const displaySubtitle = hasSelectedClass ? classDetails[selectedClass].subtitle : course.subtitle;
                const displayDescription = hasSelectedClass ? classDetails[selectedClass].description : course.description;
                const displayFeatures = hasSelectedClass ? classDetails[selectedClass].features : course.features;
                const displayClassDetails = hasSelectedClass ? classDetails[selectedClass] : null;

                return (
                  <motion.div 
                    key={course.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                  >
                    <div className="w-full lg:w-1/2">
                      <div className="relative group">
                        <div className="absolute -inset-4 bg-brand-orange/10 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                        <img 
                          src={course.image} 
                          alt={displayTitle} 
                          className={`relative z-10 w-full aspect-[16/9] rounded-2xl shadow-xl ${course.image.startsWith('images/') ? 'object-contain bg-white border border-slate-100' : 'object-cover'}`}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-6 left-6 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-brand-orange shadow-lg">
                          {React.cloneElement(course.icon as React.ReactElement, { size: 24 })}
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                      <div className="inline-block px-4 py-1.5 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                        {displaySubtitle}
                      </div>
                      <h3 className="text-3xl font-bold text-brand-navy mb-4">{displayTitle}</h3>
                      <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                        {displayDescription}
                      </p>
                      
                      <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {displayFeatures.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-3 text-slate-700">
                            <div className="w-5 h-5 rounded-full bg-brand-navy flex items-center justify-center text-white shrink-0">
                              <ChevronRight size={14} strokeWidth={3} />
                            </div>
                            <span className="font-medium text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {displayClassDetails && (
                        <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600 mb-8">
                          <div>
                            <div className="text-slate-400 font-bold uppercase tracking-wider scale-90 origin-left mb-1">Weekly Schedule</div>
                            <div className="text-brand-navy font-bold text-sm">{displayClassDetails.schedule}</div>
                          </div>
                          <div>
                            <div className="text-slate-400 font-bold uppercase tracking-wider scale-90 origin-left mb-1">Key Focus Area</div>
                            <div className="text-brand-orange font-bold text-sm">{displayClassDetails.focus}</div>
                          </div>
                        </div>
                      )}

                      <button 
                        onClick={() => {
                          if (course.id === 'computer') {
                            setSelectedFacility('computer');
                          } else if (course.id === 'library') {
                            setSelectedFacility('library');
                          } else if (course.id === 'school') {
                            setSelectedClass('6th');
                          }
                        }}
                        className="btn-outline group inline-flex items-center gap-2 cursor-pointer"
                      >
                        Learn More 
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
};
