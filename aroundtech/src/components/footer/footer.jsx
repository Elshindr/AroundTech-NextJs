"use client"
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';

function Footer() {
  
  // Pour ajouter du css dynamique
  const pathname = usePathname()

  // Obtient l'année courante
  const currentYear = new Date().getFullYear();

  return (
    <footer className= {`d-flex justify-content-center align-items-center border-top ${pathname === '/' ? 'footer-home' : ''}`}>
      <div>
        <a href="/" className="d-flex align-items-center justify-content-center link-body-emphasis text-decoration-none">
          <Image
            priority
            src="/images/around-tech-logo.png"
            className="logo"
            height={100}
            width={100}
            alt="Around Tech Logo"
          />
        </a>
        <span>Copyright © {currentYear} AroundTech. Tous droits réservés.</span>
      </div>
    </footer>
  );
}

export default Footer;