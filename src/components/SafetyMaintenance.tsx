'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Clipboard, PenToolIcon as Tool, AlertTriangle } from 'lucide-react';

const features = [
  { title: "Suivi Réglementaire", description: "Gestion des exigences et conformités réglementaires", icon: Shield },
  { title: "Planification des Inspections", description: "Organisation et suivi des inspections de sécurité", icon: Clipboard },
  { title: "Gestion de la Maintenance", description: "Planification et suivi des interventions de maintenance", icon: Tool },
  { title: "Alertes de Sécurité", description: "Notifications immédiates pour les problèmes de sécurité", icon: AlertTriangle },
];

export default function SafetyMaintenance() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-foreground"
        >
          Audit de Sécurité et Maintenance
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
