"use client"

import { useRouter } from "next/navigation"
import { ShoppingBag, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/state-management/cart-store"
import { useAuthStore } from "@/state-management/auth-store"
import { formatPrice } from "@/utils"
import { ROUTES } from "@/constants"

export function CartSummary() {
  const router = useRouter()
  const { items, getTotalItems, getTotalPrice } = useCartStore()
  const { isAuthenticated } = useAuthStore()

  const totalItems = getTotalItems()
  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 5.99 // Free shipping over €50
  const tax = subtotal * 0.21 // 21% VAT
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN)
      return
    }
    router.push(ROUTES.CHECKOUT)
  }

  if (items.length === 0) {
    return null
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Resumen del Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <Button onClick={handleCheckout} className="w-full" size="lg">
          <CreditCard className="mr-2 h-4 w-4" />
          {isAuthenticated ? "Proceder al Pago" : "Iniciar Sesión para Comprar"}
        </Button>

        <div className="text-xs text-muted-foreground text-center">Pago seguro con encriptación SSL</div>
      </CardContent>
    </Card>
  )
}
