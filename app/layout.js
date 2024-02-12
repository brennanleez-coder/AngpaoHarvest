import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Angpao Harvest</title>
        <link rel="icon" href="/AngpaoHarvest.png" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        </body>
    </html>
  );
}
