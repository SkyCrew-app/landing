'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Plane, Users, FileText, Shield } from 'lucide-react';

const steps = [
  { title: "Inscription", description: "Créez votre compte SkyCrew en quelques clics", icon: Users },
  { title: "Configuration", description: "Personnalisez la plateforme selon les besoins de votre aéroclub", icon: FileText },
  { title: "Intégration", description: "Importez vos données existantes ou commencez à zéro", icon: Plane },
  { title: "Formation", description: "Formez votre équipe avec nos tutoriels interactifs", icon: Shield },
  { title: "Décollage", description: "Lancez-vous et optimisez la gestion de votre aéroclub", icon: CheckCircle },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-sky-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-12 text-center gradient-text"
        >
          Comment ça marche
        </motion.h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30"></div>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
              onMouseEnter={() => setActiveStep(index)}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              <div className="relative flex-shrink-0">
                <motion.div
                  className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white"
                  animate={{
                    scale: activeStep === index ? 1.2 : 1,
                    backgroundColor: activeStep === index ? '#3B82F6' : '#60A5FA',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon size={32} />
                </motion.div>
              </div>
              <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
