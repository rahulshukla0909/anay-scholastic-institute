import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Languages, Landmark, Monitor, Library, ChevronRight } from 'lucide-react';

const courses = [
  {
    id: 'school',
    title: "School Excellence Program",
    subtitle: "Class 6th, 7th, 8th, 9th & 10th",
    description: "Foundation building and concept-focused learning for school students. We cover all major subjects with a focus on board exam preparation.",
    icon: <BookOpen />,
    image: "/images/course_school.png",
    features: ["Subject Wise Experts", "Weekly Unit Tests", "NTSE/Olympiad Prep", "Parent-Teacher Meetings"]
  },
  {
    id: 'spoken',
    title: "English Spoken Classes",
    subtitle: "Master the Art of Communication",
    description: "Build confidence and fluency in English. Our sessions focus on pronunciation, vocabulary expansion, and real-life conversation practice.",
    icon: <Languages />,
    image: "/images/course_spoken.png",
    features: ["Group Discussions", "Personality Development", "Audio-Visual Learning", "Confidence Building"]
  },
  {
    id: 'ssc',
    title: "Competitive English",
    subtitle: "Specialized for SSC & BANKING",
    description: "Targeted English language preparation for competitive exams. Master grammar, comprehension, and vocabulary required specifically for SSC and Banking sectors.",
    icon: <Landmark />,
    image: "/images/course_ssc.png",
    features: ["Previous Year Paper Analysis", "Short-cut Methods", "Mock Tests", "Strategy Sessions"]
  },
  {
    id: 'computer',
    title: "Computer Classes",
    subtitle: "Digital Literacy & Skills",
    description: "From basic operations to advanced software skills. We provide hands-on training for MS Office, Programming Basics, and Digital Tools.",
    icon: <Monitor />,
    image: "/images/course_computer.png",
    features: ["1:1 Computer Access", "Modern Lab Facility", "Project Based Learning", "Certificate of Completion"]
  },
  {
    id: 'library',
    title: "Library Facility",
    subtitle: "Scholar's Hub & Silent Zone",
    description: "A peaceful environment dedicated to self-study. Equipped with reference books, high-speed internet, and comfortable seating.",
    icon: <Library />,
    image: "/images/course_library.png",
    features: ["Silent Study Environment", "Vast Book Collection", "High Speed WiFi", "In-Lab Power Backup"]
  }
];

export const Courses: React.FC = () => {
  return (
    <section id="courses-section" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">Our Programs & Facilities</h2>
          <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full" />
          <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Diverse learning pathways designed to cater to every student's academic and professional needs.
          </p>
        </div>

        <div className="space-y-16">
          {courses.map((course, idx) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-brand-orange/10 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="relative z-10 w-full aspect-[16/9] object-cover rounded-2xl shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-brand-orange shadow-lg">
                    {React.cloneElement(course.icon as React.ReactElement, { size: 24 })}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="inline-block px-4 py-1.5 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                  {course.subtitle}
                </div>
                <h3 className="text-3xl font-bold text-brand-navy mb-4">{course.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                  {course.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {course.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-brand-navy flex items-center justify-center text-white shrink-0">
                        <ChevronRight size={14} strokeWidth={3} />
                      </div>
                      <span className="font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="btn-outline group inline-flex items-center gap-2">
                  Learn More 
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
