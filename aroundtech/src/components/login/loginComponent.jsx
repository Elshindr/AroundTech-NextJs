import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Alert, TextField } from '@mui/material';
import Image from 'next/image';
import '@/components/login/login.css'


const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    // Réinitialise l'erreur
    setError('');

    try {
      // Appel à l'API pour la connexion avec les identifiants de l'utilisateur
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Corps de la requête contenant les identifiants
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirection vers la page d'accueil si la connexion est réussie
        router.push('/');
      } else {
        // Message d'erreur si la connexion échoue
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      // Gestion des erreurs lors de l'appel à l'API
      setError('Impossible de se connecter au serveur.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5 pt-5">
        <Col md={6} >
          <Card className="login_card">
            <Card.Body>
              <div className="d-flex justify-content-center pt-2">
                <Image
                  src="/images/around-tech-logo.png"
                  className="logo "
                  height={100}
                  width={100}
                  alt="Around Tech Logo"
                />
              </div>
              <h1>Gestion des missions</h1>
              <Form onSubmit={handleLogin}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="d-flex justify-content-center mt-4">
                  <Button type="submit" className="button_connect mb-3">
                    Se connecter
                  </Button>
                </div>
                {error && <Alert severity="error">{error}</Alert>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
