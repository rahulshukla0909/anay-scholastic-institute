import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = "918602306316"; // Using one of the provided numbers
  const message = "Hello Anay Scholastic Institute, I have a query regarding...";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      id="whatsapp-float-button"
    >
      <div className="absolute right-full mr-4 bg-white text-slate-800 px-4 py-2 rounded-xl shadow-lg font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </div>
      <MessageCircle size={32} />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
    </motion.a>
  );
};
