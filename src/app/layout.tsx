import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <html lang="fr">
    <head>
      <title>SkyCrew - Gestion d&apos;Aéroclub</title>
      <meta name="description" content="Simplifiez la gestion de votre aéroclub avec SkyCrew" />
    </head>
    <body>
      <Navigation />
      {children}
    </body>
  </html>
);

export default Layout;

