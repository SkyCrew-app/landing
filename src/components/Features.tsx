'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Plane, Calendar, Clock } from 'lucide-react';

const features = [
  { title: "Suivi de Flotte", description: "Visualisez l'état de votre flotte en temps réel, planifiez la maintenance, et suivez l'historique des vols avec une précision inégalée.", icon: Plane },
  { title: "Réservations en Ligne", description: "Un système de réservation intuitif avec un calendrier interactif qui simplifie la gestion des créneaux et optimise l'utilisation de votre flotte.", icon: Calendar },
  { title: "Suivi des Heures de Vol", description: "Enregistrement détaillé et automatisé des heures de vol, facilitant la gestion des licences et la planification de la formation continue.", icon: Clock },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-sky-50 to-white dark:from-sky-900 dark:to-gray-900">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-12 gradient-text"
        >
          Fonctionnalités Révolutionnaires
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Card className="h-full overflow-hidden bg-white dark:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <CardHeader>
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.2 : 1,
                      rotate: hoveredIndex === index ? 360 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-16 h-16 mx-auto text-primary mb-4" />
                  </motion.div>
                  <CardTitle className="text-2xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
