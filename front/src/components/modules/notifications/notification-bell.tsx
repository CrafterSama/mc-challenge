"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useNotificationsStore } from "@/state-management/notifications-store"
import { NotificationCenter } from "./notification-center"
import { cn } from "@/lib/utils"

export function NotificationBell() {
  const { unreadCount, getCriticalAlerts } = useNotificationsStore()
  const criticalAlerts = getCriticalAlerts()
  const hasCritical = criticalAlerts.length > 0

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className={cn("h-5 w-5", hasCritical && "text-red-600 animate-pulse")} />
          {unreadCount > 0 && (
            <Badge
              className={cn(
                "absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center",
                hasCritical ? "bg-red-600" : "bg-primary",
              )}
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <NotificationCenter />
      </PopoverContent>
    </Popover>
  )
}
