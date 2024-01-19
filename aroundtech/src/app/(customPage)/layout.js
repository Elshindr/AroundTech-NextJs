export default function CustomLayout({ children }) {
  // Ce layout sera appliqué à toutes les pages dans le répertoire auth.
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}