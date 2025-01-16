'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const reasons = [
  "Interface intuitive et moderne",
  "Support client réactif",
  "Mises à jour régulières",
  "Sécurité des données renforcée",
  "Personnalisation avancée",
  "Intégration avec d'autres outils"
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-sky-50 to-white dark:from-sky-900 dark:to-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center gradient-text"
        >
          Pourquoi Choisir SkyCrew ?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <CheckCircle className="text-primary w-6 h-6 flex-shrink-0" />
              <p className="text-lg">{reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
