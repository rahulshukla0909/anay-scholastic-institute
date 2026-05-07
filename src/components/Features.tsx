import React from 'react';
import { BookOpen, Award, Clock, Smartphone, ShieldCheck, Zap } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="text-brand-orange" />,
    title: "Expert Curriculum",
    description: "In-depth study materials designed by subject matter experts to cover every detail."
  },
  {
    icon: <Award className="text-brand-orange" />,
    title: "Certified Tutors",
    description: "Learn from top-tier educators with years of experience in competitive exams."
  },
  {
    icon: <Zap className="text-brand-orange" />,
    title: "Fast-Track Batches",
    description: "Accelerated learning programs for quick revision and intense preparation."
  },
  {
    icon: <Clock className="text-brand-orange" />,
    title: "Flexi-Timings",
    description: "Multiple batch options during morning and evening to suit your schedule."
  },
  {
    icon: <Smartphone className="text-brand-orange" />,
    title: "App Support",
    description: "24/7 access to recorded lectures and practice tests through our mobile portal."
  },
  {
    icon: <ShieldCheck className="text-brand-orange" />,
    title: "Personal Mentorship",
    description: "One-on-one sessions to track progress and clear individual doubts."
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-brand-navy text-4xl font-bold mb-4">Why Choose Our Institute?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We provide a comprehensive learning ecosystem that focuses on conceptual clarity and rigorous practice.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-colors">
                {React.cloneElement(feature.icon as React.ReactElement, { size: 28 })}
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
