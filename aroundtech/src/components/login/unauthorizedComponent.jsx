import React from 'react';
import Link from 'next/link';

const Unauthorized = () => {
  return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h1>Accès Refusé</h1>
        <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
        <Link href="/">
          Retour à l'accueil
        </Link>
      </div>
  );
};

export default Unauthorized;