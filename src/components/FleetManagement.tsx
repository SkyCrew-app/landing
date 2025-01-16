'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Calendar, PenToolIcon as Tool, Bell } from 'lucide-react';

const features = [
  { title: "Suivi en Temps Réel", description: "État des avions et disponibilité actualisés en permanence", icon: Plane },
  { title: "Historique des Vols", description: "Accès complet à l'historique des vols pour chaque appareil", icon: Calendar },
  { title: "Maintenance Programmée", description: "Planification et suivi des opérations de maintenance", icon: Tool },
  { title: "Notifications", description: "Alertes pour les révisions à venir et les mises à jour importantes", icon: Bell },
];

export default function FleetManagement() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-foreground"
        >
          Gestion de Flotte Avancée
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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