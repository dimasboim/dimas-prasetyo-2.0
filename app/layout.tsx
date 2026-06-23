import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import Header from './components/Header';
import ViewCounter from './components/ViewCounter';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dimas-prasetyo.com'),
  title: {
    default: 'Dimas Prasetyo | Senior Technology Leader',
    template: '%s | Dimas Prasetyo',
  },
  description: 'Senior technology leader from Jakarta. CTO, product strategy, and enterprise transformation with 15+ years of experience building digital platforms and scaling engineering organizations.',
  keywords: ['Dimas Prasetyo', 'CTO', 'Technology Leader', 'Product Strategy', 'Digital Transformation', 'Jakarta', 'Indonesia', 'Senior Technology Executive'],
  authors: [{ name: 'Dimas Prasetyo' }],
  creator: 'Dimas Prasetyo',
  publisher: 'Dimas Prasetyo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.dimas-prasetyo.com',
    title: 'Dimas Prasetyo | Senior Technology Leader',
    description: 'Senior technology leader from Jakarta. CTO, product strategy, and enterprise transformation with 15+ years of experience.',
    siteName: 'Dimas Prasetyo',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dimas Prasetyo - Technology Leadership Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dimasprasetyo',
    creator: '@dimasprasetyo',
    title: 'Dimas Prasetyo | Senior Technology Leader',
    description: 'Senior technology leader from Jakarta. CTO, product strategy, and enterprise transformation.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <body>
        <Header />
        {children}
        <footer className="site-footer">
          <div className="footer-inner site-shell">
            <div className="footer-brand">
              <strong>Dimas Prasetyo</strong>
              <span>Senior Technology Leader</span>
            </div>
            <nav className="footer-links">
              <a href="#skills">Executive summary</a>
              <a href="#capabilities">Capabilities</a>
              <a href="#selected-work">Selected work</a>
              <a href="/cv">CV</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="footer-social">
              <a href="https://instagram.com/dimasboim" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.linkedin.com/in/dimasprasetyotegar" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="footer-meta">
              © {new Date().getFullYear()} Dimas Prasetyo
              <ViewCounter />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
