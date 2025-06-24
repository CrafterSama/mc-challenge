"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/state-management/cart-store"
import { ROUTES } from "@/constants"

export function CartBadge() {
  const { getTotalItems } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <Link href={ROUTES.CART} className="relative">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <Badge
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            variant="default"
          >
            {totalItems > 99 ? "99+" : totalItems}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
