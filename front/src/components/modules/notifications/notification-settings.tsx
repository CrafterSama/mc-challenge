"use client"

import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useNotificationsStore } from "@/state-management/notifications-store"
import { useState } from "react"

interface NotificationSettingsProps {
  onBack: () => void
}

export function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const { settings, updateSettings } = useNotificationsStore()
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    updateSettings(localSettings)
    onBack()
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        setLocalSettings((prev) => ({ ...prev, enablePushAlerts: true }))
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>Configuración de Alertas</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Stock Thresholds */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Umbrales de Stock</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lowStock">Umbral de Stock Bajo</Label>
              <Input
                id="lowStock"
                type="number"
                min="1"
                value={localSettings.lowStockThreshold}
                onChange={(e) =>
                  setLocalSettings((prev) => ({
                    ...prev,
                    lowStockThreshold: Number.parseInt(e.target.value) || 10,
                  }))
                }
              />
              <p className="text-sm text-muted-foreground">Alerta cuando el stock esté por debajo de este número</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="criticalStock">Umbral de Stock Crítico</Label>
              <Input
                id="criticalStock"
                type="number"
                min="0"
                value={localSettings.criticalStockThreshold}
                onChange={(e) =>
                  setLocalSettings((prev) => ({
                    ...prev,
                    criticalStockThreshold: Number.parseInt(e.target.value) || 5,
                  }))
                }
              />
              <p className="text-sm text-muted-foreground">Alerta crítica cuando el stock esté por debajo</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Notification Types */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Tipos de Notificaciones</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Alertas por Email</Label>
              <p className="text-sm text-muted-foreground">Recibir alertas por correo electrónico</p>
            </div>
            <Switch
              checked={localSettings.enableEmailAlerts}
              onCheckedChange={(checked) => setLocalSettings((prev) => ({ ...prev, enableEmailAlerts: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones Push</Label>
              <p className="text-sm text-muted-foreground">Mostrar notificaciones en el navegador</p>
            </div>
            <div className="flex items-center gap-2">
              {!("Notification" in window) ? (
                <span className="text-sm text-muted-foreground">No soportado</span>
              ) : Notification.permission === "denied" ? (
                <span className="text-sm text-red-600">Bloqueado</span>
              ) : Notification.permission === "default" ? (
                <Button size="sm" variant="outline" onClick={requestNotificationPermission}>
                  Permitir
                </Button>
              ) : (
                <Switch
                  checked={localSettings.enablePushAlerts}
                  onCheckedChange={(checked) => setLocalSettings((prev) => ({ ...prev, enablePushAlerts: checked }))}
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Alertas Sonoras</Label>
              <p className="text-sm text-muted-foreground">Reproducir sonido para alertas críticas</p>
            </div>
            <Switch
              checked={localSettings.enableSoundAlerts}
              onCheckedChange={(checked) => setLocalSettings((prev) => ({ ...prev, enableSoundAlerts: checked }))}
            />
          </div>
        </div>

        <Separator />

        {/* Alert Frequency */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Frecuencia de Alertas</h3>
          <div className="space-y-2">
            <Label>¿Con qué frecuencia quieres recibir alertas?</Label>
            <Select
              value={localSettings.alertFrequency}
              onValueChange={(value: "immediate" | "hourly" | "daily") =>
                setLocalSettings((prev) => ({ ...prev, alertFrequency: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Inmediato</SelectItem>
                <SelectItem value="hourly">Cada hora</SelectItem>
                <SelectItem value="daily">Diario</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Test Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Probar Notificaciones</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (localSettings.enablePushAlerts && "Notification" in window) {
                  new Notification("Prueba de Notificación", {
                    body: "Esta es una notificación de prueba del sistema de alertas.",
                    icon: "/favicon.ico",
                  })
                }
              }}
            >
              Probar Push
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (localSettings.enableSoundAlerts) {
                  const audio = new Audio("/notification-sound.mp3")
                  audio.play().catch(() => {
                    alert("No se pudo reproducir el sonido de prueba")
                  })
                }
              }}
            >
              Probar Sonido
            </Button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Guardar Configuración
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
