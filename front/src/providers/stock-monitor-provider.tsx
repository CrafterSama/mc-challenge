"use client";

import { useStockMonitor } from "@/hooks/use-stock-monitor";

export default function StockMonitorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useStockMonitor();
  return <>{children}</>;
}
