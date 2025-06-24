import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/providers/react-query-provider";
import StockMonitorProvider from "@/providers/stock-monitor-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inter } from "next/font/google";
import type React from "react";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ReactQueryProvider>
          <StockMonitorProvider>
            {children}
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
          </StockMonitorProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
