export function Loading() {
  return <div className="text-center">Chargement des données ...</div>;
}

export function Error() {
  return (
    <div className="text-center">
      Erreur lors du chargement des données : contacter votre administateur
    </div>
  );
}
