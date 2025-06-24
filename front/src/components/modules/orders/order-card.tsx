"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Package, Eye, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OrderStatusBadge } from "./order-status-badge"
import { formatPrice, formatDate } from "@/utils"
import type { Order } from "@/types"

interface OrderCardProps {
  order: Order
  onCancelOrder?: (orderId: string) => void
  isLoading?: boolean
}

export function OrderCard({ order, onCancelOrder, isLoading }: OrderCardProps) {
  const canCancel = order.status === "pending" || order.status === "processing"
  const showTracking = order.status === "shipped" && order.trackingNumber

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(order.createdAt)}
              </div>
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                {order.items.length} producto{order.items.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
          <OrderStatusBadge status={order.status} paymentStatus={order.paymentStatus} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {order.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.productImage || "/placeholder.svg"}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.productName}</p>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(item.price)} × {item.quantity}
                </p>
              </div>
              <div className="text-sm font-medium">{formatPrice(item.subtotal)}</div>
            </div>
          ))}
          {order.items.length > 2 && (
            <p className="text-sm text-muted-foreground text-center">
              Y {order.items.length - 2} producto{order.items.length - 2 !== 1 ? "s" : ""} más...
            </p>
          )}
        </div>

        <Separator />

        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Envío:</span>
            <span>{order.shipping === 0 ? "GRATIS" : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>IVA:</span>
            <span>{formatPrice(order.tax)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="font-medium">{order.shippingAddress.name}</p>
            <p className="text-muted-foreground">
              {order.shippingAddress.street}, {order.shippingAddress.city}
            </p>
            <p className="text-muted-foreground">
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Estimated Delivery */}
        {order.estimatedDelivery && order.status !== "delivered" && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900">Entrega estimada</p>
            <p className="text-sm text-blue-700">{formatDate(order.estimatedDelivery)}</p>
          </div>
        )}

        {/* Tracking Info */}
        {showTracking && (
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-sm font-medium text-orange-900">Número de seguimiento</p>
            <p className="text-sm text-orange-700 font-mono">{order.trackingNumber}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link href={`/orders/${order.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              Ver Detalles
            </Link>
          </Button>
          {canCancel && onCancelOrder && (
            <Button variant="outline" size="sm" onClick={() => onCancelOrder(order.id)} disabled={isLoading}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
