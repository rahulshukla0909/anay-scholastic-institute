import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, MapPin, Star, Sparkles, Layers, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';

interface GalleryItem {
  url: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  category: 'classroom' | 'library' | 'infrastructure';
}

const campusImages: GalleryItem[] = [
  {
    url: 'images/front.jpg',
    title: 'Our Institute Exterior',
    titleHindi: 'संस्थान का बाहरी परिसर',
    description: 'Safe, premium-built and accessible location situated in Tikamgarh with complete entrance gates.',
    descriptionHindi: 'टीकमगढ़ में स्थित सुरक्षित, शानदार और आसान पहुंच वाला मुख्य संस्थान परिसर।',
    category: 'infrastructure'
  },
  {
    url: 'images/class.jpg',
    title: 'Modern Smart Classroom',
    titleHindi: 'आधुनिक स्मार्ट क्लासरूम',
    description: 'Comfortable individual chairs, brilliant eye-safe lighting and a highly conducive learning setup.',
    descriptionHindi: 'आरामदायक कुर्सियाँ, आँखों के लिए सुरक्षित शानदार लाइटिंग और एकाग्रता बढ़ाने वाला व्यवस्थित ढांचा।',
    category: 'classroom'
  },
  {
    url: 'images/library.jpg',
    title: 'Silent Study Library',
    titleHindi: 'शांत अध्ययन पुस्तकालय',
    description: 'A serene self-study zone stocked with hundreds of academic test materials and reference books.',
    descriptionHindi: 'सैकड़ों महत्वपूर्ण पुस्तकों, प्रश्न पत्रों और संदर्भ सामग्रियों से युक्त शांत स्वाध्याय क्षेत्र।',
    category: 'library'
  },
  {
    url: 'images/library (2).jpg',
    title: 'Digital Focus Study Cabins',
    titleHindi: 'डिजिटल स्टडी केबिन',
    description: 'Individual modular cabins equipped with charging sockets, silent partitions and study light support.',
    descriptionHindi: 'चार्जिंग सॉकेट, शांत पार्टिशन और रीडिंग लाइट्स से लैस व्यक्तिगत शिक्षा केबिन।',
    category: 'library'
  },
  {
    url: 'images/class2.jpg',
    title: 'Admissions & Mentorship Desk',
    titleHindi: 'प्रवेश एवं परामर्श डेस्क',
    description: 'A dedicated space for dynamic student counseling, career guidance, and general inquiries.',
    descriptionHindi: 'विद्यार्थियों के करियर मार्गदर्शन, प्रवेश संबंधी जानकारी और शंका समाधान हेतु समर्पित स्थान।',
    category: 'classroom'
  },
  {
    url: 'https://images.unsplash.com/photo-1575467141241-25536443fbff?auto=format&fit=crop&w=800&q=80',
    title: 'Digital High-Speed 5G Wi-Fi',
    titleHindi: 'हाई-स्पीड 5G वाई-फाई जोन',
    description: 'Continuous ultra high-speed internet support enabling students to download online PDF files and give mock tests.',
    descriptionHindi: 'बिना रुकावट हाई-स्पीड इंटरनेट कनेक्टिविटी ताकि छात्र उपयोगी पीडीएफ़ और टेस्ट सीरीज हल कर सकें।',
    category: 'infrastructure'
  },
  {
    url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    title: '24/7 CCTV Campus Protection',
    titleHindi: '24/7 सीसीटीवी सुरक्षा कवरेज',
    description: 'Multiple active digital cameras keeping the classrooms, lobby and entry-points fully secure at all times.',
    descriptionHindi: 'सुरक्षित वातावरण सुनिश्चित करने हेतु पूरे हॉल, कक्षों और प्रवेश द्वारों पर लगातार तीसरी आंख की नजर।',
    category: 'infrastructure'
  },
  {
    url: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80',
    title: 'Pure RO Chilled Water Station',
    titleHindi: 'शुद्ध आरओ शीतल पेयजल संयंत्र',
    description: 'Strict hygiene control with certified RO water purification plant providing cold and safe drinking water.',
    descriptionHindi: 'छात्रों के अच्छे स्वास्थ्य हेतु विशेष रूप से ठंडा और शुद्ध पीने का पानी उपलब्ध कराने वाली आरओ यूनिट।',
    category: 'infrastructure'
  },
  {
    url: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=80',
    title: '100% Continuous Power Generator Backup',
    titleHindi: '100% निर्बाध पावर बैकअप सुविधा',
    description: 'Heavy duty inverter power configuration ensuring learning sessions never stop during sudden electricity cuts.',
    descriptionHindi: 'अनपेक्षित बिजली कटौती से निपटने के लिए भारी जनरेटर और इन्वर्टर सेटअप ताकि पढ़ाई कभी न रुके।',
    category: 'infrastructure'
  }
];

export const CampusGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'classroom' | 'library' | 'infrastructure'>('all');

  const categories = [
    { id: 'all', label: 'All / सभी', icon: <Layers size={14} /> },
    { id: 'classroom', label: 'Classrooms / कक्षाएं & केबिन', icon: <Camera size={14} /> },
    { id: 'library', label: 'Library study / पुस्तकालय', icon: <GraduationCap size={14} /> },
  ];

  const filteredImages = activeCategory === 'all' 
    ? campusImages 
    : campusImages.filter(img => img.category === activeCategory);

  return (
    <section className="py-24 bg-white overflow-hidden" id="campus-tour">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-bold rounded-full uppercase tracking-widest flex items-center gap-2">
                <Camera size={14} /> Virtual Gallery Tour
              </span>
              <span className="animate-pulse bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Live Tour
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-6 leading-tight">
              Virtual Look around Our <span className="text-brand-orange">Campus</span>
            </h2>
            <p className="text-slate-500 text-lg">
              We offer unmatched amenities meticulously engineered to eliminate visual noise, and foster academic mastery.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block text-right"
          >
            <div className="flex items-center gap-4 text-brand-navy font-bold justify-end">
              <div className="text-right">
                <p className="text-2xl font-black">4.9/5</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Student Infrastructure Rating</p>
              </div>
              <div className="flex gap-1 text-brand-orange">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap gap-2.5 mb-12 p-1.5 bg-slate-50 rounded-[2rem] border border-slate-100 max-w-4xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/10'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}

          {/* New / Glowing Standout Button for Infrastructure */}
          <button
            onClick={() => setActiveCategory('infrastructure')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 relative overflow-hidden group/btn ${
              activeCategory === 'infrastructure'
                ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/25 ring-2 ring-brand-orange ring-offset-2'
                : 'bg-gradient-to-r from-brand-orange/5 to-brand-orange/10 hover:from-brand-orange/10 hover:to-brand-orange/15 text-brand-orange border border-brand-orange/20'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            <ShieldCheck size={15} className="group-hover/btn:rotate-12 transition-transform duration-300" />
            <span>State-of-the-Art Infrastructure / आधुनिक सुविधाएं</span>
            <span className="bg-brand-navy text-[8px] text-white font-extrabold px-1.5 py-0.5 rounded-md leading-none tracking-widest ml-1 group-hover/btn:scale-105 transition-transform">
              NEW
            </span>
          </button>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                layout
                key={image.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-[2.5rem] aspect-[4/3] bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to stock study visual in case of any reference issues
                    const img = e.target as HTMLImageElement;
                    img.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/35 to-transparent opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-left">
                  <div className="flex items-center gap-2 mb-2 translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="bg-brand-orange text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                      {image.category === 'infrastructure' ? '⚡ Infrastructure' : image.category === 'classroom' ? '🏫 Classroom' : '📚 Library'}
                    </span>
                  </div>
                  <h4 className="text-white font-black text-xl mb-1 translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {image.title}
                  </h4>
                  <p className="text-brand-orange font-bold text-xs mb-3 translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {image.titleHindi}
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                    {image.description}
                  </p>
                  <p className="text-slate-400/90 text-[11px] font-medium leading-relaxed mt-1 translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                    {image.descriptionHindi}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Static CTA bottom block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 bg-brand-navy rounded-[3rem] text-white overflow-hidden relative shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange opacity-10 rounded-full -mr-32 -mt-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="text-left">
              <h3 className="text-3xl font-black mb-4 flex items-center gap-4">
                <MapPin size={32} className="text-brand-orange" />
                Visit-Our Institute Campus Today
              </h3>
              <p className="text-slate-300 max-w-xl text-lg font-medium leading-relaxed">
                Near Shiv Mandir, Mahaveer Residency, Jhansi Road, Tikamgarh, 472001. 
                Experience our supreme class setup firsthand and request a free personal guidance demo class.
              </p>
            </div>
            <a 
              href="https://maps.app.goo.gl/c3ZfSJKmY155ua4RA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4.5 bg-brand-orange hover:bg-white hover:text-brand-navy text-white text-sm font-black uppercase tracking-wider rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-2 group whitespace-nowrap"
            >
              Get Directions / रास्ता देखें
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
