import './globals.css';
import DevTools from '@/components/DevTools';

export const metadata = {
  title: 'The Saathy — Feel heard when loneliness feels heavy',
  description: 'The Saathy is a Human + AI companionship platform where you can talk to Saathy AI, connect with trained listeners, join safe circles, and build a daily emotional support routine. Affordable daily companionship for India.',
  keywords: 'companionship, mental wellness, loneliness, emotional support, India, listeners, AI companion',
  openGraph: {
    title: 'The Saathy — Human + AI Companionship',
    description: 'Feel heard when loneliness feels heavy. Talk to Saathy AI, connect with trained listeners, join safe circles.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#FAF5EF" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {process.env.NODE_ENV === 'development' && <DevTools />}
        {children}
      </body>
    </html>
  );
}
