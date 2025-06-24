"use client";

import { AdminLayout } from "@/components/modules/admin/admin-layout";
import { StatsCard } from "@/components/modules/admin/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProducts } from "@/hooks/api/use-products";
import { useCartStore } from "@/state-management/cart-store";
import { Product } from "@/types";
import { formatPrice } from "@/utils";
import {
  AlertTriangle,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

type ProductsResponse = Awaited<ReturnType<typeof useGetProducts>>;

export default function DashboardPage() {
  const { data: products = [] }: ProductsResponse = useGetProducts();
  const { items } = useCartStore();

  // Calculate statistics
  const totalProducts = (products as Product[]).length;
  const totalStock = (products as Product[]).reduce(
    (sum, product) => sum + product.stock,
    0
  );
  const lowStockProducts = (products as Product[]).filter(
    (product) => product.stock <= 5
  ).length;
  const outOfStockProducts = (products as Product[]).filter(
    (product) => product.stock === 0
  ).length;
  const totalValue = (products as Product[]).reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  // Mock data for orders and users (would come from API in real app)
  const totalOrders = 156;
  const totalUsers = 89;
  const monthlyRevenue = 12450.5;

  const recentActivity = [
    {
      id: 1,
      action: "Nuevo producto agregado",
      product: "Nike Air Max 270",
      time: "Hace 2 horas",
    },
    {
      id: 2,
      action: "Stock actualizado",
      product: "Adidas Stan Smith",
      time: "Hace 4 horas",
    },
    {
      id: 3,
      action: "Producto agotado",
      product: "Timberland 6-Inch",
      time: "Hace 6 horas",
    },
    {
      id: 4,
      action: "Nueva orden recibida",
      product: "#ORD-001",
      time: "Hace 8 horas",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Productos"
            value={totalProducts}
            description="Productos en catálogo"
            icon={Package}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Órdenes Totales"
            value={totalOrders}
            description="Órdenes procesadas"
            icon={ShoppingCart}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Usuarios Registrados"
            value={totalUsers}
            description="Usuarios activos"
            icon={Users}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Ingresos Mensuales"
            value={formatPrice(monthlyRevenue)}
            description="Ingresos este mes"
            icon={DollarSign}
            trend={{ value: 23, isPositive: true }}
          />
        </div>

        {/* Inventory Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inventario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Stock Total
                </span>
                <span className="font-semibold">{totalStock} unidades</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Valor del Inventario
                </span>
                <span className="font-semibold">{formatPrice(totalValue)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-600">Productos Agotados</span>
                <span className="font-semibold text-red-600">
                  {outOfStockProducts}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-yellow-600">Stock Bajo</span>
                <span className="font-semibold text-yellow-600">
                  {lowStockProducts}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Productos Populares
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(products as Product[])
                  .slice(0, 4)
                  .map((product: Product, index: number) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {outOfStockProducts > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 rounded-md">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-800">
                      {outOfStockProducts} productos agotados
                    </span>
                  </div>
                )}
                {lowStockProducts > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-md">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">
                      {lowStockProducts} productos con stock bajo
                    </span>
                  </div>
                )}
                {outOfStockProducts === 0 && lowStockProducts === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No hay alertas pendientes
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-3 border rounded-lg"
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.product}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
