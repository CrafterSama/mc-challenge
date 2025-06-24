"use client";

import { Header } from "@/components/layout/header";
import { CheckoutSummary } from "@/components/modules/checkout/checkout-summary";
import { PaymentForm } from "@/components/modules/checkout/payment-form";
import { ShippingForm } from "@/components/modules/checkout/shipping-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/constants";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validations";
import { useAuthStore } from "@/state-management/auth-store";
import { useCartStore } from "@/state-management/cart-store";
import type { Order, OrderItem } from "@/types";
import { generateId } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema as any), // TODO: Fix the type
    defaultValues: {
      shippingAddress: {
        name: user?.name || "",
        street: "",
        city: "",
        postalCode: "",
        country: "ES",
        phone: "",
      },
      paymentMethod: "card",
      saveAddress: false,
      newsletter: false,
      terms: false,
    },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const terms = watch("terms");
  const newsletter = watch("newsletter");

  // Redirect if not authenticated or cart is empty
  if (!isAuthenticated) {
    router.push(ROUTES.LOGIN);
    return null;
  }

  if (items.length === 0) {
    router.push(ROUTES.CART);
    return null;
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.21;
  const total = subtotal + shipping + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    setError("");

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order items
      const orderItems: OrderItem[] = items.map((item) => ({
        id: generateId(),
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
      }));

      // Create order
      const order: Order = {
        id: generateId(),
        userId: user!.id,
        orderNumber: `ORD-${new Date().getFullYear()}-${String(
          Date.now()
        ).slice(-6)}`,
        items: orderItems,
        subtotal,
        shipping,
        tax,
        total,
        status: "pending",
        paymentStatus: data.paymentMethod === "transfer" ? "pending" : "paid",
        shippingAddress: {
          name: data.shippingAddress.name,
          street: data.shippingAddress.street,
          city: data.shippingAddress.city,
          postalCode: data.shippingAddress.postalCode,
          country: data.shippingAddress.country,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Simulate API call to create order
      console.log("Creating order:", order);

      // Clear cart
      clearCart();

      // Redirect to success page
      router.push(`/checkout/success?order=${order.id}`);
    } catch (err) {
      setError("Error al procesar el pago. Por favor, intenta de nuevo.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(ROUTES.CART)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Finalizar Compra</h1>
              <p className="text-muted-foreground">
                Completa tu pedido de forma segura
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit as any)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* TODO: Shipping Form fix the type */}
                <ShippingForm form={form as any} />

                {/* TODO: Payment Form fix the type */}
                <PaymentForm form={form as any} />

                {/* Additional Options */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={newsletter}
                        onCheckedChange={(checked) =>
                          setValue("newsletter", checked as boolean)
                        }
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Suscribirme al boletín para recibir ofertas especiales
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={terms}
                        onCheckedChange={(checked) =>
                          setValue("terms", checked as boolean)
                        }
                        className={errors.terms ? "border-red-500" : ""}
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm leading-relaxed"
                      >
                        Acepto los{" "}
                        <a
                          href="/terms"
                          className="text-primary hover:underline"
                        >
                          términos y condiciones
                        </a>{" "}
                        y la{" "}
                        <a
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          política de privacidad
                        </a>
                        *
                      </Label>
                    </div>
                    {errors.terms && (
                      <p className="text-sm text-red-500">
                        {errors.terms.message}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isProcessing}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {isProcessing
                    ? "Procesando Pago..."
                    : `Pagar ${total.toFixed(2)}€`}
                </Button>

                {/* Security Info */}
                <div className="text-center text-sm text-muted-foreground">
                  <p className="flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" />
                    Tu información está protegida con encriptación SSL de 256
                    bits
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <CheckoutSummary />
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
