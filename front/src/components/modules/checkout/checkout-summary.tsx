"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/state-management/cart-store"
import { formatPrice } from "@/utils"

export function CheckoutSummary() {
  const { items, getTotalItems, getTotalPrice } = useCartStore()

  const totalItems = getTotalItems()
  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 5.99 // Free shipping over €50
  const tax = subtotal * 0.21 // 21% VAT
  const total = subtotal + shipping + tax

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(item.product.price)} × {item.quantity}
                </p>
              </div>
              <div className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Productos ({totalItems})</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Envío</span>
            <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
              {shipping === 0 ? "GRATIS" : formatPrice(shipping)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>IVA (21%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        {shipping > 0 && (
          <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded-md">
            💡 Añade {formatPrice(50 - subtotal)} más para obtener envío gratuito
          </div>
        )}

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
          <Badge variant="outline" className="text-xs">
            🔒 Pago Seguro
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
