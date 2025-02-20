"use client";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'boxicons/css/boxicons.min.css';

import { useEffect, useState } from "react";
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
      <body className={`${geistSans.variable} ${geistMono.variable} h-screen w-screen`}>
        {/* <Nav/> */}
        {children}
      </body>
    </html>
  );
}
