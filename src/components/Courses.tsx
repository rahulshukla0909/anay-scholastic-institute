import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Languages, Landmark, Monitor, Library, ChevronRight } from 'lucide-react';

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
}

const getCourseCategory = (id: string): string => {
  if (id.startsWith('school')) return 'school';
  if (id === 'ssc') return 'ssc';
  if (id === 'spoken') return 'spoken';
  return 'facilities';
};

const tabs = [
  { id: 'all', name: 'All Programs' },
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

export const Courses: React.FC<CoursesProps> = ({ initialCategory = 'all' }) => {
  const [activeTab, setActiveTab] = React.useState<string>('all');
  const [selectedClass, setSelectedClass] = React.useState<string>('all');

  React.useEffect(() => {
    if (initialCategory.startsWith('school-')) {
      setActiveTab('school');
      setSelectedClass(initialCategory.replace('school-', '') + 'th');
    } else {
      setActiveTab(initialCategory);
      setSelectedClass('all');
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

                    <button className="btn-outline group inline-flex items-center gap-2">
                      Learn More 
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
