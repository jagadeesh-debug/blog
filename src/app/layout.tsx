  import type { Metadata } from "next";
  import { Geist, Geist_Mono } from "next/font/google";
  import "./globals.css";
  import 'boxicons/css/boxicons.min.css';
  import Nav from "./Nav";
  import BlogPosts from "./blog";
  import CreatePost from "./CreatePost";


  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body className="h-screen w-screen " >
          <header className="w-full h-1/6   ">
            <Nav/>
          </header>
          <div className="h-4/6 w-full">
          <BlogPosts/>
          </div>
          <div className="h-1/6 w-full  items-center justify-center">
          <CreatePost/>
          </div>
        </body>
      </html>
    );
  }
