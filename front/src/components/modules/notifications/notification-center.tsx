"use client"

import { useState } from "react"
import { Bell, Settings, Trash2, CheckCheck, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNotificationsStore } from "@/state-management/notifications-store"
import { NotificationToast } from "./notification-toast"
import { NotificationSettings } from "./notification-settings"

export function NotificationCenter() {
  const [showSettings, setShowSettings] = useState(false)
  const [filterType, setFilterType] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    clearAllNotifications,
    getNotificationsByType,
    getCriticalAlerts,
  } = useNotificationsStore()

  const filteredNotifications = notifications.filter((notification) => {
    if (notification.dismissed) return false

    const typeMatch = filterType === "all" || notification.type === filterType
    const priorityMatch = filterPriority === "all" || notification.priority === filterPriority

    return typeMatch && priorityMatch
  })

  const criticalAlerts = getCriticalAlerts()

  if (showSettings) {
    return <NotificationSettings onBack={() => setShowSettings(false)} />
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Centro de Notificaciones
            {unreadCount > 0 && <Badge variant="destructive">{unreadCount}</Badge>}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <CheckCheck className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={clearAllNotifications} disabled={notifications.length === 0}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Critical Alerts Banner */}
        {criticalAlerts.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="destructive">CRÍTICO</Badge>
              <span className="font-semibold text-red-900">
                {criticalAlerts.length} alerta{criticalAlerts.length !== 1 ? "s" : ""} crítica
                {criticalAlerts.length !== 1 ? "s" : ""} requiere{criticalAlerts.length === 1 ? "" : "n"} atención
                inmediata
              </span>
            </div>
            <div className="space-y-2">
              {criticalAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="text-sm text-red-800">
                  • {alert.message}
                </div>
              ))}
              {criticalAlerts.length > 3 && (
                <div className="text-sm text-red-600">Y {criticalAlerts.length - 3} más...</div>
              )}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="error">Errores</SelectItem>
              <SelectItem value="warning">Advertencias</SelectItem>
              <SelectItem value="info">Información</SelectItem>
              <SelectItem value="success">Éxito</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las prioridades</SelectItem>
              <SelectItem value="critical">Crítico</SelectItem>
              <SelectItem value="high">Alto</SelectItem>
              <SelectItem value="medium">Medio</SelectItem>
              <SelectItem value="low">Bajo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todas ({filteredNotifications.length})</TabsTrigger>
            <TabsTrigger value="unread">No leídas ({filteredNotifications.filter((n) => !n.read).length})</TabsTrigger>
            <TabsTrigger value="critical">
              Críticas ({filteredNotifications.filter((n) => n.priority === "critical").length})
            </TabsTrigger>
            <TabsTrigger value="action">
              Acción Requerida ({filteredNotifications.filter((n) => n.actionRequired).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay notificaciones</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <NotificationToast
                  key={notification.id}
                  notification={notification}
                  onDismiss={dismissNotification}
                  onMarkAsRead={markAsRead}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3 max-h-96 overflow-y-auto">
            {filteredNotifications
              .filter((n) => !n.read)
              .map((notification) => (
                <NotificationToast
                  key={notification.id}
                  notification={notification}
                  onDismiss={dismissNotification}
                  onMarkAsRead={markAsRead}
                />
              ))}
          </TabsContent>

          <TabsContent value="critical" className="space-y-3 max-h-96 overflow-y-auto">
            {filteredNotifications
              .filter((n) => n.priority === "critical")
              .map((notification) => (
                <NotificationToast
                  key={notification.id}
                  notification={notification}
                  onDismiss={dismissNotification}
                  onMarkAsRead={markAsRead}
                />
              ))}
          </TabsContent>

          <TabsContent value="action" className="space-y-3 max-h-96 overflow-y-auto">
            {filteredNotifications
              .filter((n) => n.actionRequired)
              .map((notification) => (
                <NotificationToast
                  key={notification.id}
                  notification={notification}
                  onDismiss={dismissNotification}
                  onMarkAsRead={markAsRead}
                />
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
