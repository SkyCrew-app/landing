'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, AlertTriangle, Bell } from 'lucide-react';

const features = [
  { title: "Réservation en Ligne", description: "Système automatisé pour réserver facilement vos créneaux de vol", icon: Calendar },
  { title: "Calendrier Interactif", description: "Visualisation claire des disponibilités et des réservations", icon: Clock },
  { title: "Gestion des Conflits", description: "Résolution automatique des conflits de réservation", icon: AlertTriangle },
  { title: "Notifications", description: "Alertes en cas de modifications ou d'indisponibilités", icon: Bell },
];

export default function ReservationManagement() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-secondary-foreground"
        >
          Gestion des Réservations Simplifiée
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
