export interface Chapter {
  id: string;
  titleEn: string;
  titleHi: string;
}

export interface Subject {
  id: string;
  nameEn: string;
  nameHi: string;
  chapters: Chapter[];
  color: string;
}

export const ACADEMIC_SUBJECTS: Subject[] = [
  {
    id: 'math',
    nameEn: 'Mathematics',
    nameHi: 'गणित',
    color: 'bg-blue-500',
    chapters: [
      { id: 'm1', titleEn: 'Real Numbers', titleHi: 'वास्तविक संख्याएँ' },
      { id: 'm2', titleEn: 'Polynomials', titleHi: 'बहुपद' },
      { id: 'm3', titleEn: 'Pair of Linear Equations in Two Variables', titleHi: 'दो चर वाले रैखिक समीकरण युग्म' },
      { id: 'm4', titleEn: 'Quadratic Equations', titleHi: 'द्विघात समीकरण' },
      { id: 'm5', titleEn: 'Arithmetic Progressions', titleHi: 'समांतर श्रेढ़ियाँ' },
      { id: 'm6', titleEn: 'Triangles', titleHi: 'त्रिभुज' },
      { id: 'm7', titleEn: 'Coordinate Geometry', titleHi: 'निर्देशांक ज्यामिति' },
      { id: 'm8', titleEn: 'Introduction to Trigonometry', titleHi: 'त्रिकोणमिति का परिचय' },
      { id: 'm9', titleEn: 'Some Applications of Trigonometry', titleHi: 'त्रिकोणमिति के कुछ अनुप्रयोग' },
      { id: 'm10', titleEn: 'Circles', titleHi: 'वृत्त' },
      { id: 'm11', titleEn: 'Areas Related to Circles', titleHi: 'वृत्तों से संबंधित क्षेत्रफल' },
      { id: 'm12', titleEn: 'Surface Areas and Volumes', titleHi: 'पृष्ठीय क्षेत्रफल और आयतन' },
      { id: 'm13', titleEn: 'Statistics', titleHi: 'सांख्यिकी' },
      { id: 'm14', titleEn: 'Probability', titleHi: 'प्रायिकता' },
    ]
  },
  {
    id: 'science',
    nameEn: 'Science',
    nameHi: 'विज्ञान',
    color: 'bg-emerald-500',
    chapters: [
      { id: 's1', titleEn: 'Chemical Reactions and Equations', titleHi: 'रासायनिक अभिक्रियाएँ एवं समीकरण' },
      { id: 's2', titleEn: 'Acids, Bases and Salts', titleHi: 'अम्ल, क्षारक एवं लवण' },
      { id: 's3', titleEn: 'Metals and Non-Metals', titleHi: 'धातु एवं अधातु' },
      { id: 's4', titleEn: 'Carbon and Its Compounds', titleHi: 'कार्बन एवं उसके यौगिक' },
      { id: 's5', titleEn: 'Life Processes', titleHi: 'जैव प्रक्रम' },
      { id: 's6', titleEn: 'Control and Coordination', titleHi: 'नियंत्रण एवं समन्वय' },
      { id: 's7', titleEn: 'How Do Organisms Reproduce?', titleHi: 'जीव जनन कैसे करते हैं?' },
      { id: 's8', titleEn: 'Heredity', titleHi: 'आनुवंशिकता' },
      { id: 's9', titleEn: 'Light – Reflection and Refraction', titleHi: 'प्रकाश – परावर्तन तथा अपवर्तन' },
      { id: 's10', titleEn: 'The Human Eye and the Colourful World', titleHi: 'मानव नेत्र तथा रंगबिरंगा संसार' },
      { id: 's11', titleEn: 'Electricity', titleHi: 'विद्युत' },
      { id: 's12', titleEn: 'Magnetic Effects of Electric Current', titleHi: 'विद्युत धारा के चुंबकीय प्रभाव' },
      { id: 's13', titleEn: 'Our Environment', titleHi: 'हमारा पर्यावरण' },
    ]
  },
  {
    id: 'hindi',
    nameEn: 'Hindi',
    nameHi: 'हिंदी',
    color: 'bg-orange-500',
    chapters: [
      { id: 'h1', titleEn: 'Surdas - Pad', titleHi: 'सूरदास के पद' },
      { id: 'h2', titleEn: 'Ram-Lakshman-Parashuram Samvad', titleHi: 'राम-लक्ष्मण-परशुराम संवाद' },
      { id: 'h3', titleEn: 'Savaiya aur Kavitt', titleHi: 'सवैया और कवित्त (देव)' },
      { id: 'h4', titleEn: 'Aatmakathya', titleHi: 'आत्मकथ्य (जयशंकर प्रसाद)' },
      { id: 'h5', titleEn: 'Utsah / At Nahi Rahi Hai', titleHi: 'उत्साह / अट नहीं रही है' },
      { id: 'h6', titleEn: 'Yeh Danturit Muskan / Fasal', titleHi: 'यह दंतुरित मुस्कान / फसल' },
      { id: 'h7', titleEn: 'Sangatkar', titleHi: 'संगतकार (मंगलेश डबराल)' },
      { id: 'h8', titleHi: 'नेताजी का चश्मा', titleEn: 'Netaji Ka Chashma' },
      { id: 'h9', titleHi: 'बालगोबिन भगत', titleEn: 'Balgobin Bhagat' },
      { id: 'h10', titleHi: 'लखनवी अंदाज़', titleEn: 'Lakhnavi Andaz' },
      { id: 'h11', titleHi: 'मानवीय करुणा की दिव्य चमक', titleEn: 'Manviya Karuna Ki Divya Chamak' },
      { id: 'h12', titleHi: 'एक कहानी यह भी', titleEn: 'Ek Kahani Yeh Bhi' },
      { id: 'h13', titleHi: 'नौबतखाने में इबादत', titleEn: 'Naubatkhan Mein Ibadat' },
      { id: 'h14', titleHi: 'संस्कृति', titleEn: 'Sanskriti' },
      { id: 'h15', titleHi: 'माता का आँचल', titleEn: 'Mata Ka Aanchal' },
      { id: 'h16', titleHi: 'जॉर्ज पंचम की नाक', titleEn: 'George Pancham Ki Naak' },
      { id: 'h17', titleHi: 'साना-साना हाथ जोड़ि', titleEn: 'Sana-Sana Hath Jodi' },
      { id: 'h18', titleHi: 'एही ठैयाँ झुलनी हेरानी हो रामा!', titleEn: 'Ehi Thaiyan Jhulani Herani Ho Rama!' },
      { id: 'h19', titleHi: 'मैं क्यों लिखता हूँ?', titleEn: 'Main Kyon Likhta Hun?' },
    ]
  },
  {
    id: 'english',
    nameEn: 'English',
    nameHi: 'अंग्रेजी',
    color: 'bg-indigo-500',
    chapters: [
      { id: 'e1', titleEn: 'A Letter to God', titleHi: 'A Letter to God' },
      { id: 'e2', titleEn: 'Nelson Mandela: Long Walk to Freedom', titleHi: 'Nelson Mandela' },
      { id: 'e3', titleEn: 'Two Stories about Flying', titleHi: 'Two Stories about Flying' },
      { id: 'e4', titleEn: 'From the Diary of Anne Frank', titleHi: 'Anne Frank' },
    ]
  },
  {
    id: 'sst',
    nameEn: 'SST',
    nameHi: 'सामाजिक विज्ञान',
    color: 'bg-rose-500',
    chapters: [
      { id: 'sst1', titleEn: 'The Rise of Nationalism in Europe', titleHi: 'यूरोप में राष्ट्रवाद' },
      { id: 'sst2', titleEn: 'Nationalism in India', titleHi: 'भारत में राष्ट्रवाद' },
      { id: 'sst3', titleEn: 'Resources and Development', titleHi: 'संसाधन और विकास' },
      { id: 'sst4', titleEn: 'Power Sharing', titleHi: 'सत्ता की साझेदारी' },
    ]
  },
  {
    id: 'sanskrit',
    nameEn: 'Sanskrit',
    nameHi: 'संस्कृत',
    color: 'bg-purple-500',
    chapters: [
      { id: 'sk1', titleEn: 'Shuchi Paryavaranam', titleHi: 'शुचिपर्यावरणम्' },
      { id: 'sk2', titleEn: 'Buddhirbalavati Sada', titleHi: 'बुद्धिर्बलवती सदा' },
    ]
  }
];
