import type { Metadata } from "next";
import "./globals.css";
import { Oswald } from 'next/font/google';
import { Courier_Prime } from 'next/font/google';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-oswald',
});

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  variable: '--font-courier-prime',
  weight: "400"
});


export const metadata: Metadata = {
  title: "OATLY",
  description: "The Mysteries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${courierPrime.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
