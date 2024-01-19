"use client"
import React from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import Image from 'next/image';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter, usePathname } from 'next/navigation';

import useUserData from '@/hooks/useUserData';
import { Error } from '../loadingError/loadingErrorComponent';

function Header() {
  const { userData, error } = useUserData();
  const router = useRouter();

  const userName = userData ? `${userData.firstname}` : "Utilisateur";

  const pathname = usePathname()

  // Gère la déconnexion de l'utilisateur
  const handleLogout = async () => {
    // Requête à la route API /logout pour initier la déconnexion
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Inclue les cookies dans la requête pour la gestion de session
      credentials: 'include'
    });

    // Si la déconnexion est réussie, redirige l'utilisateur vers la page de connexion
    if (response.ok) {
      router.push('/login');
    } else {
      // Si la déconnexion échoue, affiche une erreur dans la console
      console.error('Échec de la déconnexion');
    }
  };

  // Pour gérer l'état d'erreur
  if (error) {
    return <Error />;
  }

  // Fonction qui détermine si le chemin actuel est l'un des chemins du NavDropdown
  const isDropdownActive = () => {
    return ['/nature', '/motif'].includes(pathname);
  };

  return (
    <header className="header">
      <Navbar collapseOnSelect expand="xxl" data-bs-theme="light" className="justify-content-center px-2">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Brand href="/">
            <Image
              priority
              src="/images/around-tech-logo.png"
              className="logo"
              height={100}
              width={100}
              alt="Around Tech Logo"
            /></Navbar.Brand>
          <Nav className="me-auto justify-content-between align-items-center w-100 nav">
            <div className="d-flex col-10 justify-content-start">
              <Nav.Link href="/" className={`link ${pathname === '/' ? 'active' : ''}`}>Accueil</Nav.Link>
              <Nav.Link href="/mission" className={`link ${pathname === '/mission' ? 'active' : ''}`}>Gestion des missions</Nav.Link>
              <Nav.Link href="/planning" className={`link ${pathname === '/planning' ? 'active' : ''}`}>Planning des missions</Nav.Link>
              <Nav.Link href="/primes" className={`link ${pathname === '/primes' ? 'active' : ''}`}>Primes</Nav.Link>
              <Nav.Link href="/expense" className={`link ${pathname === '/expense' ? 'active' : ''}`}>Note de frais</Nav.Link>
              {
                (userData && (userData.role_id === 2 || userData.role_id === 3)) &&
                <Nav.Link href="/mission/waiting" className={`link ${pathname === '/mission/waiting' ? 'active' : ''}`}>Validation des missions</Nav.Link>
              }
              {
                userData && userData.role_id === 3 && (
                  <>
                    <NavDropdown title="Natures" className={`link ${isDropdownActive() ? 'active' : ''}`}>
                      <NavDropdown.Item href="/nature">Nature de mission</NavDropdown.Item>
                      <NavDropdown.Item href="/motif">Nature de frais</NavDropdown.Item>
                    </NavDropdown>
                  </>
                )
              }
              {
                userData && userData.role_id === 3 &&
                <Nav.Link href="/user" className={`link ${pathname === '/user' ? 'active' : ''}`}>Gestions des utilisateurs</Nav.Link>
              }
            </div>
            <div className="d-flex col-2 justify-content-end">
              {/* <Nav.Link href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Se déconnecter</Nav.Link> */}

              <Nav.Link href="#" className="account-link" onClick={(e) => { e.preventDefault(); handleLogout(); }}><span className="account-icon mx-2"><AccountCircleIcon />{userName}</span><LogoutIcon className="logout-icon" /></Nav.Link>

            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>

  );
}

export default Header;