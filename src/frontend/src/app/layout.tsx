import "./globals.css";
import Navbar from "./components/navbar";
import { Kulim_Park } from 'next/font/google';

const kulim = Kulim_Park({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={kulim.className}>
      <body className="flex h-screen w-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
