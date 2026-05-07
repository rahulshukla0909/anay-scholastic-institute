import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, BookMarked, Lightbulb } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about-section" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-brand-navy mb-4">About Anay Scholastic Institute</h2>
          <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full mb-8" />
        </motion.div>

        <div className="max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="prose prose-lg text-slate-600 max-w-none space-y-6">
              <p className="font-semibold text-brand-navy text-3xl leading-tight">
                Empowering Minds, <span className="text-brand-orange">Creating Future Leaders</span>.
              </p>
              <p className="text-lg">
                Anay Scholastic Institute (ASI) was established with a singular vision: to revolutionize the way students learn and succeed. Located in the heart of Tikamgarh, we offer a comprehensive educational ecosystem for students from <strong>Class 6th to 10th</strong>, along with specialized coaching for <strong>SSC, Banking, and Spoken English</strong>.
              </p>
              <p className="text-lg">
                Hamara mission hai har student ko strong concepts, smart strategy aur consistent practice ke through success tak pahunchana. Teaching approach simple, practical aur result-oriented hai, jisse har student apni performance me significant improvement la sakta hai.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <div className="flex items-center gap-2 px-6 py-2.5 bg-white rounded-full shadow-sm border border-slate-100 text-brand-navy font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-orange" /> Concept Clarity
                </div>
                <div className="flex items-center gap-2 px-6 py-2.5 bg-white rounded-full shadow-sm border border-slate-100 text-brand-navy font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-navy" /> Result Oriented
                </div>
                <div className="flex items-center gap-2 px-6 py-2.5 bg-white rounded-full shadow-sm border border-slate-100 text-brand-navy font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-orange" /> Expert Faculty
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:bg-brand-orange transition-all duration-500">
              <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-4 group-hover:bg-white group-hover:text-brand-orange transition-colors">
                <Target size={30} />
              </div>
              <h4 className="font-bold text-brand-navy group-hover:text-white transition-colors">Goal Oriented</h4>
              <p className="text-sm text-slate-500 group-hover:text-white/80 transition-colors mt-2">Focused on results & academic success.</p>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:bg-brand-navy transition-all duration-500">
              <div className="w-14 h-14 bg-brand-navy/10 rounded-2xl flex items-center justify-center text-brand-navy mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors">
                <Users size={30} />
              </div>
              <h4 className="font-bold text-brand-navy group-hover:text-white transition-colors">Personal Attention</h4>
              <p className="text-sm text-slate-500 group-hover:text-white/80 transition-colors mt-2">Small batch sizes for better guidance.</p>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:bg-brand-navy transition-all duration-500">
              <div className="w-14 h-14 bg-brand-navy/10 rounded-2xl flex items-center justify-center text-brand-navy mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors">
                <BookMarked size={30} />
              </div>
              <h4 className="font-bold text-brand-navy group-hover:text-white transition-colors">Expert Content</h4>
              <p className="text-sm text-slate-500 group-hover:text-white/80 transition-colors mt-2">NCERT & Exam pattern based study material.</p>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:bg-brand-orange transition-all duration-500">
              <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-4 group-hover:bg-white group-hover:text-brand-orange transition-colors">
                <Lightbulb size={30} />
              </div>
              <h4 className="font-bold text-brand-navy group-hover:text-white transition-colors">Smart Strategy</h4>
              <p className="text-sm text-slate-500 group-hover:text-white/80 transition-colors mt-2">Shortcut techniques for competitive exams.</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-24 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
              <h3 className="text-3xl font-bold text-brand-navy mb-6 flex items-center gap-3 text-balance">
                <span className="w-10 h-10 bg-brand-orange text-white rounded-xl flex items-center justify-center text-lg shrink-0">EN</span>
                Our Story
              </h3>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p className="font-semibold text-brand-navy text-lg">
                  Anay Scholastic Institute was founded in 2023 with a clear vision—to make quality education accessible, understandable, and empowering for every student.
                </p>
                <p>
                  The name <span className="text-brand-orange font-bold uppercase tracking-wider">ANAY</span> stands for <span className="italic">“Anyone Now Achieve Everything”</span>, reflecting our core belief that no student is weak—only the way of teaching needs to improve.
                </p>
                <p>
                  At Anay Scholastic Institute, we focus especially on those students who find it difficult to understand concepts, who hesitate to ask questions, or who feel discouraged. We aim to build their confidence, strengthen their basics, and guide them step by step towards success.
                </p>
                <ul className="space-y-2 pt-2">
                  <li className="flex gap-2">👉 <span>Clear concepts</span></li>
                  <li className="flex gap-2">👉 <span>Build confidence</span></li>
                  <li className="flex gap-2">👉 <span>Ensure every student realizes their true potential</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-brand-navy p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 text-balance">
                <span className="w-10 h-10 bg-white text-brand-navy rounded-xl flex items-center justify-center text-lg shrink-0">HI</span>
                हमारी कहानी
              </h3>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p className="font-semibold text-white">
                  अनय स्कॉलास्टिक इंस्टीट्यूट की शुरुआत वर्ष 2023 में एक स्पष्ट उद्देश्य के साथ की गई—हर छात्र तक ऐसी शिक्षा पहुँचाना जो आसान हो, समझ में आए और उसे आगे बढ़ने के लिए प्रेरित करे।
                </p>
                <p>
                  <span className="text-brand-orange font-bold">ANAY</span> नाम का अर्थ है <span className="italic">“Anyone Now Achieve Everything”</span> यानी “कोई भी व्यक्ति कुछ भी हासिल कर सकता है”। यह हमारे विश्वास को दर्शाता है कि कोई भी छात्र कमजोर नहीं होता।
                </p>
                <p>
                  अनय स्कॉलास्टिक इंस्टीट्यूट विशेष रूप से उन छात्रों के लिए है जिन्हें पढ़ाई समझने में कठिनाई होती है या जिन्हें कोई प्रोत्साहित नहीं करता। हमारा लक्ष्य है छात्रों का आत्मविश्वास बढ़ाना और उनके बेसिक्स मजबूत करना।
                </p>
                <div className="bg-white/10 p-4 rounded-xl border-l-4 border-brand-orange mt-4">
                  <p className="text-white font-medium">हमारा मिशन है:</p>
                  <ul className="space-y-2 mt-2">
                    <li className="flex gap-2">👉 <span>कॉन्सेप्ट को आसान बनाना</span></li>
                    <li className="flex gap-2">👉 <span>आत्मविश्वास बढ़ाना</span></li>
                    <li className="flex gap-2">👉 <span>हर छात्र को उसकी असली क्षमता तक पहुँचाना</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-2xl font-bold text-brand-navy italic">
            "Agar aap school exams me top karna chahte hain ya competitive exams crack karna chahte hain, to Anay Scholastic Institute aapke success ka strong partner hai."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
