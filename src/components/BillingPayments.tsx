'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CreditCard, PieChart, Lock } from 'lucide-react';

const features = [
  { title: "Facturation Automatique", description: "Génération de factures basée sur l'utilisation réelle", icon: FileText },
  { title: "Paiements en Ligne", description: "Intégration de solutions de paiement sécurisées", icon: CreditCard },
  { title: "Suivi Financier", description: "Tableaux de bord pour le suivi des paiements et revenus", icon: PieChart },
  { title: "Sécurité des Transactions", description: "Protocoles de sécurité avancés pour les paiements", icon: Lock },
];

export default function BillingPayments() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-secondary-foreground"
        >
          Facturation et Paiements en Ligne
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
