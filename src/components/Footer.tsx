import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">SkyCrew</h3>
          <p className="text-muted-foreground">Simplifiez la gestion de votre aéroclub avec notre plateforme innovante.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="text-muted-foreground hover:text-secondary-foreground">Fonctionnalités</a></li>
            <li><a href="#pricing" className="text-muted-foreground hover:text-secondary-foreground">Tarifs</a></li>
            <li><a href="#contact" className="text-muted-foreground hover:text-secondary-foreground">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Légal</h4>
          <ul className="space-y-2">
            <li><Link href="/conditions-utilisation" className="text-muted-foreground hover:text-secondary-foreground">Conditions d&apos;utilisation</Link></li>
            <li><Link href="/politique-confidentialite" className="text-muted-foreground hover:text-secondary-foreground">Politique de confidentialité</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-secondary-foreground"><Facebook /></a>
            <a href="#" className="text-muted-foreground hover:text-secondary-foreground"><Twitter /></a>
            <a href="#" className="text-muted-foreground hover:text-secondary-foreground"><Instagram /></a>
            <a href="#" className="text-muted-foreground hover:text-secondary-foreground"><Linkedin /></a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-muted text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SkyCrew. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
