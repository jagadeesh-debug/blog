"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'boxicons/css/boxicons.min.css';
import Nav from "./Auth/Nav/page";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
<body className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-screen transition-colors bg-black  md:flex`} style={{fontFamily:"Inter"}}>
<Nav/>
        {children}
      </body>
    </html>
  );
}
