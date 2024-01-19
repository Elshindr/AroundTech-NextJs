import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}