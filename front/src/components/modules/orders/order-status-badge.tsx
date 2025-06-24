import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react"
import type { Order } from "@/types"

interface OrderStatusBadgeProps {
  status: Order["status"]
  paymentStatus?: Order["paymentStatus"]
  showIcon?: boolean
}

const statusConfig = {
  pending: {
    label: "Pendiente",
    variant: "secondary" as const,
    icon: Clock,
    color: "text-gray-600",
  },
  processing: {
    label: "Procesando",
    variant: "default" as const,
    icon: Package,
    color: "text-blue-600",
  },
  shipped: {
    label: "Enviado",
    variant: "default" as const,
    icon: Truck,
    color: "text-orange-600",
  },
  delivered: {
    label: "Entregado",
    variant: "default" as const,
    icon: CheckCircle,
    color: "text-green-600",
  },
  cancelled: {
    label: "Cancelado",
    variant: "destructive" as const,
    icon: XCircle,
    color: "text-red-600",
  },
}

const paymentStatusConfig = {
  pending: { label: "Pago Pendiente", variant: "secondary" as const },
  paid: { label: "Pagado", variant: "default" as const },
  failed: { label: "Pago Fallido", variant: "destructive" as const },
  refunded: { label: "Reembolsado", variant: "outline" as const },
}

export function OrderStatusBadge({ status, paymentStatus, showIcon = true }: OrderStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="flex items-center gap-2">
      <Badge variant={config.variant} className="flex items-center gap-1">
        {showIcon && <Icon className="h-3 w-3" />}
        {config.label}
      </Badge>
      {paymentStatus && paymentStatus !== "paid" && (
        <Badge variant={paymentStatusConfig[paymentStatus].variant} className="text-xs">
          {paymentStatusConfig[paymentStatus].label}
        </Badge>
      )}
    </div>
  )
}
