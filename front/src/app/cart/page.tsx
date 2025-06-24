"use client";

import { Header } from "@/components/layout/header";
import { CartItemComponent } from "@/components/modules/cart/cart-item";
import { CartSummary } from "@/components/modules/cart/cart-summary";
import { EmptyCart } from "@/components/modules/cart/empty-cart";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants";
import { useCartStore } from "@/state-management/cart-store";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { items, clearCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  const handleClearCart = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar tu carrito?")) {
      clearCart();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push(ROUTES.HOME)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continuar Comprando
          </Button>

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              Carrito de Compras
              {totalItems > 0 && (
                <span className="ml-2 text-lg font-normal text-muted-foreground">
                  ({totalItems} {totalItems === 1 ? "producto" : "productos"})
                </span>
              )}
            </h1>

            {items.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearCart}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Vaciar Carrito
              </Button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Productos en tu carrito</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.product.id}>
                      <CartItemComponent item={item} />
                      {index < items.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Shipping Info */}
              <Alert>
                <AlertDescription>
                  🚚 <strong>Envío gratuito</strong> en pedidos superiores a
                  €50. Entrega en 2-3 días laborables.
                </AlertDescription>
              </Alert>

              {/* Return Policy */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="space-y-2">
                      <div className="text-2xl">🔄</div>
                      <h3 className="font-semibold">Devoluciones Fáciles</h3>
                      <p className="text-sm text-muted-foreground">
                        30 días para devolver tu pedido
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl">🛡️</div>
                      <h3 className="font-semibold">Compra Segura</h3>
                      <p className="text-sm text-muted-foreground">
                        Pago 100% seguro y protegido
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl">📞</div>
                      <h3 className="font-semibold">Soporte 24/7</h3>
                      <p className="text-sm text-muted-foreground">
                        Estamos aquí para ayudarte
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
