import { Inter, Lato, Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-text-inter',
  weight: '400',
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-subtitle-lato',
  weight: '400',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-title-poppins',
  weight: '400',
})

export const metadata = {
  title: "AroundTech",
  description: "Application de gestion des missions",
};

export default function RootLayout({ children }) {

  return (
    <html lang="fr" className={`${inter.variable} ${lato.variable} ${poppins.variable}`}>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
      <body>
        {children}
      </body>
    </html>
  );
}
