import "./globals.css";
import Navbar from "./components/navbar";
import Link from "next/link";
import Image from "next/image";
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
        {children}
        <Navbar />
        <Link href="test" className="fixed right-0 p-[2vw]">
          <Image src="/cart.svg" alt="Cart" width={50} height={50}></Image>
        </Link>
      </body>
    </html>
  );
}
