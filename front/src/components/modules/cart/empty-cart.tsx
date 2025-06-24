"use client"

import { useRouter } from "next/navigation"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/constants"

export function EmptyCart() {
  const router = useRouter()

  return (
    <Card className="text-center py-12">
      <CardContent className="space-y-6">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Tu carrito está vacío</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Parece que aún no has añadido ningún producto a tu carrito. ¡Explora nuestra colección y encuentra el
            calzado perfecto para ti!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => router.push(ROUTES.HOME)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Continuar Comprando
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>¿Necesitas ayuda? Contáctanos en soporte@shoesstore.com</p>
        </div>
      </CardContent>
    </Card>
  )
}
