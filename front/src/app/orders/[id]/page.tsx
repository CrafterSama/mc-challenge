"use client";

import { Header } from "@/components/layout/header";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants";
import { useCancelOrder, useOrder } from "@/hooks/api/use-orders";
import { formatDate, formatPrice } from "@/utils";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Download,
  MapPin,
  Package,
  RotateCcw,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const { data: order, isLoading, error } = useOrder(id);
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();

  const handleCancelOrder = () => {
    if (
      order &&
      window.confirm("¿Estás seguro de que quieres cancelar esta orden?")
    ) {
      cancelOrder(order.id, {
        onSuccess: () => {
          alert("Orden cancelada exitosamente");
        },
        onError: () => {
          alert("Error al cancelar la orden");
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <Skeleton className="h-32 w-full" />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-8">
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">
                Orden no encontrada
              </h2>
              <p className="text-muted-foreground mb-4">
                La orden que buscas no existe o no tienes acceso a ella
              </p>
              <Button asChild>
                <Link href={ROUTES.ORDERS}>Volver a Mis Órdenes</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const canCancel = order.status === "pending" || order.status === "processing";
  const showTracking = order.status === "shipped" && order.trackingNumber;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href={ROUTES.ORDERS}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{order.orderNumber}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Pedido el {formatDate(order.createdAt)}
                </div>
                <OrderStatusBadge
                  status={order.status}
                  paymentStatus={order.paymentStatus}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Productos ({order.items.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.productImage || "/placeholder.svg"}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.productName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatPrice(item.subtotal)}
                          </p>
                        </div>
                      </div>
                      {index < order.items.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Dirección de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Information */}
              {showTracking && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Información de Envío
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">Número de seguimiento</p>
                      <p className="font-mono text-lg">
                        {order.trackingNumber}
                      </p>
                    </div>
                    {order.estimatedDelivery && (
                      <div>
                        <p className="font-medium">Entrega estimada</p>
                        <p>{formatDate(order.estimatedDelivery)}</p>
                      </div>
                    )}
                    <Button variant="outline" className="w-full">
                      <Truck className="mr-2 h-4 w-4" />
                      Rastrear Paquete
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío:</span>
                      <span>
                        {order.shipping === 0
                          ? "GRATIS"
                          : formatPrice(order.shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA:</span>
                      <span>{formatPrice(order.tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar Factura
                    </Button>
                    {canCancel && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleCancelOrder}
                        disabled={isCancelling}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        {isCancelling ? "Cancelando..." : "Cancelar Orden"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Información de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Estado del pago:</span>
                      <OrderStatusBadge
                        status={order.status}
                        paymentStatus={order.paymentStatus}
                        showIcon={false}
                      />
                    </div>
                    <div className="flex justify-between">
                      <span>Método de pago:</span>
                      <span>Tarjeta •••• 4242</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fecha de pago:</span>
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Estado del Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="font-medium">Pedido confirmado</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    {order.status !== "pending" && (
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div>
                          <p className="font-medium">En preparación</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.updatedAt)}
                          </p>
                        </div>
                      </div>
                    )}
                    {(order.status === "shipped" ||
                      order.status === "delivered") && (
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div>
                          <p className="font-medium">Enviado</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.updatedAt)}
                          </p>
                        </div>
                      </div>
                    )}
                    {order.status === "delivered" && (
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div>
                          <p className="font-medium">Entregado</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.updatedAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
