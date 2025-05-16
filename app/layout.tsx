"use client";

import { ReactNode } from "react";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>AI Portfolio Builder</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Build your AI-powered portfolio with ease." />
        <meta name="theme-color" content="#7B61FF" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen dark:bg-gray-900 text-gray-900`}>
        <SessionProvider>
          <Navbar />
          <main className="flex-grow container mx-auto">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
