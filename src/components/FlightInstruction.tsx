'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, ClipboardCheck, TrendingUp } from 'lucide-react';

const features = [
  { title: "Planification des Créneaux", description: "Organisation efficace des vols d'instruction", icon: Calendar },
  { title: "Affectation des Instructeurs", description: "Gestion optimisée des disponibilités des instructeurs", icon: Users },
  { title: "Suivi des Formations", description: "Suivi détaillé du progrès des élèves pilotes", icon: ClipboardCheck },
  { title: "Évaluation des Élèves", description: "Outils d'évaluation pour mesurer la progression", icon: TrendingUp },
];

export default function FlightInstruction() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-secondary-foreground"
        >
          Planification des Vols d&apos;Instruction
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
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
