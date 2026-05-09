import React from 'react';
import { motion } from 'motion/react';
import { Camera, MapPin, Star } from 'lucide-react';

const campusImages = [
  {
    url: 'https://images.unsplash.com/photo-1523050853023-8c2d2dabd896?auto=format&fit=crop&q=80&w=800',
    title: 'Our Institute Exterior',
    description: 'Safe and accessible location in Tikamgarh'
  },
  {
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
    title: 'Modern Classroom',
    description: 'Comfortable seating and conducive learning environment'
  },
  {
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
    title: 'Digital Library',
    description: 'Self-study area with high-speed internet access'
  },
  {
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    title: 'Reception & Counseling',
    description: 'Dedicated space for student guidance'
  },
  {
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    title: 'Visual Learning',
    description: 'Well-equipped classrooms with modern teaching aids'
  },
  {
    url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800',
    title: 'Resource Center',
    description: 'Extensive collection of books and practice materials'
  }
];

export const CampusGallery: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden" id="campus-tour">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-bold rounded-full uppercase tracking-widest flex items-center gap-2">
                <Camera size={14} /> Virtual Tour
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6 leading-tight">
              State-of-the-Art <span className="text-brand-orange">Infrastructure</span>
            </h2>
            <p className="text-slate-500 text-lg">
              We provide a superior learning environment designed to minimize distractions and maximize student productivity.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <div className="flex items-center gap-4 text-brand-navy font-bold">
              <div className="text-right">
                <p className="text-2xl">4.9/5</p>
                <p className="text-xs text-slate-400 uppercase">Student Rating</p>
              </div>
              <div className="flex gap-1 text-brand-orange">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campusImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] bg-slate-100 shadow-xl"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h4 className="text-white font-bold text-xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {image.title}
                </h4>
                <p className="text-white/70 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {image.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 bg-brand-navy rounded-[3rem] text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange opacity-10 rounded-full -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-4">
                <MapPin size={32} className="text-brand-orange" />
                Visit Us Today
              </h3>
              <p className="text-slate-300 max-w-xl text-lg">
                Near Shiv Mandir, Mahaveer Residency, Jhansi Road, Tikamgarh, 472001. 
                Experience our facility first-hand and get a free demo class.
              </p>
            </div>
            <a 
              href="https://maps.app.goo.gl/YourMapLink" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary py-4 px-10 whitespace-nowrap"
            >
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
