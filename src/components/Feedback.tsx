import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send, User, Phone, CheckCircle2 } from 'lucide-react';

export const Feedback: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    feedback: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save this to Firestore
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', mobile: '', feedback: '' });
  };

  return (
    <section id="feedback-section" className="py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full mb-4">
            <MessageSquare size={20} />
            <span className="font-bold text-sm uppercase tracking-wider">Feedback</span>
          </div>
          <h2 className="text-4xl font-bold text-brand-navy mb-4">We Value Your Opinion</h2>
          <p className="text-slate-500 text-lg">Your feedback helps us grow and serve you better.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 relative"
        >
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 text-center"
            >
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-3xl font-bold text-brand-navy mb-2">Thank You!</h3>
              <p className="text-slate-600">Your feedback has been received successfully.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-brand-navy ml-1">Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Enter your name"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="mobile" className="text-sm font-bold text-brand-navy ml-1">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="tel"
                      id="mobile"
                      required
                      placeholder="Enter mobile number"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all"
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="feedback" className="text-sm font-bold text-brand-navy ml-1">Your Feedback</label>
                <textarea
                  id="feedback"
                  required
                  placeholder="Tell us what you think..."
                  rows={5}
                  className="w-full px-6 py-4 bg-white border border-slate-200 rounded-3xl focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all resize-none"
                  value={formData.feedback}
                  onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-navy text-white hover:bg-brand-orange py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-navy/10 hover:shadow-brand-orange/20 transition-all active:scale-[0.98]"
              >
                Submit Feedback
                <Send size={18} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
