'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact: FC = () => (
  <section id="contact" className="py-20 bg-background">
    <div className="container mx-auto px-4 text-center max-w-2xl">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-foreground mb-6">Contactez-nous</h2>
        <p className="text-lg mb-10 text-muted-foreground">
          Si vous avez des questions, n&apos;hésitez pas à nous envoyer un message.
        </p>
      </motion.div>
      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card shadow-lg rounded-lg p-6 space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-left font-semibold mb-2 text-card-foreground">Nom</label>
          <Input type="text" id="name" placeholder="Votre nom" />
        </div>
        <div>
          <label htmlFor="email" className="block text-left font-semibold mb-2 text-card-foreground">Email</label>
          <Input type="email" id="email" placeholder="Votre email" />
        </div>
        <div>
          <label htmlFor="message" className="block text-left font-semibold mb-2 text-card-foreground">Message</label>
          <Textarea id="message" placeholder="Votre message" rows={4} />
        </div>
        <Button type="submit" className="w-full mt-4">
          Envoyer
        </Button>
      </motion.form>
    </div>
  </section>
);

export default Contact;
