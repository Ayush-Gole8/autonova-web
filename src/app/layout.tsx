import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond,
  Inter,
  JetBrains_Mono,
} from 'next/font/google';
import { Navbar } from '@/components/organisms/Navbar';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', 'sans-serif'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  fallback: ['monospace'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://autonova.ai'),
  title: {
    default: 'Autonova AI - Digital Intelligence Studio',
    template: '%s | Autonova AI',
  },
  description:
    'Autonova AI composes premium digital systems across AI product design, web engineering, and intelligent interfaces.',
  keywords: [
    'Autonova AI',
    'digital intelligence',
    'creative systems',
    'AI product design',
    'web engineering',
    'intelligent interfaces',
  ],
  authors: [{ name: 'Autonova AI', url: 'https://autonova.ai' }],
  creator: 'Autonova AI',
  publisher: 'Autonova AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://autonova.ai',
    siteName: 'Autonova AI',
    title: 'Autonova AI - Digital Intelligence Studio',
    description:
      'Premium digital intelligence systems blending strategy, design, engineering, and AI.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Autonova AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@autonovaai',
    creator: '@autonovaai',
    title: 'Autonova AI - Digital Intelligence Studio',
    description:
      'Premium digital intelligence systems blending strategy, design, engineering, and AI.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://autonova.ai',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#040404',
  colorScheme: 'dark',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Asimovian&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const clean = (el) => {
                  if (!el) return;
                  if (el.removeAttribute) {
                    el.removeAttribute('bis_skin_checked');
                    el.removeAttribute('bis_register');
                    for (const attr of el.getAttributeNames?.() || []) {
                      if (attr.startsWith('__processed_')) {
                        el.removeAttribute(attr);
                      }
                    }
                  }
                };
                const observer = new MutationObserver((mutations) => {
                  for (const m of mutations) {
                    clean(m.target);
                    m.addedNodes?.forEach(n => {
                      if (n.nodeType === 1) {
                        clean(n);
                        n.querySelectorAll?.('[bis_skin_checked], [bis_register]').forEach(clean);
                      }
                    });
                  }
                });
                observer.observe(document.documentElement, {
                  attributes: true,
                  childList: true,
                  subtree: true,
                  attributeFilter: ['bis_skin_checked', 'bis_register']
                });
                document.addEventListener('DOMContentLoaded', () => {
                  document.querySelectorAll('[bis_skin_checked], [bis_register]').forEach(clean);
                });
              })();
            `
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <div className="noise-overlay" aria-hidden="true" role="presentation" />

        <SmoothScrollProvider>
          <a href="#main-content" className="sr-only">
            Skip to main content
          </a>

          <Navbar />

          <main id="main-content">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
