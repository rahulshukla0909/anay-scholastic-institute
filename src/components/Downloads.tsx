import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  BookOpen, 
  X, 
  Printer, 
  ZoomIn, 
  CheckCircle, 
  Calendar, 
  Filter, 
  Search, 
  FileQuestion, 
  ChevronRight, 
  FileCheck,
  ArrowLeft
} from 'lucide-react';

interface SubjectBlueprint {
  id: string;
  nameEn: string;
  nameHi: string;
  color: string;
  iconBg: string;
  fileSize: string;
  description: string;
}

interface Chapter {
  num: number;
  name: string;
  marks: string | number;
}

interface Unit {
  id: number;
  title: string;
  chapters: Chapter[];
}

interface QuestionSection {
  titleEn: string;
  titleHi: string;
  questions: string[];
}

interface PastPaper {
  id: string;
  subjectId: string;
  subjectNameEn: string;
  subjectNameHi: string;
  year: number;
  fileSize: string;
  totalMarks: number;
  duration: string;
  examType: string;
  examTypeHi: string;
  color: string;
  sections: QuestionSection[];
}

interface MathChapterQuestion {
  id: string;
  type: 'mcq' | 'subjective' | 'tf' | 'blank';
  text: string;
  options?: string[];
  answer?: string;
  solution?: string;
  renderSvgType?: string;
  orQuestion?: {
    text: string;
    solution?: string;
    renderSvgType?: string;
  };
}

interface ChapterGroup {
  year: string;
  questions: MathChapterQuestion[];
}

const mathChapterQuestions: { [chapterName: string]: ChapterGroup[] } = {
  'Real Numbers': [
    {
      year: '2019',
      questions: [
        {
          id: 'rn-2019-1',
          type: 'mcq',
          text: 'The H.C.F. of 96 and 404 is :',
          options: ['120', '4', '10', '3'],
          answer: '4',
          solution: 'Prime factorization:\n96 = 2⁵ × 3\n404 = 2² × 101\nH.C.F. = 2² = 4. Hence, the correct option is (b) 4.'
        },
        {
          id: 'rn-2019-2',
          type: 'subjective',
          text: 'Find the LCM and HCF of 6 and 20 by the prime factorisation method. (2019)',
          solution: '6 = 2 × 3\n20 = 2² × 5\nHCF = smallest power of common factor = 2\nLCM = highest powers of all prime factors = 2² × 3 × 5 = 60.',
          orQuestion: {
            text: 'Find the H.C.F. of 6, 72 and 120 using the prime factorisation method.',
            solution: '6 = 2 × 3\n72 = 2³ × 3²\n120 = 2³ × 3 × 5\nCommon factors: 2¹ and 3¹\nHCF = 2 × 3 = 6.'
          }
        },
        {
          id: 'rn-2019-3',
          type: 'subjective',
          text: 'Prove that √5 - 3 is irrational number.',
          solution: 'Let √5 - 3 be rational, equal to a/b (where a and b are co-prime integers, b ≠ 0).\na/b = √5 - 3\na/b + 3 = √5\n(a + 3b) / b = √5\nSince a, b are integers, (a + 3b)/b is rational. Hence, √5 is rational.\nBut √5 is irrational. This contradiction proves that √5 - 3 is irrational.'
        }
      ]
    },
    {
      year: '2020',
      questions: [
        {
          id: 'rn-2020-1',
          type: 'mcq',
          text: 'The H.C.F. of 12, 15 and 21 is:',
          options: ['420', '210', '9', '3'],
          answer: '3',
          solution: '12 = 2² × 3\n15 = 3 × 5\n21 = 3 × 7\nH.C.F. = smallest power of common factor = 3¹ = 3. Correct option is (d) 3.'
        },
        {
          id: 'rn-2020-2',
          type: 'subjective',
          text: 'Find the HCF of 96 and 404 by the prime factorisation method.',
          solution: '96 = 2⁵ × 3\n404 = 2² × 101\nH.C.F. = 2² = 4.'
        },
        {
          id: 'rn-2020-3',
          type: 'subjective',
          text: 'Prove that 3 + 2√5 is irrational number.',
          solution: 'Let 3 + 2√5 be rational, equal to a/b (co-prime integers, b ≠ 0).\n3 + 2√5 = a/b\n2√5 = a/b - 3 = (a - 3b)/b\n√5 = (a - 3b)/(2b)\nSince a, b are integers, (a - 3b)/(2b) is rational, requiring √5 to be rational.\nBut √5 is irrational. Hence, 3 + 2√5 is irrational.',
          orQuestion: {
            text: 'Given that HCF (306, 657) = 9, find LCM (306, 657).',
            solution: 'HCF × LCM = Product of two numbers\n9 × LCM = 306 × 657\nLCM = (306 × 657)/9 = 34 × 657 = 22,338.'
          }
        },
        {
          id: 'rn-2020-4',
          type: 'mcq',
          text: 'For some integers m, every even integer is of the form:',
          options: ['m', 'm+1', '2m', '2m+1'],
          answer: '2m',
          solution: 'An even integer is any integer divisible by 2. Thus, it can lead to the form 2m for an integer m.'
        },
        {
          id: 'rn-2020-5',
          type: 'subjective',
          text: 'Find the LCM and HCF of 8, 9 and 25 by the prime factorisation method.',
          solution: '8 = 2³\n9 = 3²\n25 = 5²\nHCF = 1 (no common factors)\nLCM = 2³ × 3² × 5² = 8 × 9 × 25 = 1800.'
        },
        {
          id: 'rn-2020-6',
          type: 'subjective',
          text: 'Prove that √3 is irrational number.',
          solution: 'Assume √3 = a/b is rational (co-prime, b ≠ 0).\n3 = a²/b² ⇒ a² = 3b² (so 3 divides a² and 3 divides a)\nLet a = 3c ⇒ (3c)² = 3b² ⇒ 9c² = 3b² ⇒ b² = 3c² (so 3 divides b² and 3 divides b)\nThis means 3 is a common factor, which contradicts that a and b are co-prime. Hence, √3 is irrational.'
        },
        {
          id: 'rn-2020-7',
          type: 'tf',
          text: '√2 is rational number (True/False)',
          answer: 'False',
          solution: '√2 is irrational. It cannot be expressed as p/q. Thus, the statement is False.'
        }
      ]
    },
    {
      year: '2021',
      questions: [
        {
          id: 'rn-2021-1',
          type: 'tf',
          text: '√5 is rational number (True/False).',
          answer: 'False',
          solution: '√5 is irrational, so the statement "√5 is rational" is False.'
        },
        {
          id: 'rn-2021-2',
          type: 'subjective',
          text: 'Express number 140 as a product of its Prime factors.',
          solution: '140 = 2 × 70 = 2 × 2 × 35 = 2 × 2 × 5 × 7 = 2² × 5 × 7.',
          orQuestion: {
            text: 'Find the LCM and HCF of 8, 9 and 25 by the prime factorisation method.',
            solution: '8 = 2³\n9 = 3²\n25 = 5²\nHCF = 1\nLCM = 2³ × 3² × 5² = 1800.'
          }
        },
        {
          id: 'rn-2021-3',
          type: 'subjective',
          text: 'Prove that √3 is irrational number.',
          solution: 'Assume √3 = a/b is rational (co-prime, b ≠ 0).\n3b² = a² ⇒ 3 divides a.\nLet a = 3c ⇒ 3b² = 9c² ⇒ b² = 3c² ⇒ 3 divides b.\nThis contradicts that a, b are co-prime, so √3 is irrational.'
        }
      ]
    },
    {
      year: '2022',
      questions: [
        {
          id: 'rn-2022-1',
          type: 'mcq',
          text: 'HCF of (91,21) is:',
          options: ['91', '21', '7', '13'],
          answer: '7',
          solution: '91 = 7 × 13\n21 = 3 × 7\nH.C.F. = common factor = 7. Correct option is (c) 7.'
        },
        {
          id: 'rn-2022-2',
          type: 'blank',
          text: 'HCF(a,b) x LCM(a,b) = ________________',
          answer: 'a * b',
          solution: 'Product of two positive numbers is equal to the product of their HCF and LCM: a × b.'
        },
        {
          id: 'rn-2022-3',
          type: 'subjective',
          text: 'Find the LCM and HCF of 6, 72 and 120 by the prime factorisation method.',
          solution: '6 = 2 × 3\n72 = 2³ × 3²\n120 = 2³ × 3 × 5\nHCF = 2 × 3 = 6\nLCM = 2³ × 3² × 5 = 360.'
        }
      ]
    },
    {
      year: '2023',
      questions: [
        {
          id: 'rn-2023-1',
          type: 'mcq',
          text: 'HCF of (6,20) is:',
          options: ['6', '20', '2', '120'],
          answer: '2',
          solution: '6 = 2 × 3\n20 = 2² × 5\nH.C.F. = 2. Correct option is (c) 2.'
        },
        {
          id: 'rn-2023-2',
          type: 'blank',
          text: '√2 is a ________________ number. (rational / irrational)',
          answer: 'irrational',
          solution: '√2 cannot be written as p/q. It is an irrational number.'
        },
        {
          id: 'rn-2023-3',
          type: 'subjective',
          text: 'Express number 140 as a product of its Prime factors',
          solution: '140 = 2² × 5 × 7.',
          orQuestion: {
            text: 'Given that HCF (306, 657) = 9, find LCM (306, 657).',
            solution: 'LCM = (306 × 657)/9 = 22,338.'
          }
        },
        {
          id: 'rn-2023-4',
          type: 'subjective',
          text: 'Show that 3 / √2 is irrational.',
          solution: 'Let 3 / √2 = a/b is rational (co-prime, b ≠ 0).\n√2 = 3b/a.\nSince a, b are integers, 3b/a is rational, which translates to √2 being rational.\nContradictuon! Hence, 3 / √2 is irrational.',
          orQuestion: {
            text: 'Find the HCF of 17, 23 and 29.',
            solution: '17, 23, and 29 are prime numbers, so they have no common factors except 1. HCF = 1.'
          }
        }
      ]
    },
    {
      year: '2024',
      questions: [
        {
          id: 'rn-2024-1',
          type: 'blank',
          text: '√3 is a _________________ number.',
          answer: 'irrational',
          solution: '√3 is an irrational number.'
        },
        {
          id: 'rn-2024-2',
          type: 'subjective',
          text: 'Find the H.C.F. of the numbers 6 and 20',
          solution: '6 = 2 × 3, 20 = 2² × 5. H.C.F. = 2.',
          orQuestion: {
            text: 'Express the number 140 as a product of its prime factors.',
            solution: '140 = 2² × 5 × 7.'
          }
        },
        {
          id: 'rn-2024-3',
          type: 'subjective',
          text: 'Find the L.C.M. and H.C.F. of 8, 9 and 25 by applying the prime factorization method.',
          solution: '8 = 2³, 9 = 3², 25 = 5². HCF = 1, LCM = 8 × 9 × 25 = 1800.',
          orQuestion: {
            text: 'Prove that 7√5 is irrational number.',
            solution: 'Let 7√5 = a/b is rational.\n√5 = a/(7b).\nSince a/(7b) is rational, √5 must be rational. But √5 is irrational. Hence, 7√5 is irrational.'
          }
        }
      ]
    },
    {
      year: '2025',
      questions: [
        {
          id: 'rn-2025-1',
          type: 'mcq',
          text: 'HCF of (6,20) is:',
          options: ['6', '20', '2', '120'],
          answer: '2',
          solution: '6 = 2 × 3\n20 = 2² × 5\nH.C.F. = 2. Correct option is (c) 2.'
        },
        {
          id: 'rn-2025-2',
          type: 'blank',
          text: '√2 is a _________________ number.',
          answer: 'irrational',
          solution: '√2 is an irrational number.'
        },
        {
          id: 'rn-2025-3',
          type: 'subjective',
          text: 'Find the HCF of 96 and 404 by the prime factorisation method.',
          solution: '96 = 2⁵ × 3, 404 = 2² × 101. HCF = 2² = 4.',
          orQuestion: {
            text: 'Express the number 140 as a product of its prime factors.',
            solution: '140 = 2² × 5 × 7.'
          }
        },
        {
          id: 'rn-2025-4',
          type: 'subjective',
          text: 'Write the Statement of fundamental theorem of Arithmetic',
          solution: 'Fundamental Theorem of Arithmetic states that database factorizations of composite numbers are unique up to their ordering of prime factors: "Every composite number can be unique factorized into prime products."',
          orQuestion: {
            text: 'Explain why 7 × 11 × 13 + 13 and 7 × 6 × 5 × 4 × 3 × 2 × 1 + 5 are composite numbers.',
            solution: '7 × 11 × 13 + 13 = 13 × (77 + 1) = 13 × 78 which is composite because it has factors other than 1 and itself.\n7 × 6 × 5 × 4 × 3 × 2 × 1 + 5 = 5 × (1008 + 1) = 5 × 1009 which is also composite.'
          }
        }
      ]
    },
    {
      year: '2026',
      questions: [
        {
          id: 'rn-2026-1',
          type: 'mcq',
          text: 'H.C.F. of any two co-prime numbers is:',
          options: ['1', '2', '0', '3'],
          answer: '1',
          solution: 'Co-prime numbers do not possess any mutual divisor other than 1. Thus their H.C.F. is 1. Option (a) 1 is correct.'
        },
        {
          id: 'rn-2026-2',
          type: 'subjective',
          text: 'Find the H.C.F. of the numbers 6 and 20',
          solution: '6 = 2 × 3, 20 = 2² × 5. H.C.F. = 2.',
          orQuestion: {
            text: 'Express the number 156 as a product of its prime factors.',
            solution: '156 ÷ 2 = 78; 78 ÷ 2 = 39; 39 ÷ 3 = 13; 13 ÷ 13 = 1.\n156 = 2² × 3 × 13.'
          }
        },
        {
          id: 'rn-2026-3',
          type: 'subjective',
          text: 'Given that HCF (306, 657) = 9, find LCM (306, 657).',
          solution: 'LCM(306, 657) = (306 × 657) / 9 = 22,338.',
          orQuestion: {
            text: 'Find the LCM and HCF of 6,72 and 120 by the prime factorisation method.',
            solution: '6 = 2 × 3\n72 = 2³ × 3²\n120 = 2³ × 3 × 5\nHCF = 6\nLCM = 2³ × 3² × 5 = 360.'
          }
        }
      ]
    }
  ],
  'Polynomials': [
    {
      year: '2019',
      questions: [
        {
          id: 'poly-2019-1',
          type: 'mcq',
          text: 'If α and β are the zeroes of the quadratic polynomial ax² + bx + c, then the value of α·β is:\nयदि α और β द्विघात बहुपद ax² + bx + c के शून्यक हैं, तो α·β का मान होगा:',
          options: ['c/a', 'a/c', '-c/a', '-a/c'],
          answer: 'c/a',
          solution: 'The product of zeroes of a quadratic polynomial ax² + bx + c is given by:\nα·β = constant term / coefficient of x² = c/a.\nद्विघात बहुपद के शून्यकों का गुणनफल सूत्र:\nα·β = अचर पद / x² का गुणांक = c/a. अतः सही विकल्प (a) है।'
        },
        {
          id: 'poly-2019-2',
          type: 'mcq',
          text: 'The zeroes of the polynomial x² - 3 will be:\nबहुपद x² - 3 के शून्यक होंगे:',
          options: ['√3, -√3', '3, -3', '3, 3', '9, -9'],
          answer: '√3, -√3',
          solution: 'To find the zeroes, set the polynomial to 0:\nx² - 3 = 0 ⇒ x² = 3 ⇒ x = ±√3\nSo the zeroes are √3 and -√3.\nशून्यक ज्ञात करने के लिए बहुपद को 0 के बराबर रखें:\nx² - 3 = 0 ⇒ x² = 3 ⇒ x = ±√3\nअतः बहुपद के शून्यक √3 और -√3 हैं। सही विकल्प (a) है।'
        },
        {
          id: 'poly-2019-3',
          type: 'subjective',
          text: 'Find a quadratic polynomial, the sum and product of whose zeroes are -3 and 2 respectively.\nएक द्विघात बहुपद ज्ञात कीजिए, जिसके शून्यकों का योग तथा गुणनफल क्रमशः -3 और 2 हैं।',
          solution: 'Let the quadratic polynomial be k(x² - Sx + P), where S is the sum of zeroes and P is the product of zeroes.\nGiven:\nSum of zeroes (S) = -3\nProduct of zeroes (P) = 2\nRequired polynomial:\nx² - (-3)x + 2 = x² + 3x + 2 (taking k = 1).\nमाना द्विघात बहुपद k(x² - Sx + P) है, जहाँ S शून्यकों का योग और P शून्यकों का गुणनफल है।\nदिया है:\nशून्यकों का योग (S) = -3\nशून्यकों का गुणनफल (P) = 2\nअतः अभीष्ट बहुपद होगा:\nx² - (-3)x + 2 = x² + 3x + 2 (k = 1 लेने पर)।'
        },
        {
          id: 'poly-2019-4',
          type: 'subjective',
          text: 'Find the zeroes of the quadratic polynomial x² + 7x + 10 and verify the relationship between the zeroes and the coefficients.\nद्विघात बहुपद x² + 7x + 10 के शून्यक ज्ञात कीजिए और शून्यकों तथा गुणांकों के बीच के संबंध की सत्यता की जांच कीजिए।',
          solution: 'Factoring the polynomial:\nx² + 7x + 10 = x² + 5x + 2x + 10\n= x(x + 5) + 2(x + 5) = (x + 2)(x + 5)\nSo points where polynomial is 0 are x = -2 and x = -5.\nLet zeroes be α = -2 and β = -5.\nVerification of relationship:\n1) Sum of zeroes: α + β = -2 + (-5) = -7\nFormula: -b/a = -7 / 1 = -7. (Verified)\n2) Product of zeroes: α·β = (-2) × (-5) = 10\nFormula: c/a = 10 / 1 = 10. (Verified)\n\nबहुपद के गुणनखंड करने पर:\nx² + 7x + 10 = x² + 5x + 2x + 10 = (x + 2)(x + 5)\nइसलिए शून्यक α = -2 और β = -5 हैं।\nसंबंधों का सत्यापन:\n1) शून्यकों का योग: α + β = -2 + (-5) = -7, सूत्र -b/a = -7 / 1 = -7. (सत्यापित)\n2) शून्यकों का गुणनफल: α·β = (-2) × (-5) = 10, सूत्र c/a = 10 / 1 = 10. (सत्यापित)'
        }
      ]
    },
    {
      year: '2020',
      questions: [
        {
          id: 'poly-2020-1',
          type: 'mcq',
          text: 'Maximum number of zeroes in quadratic polynomial ax² + bx + c will be:\nद्विघात बहुपद ax² + bx + c में शून्यकों की अधिकतम संख्या होगी:',
          options: ['4', '1', '3', '2'],
          answer: '2',
          solution: 'The maximum number of zeroes a polynomial can have is equal to its degree. Since a quadratic polynomial is of degree 2, it can have at most 2 zeroes. Hence, the correct option is (d) 2.\nकिसी बहुपद के शून्यकों की अधिकतम संख्या उसकी घात के समान होती है। चूंकि द्विघात बहुपद की घात 2 होती है, अतः इसके अधिकतम 2 शून्यक हो सकते हैं। सही विकल्प (d) 2 है।'
        },
        {
          id: 'poly-2020-2',
          type: 'blank',
          text: 'The sum of two polynomials is always a ______________.\nदो बहुपदों का योग हमेशा एक ______________ होता है।',
          answer: 'polynomial',
          solution: 'The sum of two polynomials is always a polynomial.\nदो बहुपदों का योग हमेशा एक बहुपद (polynomial) होता है।'
        },
        {
          id: 'poly-2020-3',
          type: 'blank',
          text: 'Sum of zeroes of the polynomial x² + 4x + 8 is ______________.\nबहुपद x² + 4x + 8 के शून्यकों का योग ______________ है।',
          answer: '-4',
          solution: 'Comparing to ax² + bx + c:\na = 1, b = 4, c = 8\nSum of zeroes (α+β) = -b/a = -4/1 = -4.\nबहुपद x² + 4x + 8 के लिए, a = 1, b = 4, c = 8.\nशून्यकों का योग = -b/a = -4/1 = -4.'
        },
        {
          id: 'poly-2020-4',
          type: 'subjective',
          text: 'Find the zeroes of the quadratic polynomial x² - 5x + 6.\nद्विघात बहुपद x² - 5x + 6 के शून्यक ज्ञात कीजिए।',
          solution: 'Splitting the middle term:\nx² - 5x + 6 = x² - 3x - 2x + 6\n= x(x - 3) - 2(x - 3) = (x - 2)(x - 3)\nEquating to 0, zeroes are x = 2 and x = 3.\nमध्य पद को विभाजित करने पर:\nx² - 5x + 6 = x² - 3x - 2x + 6 = (x - 2)(x - 3)\nशून्यक ज्ञात करने के लिए 0 के बराबर रखने पर, शून्यक x = 2 और x = 3 हैं।',
          orQuestion: {
            text: 'Find the sum and product of zeroes of quadratic polynomial 2x² - 8x + 7.\nद्विघात बहुपद 2x² - 8x + 7 के शून्यकों का योगफल और गुणनफल ज्ञात कीजिए।',
            solution: 'Comparing 2x² - 8x + 7 with ax² + bx + c:\na = 2, b = -8, c = 7\nSum of zeroes (α + β) = -b/a = -(-8)/2 = 8 / 2 = 4\nProduct of zeroes (α·β) = c/a = 7 / 2 = 3.5.\nद्विघात बहुपद 2x² - 8x + 7 की तुलना ax² + bx + c से करने पर:\na = 2, b = -8, c = 7\nशून्यकों का योग (α + β) = -b/a = -(-8)/2 = 4\nशून्यकों का गुणनफल (α·β) = c/a = 7/2 = 3.5.'
          }
        }
      ]
    },
    {
      year: '2021',
      questions: [
        {
          id: 'poly-2021-1',
          type: 'blank',
          text: 'Product of zeroes in polynomial ax² + bx + c = 0 is ______________.\nबहुपद ax² + bx + c = 0 में शून्यकों का गुणनफल _____________ होता है।',
          answer: 'c/a',
          solution: 'Product of zeroes α·β = c/a.\nशून्यकों का गुणनफल α·β = c/a होता है।'
        },
        {
          id: 'poly-2021-2',
          type: 'tf',
          text: '1 and 4 are the zeroes of polynomial x² - 3x - 4. (True / False)\n1 और 4 बहुपद x² - 3x - 4 के शून्यक हैं। (सत्य / असत्य)',
          answer: 'False',
          solution: 'Let us test if x = 1 is a zero:\nP(1) = 1² - 3(1) - 4 = 1 - 3 - 4 = -6 ≠ 0. Since P(1) is not 0, 1 is not a zero. Thus the statement is False. (Actual zeroes are -1 and 4).\nयदि x = 1 को बहुपद में रखें:\nP(1) = 1² - 3(1) - 4 = -6 ≠ 0. चूंकि P(1) शून्य नहीं है, अतः 1 इस बहुपद का शून्यक नहीं है। इसलिए यह कथन असत्य (False) है (वास्तविक शून्यक -1 और 4 हैं)।'
        },
        {
          id: 'poly-2021-3',
          type: 'subjective',
          text: 'Find the zeroes of the following polynomial and verify the relationship between the zeroes and the coefficients: 4s² - 4s + 1.\nनिम्न बहुपद के शून्यक ज्ञात कीजिए और शून्यकों तथा गुणांकों के बीच के संबंध की सत्यता की जांच कीजिए: 4s² - 4s + 1.',
          solution: '4s² - 4s + 1 = (2s - 1)²\nSo, zeroes are s = 1/2 and s = 1/2.\nVerification:\n1) Sum of zeroes: 1/2 + 1/2 = 1. Formula -b/a = -(-4)/4 = 1. (Verified)\n2) Product of zeroes: 1/2 × 1/2 = 1/4. Formula c/a = 1/4. (Verified)\n\n4s² - 4s + 1 = (2s - 1)²\nअतः शून्यक s = 1/2 और s = 1/2 हैं।\nसंबंधों का सत्यापन:\nशून्यकों का योग = 1/2 + 1/2 = 1, सूत्र -b/a = -(-4)/4 = 1. (सत्यापित)\nशून्यकों का गुणनफल = 1/2 × 1/2 = 1/4, सूत्र c/a = 1/4. (सत्यापित)',
          orQuestion: {
            text: 'The graphs of y = P(x) are given in the figure. Find the number of zeroes of P(x).\nनीचे दी गई आकृति में y = P(x) का ग्राफ दिया गया है। P(x) के शून्यकों की संख्या ज्ञात कीजिए।',
            renderSvgType: 'poly-graph-2021-3-or',
            solution: 'Looking at the given graph, the curve P(x) intersects/crosses the horizontal x-axis at 4 distinct points. Therefore, the number of zeroes of P(x) is exactly 4.\nदिए गए ग्राफ को देखने पर, वक्र P(x) क्षैतिज x-अक्ष (x-axis) को 4 अलग-अलग बिंदुओं पर प्रतिच्छेद करता है। अतः, बहुपद P(x) के शून्यकों की संख्या 4 है।'
          }
        },
        {
          id: 'poly-2021-4',
          type: 'subjective',
          text: 'Find the zeroes of the quadratic polynomial x² + 7x + 10 and verify the relationship between the zeroes and the coefficients.\nद्विघात बहुपद x² + 7x + 10 के शून्यक ज्ञात कीजिए और शून्यकों तथा गुणांकों के बीच के संबंध की सत्यता की जांच कीजिए।',
          solution: 'x² + 7x + 10 = (x + 2)(x + 5) ⇒ zeroes are -2 and -5.\nSum of zeroes: α + β = -2 + (-5) = -7, -b/a = -7 / 1 = -7. (Verified)\nProduct of zeroes: α·β = 10, c/a = 10. (Verified)\n\nx² + 7x + 10 = (x + 2)(x + 5) ⇒ शून्यक -2 और -5 हैं।\nयोग = -7 = -b/a, गुणनफल = 10 = c/a. सत्यापित।',
          orQuestion: {
            text: 'Find the zeroes of the polynomial x² - 3 and verify the relationship between the zeroes and the coefficients.\nबहुपद x² - 3 के शून्यक ज्ञात कीजिए और शून्यकों तथा गुणांकों के बीच के संबंध की सत्यता की जांच कीजिए।',
            solution: 'x² - 3 = (x - √3)(x + √3) ⇒ zeroes are √3 and -√3.\nSum of zeroes: √3 + (-√3) = 0. -b/a = -0/1 = 0. (Verified)\nProduct of zeroes: √3 × (-√3) = -3. c/a = -3. (Verified)\n\nx² - 3 = (x - √3)(x + √3) ⇒ शून्यक √3 और -√3 हैं।\nयोग: 0 = -b/a, गुणनफल: -3 = c/a. सत्यापित।'
          }
        }
      ]
    },
    {
      year: '2022',
      questions: [
        {
          id: 'poly-2022-1',
          type: 'mcq',
          text: 'The sum of the zeroes of the quadratic polynomial ax² + bx + c will be:\nद्विघात बहुपद ax² + bx + c के शून्यकों का योग होगा:',
          options: ['b/a', '-b/a', 'c/a', '-c/a'],
          answer: '-b/a',
          solution: 'Sum of zeroes = -b/a. Correct option is (b).\nशून्यकों का योग = -b/a. सही विकल्प (b) है।'
        },
        {
          id: 'poly-2022-2',
          type: 'blank',
          text: 'A polynomial of degree 3 is called a ____________ polynomial.\nघात 3 के बहुपद को ____________ बहुपद कहा जाता है।',
          answer: 'cubic',
          solution: 'A polynomial of degree 3 is called a cubic polynomial.\nघात 3 के बहुपद को त्रिघात (cubic) बहुपद कहा जाता है।'
        },
        {
          id: 'poly-2022-3',
          type: 'blank',
          text: 'If a, b and c are real numbers and a ≠ 0, then the quadratic polynomial is of the form ____________.\nयदि a, b और c वास्तविक संख्याएँ हैं और a ≠ 0, तो द्विघात बहुपद ____________ रूप का होता है।',
          answer: 'ax^2 + bx + c',
          solution: 'The standard form is ax² + bx + c.\nद्विघात बहुपद का मानक रूप ax² + bx + c है।'
        },
        {
          id: 'poly-2022-4',
          type: 'tf',
          text: 'The value of x in x(x - 1) = 0 are zero and one. (True / False)\nx(x - 1) = 0 में x के मान शून्य और एक हैं। (सत्य / असत्य)',
          answer: 'True',
          solution: 'x(x - 1) = 0 ⇒ x = 0 or x - 1 = 0 ⇒ x = 0, 1. The statement is True.\nx(x - 1) = 0 ⇒ x = 0 या x = 1. अतः यह कथन बिल्कुल सत्य (True) है।'
        },
        {
          id: 'poly-2022-5',
          type: 'subjective',
          text: 'Find the zeroes of the quadratic polynomial 6x² - 3 - 7x.\nद्विघात बहुपद 6x² - 3 - 7x के शून्यक ज्ञात कीजिए।',
          solution: 'Rearranging terms: 6x² - 7x - 3\nSplitting middle term: 6x² - 9x + 2x - 3\n= 3x(2x - 3) + 1(2x - 3) = (3x + 1)(2x - 3)\nZeroes are obtained when: 3x + 1 = 0 ⇒ x = -1/3, and 2x - 3 = 0 ⇒ x = 3/2.\nSo zeroes are -1/3 and 3/2.\n\nपदों को व्यवस्थित करने पर: 6x² - 7x - 3\nमध्य पद को विभाजित करने पर: 6x² - 9x + 2x - 3 = (3x + 1)(2x - 3)\nशून्यक x = -1/3 और x = 3/2 प्राप्त होते हैं।',
          orQuestion: {
            text: 'Find the quadratic polynomial, the sum and product of whose zeroes are 1 and 1 respectively.\nद्विघात बहुपद ज्ञात कीजिए, जिसके शून्यकों का योग और गुणनफल क्रमशः 1 और 1 हैं।',
            solution: 'Sum S = 1, Product P = 1.\nQuadratic Polynomial: x² - Sx + P = x² - (1)x + 1 = x² - x + 1.\nयोग S = 1, गुणनफल P = 1.\nद्विघात बहुपद: x² - Sx + P = x² - x + 1.'
          }
        }
      ]
    },
    {
      year: '2023',
      questions: [
        {
          id: 'poly-2023-1',
          type: 'mcq',
          text: 'Write the standard form of a quadratic equation:\nद्विघात समीकरण का मानक रूप लिखिए:',
          options: ['a²x + bx + c = 0', 'ax² + bx + c', 'ax² + bx + c = 0', 'a²x + bx + c² = 0'],
          answer: 'ax² + bx + c = 0',
          solution: 'The standard form of a quadratic equation is ax² + bx + c = 0, where a ≠ 0.\nद्विघात समीकरण का मानक रूप ax² + bx + c = 0 होता है, जहाँ a ≠ 0 है। सही विकल्प (c) है।'
        },
        {
          id: 'poly-2023-2',
          type: 'subjective',
          text: 'Find the zeroes of 4u² + 8u.\nबहुपद 4u² + 8u के शून्यक ज्ञात कीजिए।',
          solution: '4u² + 8u = 4u(u + 2)\nSetting P(u) = 0:\n4u = 0 ⇒ u = 0\nu + 2 = 0 ⇒ u = -2\nSo zeroes are 0 and -2.\n\n4u² + 8u = 4u(u + 2) = 0 रखने पर, शून्यक u = 0 और u = -2 हैं।',
          orQuestion: {
            text: 'Find a quadratic polynomial as the sum of zeroes = -1 and product = √5.\nएक द्विघात बहुपद ज्ञात कीजिए जिसके शून्यकों का योगफल = -1 और गुणनफल = √5 है।',
            solution: 'Sum S = -1, Product P = √5.\nQuadratic Polynomial: x² - Sx + P = x² - (-1)x + √5 = x² + x + √5.\nयोग S = -1, गुणनफल P = √5.\nद्विघात बहुपद: x² - Sx + P = x² + x + √5.'
          }
        },
        {
          id: 'poly-2023-3',
          type: 'subjective',
          text: 'Find the sum of zeroes of polynomial x² - 3.\nबहुपद x² - 3 के शून्यकों का योगफल ज्ञात कीजिए।',
          solution: 'Comparing P(x) = x² - 3 with ax² + bx + c:\na = 1, b = 0, c = -3.\nSum of zeroes = -b/a = -0/1 = 0.\n\nx² - 3 की तुलना ax² + bx + c से करने पर, b = 0.\nशून्यकों का योग = -b/a = -0/1 = 0.'
        }
      ]
    },
    {
      year: '2024',
      questions: [
        {
          id: 'poly-2024-1',
          type: 'mcq',
          text: 'For quadratic polynomial ax² + bx + c, the graph found on a graph paper will be:\nद्विघात बहुपद ax² + bx + c के लिए, ग्राफ पेपर पर पायी जाने वाली आकृति होगी:',
          options: ['straight line / सरल रेखा', 'parabolas / परवलय', 'parallel line / समानांतर रेखा', 'curve line / वक्र रेखा'],
          answer: 'parabolas / परवलय',
          solution: 'The graph of any quadratic function is a parabola. Correct option is (b).\nकिसी भी द्विघात बहुपद का ग्राफ एक परवलय (parabola) होता है। सही विकल्प (b) है।'
        },
        {
          id: 'poly-2024-2',
          type: 'blank',
          text: 'P(x) is a polynomial in x, the highest power of x in P(x) is called ____________ of the polynomial.\nP(x), x में एक बहुपद है, P(x) में x की उच्चतम घात को बहुपद की ____________ कहा जाता है।',
          answer: 'degree',
          solution: 'The highest power of variable x is the degree of the polynomial.\nचर की उच्चतम घात को डिग्री या घात (degree) कहते हैं।'
        },
        {
          id: 'poly-2024-3',
          type: 'blank',
          text: 'Write the formula of product of zeroes from quadratic polynomial ax² + bx + c.\nद्विघात बहुपद ax² + bx + c के शून्यकों का गुणनफल ज्ञात करने का सूत्र _____________ है।',
          answer: 'c/a',
          solution: 'Product of zeroes α·β = c/a.\nगुणनफल सूत्र α·β = c/a.'
        },
        {
          id: 'poly-2024-4',
          type: 'subjective',
          text: 'Find the zeroes of the quadratic polynomial 3x² - x - 4.\nद्विघात बहुपद 3x² - x - 4 के शून्यक ज्ञात कीजिए।',
          solution: '3x² - x - 4 = 3x² - 4x + 3x - 4\n= x(3x - 4) + 1(3x - 4) = (3x - 4)(x + 1)\nSo zeroes are x = 4/3 and x = -1.\n\n3x² - x - 4 = (3x - 4)(x + 1) = 0\nअतः शून्यक x = 4/3 और x = -1 हैं।',
          orQuestion: {
            text: 'Find a quadratic polynomial, the sum of zeroes is 4 and the product of zeroes is 1.\nएक द्विघात बहुपद ज्ञात कीजिए, जिसके शून्यकों का योगफल 4 और गुणनफल 1 है।',
            solution: 'Sum S = 4, Product P = 1.\nRequired quadratic polynomial is x² - Sx + P = x² - 4x + 1.\nयोग S = 4, गुणनफल P = 1.\nद्विघात बहुपद: x² - Sx + P = x² - 4x + 1.'
          }
        }
      ]
    },
    {
      year: '2025',
      questions: [
        {
          id: 'poly-2025-1',
          type: 'subjective',
          text: 'The graph y = P(x) is given below for some polynomial P(x). Find the number of zeroes of P(x).\nकिसी बहुपद P(x) के लिए, y = P(x) का ग्राफ नीचे दिया गया है। P(x) के शून्यकों की संख्या ज्ञात कीजिए।',
          renderSvgType: 'poly-graph-2021-3-or',
          solution: 'Looking at the curve, it intersects/crosses the horizontal x-axis at exactly 4 distinct points. Therefore, the number of zeroes of the polynomial P(x) is 4.\nग्राफ के अनुसार, P(x) का वक्र x-अक्ष को 4 बिंदुओं पर प्रतिच्छेद करता है। अतः, शून्यकों की संख्या 4 है।',
          orQuestion: {
            text: 'Find the zeroes of the Quadratic Polynomial x² - 3x - 10.\nद्विघात बहुपद x² - 3x - 10 के शून्यक ज्ञात कीजिए।',
            solution: 'x² - 3x - 10 = x² - 5x + 2x - 10\n= x(x - 5) + 2(x - 5) = (x - 5)(x + 2)\nSetting to 0, zeroes are x = 5 and x = -2.\n\nx² - 3x - 10 = (x - 5)(x + 2) = 0\nअतः शून्यक x = 5 और x = -2 हैं।'
          }
        },
        {
          id: 'poly-2025-2',
          type: 'subjective',
          text: 'Find the zeroes of 4u² + 8u.\nबहुपद 4u² + 8u के शून्यक ज्ञात कीजिए।',
          solution: '4u(u + 2) = 0 ⇒ u = 0, u = -2. So zeroes are 0 and -2.\n\n4u(u + 2) = 0 ⇒ शून्यक 0 और -2 हैं।',
          orQuestion: {
            text: 'Find a quadratic polynomial, if the sum and product of whose zeroes are -1/4 and 1/4 respectively.\nएक द्विघात बहुपद ज्ञात कीजिए, जिसके शून्यकों का योगफल और गुणनफल क्रमशः -1/4 और 1/4 हैं।',
            solution: 'Sum S = -1/4, Product P = 1/4.\nPolynomial is k(x² - Sx + P) = k(x² - (-1/4)x + 1/4) = k(x² + x/4 + 1/4).\nFor k = 4, we get standard integer form: 4x² + x + 1.\nS = -1/4, P = 1/4.\nबहुपद: x² - (-1/4)x + 1/4 = x² + x/4 + 1/4, (4 से गुणा करने पर) = 4x² + x + 1.'
          }
        }
      ]
    },
    {
      year: '2026',
      questions: [
        {
          id: 'poly-2026-1',
          type: 'mcq',
          text: 'Zero of the linear polynomial ax + b, a ≠ 0 is:\nरैखिक बहुपद ax + b, a ≠ 0 का शून्यक है:',
          options: ['b/a', 'a/b', '-b/a', 'c/a'],
          answer: '-b/a',
          solution: 'Set ax + b = 0 ⇒ ax = -b ⇒ x = -b/a. Thus, correct option is (c) -b/a.\nशून्यक के लिए ax + b = 0 ⇒ x = -b/a. सही विकल्प (c) है।'
        },
        {
          id: 'poly-2026-2',
          type: 'blank',
          text: 'Maximum zeroes of a cubic polynomial can be ______________.\nत्रिघात बहुपद के अधिकतम शून्यक ______________ हो सकते हैं।',
          answer: '3',
          solution: 'Cubic polynomial has a degree of 3, so it can have at most 3 zeroes.\nत्रिघात बहुपद की घात 3 होती है, अतः इसके अधिकतम 3 शून्यक हो सकते हैं।'
        },
        {
          id: 'poly-2026-3',
          type: 'tf',
          text: 'αβ = c/a is true for any quadratic polynomial ax² + bx + c. (True / False)\nद्विघात बहुपद ax² + bx + c के लिए αβ = c/a सत्य है। (सत्य / असत्य)',
          answer: 'True',
          solution: 'The product of zeroes of a quadratic is indeed c/a. This is True.\nद्विघात बहुपद के शून्यकों का गुणनफल αβ = c/a है, जो कि बिल्कुल सत्य (True) है।'
        },
        {
          id: 'poly-2026-4',
          type: 'subjective',
          text: 'Find the zeroes of the polynomial 3x² - x - 4.\nबहुपद 3x² - x - 4 के शून्यक ज्ञात कीजिए।',
          solution: '3x² - x - 4 = (3x - 4)(x + 1) = 0 ⇒ zeroes are x = 4/3 and x = -1.\n\n3x² - x - 4 = (3x - 4)(x + 1) = 0 ⇒ शून्यक x = 4/3 और x = -1 हैं।',
          orQuestion: {
            text: 'Find a quadratic polynomial, if the sum and product of whose zeroes are 4 and 1 respectively.\nएक द्विघात बहुपद ज्ञात कीजिए, जिसके शून्यकों का योगफल और गुणनफल क्रमशः 4 और 1 हैं।',
            solution: 'Sum S = 4, Product P = 1.\nRequired quadratic polynomial is x² - Sx + P = x² - 4x + 1.\nयोग S = 4, गुणनफल P = 1.\nद्विघात बहुपद: x² - Sx + P = x² - 4x + 1.'
          }
        }
      ]
    },
    {
      year: '2026 Standard',
      questions: [
        {
          id: 'poly-2026s-1',
          type: 'mcq',
          text: 'If α and β are the zeroes of the quadratic polynomial ax² + bx + c, then the value of α + β is:\nयदि α और β द्विघात बहुपद ax² + bx + c के शून्यक हैं, तो α + β का मान होगा:',
          options: ['b/a', '-b/a', 'c/a', '-c/a'],
          answer: '-b/a',
          solution: 'Sum of zeroes of a quadratic polynomial ax² + bx + c is given by -b/a. Correct option is (b).\nद्विघात बहुपद के शून्यकों का योगफल = -b/a होता है। सही विकल्प (b) है।'
        },
        {
          id: 'poly-2026s-2',
          type: 'blank',
          text: 'Maximum zeroes of a cubic polynomial are ______________.\nत्रिघात बहुपद के शून्यकों की अधिकतम संख्या ______________ होती है।',
          answer: '3',
          solution: 'A cubic polynomial can have a maximum of 3 zeroes.\nत्रिघात बहुपद के शून्यों की अधिकतम संख्या 3 होती है।'
        },
        {
          id: 'poly-2026s-3',
          type: 'blank',
          text: 'The graph of any quadratic polynomial is a ______________.\nकिसी भी द्विघात बहुपद का ग्राफ एक ______________ होता है।',
          answer: 'parabola',
          solution: 'The graph of a quadratic polynomial is a parabola.\nद्विघात बहुपद का ग्राफ एक परवलय (parabola) होता है।'
        },
        {
          id: 'poly-2026s-4',
          type: 'subjective',
          text: 'Find the zeroes of the polynomial 6x² - 3 - 7x.\nबहुपद 6x² - 3 - 7x के शून्यक ज्ञात कीजिए।',
          solution: 'Rearranging: 6x² - 7x - 3 = 0\nFactoring: 6x² - 9x + 2x - 3 = 3x(2x - 3) + 1(2x - 3) = (3x + 1)(2x - 3) = 0\nZeroes are x = -1/3 and x = 3/2.\n\nव्यवस्थित करने पर: 6x² - 7x - 3 = 0\nगुणनखंड: (3x + 1)(2x - 3) = 0 ⇒ शून्यक x = -1/3 और x = 3/2 हैं।'
        },
        {
          id: 'poly-2026s-5',
          type: 'subjective',
          text: 'Find a quadratic polynomial, the sum and product of whose zeroes are √2 and 1/3 respectively.\nएक द्विघात बहुपद ज्ञात कीजिए, जिसके शून्यकों का योगफल और गुणनफल क्रमशः √2 और 1/3 हैं।',
          solution: 'Sum S = √2, Product P = 1/3.\nRequired polynomial is k(x² - Sx + P) = k(x² - √2x + 1/3).\nFor k = 3, we get standard integer form: 3x² - 3√2x + 1.\nयोग S = √2, गुणनफल P = 1/3.\nबहुपद: x² - √2x + 1/3, (3 से गुणा करने पर) = 3x² - 3√2x + 1.'
        }
      ]
    }
  ],
  'Pair of Linear Equations in Two Variables': [
    {
      year: '2019',
      questions: [
        {
          id: 'lin-2019-1',
          type: 'mcq',
          text: 'When a₁/a₂ = b1/b₂ ≠ c₁/c₂ then the system of equations a₁x + b1y + c₁ = 0 and a₂x + b₂y + c₂ = 0 has:\nजब a₁/a₂ = b1/b₂ ≠ c₁/c₂ हो, तो समीकरण निकाय a₁x + b1y + c₁ = 0 और a₂x + b₂y + c₂ = 0:',
          options: [
            'two solutions / दो हल',
            'no solution / कोई हल नहीं',
            'infinitely many solutions / अनंततः अनेक हल',
            'unique solution / अद्वितीय हल'
          ],
          answer: 'no solution / कोई हल नहीं',
          solution: 'When a₁/a₂ = b1/b₂ ≠ c₁/c₂, the lines are parallel. Since parallel lines never intersect, the system of equations has no solution.\nजब a₁/a₂ = b1/b₂ ≠ c₁/c₂ होता है, तो रेखाएँ समानांतर होती हैं। समानांतर रेखाएँ कभी प्रतिच्छेद नहीं करती हैं, इसलिए समीकरण निकाय का कोई हल नहीं होता है।'
        },
        {
          id: 'lin-2019-2',
          type: 'mcq',
          text: 'Lines x - 2y = 0 and 3x + 4y - 20 = 0 are:\nरेखाएँ x - 2y = 0 और 3x + 4y - 20 = 0 हैं:',
          options: [
            'Intersecting / प्रतिच्छेदी',
            'Coincident / संपाती',
            'Parallel / समानांतर',
            'None / इनमें से कोई नहीं'
          ],
          answer: 'Intersecting / प्रतिच्छेदी',
          solution: 'Comparing coefficients we get a₁/a₂ = 1/3 and b₁/b₂ = -2/4 = -1/2. Since a₁/a₂ ≠ b₁/b₂, the lines intersect at a unique point.\ncoeff का मिलान करने पर: a₁/a₂ = 1/3 और b₁/b₂ = -1/2 है। चूँकि a₁/a₂ ≠ b₁/b₂ है, अतः रेखाएँ प्रतिच्छेदी (Intersecting) हैं।'
        },
        {
          id: 'lin-2019-3',
          type: 'subjective',
          text: 'Use Elimination method to find all possible solutions of the following pair of linear equations: 2x + 3y = 8 ; 4x + 6y = 7\nविलोपन विधि का प्रयोग करके रैखिक समीकरण युग्म के सभी संभावित हल ज्ञात कीजिए: 2x + 3y = 8 ; 4x + 6y = 7',
          solution: 'Let 2x + 3y = 8 ---(1) and 4x + 6y = 7 ---(2)\nMultiply (1) by 2: 4x + 6y = 16 ---(3)\nSubtracting (2) from (3): (4x - 4x) + (6y - 6y) = 16 - 7 ⇒ 0 = 9 (which is false).\nTherefore, the pair of equations has no solution.\n\nमाना 2x + 3y = 8 ---(1) और 4x + 6y = 7 ---(2)\nसमीकरण (1) को 2 से गुणा करने पर: 4x + 6y = 16 ---(3)\nसमीकरण (3) में से (2) को घटाने पर: 0 = 9 (जो कि एक असत्य कथन है)।\nअतः इस समीकरण युग्म का कोई हल नहीं है।',
          orQuestion: {
            text: 'The cost of 5 oranges and 3 apples is Rs. 35 and the cost of 2 oranges and 4 apples is Rs. 28. Find the cost of an orange and an apple.\n5 संतरों और 3 सेबों का मूल्य 35 रुपये है और 2 संतरों और 4 सेबों का मूल्य 28 रुपये है। एक संतरे और एक सेब का मूल्य ज्ञात कीजिए।',
            solution: 'Let the cost of one orange be Rs x and one apple be Rs y.\n5x + 3y = 35 ---(1)\n2x + 4y = 28 ---(2) ⇒ x + 2y = 14 ⇒ x = 14 - 2y ---(3)\nSubstitute (3) in (1):\n5(14 - 2y) + 3y = 35 ⇒ 70 - 7y = 35 ⇒ 7y = 35 ⇒ y = 5.\nSubstitute y = 5 in (3):\nx = 14 - 2(5) = 4.\nTherefore, the cost of one orange is Rs 4, and cost of one apple is Rs 5.\n\nमाना एक संतरे का मूल्य x रुपये तथा एक सेब का मूल्य y रुपये है।\n5x + 3y = 35 ---(1)\n2x + 4y = 28 ---(2) ⇒ x + 2y = 14 ⇒ x = 14 - 2y ---(3)\nसमीकरण (3) का मान (1) में रखने पर:\n5(14 - 2y) + 3y = 35 ⇒ 70 - 7y = 35 ⇒ 7y = 35 ⇒ y = 5.\ny का मान (3) में रखने पर:\nx = 14 - 2(5) = 4.\nअतः एक संतरे का मूल्य = 4 रुपये, और एक सेब का मूल्य = 5 रुपये है।'
          }
        }
      ]
    },
    {
      year: '2020',
      questions: [
        {
          id: 'lin-2020-1',
          type: 'mcq',
          text: 'The condition for the lines whose equations are a₁x + b1y + c₁ = 0 and a₂x + b₂y + c₂ = 0 to be intersecting is:\nसमीकरणों a₁x + b1y + c₁ = 0 और a₂x + b₂y + c₂ = 0 वाली रेखाओं के प्रतिच्छेदी होने की शर्त है:',
          options: [
            'a₁/a₂ = b₁/b₂ = c₁/c₂',
            'a₁/a₂ ≠ b₁/b₂',
            'a₁/a₂ = b₁/b₂ ≠ c₁/c₂',
            'a₁/a₂ = b₁/b₂'
          ],
          answer: 'a₁/a₂ ≠ b₁/b₂',
          solution: 'For two linear equations to have intersecting lines (a unique solution), the condition is a₁/a₂ ≠ b₁/b₂.\nदो रैखिक समीकरणों के प्रतिच्छेदी होने (अद्वितीय हल होने) के लिए शर्त a₁/a₂ ≠ b₁/b₂ है। अतः विकल्प (b) सही है।'
        },
        {
          id: 'lin-2020-2',
          type: 'blank',
          text: 'There are ______________ solutions for a system of coincident lines.\nसंपाती रेखाओं के समीकरण के ______________ हल होते हैं।',
          answer: 'infinitely many',
          solution: 'There are infinitely many solutions of the coincident lines.\nसंपाती रेखाओं के समीकरण के अपरिमित रूप से अनेक / अनंत (infinitely many) हल होते हैं।'
        },
        {
          id: 'lin-2020-3',
          type: 'subjective',
          text: 'Use Elimination method to find all possible solutions of the following pair of linear equations: x + y = 5 ; 2x - 3y = 4\nविलोपन विधि का प्रयोग करके निम्न रैखिक समीकरण युग्म के सभी संभावित हल ज्ञात कीजिए : x + y = 5 ; 2x - 3y = 4',
          solution: 'x + y = 5 ---(1)\n2x - 3y = 4 ---(2)\nMultiply (1) by 3:\n3x + 3y = 15 ---(3)\nAdd (2) and (3):\n5x = 19 ⇒ x = 19/5\nSubstitute x = 19/5 in (1):\n19/5 + y = 5 ⇒ y = 5 - 19/5 = 6/5\nThus, x = 19/5, y = 6/5.\n\nमाना x + y = 5 ---(1) और 2x - 3y = 4 ---(2)\nसमीकरण (1) को 3 से गुणा करने पर:\n3x + 3y = 15 ---(3)\nसमीकरण (2) और (3) को जोड़ने पर:\n5x = 19 ⇒ x = 19/5\nx का मान (1) में रखने पर:\n19/5 + y = 5 ⇒ y = 5 - 19/5 = 6/5.\nअतः x = 19/5, y = 6/5.',
          orQuestion: {
            text: 'For which value of k will the following pair of linear equations have no solution? 3x + y = 1 ; (2k - 1)x + (k - 1)y = 2k + 1\nk के किस मान के लिए निम्न रैखिक समीकरण युग्म का कोई हल नहीं होगा? 3x + y = 1 ; (2k - 1)x + (k - 1)y = 2k + 1',
            solution: 'For no solution: a₁/a₂ = b₁/b₂ ≠ c₁/c₂\n3 / (2k - 1) = 1 / (k - 1)\n3(k - 1) = 2k - 1\n3k - 3 = 2k - 1 ⇒ k = 2.\nCheck for c₁/c₂: -1/-(2(2)+1) = 1/5 (Not equal to 1). Thus, k = 2 is the correct value.\n\nकोई हल न होने की शर्त: a₁/a₂ = b₁/b₂ ≠ c₁/c₂\n3 / (2k - 1) = 1 / (k - 1)\n3(k - 1) = 2k - 1\n3k - 3 = 2k - 1 ⇒ k = 2.\nc₁/c₂ = 1/5 (जो कि 1 के बराबर नहीं है)। अतः k = 2 अभीष्ट मान है।'
          }
        }
      ]
    },
    {
      year: '2020 Paper 2',
      questions: [
        {
          id: 'lin-2020p2-1',
          type: 'mcq',
          text: 'When a₁/a₂ = b1/b₂ ≠ c₁/c₂ then the system of equations a₁x + b1y + c₁ = 0 and a₂x + b₂y + c₂ = 0 has:\nजब a₁/a₂ = b1/b₂ ≠ c₁/c₂ हो, तो समीकरण निकाय a₁x + b1y + c₁ = 0 और a₂x + b₂y + c₂ = 0:',
          options: [
            'unique solution / अद्वितीय हल',
            'no solution / कोई हल नहीं',
            'two solutions / दो हल',
            'infinitely many solutions / अनंततः अनेक हल'
          ],
          answer: 'no solution / कोई हल नहीं',
          solution: 'When a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the lines are parallel. Parallel lines never meet, hence there is no solution.\nजब a₁/a₂ = b₁/b₂ ≠ c₁/c₂ हो, तब रेखाएँ समांतर होती हैं और कोई भी साझा बिंदु नहीं होने से कोई हल नहीं होता है।'
        },
        {
          id: 'lin-2020p2-2',
          type: 'subjective',
          text: 'For which value of k will the following pair of linear equations have no solution? 3x + y = 1 and (2k - 1)x + (k - 1)y = 2k + 1\nk के किस मान के लिए निम्न रैखिक समीकरण युग्म का कोई हल नहीं होगा? 3x + y = 1 और (2k - 1)x + (k - 1)y = 2k + 1',
          solution: 'For no solution: a₁/a₂ = b₁/b₂ ≠ c₁/c₂\n3 / (2k - 1) = 1 / (k - 1) ⇒ 3k - 3 = 2k - 1 ⇒ k = 2.\nThus, k = 2 is the correct value for which equations have no solution.\n\nकोई हल न होने की शर्त: a₁/a₂ = b₁/b₂ ≠ c₁/c₂\n3 / (2k - 1) = 1 / (k - 1)\n3(k - 1) = 2k - 1 ⇒ k = 2. अतः k = 2 अभीष्ट मान है।',
          orQuestion: {
            text: 'The larger of two supplementary angles exceeds the smaller by 18 degrees. Find them.\nदो संपूरक कोणों में बड़ा कोण छोटे कोण से 18 डिग्री अधिक है। उन्हें ज्ञात कीजिए।',
            solution: 'Let the larger angle be x and the smaller angle be y.\nSince they are supplementary angles: x + y = 180 ---(1)\nGiven: x = y + 18 ⇒ x - y = 18 ---(2)\nAdding (1) and (2):\n2x = 198 ⇒ x = 99\nSubstituting x = 99 in (1):\n99 + y = 180 ⇒ y = 81\nTherefore, the angles are 99° and 81°.\n\nमाना बड़ा कोण x और छोटा कोण y है।\nचूँकि दोनों कोण संपूरक हैं: x + y = 180 ---(1)\nदिया है: x - y = 18 ---(2)\nदोनों समीकरणों को जोड़ने पर: \n2x = 198 ⇒ x = 99\nx का मान (1) में रखने पर: \n99 + y = 180 ⇒ y = 81\nअतः संपूरक कोण 99° और 81° हैं।'
          }
        }
      ]
    },
    {
      year: '2021',
      questions: [
        {
          id: 'lin-2021-1',
          type: 'mcq',
          text: 'The system of equations a₁x + b1y + c₁ = 0 and a₂x + b₂y + c₂ = 0 has a unique solution if:\nसमीकरण निकाय a₁x + b1y + c₁ = 0 और a₂x + b₂y + c₂ = 0 का एक अद्वितीय हल होता है यदि:',
          options: [
            'a₁/a₂ = b₁/b₂ = c₁/c₂',
            'a₁/a₂ ≠ b₁/b₂',
            'a₁/a₂ = b₁/b₂ ≠ c₁/c₂',
            'a₁/a₂ = b₁/b₂'
          ],
          answer: 'a₁/a₂ ≠ b₁/b₂',
          solution: 'A unique solution exists when the coefficients ratio of x and y are not equal initially, i.e., a₁/a₂ ≠ b₁/b₂.\nअद्वितीय हल के लिए शर्त a₁/a₂ ≠ b₁/b₂ है। अतः विकल्प (b) सही है।'
        },
        {
          id: 'lin-2021-2',
          type: 'subjective',
          text: 'If x + y = 5 and x = 1, then find the value of y.\nयदि x + y = 5 और x = 1 हो, तो y का मान ज्ञात कीजिए।',
          solution: 'Substitute x = 1 into x + y = 5:\n1 + y = 5 ⇒ y = 4.\n\nx + y = 5 में x = 1 रखने पर:\n1 + y = 5 ⇒ y = 4.'
        },
        {
          id: 'lin-2021-3',
          type: 'subjective',
          text: 'Solve the following pair of linear equations by the elimination method: 3x + 4y = 10 ; 2x - 2y = 2\nनिम्न रैखिक समीकरण युग्म को विलोपन विधि से हल कीजिए : 3x + 4y = 10 ; 2x - 2y = 2',
          solution: '3x + 4y = 10 ---(1)\n2x - 2y = 2 ---(2)\nMultiply (2) by 2: 4x - 4y = 4 ---(3)\nAdding (1) and (3):\n7x = 14 ⇒ x = 2\nSubstitute x = 2 in (2):\n2(2) - 2y = 2 ⇒ 4 - 2 = 2y ⇒ 2y = 2 ⇒ y = 1\nThus, x = 2, y = 1.\n\n3x + 4y = 10 ---(1)\n2x - 2y = 2 ---(2)\nसमीकरण (2) को 2 से गुणा करने पर: 4x - 4y = 4 ---(3)\nसमीकरण (1) और (3) को जोड़ने पर:\n7x = 14 ⇒ x = 2\nx का मान (2) में रखने पर:\n2(2) - 2y = 2 ⇒ 2y = 2 ⇒ y = 1\nअतः x = 2, y = 1.',
          orQuestion: {
            text: 'Solve the following pair of linear equations by the substitution method: x + y = 14 ; x - y = 4\nनिम्न रैखिक समीकरण युग्म को प्रतिस्थापन विधि से हल कीजिए : x + y = 14 ; x - y = 4',
            solution: 'x + y = 14 ---(1)\nx - y = 4 ---(2) ⇒ x = y + 4 ---(3)\nSubstitute (3) in (1):\n(y + 4) + y = 14 ⇒ 2y + 4 = 14 ⇒ 2y = 10 ⇒ y = 5\nSubstitute y = 5 in (3):\nx = 5 + 4 = 9.\nThus, x = 9, y = 5.\n\nमाना x + y = 14 ---(1) और x - y = 4 ---(2)\nसमीकरण (2) से: x = y + 4 ---(3)\nसमीकरण (3) का मान (1) में प्रतिस्थापित करने पर:\n(y + 4) + y = 14 ⇒ 2y = 10 ⇒ y = 5\ny का मान (3) में रखने पर:\nx = 5 + 4 = 9.\nअतः x = 9, y = 5.'
          }
        }
      ]
    },
    {
      year: '2022',
      questions: [
        {
          id: 'lin-2022-1',
          type: 'mcq',
          text: 'The pair of equations x + 2y + 5 = 0 and -3x - 6y + 1 = 0 has:\nसमीकरण युग्म x + 2y + 5 = 0 और -3x - 6y + 1 = 0 का हल है:',
          options: [
            'a unique solution / एक अद्वितीय हल',
            'no solution / कोई हल नहीं',
            'infinitely many solutions / अनंततः अनेक हल',
            'two solutions / दो हल'
          ],
          answer: 'no solution / कोई हल नहीं',
          solution: 'a₁/a₂ = -1/3, b₁/b₂ = -1/3, and c₁/c₂ = 5. Since a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the lines are parallel and have no solution.\nयहाँ a₁/a₂ = b₁/b₂ = -1/3 लेकिन c₁/c₂ = 5 है। चूँकि a₁/a₂ = b₁/b₂ ≠ c₁/c₂ है, अतः इन रेखाओं का कोई हल नहीं है (समानांतर रेखाएँ)।'
        },
        {
          id: 'lin-2022-2',
          type: 'blank',
          text: 'In the equation x + y = 8 if x = 3 then y = ______________.\nसमीकरण x + y = 8 में यदि x = 3 हो, तो y = ______________।',
          answer: '5',
          solution: 'Substitute x = 3 into x + y = 8:\n3 + y = 8 ⇒ y = 5.\n\nx + y = 8 में x = 3 रखने पर:\n3 + y = 8 ⇒ y = 5.'
        },
        {
          id: 'lin-2022-3',
          type: 'subjective',
          text: 'Solve the following pair of linear equations by the elimination method: 3x + y = 10 and 2x + 2y = 12.\nनिम्न रैखिक समीकरण युग्म को विलोपन विधि से हल कीजिए : 3x + y = 10 और 2x + 2y = 12.',
          solution: '3x + y = 10 ---(1)\n2x + 2y = 12 ⇒ x + y = 6 ---(2)\nSubtract (2) from (1):\n2x = 4 ⇒ x = 2\nSubstitute x = 2 in (2):\n2 + y = 6 ⇒ y = 4.\nThus, x = 2, y = 4.\n\n3x + y = 10 ---(1)\n2x + 2y = 12 ⇒ x + y = 6 ---(2)\nसमीकरण (1) में से (2) को घटाने पर:\n2x = 4 ⇒ x = 2\nx का मान (2) में रखने पर:\n2 + y = 6 ⇒ y = 4\nअतः x = 2, y = 4.',
          orQuestion: {
            text: 'Solve the following pair of linear equations by the substitution method: x + y = 5 and 2x - 3y = 4.\nनिम्न रैखिक समीकरण युग्म को प्रतिस्थापन विधि से हल कीजिए : x + y = 5 और 2x - 3y = 4.',
            solution: 'x + y = 5 ⇒ x = 5 - y ---(1)\n2x - 3y = 4 ---(2)\nSubstitute (1) in (2):\n2(5 - y) - 3y = 4 ⇒ 10 - 5y = 4 ⇒ 5y = 6 ⇒ y = 6/5\nSubstitute y = 6/5 in (1):\nx = 5 - 6/5 = 19/5.\nThus, x = 19/5, y = 6/5.\n\nमाना x + y = 5 ⇒ x = 5 - y ---(1)\n2x - 3y = 4 ---(2)\nसमीकरण (1) का मान (2) में स्थापित करने पर:\n2(5 - y) - 3y = 4 ⇒ 10 - 5y = 4 ⇒ 5y = 6 ⇒ y = 6/5\ny का मान (1) में रखने पर:\nx = 5 - 6/5 = 19/5.\nअतः x = 19/5, y = 6/5.'
          }
        }
      ]
    },
    {
      year: '2023',
      questions: [
        {
          id: 'lin-2023-1',
          type: 'mcq',
          text: 'Write the condition for unique solution of pair of equations a₁x + b1y + c₁ = 0 and a₂x + b₂y + c₂ = 0:\nसमीकरणों a₁x + b1y + c₁ = 0 और a₂x + b₂y + c₂ = 0 के अद्वितीय हल होने की शर्त लिखिए:',
          options: [
            'a₁/a₂ = b₁/b₂ = c₁/c₂',
            'a₁/a₂ ≠ b₁/b₂',
            'a₁/a₂ = b₁/b₂ ≠ c₁/c₂',
            'a₁/a₂ = b₁/b₂'
          ],
          answer: 'a₁/a₂ ≠ b₁/b₂',
          solution: 'The condition for a unique solution is a₁/a₂ ≠ b₁/b₂.\nअद्वितीय हल होने की शर्त a₁/a₂ ≠ b₁/b₂ है। अतः सही विकल्प (b) है.'
        },
        {
          id: 'lin-2023-2',
          type: 'subjective',
          text: 'Find the ratio a₁/a₂, b₁/b₂ and c₁/c₂ for the pair of linear equations: 3x + 2y = 5 , 2x - 8y = 7\nसमीकरणों 3x + 2y = 5 , 2x - 8y = 7 के लिए अनुपातों a₁/a₂, b₁/b₂ और c₁/c₂ को ज्ञात कीजिए।',
          solution: 'Standard form:\n3x + 2y - 5 = 0 ⇒ a₁ = 3, b₁ = 2, c₁ = -5\n2x - 8y - 7 = 0 ⇒ a₂ = 2, b₂ = -8, c₂ = -7\nRatios:\na₁/a₂ = 3/2, b₁/b₂ = 2/-8 = -1/4, c₁/c₂ = -5/-7 = 5/7.\n\nमानक रूप:\n3x + 2y - 5 = 0 ⇒ a₁ = 3, b₁ = 2, c₁ = -5\n2x - 8y - 7 = 0 ⇒ a₂ = 2, b₂ = -8, c₂ = -7\nअनुपात:\na₁/a₂ = 3/2, b₁/b₂ = 2/-8 = -1/4, c₁/c₂ = -5/-7 = 5/7.'
        },
        {
          id: 'lin-2023-3',
          type: 'subjective',
          text: 'Solve the pair of linear equations: x + y = 14 ; x - y = 4\nरैखिक समीकरण युग्म को हल कीजिए: x + y = 14 ; x - y = 4',
          solution: 'Adding the equations:\n(x + y) + (x - y) = 14 + 4 ⇒ 2x = 18 ⇒ x = 9\nSubstitute x = 9 in first equation:\n9 + y = 14 ⇒ y = 5.\n\nदोनों समीकरणों को जोड़ने पर:\n2x = 18 ⇒ x = 9\nx = 9 पहले समीकरण में रखने पर:\n9 + y = 14 ⇒ y = 5.'
        },
        {
          id: 'lin-2023-4',
          type: 'subjective',
          text: 'The difference between two numbers is 26 and one number is three times the other. Find them.\nदो संख्याओं का अंतर 26 है और एक संख्या दूसरी संख्या की तीन गुनी है। उन्हें ज्ञात कीजिए।',
          solution: 'Let the two numbers be x and y with x > y.\nx - y = 26 ---(1)\nx = 3y ---(2)\nSubstitute (2) in (1):\n3y - y = 26 ⇒ 2y = 26 ⇒ y = 13.\nSubstitute y = 13 in (2):\nx = 3(13) = 39.\nTherefore, the numbers are 39 and 13.\n\nमाना दो संख्याएँ x और y हैं जहाँ x > y.\nx - y = 26 ---(1)\nx = 3y ---(2)\nसमीकरण (2) का मान (1) में रखने पर:\n3y - y = 26 ⇒ 2y = 26 ⇒ y = 13.\ny का मान (2) में रखने पर:\nx = 3(13) = 39.\nअतः वे संख्याएँ 39 और 13 हैं।',
          orQuestion: {
            text: 'Solve the pair of linear equations: 3x - 5y - 4 = 0 ; 9x = 2y + 7\nरैखिक समीकरण युग्म को हल कीजिए: 3x - 5y - 4 = 0 ; 9x = 2y + 7',
            solution: 'Equation 1: 3x - 5y = 4 ---(1)\nEquation 2: 9x - 2y = 7 ---(2)\nMultiply (1) by 3: 9x - 15y = 12 ---(3)\nSubtract (3) from (2):\n13y = -5 ⇒ y = -5/13.\nSubstitute y = -5/13 in (1):\n3x - 5(-5/13) = 4 ⇒ 3x + 25/13 = 4 ⇒ 3x = 27/13 ⇒ x = 9/13.\nThus, x = 9/13, y = -5/13.\n\nसमीकरण 1: 3x - 5y = 4 ---(1)\nसमीकरण 2: 9x - 2y = 7 ---(2)\nसमीकरण (1) को 3 से गुणा करने पर: 9x - 15y = 12 ---(3)\nसमीकरण (2) में से (3) को घटाने पर:\n13y = -5 ⇒ y = -5/13\ny का मान (1) में रखने पर:\n3x - 5(-5/13) = 4 ⇒ 3x = 27/13 ⇒ x = 9/13\nअतः x = 9/13, y = -5/13.'
          }
        }
      ]
    },
    {
      year: '2024',
      questions: [
        {
          id: 'lin-2024-1',
          type: 'mcq',
          text: 'The pair of linear equations a₁x + b1y + c₁ = 0 and a₂x + b₂y + c₂ = 0 is dependent and consistent if:\nरैखिक समीकरण युग्म a₁x + b1y + c₁ = 0 और a₂x + b₂y + c₂ = 0 आश्रित और संगत होता है यदि:',
          options: [
            'a₁/a₂ = b₁/b₂ = c₁/c₂',
            'a₁/a₂ ≠ b₁/b₂',
            'a₁/a₂ = b₁/b₂ ≠ c₁/c₂',
            'a₁/a₂ = b₁/b₂'
          ],
          answer: 'a₁/a₂ = b₁/b₂ = c₁/c₂',
          solution: 'A dependent and consistent system represents coincident lines, for which the ratio condition is a₁/a₂ = b₁/b₂ = c₁/c₂.\nआश्रित और संगत समीकरण युग्म संपाती रेखाओं को दर्शाता है, जिसके लिए अनुपात की स्थिति a₁/a₂ = b₁/b₂ = c₁/c₂ है। अतः विकल्प (a) सही है।'
        },
        {
          id: 'lin-2024-2',
          type: 'subjective',
          text: 'Find the ratio a₁/a₂, b₁/b₂ and c₁/c₂ for the following pair of linear equations and say whether it is consistent or inconsistent: 5x - 4y + 8 = 0 ; 7x + 6y - 9 = 0\nनिम्न रैखिक समीकरण युग्म के लिए अनुपातों a₁/a₂, b₁/b₂ और c₁/c₂ की तुलना कर ज्ञात कीजिए कि समीकरण युग्म संगत है या असंगत: 5x - 4y + 8 = 0 ; 7x + 6y - 9 = 0',
          solution: 'a₁ = 5, b₁ = -4, c₁ = 8\na₂ = 7, b₂ = 6, c₂ = -9\na₁/a₂ = 5/7, b₁/b₂ = -4/6 = -2/3.\nSince a₁/a₂ ≠ b₁/b₂, the pair of linear equations has a unique solution and is consistent.\n\nयहाँ a₁/a₂ = 5/7 और b₁/b₂ = -2/3.\nचूँकि a₁/a₂ ≠ b₁/b₂ है, अतः युग्म प्रतिच्छेदी और संगत (consistent) है।',
          orQuestion: {
            text: 'Solve the pair of linear equations: x + y = 14 ; x - y = 4\nरैखिक समीकरण युग्म को हल कीजिए: x + y = 14 ; x - y = 4',
            solution: 'Adding: 2x = 18 ⇒ x = 9.\nSubstitute x = 9: 9 + y = 14 ⇒ y = 5.\nThus, x = 9, y = 5.\n\nजोड़ने पर: 2x = 18 ⇒ x = 9.\nx = 9 रखने पर: 9 + y = 14 ⇒ y = 5.\nअतः x = 9, y = 5.'
          }
        },
        {
          id: 'lin-2024-3',
          type: 'subjective',
          text: 'Solve the pair of linear equations: 3x + 4y = 10 and 2x - 2y = 2\nरैखिक समीकरण युग्म को हल कीजिए: 3x + 4y = 10 और 2x - 2y = 2',
          solution: 'Multiply second equation by 2:\n4x - 4y = 4\nAdd to first equation:\n(3x + 4x) = 14 ⇒ 7x = 14 ⇒ x = 2.\nSubstitute x = 2 in second equation: 2(2) - 2y = 2 ⇒ 2y = 2 ⇒ y = 1.\nThus, x = 2, y = 1.\n\nसमीकरण 2 को 2 से गुणा करके समीकरण 1 में जोड़ने पर:\n7x = 14 ⇒ x = 2.\n2(2) - 2y = 2 ⇒ 2y = 2 ⇒ y = 1.\nअतः x = 2, y = 1.',
          orQuestion: {
            text: 'The sum of the digits of a two digit number is 9. Also, nine times this number is twice the number obtained by reversing the order of the digits. Find the number.\nदो अंकों की संख्या के अंकों का योग 9 है। इस संख्या का नौ गुना, संख्या के अंकों को पलटने से बनी संख्या का दो गुना है। वह संख्या ज्ञात कीजिए।',
            solution: 'Let the tens digit be x and units digit be y.\nSo the number is 10x + y.\nSum of digits: x + y = 9 ---(1)\nReversed number is 10y + x.\nGiven: 9(10x + y) = 2(10y + x) ⇒ 90x + 9y = 20y + 2x ⇒ 88x = 11y ⇒ y = 8x ---(2)\nSubstitute (2) in (1):\nx + 8x = 9 ⇒ 9x = 9 ⇒ x = 1 ⇒ y = 8.\nTherefore, the number is 10(1) + 8 = 18.\n\nमाना दहाई का अंक x व इकाई का अंक y है। संख्या = 10x + y.\nअंकों का योग: x + y = 9 ---(1)\nउलटने पर संख्या = 10y + x.\nदिया है: 9 × (10x + y) = 2 × (10y + x) ⇒ 88x = 11y ⇒ y = 8x\nसमीकरण (2) का मान (1) में रखने पर:\nx + 8x = 9 ⇒ x = 1 ⇒ y = 8.\nअतः संख्या = 18 है।'
          }
        }
      ]
    },
    {
      year: '2025',
      questions: [
        {
          id: 'lin-2025-1',
          type: 'mcq',
          text: 'When a₁/a₂ = b1/b₂ = c₁/c₂ then the system of equations a₁x + b1y + c₁ = 0 and a₂x + b₂y + c₂ = 0 has:\nजब a₁/a₂ = b1/b₂ = c₁/c₂ हो, तो समीकरण निकाय a₁x + b1y + c₁ = 0 और a₂x + b₂y + c₂ = 0:',
          options: [
            'two solutions / दो हल',
            'no solution / कोई हल नहीं',
            'infinitely many solutions / अनंततः अनेक हल',
            'unique solution / अद्वितीय हल'
          ],
          answer: 'infinitely many solutions / अनंततः अनेक हल',
          solution: 'When a₁/a₂ = b1/b₂ = c₁/c₂, the lines are coincident and lie exactly on top of each other. Therefore, they have infinitely many solutions.\nजब a₁/a₂ = b1/b₂ = c₁/c₂ हो, तब रेखाएं संपाती होती हैं तथा एक-दूसरे के ऊपर स्थित होती हैं। इसलिए इनके अपरिमित रूप से अनेक (अनंत) हल होते हैं।'
        },
        {
          id: 'lin-2025-2',
          type: 'subjective',
          text: 'Solve the following pair of linear equations: x + 2y = 8 and x - y = 8\nनिम्न रैखिक समीकरण युग्म को हल कीजिए : x + 2y = 8 और x - y = 8',
          solution: 'Subtracting second equation from first:\n(x + 2y) - (x - y) = 8 - 8 ⇒ 3y = 0 ⇒ y = 0.\nSubstitute y = 0 in the second equation:\nx - 0 = 8 ⇒ x = 8.\nThus, x = 8, y = 0.\n\nसमीकरण 1 में से समीकरण 2 को घटाने पर:\n(x + 2y) - (x - y) = 8 - 8 ⇒ 3y = 0 ⇒ y = 0.\ny का मान समीकरण 2 में रखने पर:\nx - 0 = 8 ⇒ x = 8.\nअतः x = 8, y = 0.'
        },
        {
          id: 'lin-2025-3',
          type: 'subjective',
          text: 'On comparing ratios a₁/a₂, b₁/b₂ and c₁/c₂, find out whether the pair of linear equations 2x - 3y = 8 and 4x - 6y = 9 is consistent or inconsistent:\nअनुपातों a₁/a₂, b₁/b₂ और c₁/c₂ की तुलना कर ज्ञात कीजिए कि रैखिक समीकरण युग्म 2x - 3y = 8 और 4x - 6y = 9 संगत है या असंगत :',
          solution: 'a₁/a₂ = 2/4 = 1/2, b₁/b₂ = -3/-6 = 1/2, and c₁/c₂ = 8/9.\nSince a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the lines are parallel. Therefore, the system is inconsistent.\n\na₁/a₂ = 2/4 = 1/2, b₁/b₂ = -3/-6 = 1/2, और c₁/c₂ = 8/9.\nचूँकि a₁/a₂ = b₁/b₂ ≠ c₁/c₂ है, अतः रेखाएँ समांतर हैं और यह समीकरण युग्म असंगत (inconsistent) है.'
        },
        {
          id: 'lin-2025-4',
          type: 'subjective',
          text: 'A fraction becomes 9/11, if 2 is added to both the numerator and the denominator. If 3 is added to both the numerator and the denominator it becomes 5/6. Find the fraction.\nयदि किसी भिन्न के अंश और हर दोनों में 2 जोड़ दिया जाए, तो वह 9/11 हो जाती है। यदि अंश और हर दोनों में 3 जोड़ दिया जाए, तो वह 5/6 हो जाती है। वह भिन्न ज्ञात कीजिए।',
          solution: 'Let the fraction be x/y.\nCondition 1: (x + 2)/(y + 2) = 9/11 ⇒ 11x + 22 = 9y + 18 ⇒ 11x - 9y = -4 ---(1)\nCondition 2: (x + 3)/(y + 3) = 5/6 ⇒ 6x + 18 = 5y + 15 ⇒ 6x - 5y = -3 ---(2)\nFrom (2): 5y = 6x + 3 ⇒ y = (6x + 3)/5 ---(3)\nSubstitute (3) in (1):\n11x - 9(6x + 3)/5 = -4 ⇒ 55x - 54x - 27 = -20 ⇒ x = 7.\nSubstitute x = 7 in (3):\ny = (6(7) + 3)/5 = 9.\nThus, the fraction is 7/9.\n\nमाना वह भिन्न x/y है।\nशर्त 1: (x + 2)/(y + 2) = 9/11 ⇒ 11x - 9y = -4 ---(1)\nशर्त 2: (x + 3)/(y + 3) = 5/6 ⇒ 6x - 5y = -3 ---(2)\nसमीकरण (2) से: y = (6x + 3)/5\nसमीकरण (3) का मान (1) में रखने पर: x = 7.\ny का मान (3) में रखने पर: y = 9.\nअतः वह भिन्न 7/9 है.'
        },
        {
          id: 'lin-2025-5',
          type: 'subjective',
          text: 'Solve the following pair of linear equations by elimination method: x + y = 5 ; 2x - 3y = 4\nनिम्न रैखिक समीकरण युग्म को विलोपन विधि से हल कीजिए : x + y = 5 ; 2x - 3y = 4',
          solution: 'Multiply first equation by 3: 3x + 3y = 15. Add to second: 5x = 19 ⇒ x = 19/5.\nSubstitute back: y = 5 - 19/5 = 6/5.\nThus, x = 19/5, y = 6/5.\n\nपहले समीकरण को 3 से गुणा करने पर: 3x + 3y = 15. दूसरे में जोड़ने पर: 5x = 19 ⇒ x = 19/5.\nमान पुनः रखने पर: y = 5 - 19/5 = 6/5.\nअतः x = 19/5, y = 6/5.'
        }
      ]
    }
  ],
  'Quadratic Equations': [
    {
      year: '2019',
      questions: [
        {
          id: 'quad-2019-1',
          type: 'blank',
          text: 'A quadratic equation ax² + bx + c = 0 has no real root if ______________.\nएक द्विघात समीकरण ax² + bx + c = 0 का कोई वास्तविक मूल नहीं होता है यदि ______________।',
          answer: 'b² - 4ac < 0',
          solution: 'A quadratic equation ax² + bx + c = 0 has no real roots if its discriminant D = b² - 4ac is less than 0 (i.e., b² - 4ac < 0).\nद्विघात समीकरण ax² + bx + c = 0 के कोई वास्तविक मूल नहीं होते यदि इसका विविक्तकर D = b² - 4ac शून्य से छोटा हो (अर्थात b² - 4ac < 0)।'
        },
        {
          id: 'quad-2019-2',
          type: 'blank',
          text: 'The discriminant of the equation 3x² - 2x + 1/3 = 0 is ______________.\nसमीकरण 3x² - 2x + 1/3 = 0 का विविक्तकर ______________ है।',
          answer: '0',
          solution: 'Here, a = 3, b = -2, c = 1/3.\nDiscriminant D = b² - 4ac = (-2)² - 4(3)(1/3) = 4 - 4 = 0.\n\nयहाँ, a = 3, b = -2, c = 1/3.\nविविक्तकर D = b² - 4ac = (-2)² - 4(3)(1/3) = 4 - 4 = 0.'
        },
        {
          id: 'quad-2019-3',
          type: 'subjective',
          text: 'Find the roots of the following equation: x + 1/x = 3, x ≠ 0\nसमीकरण x + 1/x = 3, x ≠ 0 के मूल ज्ञात कीजिए।',
          solution: 'Multiply by x: x² + 1 = 3x ⇒ x² - 3x + 1 = 0.\nUsing quadratic formula x = [-b ± √(b² - 4ac)] / 2a:\nx = [-(-3) ± √((-3)² - 4(1)(1))] / (2*1) = [3 ± √(9 - 4)] / 2 = (3 ± √5) / 2.\nSo roots are (3 + √5)/2 and (3 - √5)/2.\n\nx से गुणा करने पर: x² + 1 = 3x ⇒ x² - 3x + 1 = 0.\nद्विघाती सूत्र का उपयोग करने पर x = [-b ± √(b² - 4ac)] / 2a:\nx = [3 ± √5] / 2.\nअतः मूल (3 + √5)/2 और (3 - √5)/2 हैं।',
          orQuestion: {
            text: 'Find two consecutive odd positive integers, sum of whose squares is 290.\nदो क्रमागत विषम धनात्मक पूर्णांक ज्ञात कीजिए, जिनके वर्गों का योग 290 हो।',
            solution: 'Let consecutive odd positive integers be x and x + 2.\nx² + (x + 2)² = 290\nx² + x² + 4x + 4 = 290\n2x² + 4x - 286 = 0 ⇒ x² + 2x - 143 = 0\n(x + 13)(x - 11) = 0.\nSince integers are positive, x = 11. Other integer = x + 2 = 13.\nConsecutive odd integers are 11 and 13.\n\nमाना दो क्रमागत विषम धनात्मक पूर्णांक x और x + 2 हैं।\nx² + (x + 2)² = 290 ⇒ 2x² + 4x + 4 = 290 ⇒ x² + 2x - 143 = 0\nगुणनखंड करने पर: (x + 13)(x - 11) = 0.\nपूर्णांक धनात्मक होने के कारण x = 11. दूसरा पूर्णांक = 13.\nअतः क्रमागत विषम धनात्मक पूर्णांक 11 और 13 हैं।'
          }
        }
      ]
    },
    {
      year: '2020',
      questions: [
        {
          id: 'quad-2020-1',
          type: 'blank',
          text: 'Write the discriminant of the quadratic equation 3x² - 5x + 2 = 0.\nद्विघात समीकरण 3x² - 5x + 2 = 0 का विविक्तकर लिखिए।',
          answer: '1',
          solution: 'Here, a = 3, b = -5, c = 2.\nDiscriminant D = b² - 4ac = (-5)² - 4(3)(2) = 25 - 24 = 1.\n\nयहाँ, a = 3, b = -5, c = 2.\nविविक्तकर D = b² - 4ac = (-5)² - 4(3)(2) = 25 - 24 = 1.'
        },
        {
          id: 'quad-2020-2',
          type: 'subjective',
          text: 'Using Formula method, find the roots of the following equation: 2x² - 7x + 3 = 0\nद्विघाती सूत्र का उपयोग करके, निम्न समीकरण के मूल ज्ञात कीजिए: 2x² - 7x + 3 = 0',
          solution: 'Here, a = 2, b = -7, c = 3.\nDiscriminant D = b² - 4ac = (-7)² - 4(2)(3) = 49 - 24 = 25.\nUsing quadratic formula x = (-b ± √D) / 2a:\nx = (-(-7) ± √25) / (2 * 2) = (7 ± 5) / 4.\nRoots are x = (7 + 5)/4 = 3 and x = (7 - 5)/4 = 1/2.\n\nयहाँ, a = 2, b = -7, c = 3.\nविविक्तकर D = b² - 4ac = (-7)² - 4(2)(3) = 25.\nसूत्र से: x = (7 ± 5) / 4.\nमूल x = 3 और x = 1/2 हैं।'
        },
        {
          id: 'quad-2020-3',
          type: 'subjective',
          text: 'Find two consecutive positive integers, sum of whose squares is 365.\nदो क्रमागत धनात्मक पूर्णांक ज्ञात कीजिए, जिनके वर्गों का योग 365 हो।',
          solution: 'Let consecutive positive integers be x and x + 1.\nx² + (x + 1)² = 365 ⇒ x² + x² + 2x + 1 = 365 ⇒ 2x² + 2x - 364 = 0\nx² + x - 182 = 0\n(x + 14)(x - 13) = 0.\nSince integers are positive, x = 13. Other integer is 14.\nConsecutive integers are 13 and 14.\n\nमाना क्रमागत धनात्मक पूर्णांक x और x + 1 हैं।\nx² + (x + 1)² = 365 ⇒ 2x² + 2x - 364 = 0 ⇒ x² + x - 182 = 0\nगुणनखंड करने पर: (x + 14)(x - 13) = 0.\nपूर्णांक धनात्मक होने के कारण x = 13. दूसरा पूर्णांक = 14.\nअतः धनात्मक पूर्णांक 13 और 14 हैं।'
        },
        {
          id: 'quad-2020-4',
          type: 'blank',
          text: 'Write the formula of the discriminant of the quadratic equation ax² + bx + c = 0.\nद्विघात समीकरण ax² + bx + c = 0 के विविक्तकर का सूत्र लिखिए।',
          answer: 'b² - 4ac',
          solution: 'The discriminant D of the quadratic equation ax² + bx + c = 0 is given by D = b² - 4ac.\nद्विघात समीकरण ax² + bx + c = 0 का विविक्तकर D = b² - 4ac होता है।'
        },
        {
          id: 'quad-2020-5',
          type: 'tf',
          text: 'Is (x + 1)² = 2(x - 3) a quadratic equation? (Yes / No)\nक्या (x + 1)² = 2(x - 3) एक द्विघात समीकरण है? (हाँ / नहीं)',
          answer: 'Yes',
          solution: 'Simplify: x² + 2x + 1 = 2x - 6 ⇒ x² + 7 = 0.\nSince the highest power of x is 2, it is a quadratic equation.\n\nसरल करने पर: x² + 2x + 1 = 2x - 6 ⇒ x² + 7 = 0. चूँकि x की अधिकतम घात 2 है, अतः यह एक द्विघात समीकरण है (हाँ)।'
        },
        {
          id: 'quad-2020-6',
          type: 'subjective',
          text: 'Find the values of k for the following quadratic equation, so that they have two equal roots: 2x² + kx + 3 = 0\nनिम्नलिखित द्विघात समीकरण के लिए k का वह मान ज्ञात कीजिए जिससे कि उसके दो बराबर मूल हों: 2x² + kx + 3 = 0',
          solution: 'For equal roots, D = b² - 4ac = 0.\nk² - 4(2)(3) = 0 ⇒ k² - 24 = 0 ⇒ k² = 24 ⇒ k = ±√24 = ±2√6.\n\nबराबर मूलों के लिए, विविक्तकर D = b² - 4ac = 0.\nk² - 4(2)(3) = 0 ⇒ k² - 24 = 0 ⇒ k = ±2√6.',
          orQuestion: {
            text: 'Find the roots of the following equation: x + 1/x = 3, x ≠ 0\nसमीकरण x + 1/x = 3, x ≠ 0 के मूल ज्ञात कीजिए।',
            solution: 'Multiply by x: x² + 1 = 3x ⇒ x² - 3x + 1 = 0.\nUsing quadratic formula: x = [3 ± √5] / 2.\n\nx से गुणा करने पर: x² - 3x + 1 = 0.\nद्विघाती समीकरण सूत्र से: x = [3 ± √5] / 2.'
          }
        }
      ]
    },
    {
      year: '2021',
      questions: [
        {
          id: 'quad-2021-1',
          type: 'mcq',
          text: 'If the discriminant of the quadratic equation ax² + bx + c = 0 is zero, then the quadratic equation has:\nयदि द्विघात समीकरण ax² + bx + c = 0 का विविक्तकर शून्य है, तो द्विघात समीकरण के:',
          options: [
            'two distinct real roots / दो भिन्न वास्तविक मूल',
            'two equal real roots / दो बराबर वास्तविक मूल',
            'no real roots / कोई वास्तविक मूल नहीं',
            'None of these / इनमें से कोई नहीं'
          ],
          answer: 'two equal real roots / दो बराबर वास्तविक मूल',
          solution: 'When discriminant D = 0, the quadratic equation has two equal and real roots.\nजब विविक्तकर D = 0 होता है, तो द्विघात समीकरण के दो बराबर वास्तविक मूल होते हैं।'
        },
        {
          id: 'quad-2021-2',
          type: 'blank',
          text: 'Any quadratic equation can have at most ______________ roots.\nकिसी भी द्विघात समीकरण के अधिकतम ______________ मूल हो सकते हैं।',
          answer: '2',
          solution: 'The degree of a quadratic equation is 2, so it can have at most 2 roots.\nद्विघात समीकरण की घात 2 होती है, इसलिए इसके अधिकतम 2 मूल हो सकते हैं।'
        },
        {
          id: 'quad-2021-3',
          type: 'subjective',
          text: 'Find the roots of the quadratic equation x² - 3x - 10 = 0 by factorization method.\nगुणनखंड विधि द्वारा द्विघात समीकरण x² - 3x - 10 = 0 के मूल ज्ञात कीजिए।',
          solution: 'x² - 5x + 2x - 10 = 0 ⇒ x(x - 5) + 2(x - 5) = 0 ⇒ (x - 5)(x + 2) = 0.\nx = 5 or x = -2.\nRoots of equation are 5 and -2.\n\nx² - 5x + 2x - 10 = 0 ⇒ (x - 5)(x + 2) = 0.\nx = 5, -2.\nअतः समीकरण के मूल 5 और -2 हैं।',
          orQuestion: {
            text: 'Find the discriminant of the quadratic equation 2x² - 4x + 3 = 0 and hence find the nature of its roots.\nद्विघात समीकरण 2x² - 4x + 3 = 0 का विविक्तकर ज्ञात कीजिए और फिर इसके मूलों की प्रकृति बताइए।',
            solution: 'Here, a = 2, b = -4, c = 3.\nD = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8.\nSince D < 0, the equation has no real roots (imaginary roots).\n\nयहाँ, a = 2, b = -4, c = 3.\nविविक्तकर D = b² - 4ac = (-4)² - 4(2)(3) = -8.\nचूँकि D < 0 है, अतः समीकरण के कोई वास्तविक मूल नहीं हैं (अवास्तविक/काल्पनिक मूल)।'
          }
        }
      ]
    },
    {
      year: '2022',
      questions: [
        {
          id: 'quad-2022-1',
          type: 'mcq',
          text: 'The discriminant of the quadratic equation x² - 4x + 4 = 0 is:\nद्विघात समीकरण x² - 4x + 4 = 0 का विविक्तकर है:',
          options: ['4', '2', '0', '1'],
          answer: '0',
          solution: 'Here, a = 1, b = -4, c = 4.\nDiscriminant D = b² - 4ac = (-4)² - 4(1)(4) = 16 - 16 = 0.\n\nयहाँ, a = 1, b = -4, c = 4.\nविविक्तकर D = b² - 4ac = (-4)² - 4(1)(4) = 0. सही विकल्प (c) है।'
        },
        {
          id: 'quad-2022-2',
          type: 'blank',
          text: 'If a = bq, then what is the relation between a and b?\nयदि a = bq हो, तो a और b में क्या संबंध है?',
          answer: 'b is a factor of a',
          solution: 'If a = bq, it means b divides a completely. Therefore, b is a factor of a (or a is a multiple of b).\n\nयदि a = bq है, इसका अर्थ है कि b, a को पूर्णतः विभाजित करता है। अतः b, a का एक गुणनखंड (factor) है।'
        },
        {
          id: 'quad-2022-3',
          type: 'subjective',
          text: 'Find the roots of the equation 2x² + x - 6 = 0 by factorisation.\nगुणनखंडन विधि द्वारा समीकरण 2x² + x - 6 = 0 के मूल ज्ञात कीजिए।',
          solution: '2x² + 4x - 3x - 6 = 0 ⇒ 2x(x + 2) - 3(x + 2) = 0 ⇒ (2x - 3)(x + 2) = 0.\nRoots are x = 3/2 and x = -2.\n\n2x² + 4x - 3x - 6 = 0 ⇒ (2x - 3)(x + 2) = 0.\nमूल x = 3/2 और x = -2 हैं।',
          orQuestion: {
            text: 'Find the nature of roots of the quadratic equation 2x² - 3x + 5 = 0.\nद्विघात समीकरण 2x² - 3x + 5 = 0 के मूलों की प्रकृति ज्ञात कीजिए।',
            solution: 'Here, a = 2, b = -3, c = 5.\nD = b² - 4ac = (-3)² - 4(2)(5) = 9 - 40 = -31.\nSince D < 0, the equation has no real roots.\n\nयहाँ, a = 2, b = -3, c = 5.\nD = (-3)² - 4(2)(5) = -31.\nचूँकि D < 0 है, अतः समीकरण के कोई वास्तविक मूल नहीं हैं।'
          }
        },
        {
          id: 'quad-2022-4',
          type: 'blank',
          text: 'The formula for the discriminant of the quadratic equation ax² + bx + c = 0 is D = ______________.\nद्विघात समीकरण ax² + bx + c = 0 के विविक्तकर का सूत्र D = ______________ है।',
          answer: 'b² - 4ac',
          solution: 'The discriminant is given by the formula D = b² - 4ac.\n\nविविक्तकर का सूत्र D = b² - 4ac है।'
        },
        {
          id: 'quad-2022-5',
          type: 'subjective',
          text: 'Solve the equation 6x² - x - 2 = 0.\nसमीकरण 6x² - x - 2 = 0 को हल कीजिए।',
          solution: '6x² - 4x + 3x - 2 = 0 ⇒ 2x(3x - 2) + 1(3x - 2) = 0 ⇒ (2x + 1)(3x - 2) = 0.\nRoots are x = -1/2 and x = 2/3.\n\n6x² - 4x + 3x - 2 = 0 ⇒ (2x + 1)(3x - 2) = 0.\nमूल x = -1/2 और x = 2/3 हैं।',
          orQuestion: {
            text: 'Find the value of k so that the quadratic equation kx(x-2) + 6 = 0 has two equal roots.\nk का ऐसा मान ज्ञात कीजिए कि द्विघात समीकरण kx(x-2) + 6 = 0 के दो बराबर मूल हों।',
            solution: 'The equation is kx² - 2kx + 6 = 0.\nHere a = k, b = -2k, c = 6.\nFor equal roots, D = b² - 4ac = 0 ⇒ (-2k)² - 4(k)(6) = 0\n4k² - 24k = 0 ⇒ 4k(k - 6) = 0.\nSince a = k ≠ 0, k cannot be 0. Therefore, k = 6.\n\nसमीकरण: kx² - 2kx + 6 = 0. a = k, b = -2k, c = 6.\nबराबर मूलों के लिए: (-2k)² - 4(k)(6) = 0 ⇒ 4k(k - 6) = 0.\nचूँकि a = k ≠ 0 है, अतः k ≠ 0. इसलिए k = 6.'
          }
        }
      ]
    },
    {
      year: '2023',
      questions: [
        {
          id: 'quad-2023-1',
          type: 'mcq',
          text: 'Write the standard form of a quadratic equation:\nद्विघात समीकरण का मानक रूप लिखिए:',
          options: [
            'a²x + bx + c = 0',
            'ax² + bx + c',
            'ax² + bx + c = 0',
            'a²x + bx + c² = 0'
          ],
          answer: 'ax² + bx + c = 0',
          solution: 'The standard form of a quadratic equation is ax² + bx + c = 0, where a, b, c are real numbers and a ≠ 0. Correct option is (c).\nद्विघात समीकरण का मानक रूप ax² + bx + c = 0 होता है, जहाँ a, b, c वास्तविक संख्याएँ हैं और a ≠ 0. सही विकल्प (c) है।'
        },
        {
          id: 'quad-2023-2',
          type: 'blank',
          text: 'Sridharacharya derived a formula, now known as the ______________.\nश्रीधराचार्य ने एक सूत्र प्रतिपादित किया था, जिसे अब ______________ के रूप में जाना जाता है।',
          answer: 'quadratic formula',
          solution: 'The formula is known as the Quadratic Formula (or Sridharacharya formula) for finding roots.\n\nश्रीधराचार्य द्वारा प्रतिपादित सूत्र को द्विघाती सूत्र (Quadratic Formula) कहा जाता है।'
        },
        {
          id: 'quad-2023-3',
          type: 'blank',
          text: 'Write the formula of discriminant for quadratic equation ax² + bx + c = 0.\nद्विघात समीकरण ax² + bx + c = 0 के विविक्तकर का सूत्र लिखिए।',
          answer: 'b² - 4ac',
          solution: 'D = b² - 4ac.\n\nD = b² - 4ac है।'
        },
        {
          id: 'quad-2023-4',
          type: 'subjective',
          text: 'Check whether x² - 2x = -2(3 - x) is a quadratic equation.\nजांच कीजिए कि क्या x² - 2x = -2(3 - x) एक द्विघात समीकरण है।',
          solution: 'Simplify: x² - 2x = -6 + 2x ⇒ x² - 4x + 6 = 0.\nThis is of the form ax² + bx + c = 0 where a = 1 ≠ 0. Therefore, it is a quadratic equation.\n\nसरल करने पर: x² - 2x = -6 + 2x ⇒ x² - 4x + 6 = 0.\nयह ax² + bx + c = 0 के रूप का है जहाँ a = 1 ≠ 0 है। अतः यह एक द्विघात समीकरण है।',
          orQuestion: {
            text: 'Find the discriminant of the quadratic equation 2x² - 4x + 3 = 0.\nद्विघात समीकरण 2x² - 4x + 3 = 0 का विविक्तकर ज्ञात कीजिए।',
            solution: 'Here, a = 2, b = -4, c = 3.\nDiscriminant D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8.\n\nविविक्तकर D = b² - 4ac = (-4)² - 4(2)(3) = -8.'
          }
        }
      ]
    },
    {
      year: '2024',
      questions: [
        {
          id: 'quad-2024-1',
          type: 'mcq',
          text: 'A quadratic equation ax² + bx + c = 0 has no real roots if:\nद्विघात समीकरण ax² + bx + c = 0 के कोई वास्तविक मूल नहीं होते हैं, यदि:',
          options: [
            'b² + 4ac > 0',
            'b² - 4ac = 0',
            'b² - 4ac > 0',
            'b² - 4ac < 0'
          ],
          answer: 'b² - 4ac < 0',
          solution: 'No real roots exist when discriminant D = b² - 4ac < 0. Correct option is (d).\nकोई वास्तविक मूल नहीं होते यदि विविक्तकर D = b² - 4ac < 0 हो। सही विकल्प (d) है।'
        },
        {
          id: 'quad-2024-2',
          type: 'blank',
          text: 'The quadratic formula to solve the quadratic equation ax² + bx + c = 0 is x = ______________.\nद्विघात समीकरण ax² + bx + c = 0 को हल करने का द्विघाती सूत्र x = ______________ है।',
          answer: '(-b ± √(b² - 4ac)) / 2a',
          solution: 'The formula is x = [-b ± √(b² - 4ac)] / 2a.\n\nयह सूत्र x = [-b ± √(b² - 4ac)] / 2a है।'
        },
        {
          id: 'quad-2024-3',
          type: 'subjective',
          text: 'Check whether x² - 2x = -2(3 - x) is a quadratic equation.\nजांच कीजिए कि क्या x² - 2x = -2(3 - x) एक द्विघात समीकरण है।',
          solution: 'Simplify: x² - 2x = -6 + 2x ⇒ x² - 4x + 6 = 0.\nThis is of the form ax² + bx + c = 0, so it is a quadratic equation.\n\nसरल करने पर: x² - 4x + 6 = 0. यह एक द्विघात समीकरण है।',
          orQuestion: {
            text: 'Find the roots of the quadratic equation 6x² - x - 2 = 0.\nद्विघात समीकरण 6x² - x - 2 = 0 के मूल ज्ञात कीजिए।',
            solution: 'Factorizing: 6x² - 4x + 3x - 2 = 0 ⇒ 2x(3x - 2) + 1(3x - 2) = 0 ⇒ (2x + 1)(3x - 2) = 0.\nRoots are x = -1/2, 2/3.\n\nगुणनखंड करने पर: (2x + 1)(3x - 2) = 0. मूल x = -1/2, 2/3 हैं।'
          }
        }
      ]
    },
    {
      year: '2025',
      questions: [
        {
          id: 'quad-2025-1',
          type: 'mcq',
          text: 'The quadratic equation ax² + bx + c = 0 has real and equal roots if:\nद्विघात समीकरण ax² + bx + c = 0 के वास्तविक और बराबर मूल होते हैं यदि:',
          options: [
            'b² + 4ac > 0',
            'b² - 4ac = 0',
            'b² - 4ac > 0',
            'b² - 4ac < 0'
          ],
          answer: 'b² - 4ac = 0',
          solution: 'For real and equal roots, the discriminant D = b² - 4ac must be zero. Correct option is (b).\nवास्तविक और बराबर मूल होने के लिए विविक्तकर D = b² - 4ac = 0 होना चाहिए। सही विकल्प (b) है।'
        },
        {
          id: 'quad-2025-2',
          type: 'blank',
          text: 'Write the standard form of a quadratic equation.\nद्विघात समीकरण का मानक रूप लिखिए।',
          answer: 'ax² + bx + c = 0',
          solution: 'The standard form is ax² + bx + c = 0 where a ≠ 0.\n\nमानक रूप ax² + bx + c = 0 है जहाँ a ≠ 0.'
        },
        {
          id: 'quad-2025-3',
          type: 'subjective',
          text: 'Find the roots of the equation 2x² - 5x + 3 = 0 by factorisation.\nगुणनखंडन विधि द्वारा समीकरण 2x² - 5x + 3 = 0 के मूल ज्ञात कीजिए।',
          solution: '2x² - 2x - 3x + 3 = 0 ⇒ 2x(x - 1) - 3(x - 1) = 0 ⇒ (2x - 3)(x - 1) = 0.\nRoots are x = 1 and x = 3/2.\n\nगुणनखंड करने पर: (2x - 3)(x - 1) = 0. मूल x = 1 और x = 3/2 हैं।',
          orQuestion: {
            text: 'Find two consecutive positive integers, sum of whose squares is 365.\nदो क्रमागत धनात्मक पूर्णांक ज्ञात कीजिए, जिनके वर्गों का योग 365 हो।',
            solution: 'Let numbers be x and x + 1. x² + (x + 1)² = 365 ⇒ x² + x - 182 = 0 ⇒ (x + 14)(x - 13) = 0.\nx = 13. Consecutive integers are 13 and 14.\n\nमाना पूर्णांक x और x + 1 हैं। x² + (x + 1)² = 365 ⇒ x² + x - 182 = 0 ⇒ (x + 14)(x - 13) = 0. x = 13, अतः पूर्णांक 13 और 14 हैं।'
          }
        }
      ]
    },
    {
      year: '2026',
      questions: [
        {
          id: 'quad-2026-1',
          type: 'mcq',
          text: 'Discriminant of the quadratic equation ax² + bx + c = 0, a ≠ 0 is:\nद्विघाती समीकरण ax² + bx + c = 0, a ≠ 0 का विविक्तकर है:',
          options: [
            'b² + 4ac',
            'b² - 4ac',
            'b² - 4a',
            'b - 4ac'
          ],
          answer: 'b² - 4ac',
          solution: 'The discriminant represents D = b² - 4ac. Correct option is (b).\nद्विघात समीकरण का विविक्तकर D = b² - 4ac होता है। सही विकल्प (b) है।'
        },
        {
          id: 'quad-2026-2',
          type: 'blank',
          text: 'Write the formula to find the roots of quadratic equation ax² + bx + c = 0, a ≠ 0.\nद्विघात समीकरण ax² + bx + c = 0, a ≠ 0 के मूल ज्ञात करने का सूत्र लिखिए।',
          answer: 'x = (-b ± √(b² - 4ac)) / 2a',
          solution: 'The quadratic formula is x = [-b ± √(b² - 4ac)] / 2a.\n\nद्विघाती सूत्र x = [-b ± √(b² - 4ac)] / 2a है।'
        },
        {
          id: 'quad-2026-3',
          type: 'subjective',
          text: 'Find the roots of the equation x² + x - 12 = 0 by factorisation.\nगुणनखंड विधि द्वारा समीकरण x² + x - 12 = 0 के मूल ज्ञात कीजिए।',
          solution: 'x² + 4x - 3x - 12 = 0 ⇒ x(x + 4) - 3(x + 4) = 0 ⇒ (x - 3)(x + 4) = 0.\nRoots are x = 3 and x = -4.\n\nगुणनखंड करने पर: (x - 3)(x + 4) = 0. मूल x = 3 और x = -4 हैं।',
          orQuestion: {
            text: 'Find the value of k for quadratic equation 3x² + kx + 3 = 0 has two equal roots.\nद्विघात समीकरण 3x² + kx + 3 = 0 में k का ऐसा मान ज्ञात कीजिए जिसके लिए उसके दो बराबर मूल हों।',
            solution: 'a = 3, b = k, c = 3.\nFor equal roots, D = b² - 4ac = 0 => k² - 4(3)(3) = 0 => k² - 36 = 0 => k² = 36 => k = ±6.\n\nबराबर मूलों के लिए: D = k² - 4(3)(3) = 0 => k² = 36 => k = ±6.'
          }
        }
      ]
    },
    {
      year: '2026 Standard',
      questions: [
        {
          id: 'quad-2026s-1',
          type: 'mcq',
          text: 'The discriminant of the quadratic equation 2x² - 4x + 3 = 0 is:\nद्विघाती समीकरण 2x² - 4x + 3 = 0 का विविक्तकर है:',
          options: ['8', '40', '-8', '16'],
          answer: '-8',
          solution: 'Here, a = 2, b = -4, c = 3.\nDiscriminant D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8. Correct option is (c).\n\nविविक्तकर D = b² - 4ac = (-4)² - 4(2)(3) = -8 है। सही विकल्प (c) है।'
        },
        {
          id: 'quad-2026s-2',
          type: 'blank',
          text: 'Write the formula of the discriminant of the quadratic equation ax² + bx + c = 0.\nद्विघाती समीकरण ax² + bx + c = 0 के विविक्तकर का सूत्र लिखिए।',
          answer: 'b² - 4ac',
          solution: 'D = b² - 4ac.\n\nD = b² - 4ac.'
        },
        {
          id: 'quad-2026s-3',
          type: 'subjective',
          text: 'Find the roots of the equation 2x² - x + 1/8 = 0.\nसमीकरण 2x² - x + 1/8 = 0 के मूल ज्ञात कीजिए।',
          solution: 'Multiply by 8: 16x² - 8x + 1 = 0.\nFactorizing: (4x - 1)² = 0 ⇒ 4x - 1 = 0 ⇒ x = 1/4.\nRoots are 1/4 and 1/4.\n\n8 से गुणा करने पर: 16x² - 8x + 1 = 0.\nगुणनखंडन: (4x - 1)² = 0 ⇒ x = 1/4.\nसमीकरण के मूल 1/4 और 1/4 हैं।',
          orQuestion: {
            text: 'Find the value of k for quadratic equation 2x² + kx + 3 = 0 has two equal roots.\nद्विघात समीकरण 2x² + kx + 3 = 0 में k का ऐसा मान ज्ञात कीजिए जिससे इसके दो बराबर मूल हों।',
            solution: 'For equal roots, D = b² - 4ac = 0.\nk² - 4(2)(3) = 0 ⇒ k² - 24 = 0 ⇒ k² = 24 ⇒ k = ±2√6.\n\nबराबर मूलों के लिए: D = k² - 24 = 0 => k = ±2√6.'
          }
        }
      ]
    }
  ]
};

const renderQuestionGraph = (type?: string) => {
  if (!type) return null;
  if (type === 'poly-graph-2021-3-or') {
    return (
      <div className="my-4 p-4 bg-white border border-slate-150 rounded-xl max-w-sm mx-auto shadow-sm">
        <p className="text-center text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Graph of / ग्राफ of y = P(x)</p>
        <svg viewBox="0 0 320 220" className="w-full h-auto bg-slate-50 rounded-lg overflow-visible font-mono">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="rounded-lg" />
          
          {/* X axis (Y = 110) */}
          <line x1="10" y1="110" x2="310" y2="110" stroke="#64748b" strokeWidth="2" />
          {/* Y axis (X = 160) */}
          <line x1="160" y1="10" x2="160" y2="210" stroke="#64748b" strokeWidth="2" />
          
          {/* Axis Labels */}
          <text x="305" y="105" className="text-[11px] font-black fill-slate-600">X</text>
          <text x="5" y="105" className="text-[11px] font-black fill-slate-600">X'</text>
          <text x="165" y="20" className="text-[11px] font-black fill-slate-600">Y</text>
          <text x="165" y="205" className="text-[11px] font-black fill-slate-600">Y'</text>
          <text x="145" y="123" className="text-[10px] font-black fill-slate-400">O</text>

          {/* Smooth Polynomial Curve crossing x-axis exactly 4 times! */}
          <path 
            d="M 40,30 Q 60,30 80,110 T 140,110 T 210,110 T 280,110 Q 290,50 300,50" 
            fill="none" 
            stroke="#f97316" 
            strokeWidth="3.5" 
            strokeLinecap="round"
          />

          {/* Red/Amber highlight dots on the 4 intersection points! */}
          <circle cx="80" cy="110" r="5" fill="#ef4444" stroke="white" strokeWidth="1.5" />
          <circle cx="140" cy="110" r="5" fill="#ef4444" stroke="white" strokeWidth="1.5" />
          <circle cx="210" cy="110" r="5" fill="#ef4444" stroke="white" strokeWidth="1.5" />
          <circle cx="280" cy="110" r="5" fill="#ef4444" stroke="white" strokeWidth="1.5" />

          {/* Subtitle labels for the dots */}
          <text x="75" y="100" className="text-[10px] font-black fill-rose-600">1</text>
          <text x="135" y="100" className="text-[10px] font-black fill-rose-600">2</text>
          <text x="205" y="100" className="text-[10px] font-black fill-rose-600">3</text>
          <text x="275" y="100" className="text-[10px] font-black fill-rose-600">4</text>
        </svg>
      </div>
    );
  }
  return null;
};

interface DownloadsProps {
  practiceHubMode?: boolean;
}

export const Downloads: React.FC<DownloadsProps> = ({ practiceHubMode = false }) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'pyq'>(practiceHubMode ? 'pyq' : 'blueprint');

  useEffect(() => {
    if (practiceHubMode) {
      setActiveTab('pyq');
    }
  }, [practiceHubMode]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [activeSubjectId, setActiveSubjectId] = useState<'hindi' | 'social_science' | 'science' | 'math' | 'sanskrit' | null>(null);
  
  // PYQ States
  const [pyqSubjectFilter, setPyqSubjectFilter] = useState<string>('hindi');
  const [pyqYearFilter, setPyqYearFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePyqPaper, setActivePyqPaper] = useState<PastPaper | null>(null);
  const [activePyqSectionIdx, setActivePyqSectionIdx] = useState<number>(0);
  const [rollNumber, setRollNumber] = useState<string>('');
  const [showToast, setShowToast] = useState<{ year?: string; subject?: string; subjectHi?: string } | null>(null);
  const [selectedPyqSubject, setSelectedPyqSubject] = useState<string | null>(null);
  const [selectedPyqChapter, setSelectedPyqChapter] = useState<{ en: string; hi: string } | null>(null);
  const [userAnswers, setUserAnswers] = useState<{[questionId: string]: string}>({});
  const [showSolutions, setShowSolutions] = useState<{[questionId: string]: boolean}>({});

  const handleYearFilterClick = (year: string) => {
    if (['2026', '2025', '2024', '2023', '2022'].includes(year)) {
      setShowToast({ year });
      // Clear after 3 seconds
      const timer = setTimeout(() => {
        setShowToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setPyqYearFilter(year);
    }
  };

  const handleSubjectClick = (subjId: string) => {
    setSelectedPyqSubject(subjId);
    setSelectedPyqChapter(null);
  };

  const getSubjectChapters = (subjectId: string) => {
    if (subjectId === 'math') {
      return [
        { en: 'Real Numbers', hi: 'वास्तविक संख्याएँ' },
        { en: 'Polynomials', hi: 'बहुपद' },
        { en: 'Pair of Linear Equations in Two Variables', hi: 'दो चरों वाले रैखिक समीकरण युग्म' },
        { en: 'Quadratic Equations', hi: 'द्विघात समीकरण' },
        { en: 'Arithmetic Progressions', hi: 'समान्तर श्रेढ़ी' },
        { en: 'Triangles', hi: 'त्रिभुज' },
        { en: 'Coordinate Geometry', hi: 'निर्देशांक ज्यामिति' },
        { en: 'Introduction to Trigonometry', hi: 'त्रिकोणमिति का परिचय' },
        { en: 'Some Applications of Trigonometry', hi: 'त्रिकोणमिति के कुछ अनुप्रयोग' },
        { en: 'Circles', hi: 'वृत्त' },
        { en: 'Areas Related to Circles', hi: 'वृत्तों से संबंधित क्षेत्रफल' },
        { en: 'Surface Areas and Volumes', hi: 'पृष्ठीय क्षेत्रफल और आयतन' },
        { en: 'Statistics', hi: 'सांख्यिकी' },
        { en: 'Probability', hi: 'प्रायिकता' },
      ];
    }
    if (subjectId === 'science') {
      return [
        { en: 'Chemical Reactions and Equations', hi: 'रासायनिक अभिक्रियाएँ एवं समीकरण' },
        { en: 'Acids, Bases and Salts', hi: 'अम्ल, क्षारक एवं लवण' },
        { en: 'Metals and Non-metals', hi: 'धातु एवं अधातु' },
        { en: 'Carbon and its Compounds', hi: 'कार्बन एवं उसके यौगिक' },
        { en: 'Life Processes', hi: 'जैव प्रक्रम' },
        { en: 'Control and Coordination', hi: 'नियंत्रण एवं समन्वय' },
        { en: 'How do Organisms Reproduce?', hi: 'जीव जनन कैसे करते हैं?' },
        { en: 'Heredity', hi: 'आनुवंशिकता' },
        { en: 'Light - Reflection and Refraction', hi: 'प्रकाश - परावर्तन तथा अपवर्तन' },
        { en: 'Human Eye and Colorful World', hi: 'मानव नेत्र तथा रंगबिरंगा संसार' },
        { en: 'Electricity', hi: 'विद्युत' },
        { en: 'Magnetic Effects of Electric Current', hi: 'विद्युत धारा के चुंबकीय प्रभाव' },
        { en: 'Our Environment', hi: 'हमारा पर्यावरण' }
      ];
    }
    if (subjectId === 'english') {
      return [
        { en: 'A Letter to God (Prose)', hi: 'अ लेटर टू गॉड' },
        { en: 'Nelson Mandela: Long Walk to Freedom', hi: 'नेल्सन मंडेला: लॉन्ग वॉक टू फ्रीडम' },
        { en: 'Two Stories about Flying', hi: 'टू स्टोरीज अबाउट फ्लाइंग' },
        { en: 'From the Diary of Anne Frank', hi: 'फ्रॉम द डायरी ऑफ़ एनी फ्रैंक' },
        { en: 'Glimpses of India', hi: 'ग्लिम्पसेज ऑफ़ इंडिया' },
        { en: 'Mijbil the Otter', hi: 'मिजबिल द ऑटर' },
        { en: 'Madam Rides the Bus', hi: 'मैडम राइड्स द बस' },
        { en: 'The Sermon at Benares', hi: 'द सरमन एट बनारस' },
        { en: 'The Proposal (Play)', hi: 'द प्रपोजल' },
        { en: 'Dust of Snow (Poem)', hi: 'डस्ट ऑफ़ स्नो' },
        { en: 'Fire and Ice (Poem)', hi: 'फायर एंड आइस' }
      ];
    }
    if (subjectId === 'hindi') {
      return [
        { en: 'Surdas ke Pad (Kavyakhand)', hi: 'सूरदास के पद' },
        { en: 'Tulsidas - Ram Lakshman Parashuram Samvad', hi: 'तुलसीदास - राम-लक्ष्मण-परशुराम संवाद' },
        { en: 'Suryakant Tripathi Nirala - उत्साह / अट नहीं रही है', hi: 'सूर्यकांत त्रिपाठी निराला - उत्साह / अट नहीं रही है' },
        { en: 'Nagarjun - यह दंतुरित मुस्कान / फसल', hi: 'नागार्जुन - यह दंतुरित मुस्कान / फसल' },
        { en: 'Manglesh Dabral - संगतकार', hi: 'मंगलेश डबराल - संगतकार' },
        { en: 'Swayam Prakash - नेताजी का चश्मा (Gadyakhand)', hi: 'स्वयं प्रकाश - नेताजी का चश्मा' },
        { en: 'Ramvriksha Benipuri - बालगोबिन भगत', hi: 'रामवृक्ष बेनीपुरी - बालगोबिन भगत' },
        { en: 'Yashpal - लखनवी अंदाज़', hi: 'यशपाल - लखनवी अंदाज़' },
        { en: 'Manu Bhandari - एक कहानी यह भी', hi: 'मन्नू भंडारी - एक कहानी यह भी' }
      ];
    }
    if (subjectId === 'social_science') {
      return [
        { en: 'Resources and Development (Geography)', hi: 'संसाधन एवं विकास' },
        { en: 'Forest and Wildlife Resources', hi: 'वन एवं वन्य जीव संसाधन' },
        { en: 'Water Resources', hi: 'जल संसाधन' },
        { en: 'Agriculture', hi: 'कृषि' },
        { en: 'Minerals and Energy Resources', hi: 'खनिज तथा ऊर्जा संसाधन' },
        { en: 'Manufacturing Industries', hi: 'विनिर्माण उद्योग' },
        { en: 'Lifelines of National Economy', hi: 'राष्ट्रीय अर्थव्यवस्था की जीवन रेखाएँ' },
        { en: 'The Rise of Nationalism in Europe (History)', hi: 'यूरोप में राष्ट्रवाद का उदय' },
        { en: 'Nationalism in India', hi: 'भारत में राष्ट्रवाद' },
        { en: 'Power Sharing (Democratic Politics)', hi: 'सत्ता की साझेदारी' },
        { en: 'Federalism', hi: 'संघवाद' },
        { en: 'Development (Economics)', hi: 'विकास' },
        { en: 'Sectors of the Indian Economy', hi: 'भारतीय अर्थव्यवस्था के क्षेत्रक' }
      ];
    }
    if (subjectId === 'sanskrit') {
      return [
        { en: 'Shuchiparyavaranam', hi: 'शुचिपर्यावरणम्‌' },
        { en: 'Buddhirbalavatee Sada', hi: 'बुद्धिर्बलवती सदा' },
        { en: 'Shishulalanam', hi: 'शिशुलालनम्‌' },
        { en: 'Jananee Tulyavatsala', hi: 'जननी तुल्यवत्सला' },
        { en: 'Subhashitani', hi: 'सुभाषितानि' },
        { en: 'Sauhardam Prakriteh Shobha', hi: 'सौहार्दं प्रकृतेः शोभा' },
        { en: 'Vichitrah Sakshee', hi: 'विचित्रः साक्षी' },
        { en: 'Suktayah', hi: 'सूक्तयः' }
      ];
    }
    return [];
  };

  const subjects: SubjectBlueprint[] = [
    {
      id: 'hindi',
      nameEn: 'Hindi',
      nameHi: 'हिंदी',
      color: 'from-orange-500 to-amber-500',
      iconBg: 'bg-orange-50 text-orange-600 border-orange-100',
      fileSize: '1.2 MB',
      description: 'Interactive Board Exam Blueprint (अंक योजना) & detailed chapter-wise marks distribution.'
    },
    {
      id: 'english',
      nameEn: 'English',
      nameHi: 'अंग्रेजी',
      color: 'from-blue-500 to-indigo-500',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
      fileSize: '1.1 MB',
      description: 'Marking pattern for reading skills, writing, grammar, and textbook exercises.'
    },
    {
      id: 'math',
      nameEn: 'Mathematics',
      nameHi: 'गणित',
      color: 'from-rose-500 to-pink-500',
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
      fileSize: '1.5 MB',
      description: 'Interactive Board Exam Blueprint (अंक योजना) & chapter-wise marks distribution.'
    },
    {
      id: 'science',
      nameEn: 'Science',
      nameHi: 'विज्ञान',
      color: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      fileSize: '1.4 MB',
      description: 'Interactive Board Exam Blueprint (अंक योजना) & chapter-wise marks distribution.'
    },
    {
      id: 'social_science',
      nameEn: 'Social Science',
      nameHi: 'सामाजिक विज्ञान',
      color: 'from-amber-500 to-yellow-600',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      fileSize: '1.6 MB',
      description: 'Interactive Board Exam Blueprint (अंक योजना) & chapter-wise marks distribution.'
    },
    {
      id: 'sanskrit',
      nameEn: 'Sanskrit',
      nameHi: 'संस्कृत',
      color: 'from-purple-500 to-violet-500',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
      fileSize: '1.0 MB',
      description: 'Interactive Board Exam Blueprint (अंक योजना) & chapter-wise marks distribution.'
    }
  ];

  // High Fidelity data structures representing Blueprints
  const hindiBlueprint: Unit[] = [
    {
      id: 1,
      title: 'क्षितिज भाग - 2 एवं काव्य बोध (Hindi Part-1)',
      chapters: [
        {
          num: 1,
          name: 'क्षितिज भाग - 2 काव्य खण्ड :\n• ऊधौ, तुम हौ अति बड़भागी\n• मन की मन ही माँझ रही\n• हमारे हरि हारिल की लकरी\n• हरि हैं राजनीति पढ़ि आए\n• राम-लक्ष्मण परशुराम संवाद\n• आत्मकथ्य\n• उत्साह\n• अट नहीं रही है\n• यह दंतुरित मुसकान\n• फसल\n• संगतकार\n• पद्य साहित्य का इतिहास एवं काल विभाजन (रीतिकाल, आधुनिक काल, प्रयोगवाद, प्रगतिवाद, नई कविता)\n• कवि परिचय\n• भावार्थ (सन्दर्भ, प्रसंग, भावार्थ, काव्य सौन्दर्य)\n• सौन्दर्य बोध तथा भाव एवं विषय वस्तु पर आधारित प्रश्न',
          marks: '17'
        },
        {
          num: 2,
          name: 'काव्य बोध :\n• काव्य की परिभाषा एवं भेद (प्रबन्ध काव्य के भेद)\n• रस : अंग एवं प्रकार उदाहरण सहित\n• छन्द : दोहा एवं चौपाई\n• अलंकार : मानवीकरण, पुनरुक्तिप्रकाश, अतिशयोक्ति, अन्योक्ति अलंकार\n• शब्द गुण का सामान्य परिचय',
          marks: '10'
        }
      ]
    },
    {
      id: 2,
      title: 'क्षितिज भाग - 2 गद्य खण्ड, भाषा बोध एवं कृतिका (Hindi Part-2)',
      chapters: [
        {
          num: 3,
          name: 'क्षितिज भाग - 2 गद्य खण्ड :\n• नेताजी का चश्मा\n• बालगोबिन भगत\n• लखनवी अंदाज\n• एक कहानी यह भी\n• नौबतखाने में इबादत\n• संस्कृति\n• गद्य की प्रमुख एवं गौण विधाएँ\n• लेखक परिचय\n• व्याख्या (सन्दर्भ, प्रसंग, व्याख्या, विशेष)\n• विषय वस्तु एवं विचार बोध पर आधारित प्रश्न',
          marks: '17'
        },
        {
          num: 4,
          name: 'भाषा बोध :\n• संधि एवं समास (भेद एवं उदाहरण), वाच्य, क्रिया के भेद एवं क्रिया विशेषण\n• मुहावरें एवं लोकोक्तियाँ, अनेकार्थी शब्द, वाक्यांश के लिए एक शब्द\n• वाक्य के भेद (अर्थ के आधार पर)\n• शब्द शक्ति का सामान्य परिचय',
          marks: '08'
        },
        {
          num: 5,
          name: 'कृतिका भाग-2 :\n• पूरक पाठ्यपुस्तक से विविध पाठों पर आधारित प्रश्न\n1. माता का अंचल  2. साना-साना हाथ जोड़ि......  3. मैं क्यों लिखता हूँ ?',
          marks: '08'
        }
      ]
    },
    {
      id: 3,
      title: 'अपठित बोध, पत्र एवं निबंध लेखन (Hindi Part-3)',
      chapters: [
        {
          num: 6,
          name: 'अपठित बोध :\n• अपठित काव्यांश / गद्यांश',
          marks: '04'
        },
        {
          num: 7,
          name: 'पत्र लेखन :\n• औपचारिक पत्र / अनौपचारिक पत्र',
          marks: '04'
        },
        {
          num: 8,
          name: 'लेखन कार्य :\n• अनुच्छेद लेखन / संवाद लेखन / विज्ञापन लेखन / सूचना लेखन\n• निबन्ध लेखन (रूपरेखा सहित)',
          marks: '07'
        }
      ]
    }
  ];

  const socialScienceBlueprint: Unit[] = [
    {
      id: 1,
      title: 'समकालीन भारत-2 (भूगोल)',
      chapters: [
        { num: 1, name: 'संसाधन एवं विकास', marks: '4' },
        { num: 2, name: 'वन एवं वन्य जीव संसाधन', marks: '4' },
        { num: 3, name: 'जल संसाधन', marks: '2' },
        { num: 4, name: 'कृषि', marks: '3' },
        { num: 5, name: 'खनिज तथा ऊर्जा संसाधन', marks: '4 (मानचित्र)' },
        { num: 6, name: 'विनिर्माण उद्योग', marks: '3' },
        { num: 7, name: 'राष्ट्रीय अर्थव्यवस्था की जीवन रेखाएं', marks: '5' }
      ]
    },
    {
      id: 2,
      title: 'भारत और समकालीन विश्व-2 (इतिहास)',
      chapters: [
        { num: 1, name: 'यूरोप में राष्ट्रवाद का उदय', marks: '2' },
        { num: 2, name: 'भारत में राष्ट्रवाद', marks: '5' },
        { num: 3, name: 'भूमण्डलीकृत विश्व का बनना', marks: '3' },
        { num: 4, name: 'औद्योगिकीकरण का युग', marks: '4' },
        { num: 5, name: 'मुद्रण संस्कृति और आधुनिक दुनिया', marks: '4' },
        { num: 6, name: 'अमर बलिदानी', marks: '2' }
      ]
    },
    {
      id: 3,
      title: 'लोकतांत्रिक राजनीति-2 (राजनीति विज्ञान)',
      chapters: [
        { num: 1, name: 'सत्ता की साझेदारी', marks: '2' },
        { num: 2, name: 'संघवाद', marks: '4' },
        { num: 3, name: 'जाति, धर्म और लैंगिक मसले', marks: '2' },
        { num: 4, name: 'राजनीतिक दल', marks: '4' },
        { num: 5, name: 'लोकतंत्र के परिणाम', marks: '3' }
      ]
    },
    {
      id: 4,
      title: 'आर्थिक विकास की समझ (अर्थशास्त्र)',
      chapters: [
        { num: 1, name: 'विकास', marks: '2' },
        { num: 2, name: 'भारतीय अर्थव्यवस्था के क्षेत्रक', marks: '4' },
        { num: 3, name: 'मुद्रा और साख', marks: '4' },
        { num: 4, name: 'वैश्वीकरण और भारतीय अर्थव्यवस्था', marks: '3' },
        { num: 5, name: 'उपभोक्ता अधिकार', marks: '2' }
      ]
    }
  ];

  const scienceBlueprint: Unit[] = [
    {
      id: 1,
      title: 'विज्ञान विषय वस्तु (Science Course Chapters)',
      chapters: [
        { num: 1, name: 'रासायनिक अभिक्रियाएं एवं समीकरण', marks: '7' },
        { num: 2, name: 'अम्ल क्षार एवं लवण', marks: '6' },
        { num: 3, name: 'धातु एवं अधतु', marks: '5' },
        { num: 4, name: 'कार्बन एवं उसके यौगिक', marks: '6' },
        { num: 5, name: 'जैव प्रक्रम', marks: '8' },
        { num: 6, name: 'नियंत्रण एवं समन्वय', marks: '6' },
        { num: 7, name: 'जीव जनन कैसे करते है?', marks: '6' },
        { num: 8, name: 'अनुवांशिकता', marks: '4' },
        { num: 9, name: 'प्रकाश परावर्तन एवं अपवर्तन', marks: '8' },
        { num: 10, name: 'मानव नेत्र एवं रंग बिरंगा संसार', marks: '5' },
        { num: 11, name: 'विद्युत', marks: '5' },
        { num: 12, name: 'विद्युत धारा के चुंबकीय प्रभाव', marks: '6' },
        { num: 13, name: 'हमारा पर्यावरण', marks: '3' }
      ]
    }
  ];

  const mathBlueprint: Unit[] = [
    {
      id: 1,
      title: 'गणित Basic / गणित Standard विषय वस्तु (Maths Course Chapters)',
      chapters: [
        { num: 1, name: 'अध्याय-1 वास्तविक संख्याएँ - भूमिका, अंकगणित की आधारभूत प्रमेय, अपरिमेय संख्याओं का पुनर्भ्रमण, सारांश', marks: '6' },
        { num: 2, name: 'अध्याय-2 बहुपद - भूमिका, बहुपदों के शून्यकों का ज्यामितीय अर्थ, किसी बहुपद के शून्यकों और गुणांकों में संबंध, सारांश', marks: '5' },
        { num: 3, name: 'अध्याय-3 दो चर वाले रैखिक समीकरण युग्म - भूमिका, रैखिक समीकरण युग्म का ग्राफीय विधि से हल, एक रैखिक समीकरण युग्म को हल करने की बीजगणितीय विधि (प्रतिस्थापन विधि, विलोपन विधि), सारांश', marks: '7' },
        { num: 4, name: 'अध्याय-4 द्विघात समीकरण - भूमिका, द्विघात समीकरण, गुणनखंडों द्वारा द्विघात समीकरण का हल, मूलों की प्रकृति, सारांश', marks: '5' },
        { num: 5, name: 'अध्याय-5 समांतर श्रेढ़ियाँ - भूमिका, समांतर श्रेढ़ियाँ, A.P. का nवाँ पद, A.P. के प्रथम n पदों का योग, सारांश', marks: '5' },
        { num: 6, name: 'अध्याय-6 त्रिभुज - भूमिका, समरूप आकृतियाँ, त्रिभुजों की समरूपता, त्रिभुजों की समरूपता के लिए कसौटियाँ, सारांश', marks: '5' },
        { num: 7, name: 'अध्याय-7 निर्देशांक ज्यामिति - भूमिका, दूरी सूत्र, विभाजन सूत्र, सारांश', marks: '5' },
        { num: 8, name: 'अध्याय-8 त्रिकोणमिति का परिचय - भूमिका, त्रिकोणमितीय अनुपात, कुछ विशिष्ट कोणों के त्रिकोणमितीय अनुपात, त्रिकोणमितीय सर्वसमिकाएँ, सारांश', marks: '5' },
        { num: 9, name: 'अध्याय-9 त्रिकोणमिति के कुछ अनुप्रयोग - ऊँचाइयाँ और दूरियाँ, सारांश', marks: '5' },
        { num: 10, name: 'अध्याय-10 वृत्त - भूमिका, वृत्त की स्पर्श रेखा, एक बिन्दु से एक वृत्त पर स्पर्श रेखाओं की संख्या, सारांश', marks: '5' },
        { num: 11, name: 'अध्याय-11 वृत्तों से संबंधित क्षेत्रफल - त्रिज्यखंड और वृत्तखंड के क्षेत्रफल, सारांश', marks: '5' },
        { num: 12, name: 'अध्याय-12 पृष्ठीय क्षेत्रफल और आयतन - भूमिका, ठोसों के संयोजन का पृष्ठीय क्षेत्रफल, ठोसों के संयोजन का आयतन, सारांश', marks: '6' },
        { num: 13, name: 'अध्याय-13 सांख्यिकी - भूमिका, वर्गीकृत आँकड़ों का माध्य, वर्गीकृत आँकड़ों का बहुलक, वर्गीकृत आँकड़ों का माध्यक, सारांश', marks: '5' },
        { num: 14, name: 'अध्याय-14 प्रायिकता - प्रायिकता-एक सैद्धांतिक दृष्टिकोण, सारांश', marks: '6' }
      ]
    }
  ];

  const sanskritBlueprint: Unit[] = [
    {
      id: 1,
      title: 'संस्कृत विषय वस्तु (Sanskrit Course Chapters)',
      chapters: [
        { num: 1, name: 'शब्दरूपाणि + अव्यया:', marks: '4 + 2 = 6' },
        { num: 2, name: 'धातुरूपाणि + उपसर्गा:', marks: '4 + 2 = 6' },
        { num: 3, name: 'सन्धय: + समासा:', marks: '3 + 3 = 6' },
        { num: 4, name: 'प्रत्यया: + एकपदेन प्रश्नोत्तराणि', marks: '3 + 3 = 6' },
        { num: 5, name: 'विशेषणं / विशेष्यम् + पर्याय: + विलोम:', marks: '2 + 2 + 2 = 6' },
        { num: 6, name: 'पाठगतप्रश्नोत्तराणि', marks: '10' },
        { num: 7, name: 'प्रश्ननिर्माणम्', marks: '2' },
        { num: 8, name: 'क: कं प्रति कथयति', marks: '2' },
        { num: 9, name: 'श्लोककण्ठस्थीकरणम् (पाठ्यपुस्तकात्)', marks: '2' },
        { num: 10, name: 'अशुद्धकारकसंशोधनम्', marks: '2' },
        { num: 11, name: 'पाठगतरिक्तस्थानपूर्ति:', marks: '½ × 4 = 2' },
        { num: 12, name: 'पाठाधारितकथाक्रमसंयोजनम्', marks: '½ × 4 = 2' },
        { num: 13, name: 'वाच्यपरिवर्तनम्', marks: '2' },
        { num: 14, name: 'गद्यांशम् अधिकृत्य अवबोधनात्मकप्रश्नानि', marks: '3' },
        { num: 15, name: 'पद्यांशम् अधिकृत्य अवबोधनात्मकप्रश्नानि', marks: '3' },
        { num: 16, name: 'नाट्यांशम् अधिकृत्य अवबोधनात्मकप्रश्नानि', marks: '3' },
        { num: 17, name: 'अपठितगद्यांशम्', marks: '4' },
        { num: 18, name: 'पत्रलेखनम् / आवेदनपत्रलेखनम्', marks: '4' },
        { num: 19, name: 'निबन्धलेखनम्', marks: '4' }
      ]
    }
  ];

  // High Fidelity dataset for Previous Year Papers (PYQs)
  const pastPapers: PastPaper[] = [
    {
      id: 'hi_2024',
      subjectId: 'hindi',
      subjectNameEn: 'Hindi',
      subjectNameHi: 'हिंदी',
      year: 2024,
      fileSize: '1.2 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Main Board Exam',
      examTypeHi: 'मुख्य वार्षिक परीक्षा',
      color: 'from-orange-500 to-amber-500',
      sections: [
        {
          titleEn: 'Section A - Objective Type Questions',
          titleHi: "खण्ड 'अ' - वस्तुनिष्ठ प्रश्न",
          questions: [
            "प्रश्न 1: 'सूरसागर' के रचनाकार कौन हैं? \n(अ) सूरदास (ब) कबीरदास (स) तुलसीदास (द) रसखान ।"
          ]
        }
      ]
    }
  ];

  // Helper to handle client-side interactive actions and static PDF downloads
  const handleAction = (id: string, nameEn: string) => {
    const isInteractive = id === 'hindi' || id === 'social_science' || id === 'science' || id === 'math' || id === 'sanskrit';
    if (isInteractive) {
      setActiveSubjectId(id as any);
    } else {
      if (downloadedIds.includes(id)) return;
      setDownloadingId(id);
      setTimeout(() => {
        setDownloadingId(null);
        setDownloadedIds(prev => [...prev, id]);
      }, 1500);
    }
  };

  const handlePyqDownload = (id: string) => {
    if (downloadedIds.includes(id)) return;
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds(prev => [...prev, id]);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const getActiveBlueprintData = () => {
    switch (activeSubjectId) {
      case 'hindi':
        return hindiBlueprint;
      case 'social_science':
        return socialScienceBlueprint;
      case 'science':
        return scienceBlueprint;
      case 'math':
        return mathBlueprint;
      case 'sanskrit':
        return sanskritBlueprint;
      default:
        return [];
    }
  };

  const getActiveSubjectName = () => {
    switch (activeSubjectId) {
      case 'hindi':
        return 'हिन्दी (Hindi)';
      case 'social_science':
        return 'सामाजिक विज्ञान (SST)';
      case 'science':
        return 'विज्ञान (Science)';
      case 'math':
        return 'गणित (Mathematics)';
      case 'sanskrit':
        return 'संस्कृत (Sanskrit)';
      default:
        return '';
    }
  };

  // Filter Past Papers
  const filteredPapers = pastPapers.filter((paper) => {
    const matchesSubject = pyqSubjectFilter === 'all' || paper.subjectId === pyqSubjectFilter;
    const matchesYear = pyqYearFilter === 'all' || paper.year.toString() === pyqYearFilter;
    const matchesSearch = 
      paper.subjectNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.subjectNameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.year.toString().includes(searchQuery);
    return matchesSubject && matchesYear && matchesSearch;
  });

  const activeBlueprintData = getActiveBlueprintData();
  const activeSubjectName = getActiveSubjectName();

  return (
    <div className="bg-slate-50 min-h-[90vh] py-16 px-4 md:px-6 relative overflow-hidden animate-fade-in flex flex-col items-center">
      {/* Background Ornaments */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-brand-orange rounded-full blur-[120px] -translate-y-1/3" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-brand-navy rounded-full blur-[120px] translate-y-1/3" />
      </div>

      <div className="max-w-6xl w-full z-10">
        {!activePyqPaper && (
          <div className="animate-fade-in">
            {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange text-xs font-black tracking-widest uppercase rounded-full mb-4 border border-brand-orange/20"
          >
            <Sparkles size={14} />
            <span>{practiceHubMode ? 'Anay Practice Hub / अनाय प्रैक्टिस हब' : 'Syllabus & Material Portal'}</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight mb-3 uppercase">
            {practiceHubMode ? (
              <>Practice Hub <span className="text-brand-orange">/</span> प्रैक्टिस हब</>
            ) : (
              <>Downloads <span className="text-brand-orange">/</span> डाउनलोड्स</>
            )}
          </h1>
          <p className="text-slate-500 font-bold max-w-xl mx-auto text-base">
            {practiceHubMode ? (
              <>
                Chapter-wise Previous Year Board Questions & Solutions for Class 10th.
                <span className="block text-brand-orange mt-1">कक्षा 10वीं के लिए अध्यायवार पुराने बोर्ड प्रश्न और उत्तर</span>
              </>
            ) : (
              <>
                Bilingual educational blueprints and previous board exam papers with solutions.
                <span className="block text-brand-orange mt-1">विशेष पाठ्यक्रम ब्लूप्रिंट और पिछले वर्षों के परीक्षा पत्र</span>
              </>
            )}
          </p>
        </div>

        {/* CUSTOM SEGMENTED TAB SELECTOR WITH BEAUTIFUL TRANSITION */}
        {!practiceHubMode && (
          <div className="flex justify-center mb-10">
            <div className="bg-white p-1.5 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setActiveTab('blueprint');
                  setSelectedPyqSubject(null);
                }}
                className={`px-5 py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'blueprint'
                    ? 'bg-brand-navy text-white shadow-lg'
                    : 'text-slate-500 hover:text-brand-navy hover:bg-slate-50'
                }`}
              >
                <BookOpen size={16} />
                <span>Syllabus Blueprint / ब्लूप्रिंट class 10th</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('pyq');
                  setSelectedPyqSubject(null);
                }}
                className={`px-5 py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'pyq'
                    ? 'bg-brand-navy text-white shadow-lg'
                    : 'text-slate-500 hover:text-brand-navy hover:bg-slate-50'
                }`}
              >
                <FileQuestion size={16} className={activeTab === 'pyq' ? 'text-brand-orange animate-pulse' : ''} />
                <span>Previous Papers / पुराने पेपर class 10th</span>
              </button>
            </div>
          </div>
        )}

        {/* CONDITIONAL RENDERING OF BOTH TAB WORKFLOWS */}
        <AnimatePresence mode="wait">
          {activeTab === 'blueprint' ? (
            <motion.div
              key="blueprint-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* Subjects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject, index) => {
                  const isDownloading = downloadingId === subject.id;
                  const isDownloaded = downloadedIds.includes(subject.id);
                  const isInteractive = subject.id === 'hindi' || subject.id === 'social_science' || subject.id === 'science' || subject.id === 'math' || subject.id === 'sanskrit';

                  return (
                    <motion.div
                      key={subject.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`bg-white rounded-3xl p-6 shadow-xl border flex flex-col justify-between group hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${
                        isInteractive ? 'border-brand-orange/50 ring-2 ring-brand-orange/10 shadow-brand-orange/5' : 'border-slate-100'
                      }`}
                    >
                      {/* Decorative border accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${subject.color}`} />

                      <div>
                        {/* Top line with Icon & Size */}
                        <div className="flex justify-between items-center mb-4 mt-2">
                          <div className={`p-3.5 rounded-2xl border ${subject.iconBg} relative`}>
                            <BookOpen size={24} />
                            {isInteractive && (
                              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-brand-orange rounded-full animate-ping" />
                            )}
                          </div>
                          <span className="text-xs font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-xl">
                            {isInteractive ? 'Interactive' : subject.fileSize}
                          </span>
                        </div>

                        {/* Bilingual Title */}
                        <div className="mb-3">
                          <h3 className="text-2xl font-black text-brand-navy leading-none mb-1 group-hover:text-brand-orange transition-colors">
                            {subject.nameEn}
                          </h3>
                          <p className="text-sm text-slate-400 font-black tracking-wide uppercase">
                            {subject.nameHi}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-slate-500 text-xs font-bold leading-relaxed mb-6">
                          {subject.description}
                        </p>
                      </div>

                      {/* Download / Interactive Button */}
                      <button
                        disabled={isDownloading}
                        onClick={() => handleAction(subject.id, subject.nameEn)}
                        className={`w-full py-3.5 rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isDownloading
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : isInteractive
                            ? 'bg-brand-navy text-white hover:bg-brand-navy/95 shadow-lg shadow-brand-navy/15 hover:scale-[1.02] border border-brand-navy'
                            : isDownloaded
                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                            : 'bg-brand-orange text-white hover:bg-brand-orange/90 shadow-lg shadow-brand-orange/15 hover:scale-[1.02]'
                        }`}
                      >
                        {isDownloading ? (
                          <>
                            <div className="w-5 h-5 border-3 border-slate-400 border-t-transparent rounded-full animate-spin" />
                            <span>Downloading...</span>
                          </>
                        ) : isInteractive ? (
                          <>
                            <ZoomIn size={18} className="text-brand-orange" />
                            <span>View Blueprint / देखें</span>
                          </>
                        ) : isDownloaded ? (
                          <>
                            <CheckCircle size={18} />
                            <span>Downloaded / डाउनलोड हो गया</span>
                          </>
                        ) : (
                          <>
                            <Download size={18} />
                            <span>Download Blueprint</span>
                          </>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="pyq-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8 animate-fade-in"
            >
              {selectedPyqSubject ? (
                selectedPyqChapter ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    {/* Header with back button */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-md border border-slate-100">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-black text-brand-orange uppercase tracking-wider mb-1">
                          <span>Chapter Wise Past Papers / अध्यायवार पुराने पेपर</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">
                          {selectedPyqChapter.en} <span className="text-brand-orange font-normal">|</span> {selectedPyqChapter.hi}
                        </h2>
                      </div>
                      <button
                        onClick={() => setSelectedPyqChapter(null)}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <ArrowLeft size={14} />
                        <span>Back to Chapters / अध्यायों की सूची</span>
                      </button>
                    </div>

                    {/* Questions Display */}
                    {mathChapterQuestions[selectedPyqChapter.en] ? (
                      <div className="space-y-8">
                        {mathChapterQuestions[selectedPyqChapter.en].map((group, gIdx) => (
                          <div key={gIdx} className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
                            {/* Year Indicator */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center font-black">
                                  <Calendar size={18} />
                                </div>
                                <div>
                                  <h3 className="text-lg font-black text-brand-navy">
                                    Board Examination {group.year}
                                  </h3>
                                  <p className="text-xs font-bold text-slate-400 uppercase mt-0.5">
                                    Official Board Exam Questions / बोर्ड परीक्षा प्रश्न
                                  </p>
                                </div>
                              </div>
                              <span className="text-xs font-black px-4 py-1.5 bg-brand-navy text-white rounded-full uppercase tracking-wider">
                                Year {group.year}
                              </span>
                            </div>

                            {/* Questions list */}
                            <div className="space-y-6">
                              {group.questions.map((question, qIdx) => {
                                const isOptionSelected = (opt: string) => userAnswers[question.id] === opt;
                                const isCorrectAnswerSelected = userAnswers[question.id] === question.answer;
                                const hasAnswered = !!userAnswers[question.id];

                                return (
                                  <div key={question.id} className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-150 relative space-y-4">
                                    {/* Question Type Badge */}
                                    <div className="flex justify-between items-center">
                                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white border border-slate-100 px-3 py-1 rounded-full">
                                        Question {qIdx + 1} • {question.type === 'mcq' ? 'Multiple Choice (MCQ)' : question.type === 'tf' ? 'True / False' : question.type === 'blank' ? 'Fill in the Blank' : 'Subjective Question'}
                                      </span>
                                    </div>

                                    {/* Question Text */}
                                    <h4 className="text-base sm:text-lg font-extrabold text-brand-navy leading-relaxed whitespace-pre-line">
                                      {question.text}
                                    </h4>

                                    {/* SVG Graph rendering if specified */}
                                    {renderQuestionGraph(question.renderSvgType)}

                                    {/* Options for MCQ */}
                                    {question.type === 'mcq' && question.options && (
                                      <div className="grid sm:grid-cols-2 gap-3 pt-2">
                                        {question.options.map((option, oIdx) => {
                                          const optionLetter = String.fromCharCode(97 + oIdx); // a, b, c, d
                                          const isSelected = isOptionSelected(option);
                                          const isCorrect = option === question.answer;

                                          let buttonClass = "w-full flex items-center gap-3 p-3.5 rounded-xl border text-sm font-extrabold transition-all cursor-pointer text-left ";
                                          if (hasAnswered) {
                                            if (isCorrect) {
                                              buttonClass += "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm";
                                            } else if (isSelected) {
                                              buttonClass += "bg-rose-50 border-rose-300 text-rose-800 shadow-sm";
                                            } else {
                                              buttonClass += "bg-white border-slate-150 text-slate-400 opacity-60";
                                            }
                                          } else {
                                            buttonClass += "bg-white border-slate-200 text-slate-700 hover:bg-brand-orange/5 hover:border-brand-orange/30";
                                          }

                                          return (
                                            <button
                                              key={oIdx}
                                              disabled={hasAnswered}
                                              onClick={() => {
                                                setUserAnswers(prev => ({ ...prev, [question.id]: option }));
                                              }}
                                              className={buttonClass}
                                            >
                                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${isSelected ? 'bg-current text-white' : 'bg-slate-100 text-slate-500'}`}>
                                                {optionLetter.toUpperCase()}
                                              </span>
                                              <span>{option}</span>
                                            </button>
                                          );
                                        })}
                                      </div>
                                    )}

                                    {/* True/False Options */}
                                    {question.type === 'tf' && (
                                      <div className="flex gap-4 pt-2">
                                        {['True', 'False'].map((option) => {
                                          const isSelected = userAnswers[question.id] === option;
                                          const isCorrect = option === question.answer;

                                          let buttonClass = "flex-1 sm:flex-none px-6 py-2.5 rounded-xl border text-sm font-extrabold transition-all cursor-pointer ";
                                          if (hasAnswered) {
                                            if (isCorrect) {
                                              buttonClass += "bg-emerald-50 border-emerald-300 text-emerald-800";
                                            } else if (isSelected) {
                                              buttonClass += "bg-rose-50 border-rose-300 text-rose-800";
                                            } else {
                                              buttonClass += "bg-white border-slate-150 text-slate-400 opacity-60";
                                            }
                                          } else {
                                            buttonClass += "bg-white border-slate-200 text-slate-700 hover:bg-brand-orange/5 hover:border-brand-orange/30";
                                          }

                                          return (
                                            <button
                                              key={option}
                                              disabled={hasAnswered}
                                              onClick={() => {
                                                setUserAnswers(prev => ({ ...prev, [question.id]: option }));
                                              }}
                                              className={buttonClass}
                                            >
                                              {option === 'True' ? 'सत्य / True' : 'असत्य / False'}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    )}

                                    {/* Fill in the Blanks Feedback */}
                                    {question.type === 'blank' && (
                                      <div className="pt-2">
                                        {!hasAnswered ? (
                                          <button
                                            onClick={() => {
                                              setUserAnswers(prev => ({ ...prev, [question.id]: question.answer || 'answered' }));
                                            }}
                                            className="px-5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-brand-navy transition-all cursor-pointer"
                                          >
                                            Reveal Answer / उत्तर देखें
                                          </button>
                                        ) : (
                                          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-bold flex items-center gap-2">
                                            <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                                            <span>Correct Answer / सही उत्तर: <strong>{question.answer}</strong></span>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {/* Show feedback if answered */}
                                    {hasAnswered && (question.type === 'mcq' || question.type === 'tf') && (
                                      <div className="mt-2 text-xs font-bold leading-none">
                                        {isCorrectAnswerSelected ? (
                                          <span className="text-emerald-600">✓ Correct! Excellent job.</span>
                                        ) : (
                                          <span className="text-rose-600">✗ Incorrect. Correct answer was: {question.answer}.</span>
                                        )}
                                      </div>
                                    )}

                                    {/* OR alternative question */}
                                    {question.orQuestion && (
                                      <div className="border-t border-dashed border-slate-200 pt-4 mt-4">
                                        <div className="inline-block bg-amber-500/10 text-amber-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider mb-3">
                                          OR / अथवा
                                        </div>
                                        <h5 className="text-base font-extrabold text-brand-navy leading-relaxed">
                                          {question.orQuestion.text}
                                        </h5>

                                        {/* SVG Graph rendering if specified */}
                                        {renderQuestionGraph(question.orQuestion.renderSvgType)}
                                      </div>
                                    )}

                                    {/* Solution toggle button */}
                                    <div className="pt-2">
                                      <button
                                        onClick={() => setShowSolutions(prev => ({ ...prev, [question.id]: !prev[question.id] }))}
                                        className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-orange hover:text-brand-orange/80 transition-colors cursor-pointer"
                                      >
                                        {showSolutions[question.id] ? 'Hide Solution / हल छिपाएं' : 'Show Complete Solution / संपूर्ण हल देखें'}
                                      </button>

                                      {/* Expanded step-by-step solution */}
                                      <AnimatePresence>
                                        {showSolutions[question.id] && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-3 p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl space-y-4 overflow-hidden"
                                          >
                                            <div>
                                              <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block mb-2">
                                                Master Solution / मुख्य हल:
                                              </span>
                                              <p className="text-sm font-semibold text-slate-700 whitespace-pre-line leading-relaxed">
                                                {question.solution}
                                              </p>
                                            </div>

                                            {question.orQuestion?.solution && (
                                              <div className="border-t border-slate-200/50 pt-3">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block mb-2">
                                                  Alternative Question Solution (OR) / अथवा प्रश्न का हल:
                                                </span>
                                                <p className="text-sm font-semibold text-slate-700 whitespace-pre-line leading-relaxed">
                                                  {question.orQuestion.solution}
                                                </p>
                                              </div>
                                            )}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center py-16 space-y-4">
                        <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                          <Sparkles size={28} className="animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-black text-brand-navy">
                          Practice Set Preparing! / तैयारी शुरू है!
                        </h3>
                        <p className="text-base text-slate-500 max-w-lg mx-auto font-bold leading-relaxed">
                          इस अध्याय (Chapter) के पिछले वर्षों के बोर्ड प्रश्न पत्र और विस्तृत हल विशेषज्ञ टीम द्वारा तैयार किए जा रहे हैं। शीघ्र ही यहाँ अपलोड कर दिए जाएंगे। अपनी तैयारी जारी रखें!
                        </p>
                        <button
                          onClick={() => setSelectedPyqChapter(null)}
                          className="px-6 py-2.5 bg-brand-navy hover:bg-brand-navy/95 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          Show Other Chapters / अन्य पाठ देखें
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    {/* Back button and title */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-md border border-slate-100">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-black text-brand-orange uppercase tracking-wider mb-1">
                          <span>Previous Papers / पुराने पेपर</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">
                          {subjects.find(s => s.id === selectedPyqSubject)?.nameEn} <span className="text-brand-orange font-normal">|</span> {subjects.find(s => s.id === selectedPyqSubject)?.nameHi}
                        </h2>
                      </div>
                      <button
                        onClick={() => setSelectedPyqSubject(null)}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <ArrowLeft size={14} />
                        <span>Back to Subjects / वापस जाएं</span>
                      </button>
                    </div>

                    {/* Chapters List */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-xl">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-brand-navy uppercase tracking-tight">
                            Chapters List / अध्याय सूची
                          </h3>
                          <p className="text-xs font-bold text-slate-400 uppercase mt-0.5">
                            Board Syllabus Chapters for Class 10th
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        {getSubjectChapters(selectedPyqSubject).map((chapter, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            onClick={() => setSelectedPyqChapter(chapter)}
                            className="flex items-center justify-between p-4 bg-slate-50 hover:bg-brand-orange/5 rounded-2xl border border-slate-100 hover:border-brand-orange/30 transition-all group duration-200 cursor-pointer"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-brand-navy text-white flex flex-col items-center justify-center font-black text-[10px] shrink-0 shadow-sm leading-none">
                                <span className="text-[8px] uppercase text-brand-orange">CH</span>
                                <span className="text-sm font-extrabold mt-0.5">{idx + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-extrabold text-base text-brand-navy group-hover:text-brand-orange transition-colors">
                                  {chapter.en}
                                </h4>
                                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                                  {chapter.hi}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider">
                                Practice Set
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              ) : (
                <>
                  {/* Modern Intro Greeting Header */}
                  <div className="bg-gradient-to-r from-brand-navy to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-brand-orange/15 rounded-full blur-3xl" />
                    <div className="relative z-10 max-w-2xl space-y-4">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-orange/20 border border-brand-orange/30 rounded-full text-xs font-black text-brand-orange uppercase tracking-wider">
                        <Sparkles size={12} className="animate-pulse" />
                        <span>{practiceHubMode ? 'Class 10th Practice Hub' : 'Class 10th Board Portal'}</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-white font-sans">
                        Class 10th <span className="text-brand-orange">{practiceHubMode ? 'Practice Hub' : 'Previous Papers'}</span>
                      </h2>
                      <p className="text-sm md:text-base font-bold text-slate-300 leading-relaxed font-sans">
                        {practiceHubMode ? (
                          "कक्षा 10वीं के सभी विषयों के पिछले वर्षों के बोर्ड प्रश्न (Chapter-wise PYQs), समाधान और ऑनलाइन अभ्यास सेट्स यहाँ उपलब्ध हैं। कृपया अपना विषय चुनें।"
                        ) : (
                          "कक्षा 10वीं के सभी विषयों के पिछले वर्षों के बोर्ड प्रश्न पत्र, मॉडल समाधान एवं अभ्यास पत्र यहाँ संकलित किए जा रहे हैं। अपनी पसंद के विषय को नीचे चुनें।"
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Grid Listing All Subjects */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjects.map((subject, index) => {
                      return (
                        <motion.div
                          key={subject.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          whileHover={{ y: -5 }}
                          onClick={() => handleSubjectClick(subject.id)}
                          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:shadow-2xl hover:border-brand-orange/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
                        >
                          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${subject.color}`} />
                          
                          <div className="space-y-4">
                            {/* Subject Top Badge / Icon with clean wrapper */}
                            <div className="flex items-center justify-between">
                              <div className={`w-12 h-12 rounded-2xl ${subject.iconBg} flex items-center justify-center border font-bold text-lg shadow-sm`}>
                                <BookOpen size={20} />
                              </div>
                              <span className="text-[10px] bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full font-black uppercase tracking-wider">
                                Uploading
                              </span>
                            </div>

                            {/* Text labels in English and Hindi */}
                            <div>
                              <h3 className="text-xl font-black text-brand-navy group-hover:text-brand-orange transition-colors font-sans">
                                {subject.nameEn}
                              </h3>
                              <p className="text-sm font-black text-slate-400 uppercase tracking-wider mt-0.5 font-sans">
                                {subject.nameHi}
                              </p>
                            </div>

                            <p className="text-xs text-slate-500 font-bold leading-relaxed line-clamp-2">
                              {subject.description || `कक्षा 10वीं ${subject.nameHi} के बोर्ड संकलन, वस्तुनिष्ठ प्रश्न एवं हल पत्र।`}
                            </p>
                          </div>

                          {/* View Button Footer */}
                          <div className="pt-6 border-t border-slate-50 mt-5 flex items-center justify-between text-brand-navy group-hover:text-brand-orange font-black text-xs uppercase tracking-widest transition-colors">
                            <span>Browse Papers / देखें</span>
                            <ChevronRight size={16} className="transform group-hover:translate-x-1.5 transition-transform" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Board Portal Notice */}
            <div className="mt-16 text-center text-xs font-black text-slate-400 uppercase tracking-widest border-t border-slate-200/60 pt-8">
              <span>* Compiled from MPBSE Board Regulatory Schema</span>
            </div>
          </div>
        )}
      </div>

      {/* STUNNING INTERACTIVE MODAL FOR BLUEPRINT INTERACTIVE DETAILS */}
      <AnimatePresence>
        {activeSubjectId && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSubjectId(null)}
              className="fixed inset-0 bg-brand-navy/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="bg-white rounded-3xl sm:rounded-[2.5rem] w-full max-w-4xl shadow-2xl relative z-10 overflow-hidden border border-slate-100 flex flex-col my-2 sm:my-8 print:my-0 print:border-none print:shadow-none max-h-[95vh] sm:max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-brand-navy text-white p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative print:bg-white print:text-black print:p-0 print:border-b-2 print:border-slate-800">
                <div className="space-y-1.5 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-brand-orange print:hidden" />
                    <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-brand-orange/90 print:text-slate-600">
                      मप्र माध्यमिक शिक्षा मण्डल (MPBSE)
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight flex items-center gap-2">
                    अंक योजना <span className="text-brand-orange">|</span> Blueprint
                  </h2>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm font-semibold text-slate-300 print:text-slate-800">
                    <div>कक्षा :- <strong className="text-white print:text-black font-extrabold text-sm">10वीं</strong></div>
                    <div>विषय :- <strong className="text-white print:text-black font-extrabold text-sm">{activeSubjectName}</strong></div>
                    <div>पूर्णांक :- <strong className="text-brand-orange font-extrabold text-sm">75</strong></div>
                    <div>समय :- <strong className="text-white print:text-black font-extrabold text-sm">3:00 घंटे</strong></div>
                  </div>
                </div>

                {/* Close Button & Print button */}
                <div className="flex items-center gap-2 self-end sm:self-center print:hidden">
                  <button
                    onClick={handlePrint}
                    className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-xl sm:rounded-2xl text-white transition-colors cursor-pointer"
                    title="Print Document"
                  >
                    <Printer size={18} />
                  </button>
                  <button
                    onClick={() => setActiveSubjectId(null)}
                    className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-xl sm:rounded-2xl text-white transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Content Grid representing the Blueprint perfectly */}
              <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4 sm:space-y-6 print:p-0">
                {activeBlueprintData.map((unit) => (
                  <div key={unit.id} className="border border-slate-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
                    {/* Unit Header */}
                    <div className="flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 bg-slate-900 text-white font-black text-sm sm:text-base md:text-lg">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-brand-orange text-white flex items-center justify-center text-[10px] sm:text-sm font-bold">
                          {unit.id}
                        </span>
                        <span className="font-extrabold">{unit.title}</span>
                      </div>
                    </div>

                    {/* Responsive Table Wrapper */}
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-0">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">
                            <th className="px-3 py-2 sm:px-6 sm:py-3.5 w-12 sm:w-16 text-center">क्र.</th>
                            <th className="px-3 py-2 sm:px-6 sm:py-3.5">अध्याय / विषय वस्तु (Topic Details)</th>
                            <th className="px-3 py-2 sm:px-6 sm:py-3.5 w-28 sm:w-36 text-center">आवंटित अंक</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {unit.chapters.map((ch) => (
                            <tr key={ch.num} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-3 py-2 sm:px-6 sm:py-3 text-center font-bold text-slate-400 text-xs sm:text-sm">
                                {ch.num}
                              </td>
                              <td className="px-3 py-2 sm:px-6 sm:py-3 font-semibold text-brand-navy text-xs sm:text-sm md:text-base whitespace-pre-line leading-relaxed py-3">
                                {ch.name}
                              </td>
                              <td className="px-3 py-2 sm:px-6 sm:py-3 text-center font-black text-brand-orange text-xs sm:text-sm md:text-base">
                                {ch.marks}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                {/* Footer Total */}
                <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center border border-slate-800 shadow-md">
                  <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-orange font-black">Final Aggregate / महायोग</span>
                    <h4 className="text-xl sm:text-2xl font-black leading-none mt-1">कुल आवंटित अंक</h4>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-wider">Total Marks:</span>
                    <span className="text-2xl sm:text-4xl font-black text-white px-4 py-1.5 sm:px-6 sm:py-2 bg-brand-orange rounded-xl sm:rounded-2xl animate-pulse">75</span>
                  </div>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between print:hidden">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide">
                  * Based on official Board marking guidelines.
                </span>
                <div className="flex gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none px-4 py-2.5 sm:px-6 sm:py-3 bg-brand-navy text-white rounded-xl font-bold uppercase text-[10px] sm:text-xs tracking-wider hover:bg-brand-navy/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer size={14} />
                    <span>Print Blueprint</span>
                  </button>
                  <button
                    onClick={() => setActiveSubjectId(null)}
                    className="flex-1 sm:flex-none px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-200 text-slate-700 rounded-xl font-bold uppercase text-[10px] sm:text-xs tracking-wider hover:bg-slate-300 transition-all flex items-center justify-center cursor-pointer"
                  >
                    <span>Close / बंद करें</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIRECT INLINE RENDER FOR PREVIOUS YEAR PAPERS (AS A PAGE, NOT POPUP) */}
      <AnimatePresence mode="wait">
        {activePyqPaper && (
          <div className="w-full">
            {/* Simulated Booklet Body */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white rounded-3xl w-full max-w-6xl xl:max-w-7xl shadow-2xl relative overflow-hidden border border-slate-200/80 flex flex-col my-2 print:border-none print:shadow-none"
            >
              {/* Back breadcrumb bar */}
              <div className="bg-slate-50 border-b border-slate-200/60 p-4 flex items-center justify-between text-xs font-bold text-slate-600 print:hidden">
                <button
                  onClick={() => setActivePyqPaper(null)}
                  className="flex items-center gap-2 text-brand-navy hover:text-brand-orange transition-colors cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Previous Papers / सूची पर वापस जाएं</span>
                </button>
                <span className="text-[10px] font-black tracking-widest text-brand-orange uppercase">
                  MPBSE Practice Mode / मुख्य परीक्षा अभ्यास पत्र
                </span>
              </div>
              {/* Board Header styling like a physical test paper cover */}
              <div className="bg-amber-500/10 text-brand-navy border-b border-amber-500/20 p-5 md:p-6 relative print:bg-white print:text-black">
                {/* Board watermark icon */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none print:hidden">
                  <FileText size={120} className="text-brand-navy" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-600 tracking-wider">
                    <FileCheck size={14} />
                    <span>HIGH SCHOOL CERTIFICATE EXAMINATION - {activePyqPaper.year} (MAIN)</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase">
                    {activePyqPaper.subjectNameHi} <span className="text-slate-400 font-normal text-xl">|</span> {activePyqPaper.subjectNameEn}
                  </h2>
                  
                  {/* Grid for Roll Number and Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-slate-200/50 text-xs font-bold text-slate-600">
                    <div>
                      <span>Max Marks / पूर्णांक:</span>
                      <span className="block text-brand-navy font-black text-sm">{activePyqPaper.totalMarks}</span>
                    </div>
                    <div>
                      <span>Duration / समय:</span>
                      <span className="block text-brand-navy font-black text-sm">{activePyqPaper.duration}</span>
                    </div>
                    <div>
                      <span>Year / शैक्षणिक वर्ष:</span>
                      <span className="block text-brand-orange font-black text-sm">{activePyqPaper.year}</span>
                    </div>
                    {/* Interactive Roll No entry */}
                    <div className="print:hidden">
                      <label htmlFor="rollNoInput" className="block text-[10px] text-amber-700 tracking-wider uppercase mb-0.5 font-bold">
                        Roll Number / रोल नंबर:
                      </label>
                      <input
                        id="rollNoInput"
                        type="text"
                        maxLength={9}
                        placeholder="Enter 9-digit Roll"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className="bg-white/80 border border-slate-300 rounded-lg px-2 py-1 text-xs font-black text-slate-800 tracking-widest placeholder:tracking-normal w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Right actions */}
                <div className="absolute right-4 top-4 flex gap-2 print:hidden">
                  <button
                    onClick={handlePrint}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-xl transition-colors cursor-pointer"
                    title="Print Exam Paper"
                  >
                    <Printer size={16} />
                  </button>
                  <button
                    onClick={() => setActivePyqPaper(null)}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-xl transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* BOOKLET LAYOUT GENERAL INSTRUCTIONS */}
              <div className="bg-slate-50 border-b border-light-gray-200 px-6 py-4 flex flex-col md:flex-row justify-between text-xs font-semibold text-slate-500 leading-relaxed gap-2 max-h-36 overflow-y-auto">
                <div className="space-y-1">
                  <p className="font-extrabold text-slate-700">General Instructions / सामान्य निर्देश:</p>
                  <p>1. All questions are compulsory. (सभी प्रश्न अनिवार्य हैं।)</p>
                  <p>2. Read instructions carefully before writing answers. (प्रश्नों के उत्तर लिखने से पूर्व निर्देश ध्यानपूर्वक पढ़ें।)</p>
                </div>
                <div className="text-right flex flex-col justify-center">
                  <span className="text-[10px] uppercase font-black tracking-widest text-brand-orange">
                    BOARD PATTERN PRACTICE PORTAL
                  </span>
                  <span>* Simulated for Board Exam revision</span>
                </div>
              </div>

              {/* SECTION CONTROLLER - TABS FOR HIGH PERFORMANCE READING */}
              <div className="bg-slate-100/50 border-b border-slate-200/50 px-4 py-2.5 flex overflow-x-auto gap-2 scrollbar-none print:hidden">
                {activePyqPaper.sections.map((sec, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePyqSectionIdx(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      activePyqSectionIdx === idx
                        ? 'bg-brand-navy text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    <span>Section - {String.fromCharCode(65 + idx)}</span>
                    <span className="text-brand-orange">|</span>
                    <span className="font-bold text-[10px]">{sec.titleHi.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* SECTION QUESTION CONTENT CARDS REVIEW */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div className="border border-amber-500/20 bg-amber-50/20 rounded-2xl p-4 mb-2">
                  <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-md">
                    Selected Component / सक्रिय भाग
                  </span>
                  <h4 className="text-base font-extrabold text-brand-navy mt-1">
                    {activePyqPaper.sections[activePyqSectionIdx]?.titleHi}
                  </h4>
                  <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-wide">
                    {activePyqPaper.sections[activePyqSectionIdx]?.titleEn}
                  </p>
                </div>

                <div className="space-y-4">
                  {activePyqPaper.sections[activePyqSectionIdx]?.questions.map((quest, qIdx) => (
                    <div 
                      key={qIdx} 
                      className="p-4 border border-slate-100 rounded-2xl bg-white hover:border-brand-orange/30 transition-all flex gap-3 group relative cursor-text"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {qIdx + 1}
                      </div>
                      <div className="text-xs sm:text-sm md:text-base font-semibold text-brand-navy leading-relaxed whitespace-pre-line">
                        {quest}
                      </div>

                      {/* Interactive practice checkbox */}
                      <div className="absolute right-3 bottom-3 print:hidden opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-black text-brand-orange border border-brand-orange/20 bg-brand-orange/5 px-2.5 py-1 rounded-lg">
                          Read / हल कर लिया?
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* OPTIONAL PRACTICE FOOTER WITH FEEDBACK */}
              <div className="p-5 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row gap-4 items-center justify-between print:hidden">
                <div className="text-xs font-bold text-slate-500">
                  {rollNumber ? (
                    <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                      <CheckCircle size={14} /> Registered roll number {rollNumber} for board revision mode!
                    </span>
                  ) : (
                    <span>Type your Roll Number to simulate custom answer-sheet print tracking.</span>
                  )}
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none px-5 py-3 bg-brand-navy text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:bg-brand-navy/95 border border-brand-navy font-black shadow-md shadow-brand-navy/10"
                  >
                    <Printer size={14} />
                    <span>Print Board booklet / प्रिंट</span>
                  </button>
                  <button
                    onClick={() => setActivePyqPaper(null)}
                    className="flex-1 sm:flex-none px-5 py-3 bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer hover:bg-slate-300 font-black"
                  >
                    <span>Close / बंद करें</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Elegant Coming Soon Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-950 text-white rounded-3xl p-5 shadow-2xl border border-brand-orange/40 flex flex-col gap-3 backdrop-blur-md bg-opacity-95"
          >
            <div className="flex items-start gap-3 col-span-1">
              <div className="p-2 rounded-xl bg-brand-orange/20 text-brand-orange shrink-0">
                <Sparkles size={20} className="animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase tracking-wider text-brand-orange">Coming Soon</h4>
                  <button 
                    onClick={() => setShowToast(null)}
                    className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="text-base font-black text-white mt-1 font-sans">
                  {showToast.year ? `${showToast.year} Paper Uploading...` : `${showToast.subject} Content Preparing...`}
                </p>
                <p className="text-xs text-slate-300 mt-1.5 font-bold leading-relaxed font-sans">
                  {showToast.year 
                    ? `बोर्ड परीक्षा ${showToast.year} के प्रश्न पत्र और अंक योजना जल्द ही आ रहे हैं! हमारे साथ तैयारी जारी रखें।`
                    : `${showToast.subjectHi || showToast.subject} विषय के बोर्ड परीक्षा प्रश्न पत्र और समाधान जल्द ही उपलब्ध कराए जाएंगे!`}
                </p>
              </div>
            </div>
            
            {/* Tiny progress bar simulating activity */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-brand-orange"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
