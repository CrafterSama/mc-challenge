"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { StockAlertsDashboard } from "@/components/admin/stock-alerts-dashboard"
import { useStockMonitor } from "@/hooks/use-stock-monitor"

export default function AlertsPage() {
  // Initialize stock monitoring
  useStockMonitor()

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Alertas de Stock</h2>
          <p className="text-muted-foreground">Monitoreo en tiempo real del inventario y alertas automáticas</p>
        </div>

        <StockAlertsDashboard />
      </div>
    </AdminLayout>
  )
}
