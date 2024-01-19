"use client";
import styles from './page.module.css';
import useUserData from '@/hooks/useUserData';

import { Error, Loading } from '@/components/loadingError/loadingErrorComponent';

export default function Home() {
  const { userData, loading, error } = useUserData();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const userName = userData ? `${userData.firstname} ${userData.lastname}` : "Utilisateur";

  return (
    <main>
      <h1>Bienvenue sur l'application de Gestion Des Missions</h1>
      <div className={styles.userInfo}>
        <div className={styles.userName}>Bonjour, {userName}</div>
      </div>
      <div className={styles.citation}>
      "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte." <br/> — Winston Churchill
      </div>
    </main>
  )
}
