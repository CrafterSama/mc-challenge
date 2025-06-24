"use client"

import { AlertTriangle, Package, TrendingDown, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useProducts } from "@/hooks/use-products"
import { useNotificationsStore } from "@/state-management/notifications-store"
import { formatPrice } from "@/utils"

export function StockAlertsDashboard() {
  const { data: products = [], refetch } = useProducts()
  const { settings, getCriticalAlerts, getNotificationsByType } = useNotificationsStore()

  const outOfStockProducts = products.filter((p) => p.stock === 0)
  const criticalStockProducts = products.filter((p) => p.stock > 0 && p.stock <= settings.criticalStockThreshold)
  const lowStockProducts = products.filter(
    (p) => p.stock > settings.criticalStockThreshold && p.stock <= settings.lowStockThreshold,
  )

  const criticalAlerts = getCriticalAlerts()
  const warningAlerts = getNotificationsByType("warning")

  const totalStockValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)
  const affectedStockValue = [...outOfStockProducts, ...criticalStockProducts, ...lowStockProducts].reduce(
    (sum, product) => sum + product.price * product.stock,
    0,
  )

  const stockHealthPercentage =
    products.length > 0
      ? ((products.length - outOfStockProducts.length - criticalStockProducts.length) / products.length) * 100
      : 100

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Agotados</CardTitle>
            <Package className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockProducts.length}</div>
            <p className="text-xs text-muted-foreground">Requieren reabastecimiento inmediato</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Crítico</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{criticalStockProducts.length}</div>
            <p className="text-xs text-muted-foreground">≤ {settings.criticalStockThreshold} unidades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <TrendingDown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockProducts.length}</div>
            <p className="text-xs text-muted-foreground">≤ {settings.lowStockThreshold} unidades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salud del Inventario</CardTitle>
            <RefreshCw className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stockHealthPercentage.toFixed(1)}%</div>
            <Progress value={stockHealthPercentage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              Alertas Críticas ({criticalAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalAlerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-red-900">{alert.title}</p>
                    <p className="text-sm text-red-700">{alert.message}</p>
                    <p className="text-xs text-red-600 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
                  </div>
                  <Badge variant="destructive">CRÍTICO</Badge>
                </div>
              ))}
              {criticalAlerts.length > 5 && (
                <p className="text-sm text-muted-foreground text-center">
                  Y {criticalAlerts.length - 5} alertas críticas más...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Requiring Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Out of Stock */}
        {outOfStockProducts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-700">Productos Agotados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {outOfStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                    </div>
                    <Badge variant="destructive">AGOTADO</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Critical Stock */}
        {criticalStockProducts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-700">Stock Crítico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {criticalStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(product.price)} • {product.stock} unidades
                      </p>
                    </div>
                    <Badge variant="secondary">CRÍTICO</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Stock Value Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Impacto en Valor del Inventario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Valor Total del Inventario</p>
              <p className="text-2xl font-bold">{formatPrice(totalStockValue)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Valor Afectado por Alertas</p>
              <p className="text-2xl font-bold text-orange-600">{formatPrice(affectedStockValue)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Porcentaje Afectado</p>
              <p className="text-2xl font-bold text-red-600">
                {totalStockValue > 0 ? ((affectedStockValue / totalStockValue) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
