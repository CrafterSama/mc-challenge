"use client";

import { Header } from "@/components/layout/header";
import { OrderCard } from "@/components/modules/orders/order-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants";
import { useCancelOrder, useOrders } from "@/hooks/api/use-orders";
import { useAuthStore } from "@/state-management/auth-store";
import { AlertCircle, Filter, Package, Search } from "lucide-react";
import { useState } from "react";

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  const { isAuthenticated } = useAuthStore();
  const { data: orders = [], isLoading, error } = useOrders();
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "total-high":
          return b.total - a.total;
        case "total-low":
          return a.total - b.total;
        default:
          return 0;
      }
    });

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm("¿Estás seguro de que quieres cancelar esta orden?")) {
      cancelOrder(orderId, {
        onSuccess: () => {
          alert("Orden cancelada exitosamente");
        },
        onError: () => {
          alert("Error al cancelar la orden");
        },
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-8">
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">Inicia Sesión</h2>
              <p className="text-muted-foreground mb-4">
                Necesitas iniciar sesión para ver tus órdenes
              </p>
              <Button asChild>
                <a href={ROUTES.LOGIN}>Iniciar Sesión</a>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto py-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Mis Órdenes</h1>
            <p className="text-muted-foreground">
              Revisa el estado de tus pedidos y su historial
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por número de orden o producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="processing">Procesando</SelectItem>
                <SelectItem value="shipped">Enviado</SelectItem>
                <SelectItem value="delivered">Entregado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Más reciente</SelectItem>
                <SelectItem value="oldest">Más antiguo</SelectItem>
                <SelectItem value="total-high">Mayor total</SelectItem>
                <SelectItem value="total-low">Menor total</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-48" />
                      <div className="space-y-2">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                      <Skeleton className="h-20 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Error al cargar las órdenes. Por favor, intenta de nuevo.
              </AlertDescription>
            </Alert>
          ) : filteredOrders.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mb-2">
                  {orders.length === 0
                    ? "No tienes órdenes aún"
                    : "No se encontraron órdenes"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {orders.length === 0
                    ? "Cuando realices tu primera compra, aparecerá aquí"
                    : "Intenta ajustar los filtros de búsqueda"}
                </p>
                {orders.length === 0 && (
                  <Button asChild>
                    <a href={ROUTES.HOME}>Explorar Productos</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onCancelOrder={handleCancelOrder}
                    isLoading={isCancelling}
                  />
                ))}
              </div>

              {/* Results Summary */}
              <div className="text-sm text-muted-foreground text-center">
                Mostrando {filteredOrders.length} de {orders.length} órdenes
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
