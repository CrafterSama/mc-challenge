import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import AuthDirective from "@/components/modules/auth/auth-directive";
import Header from "@/components/modules/common/header";
import { Toaster } from "@/components/ui/toaster";
import ChakraProviders from "@/providers/chakra-provider";
import ReactQueryProvider from "@/providers/react-query-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Productos y Carrito de Compras",
  description: "Pequeño proyecto de prueba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryProvider>
          <AuthDirective>
            <ChakraProviders>
              <Toaster />
              <Header />
              {children}
            </ChakraProviders>
          </AuthDirective>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
