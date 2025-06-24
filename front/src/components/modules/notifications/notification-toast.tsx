"use client"

import { useEffect } from "react"
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Notification } from "@/state-management/notifications-store"

interface NotificationToastProps {
  notification: Notification
  onDismiss: (id: string) => void
  onMarkAsRead: (id: string) => void
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

const colorMap = {
  info: "border-blue-200 bg-blue-50 text-blue-900",
  success: "border-green-200 bg-green-50 text-green-900",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
  error: "border-red-200 bg-red-50 text-red-900",
}

export function NotificationToast({ notification, onDismiss, onMarkAsRead }: NotificationToastProps) {
  const Icon = iconMap[notification.type]

  useEffect(() => {
    // Auto-dismiss non-critical notifications after 5 seconds
    if (notification.priority !== "critical") {
      const timer = setTimeout(() => {
        onDismiss(notification.id)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification.id, notification.priority, onDismiss])

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }
  }

  return (
    <Card
      className={cn(
        "w-full max-w-sm shadow-lg border-l-4 cursor-pointer transition-all hover:shadow-xl",
        colorMap[notification.type],
        !notification.read && "ring-2 ring-primary/20",
      )}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{notification.title}</h4>
                <p className="text-sm mt-1 opacity-90">{notification.message}</p>
                {notification.productName && (
                  <p className="text-xs mt-2 opacity-75">Producto: {notification.productName}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-70 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  onDismiss(notification.id)
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs opacity-60">{new Date(notification.timestamp).toLocaleTimeString()}</span>
              {notification.priority === "critical" && (
                <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-800 rounded-full">CRÍTICO</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
