"use client";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants";
import { formatDate, formatPrice } from "@/utils";
import { CheckCircle, Download, Home, Package } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [orderNumber] = useState(
    `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
  );

  useEffect(() => {
    // Trigger confetti or celebration animation
    const timer = setTimeout(() => {
      // You could add a confetti library here
      console.log("Order completed successfully!");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Mock order data (in real app, this would come from API)
  const mockOrderData = {
    orderNumber,
    total: 218.93,
    estimatedDelivery: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000
    ).toISOString(), // 3 days from now
    email: "juan@example.com",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-muted-foreground">
              Tu pedido ha sido procesado exitosamente. Te hemos enviado un
              email de confirmación.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Detalles del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Número de Pedido
                  </p>
                  <p className="font-semibold text-lg">
                    {mockOrderData.orderNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Pagado</p>
                  <p className="font-semibold text-lg">
                    {formatPrice(mockOrderData.total)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Email de Confirmación
                  </p>
                  <p className="font-medium">{mockOrderData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Entrega Estimada
                  </p>
                  <p className="font-medium">
                    {formatDate(mockOrderData.estimatedDelivery)}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-semibold">¿Qué sigue?</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>
                      Recibirás un email de confirmación en los próximos minutos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Procesaremos tu pedido en 1-2 días laborables</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>
                      Te enviaremos el número de seguimiento cuando se despache
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>
                      Entrega estimada:{" "}
                      {formatDate(mockOrderData.estimatedDelivery)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild className="w-full">
                <Link href={ROUTES.ORDERS}>
                  <Package className="mr-2 h-4 w-4" />
                  Ver Mis Pedidos
                </Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Descargar Factura
              </Button>
            </div>

            <Button variant="ghost" asChild className="w-full">
              <Link href={ROUTES.HOME}>
                <Home className="mr-2 h-4 w-4" />
                Continuar Comprando
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="font-semibold">¿Necesitas ayuda?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium">Soporte al Cliente</p>
                    <p className="text-muted-foreground">
                      soporte@shoesstore.com
                    </p>
                    <p className="text-muted-foreground">+34 900 123 456</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Devoluciones</p>
                    <p className="text-muted-foreground">
                      30 días para devolver
                    </p>
                    <p className="text-muted-foreground">Envío gratuito</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Garantía</p>
                    <p className="text-muted-foreground">2 años de garantía</p>
                    <p className="text-muted-foreground">
                      en todos los productos
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Sharing */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground mb-3">
              ¡Comparte tu nueva compra!
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm">
                📱 WhatsApp
              </Button>
              <Button variant="outline" size="sm">
                📘 Facebook
              </Button>
              <Button variant="outline" size="sm">
                🐦 Twitter
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
