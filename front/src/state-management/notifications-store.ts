import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Notification {
  id: string
  type: "info" | "warning" | "error" | "success"
  title: string
  message: string
  productId?: string
  productName?: string
  priority: "low" | "medium" | "high" | "critical"
  timestamp: string
  read: boolean
  dismissed: boolean
  actionRequired?: boolean
}

export interface AlertSettings {
  lowStockThreshold: number
  criticalStockThreshold: number
  enableEmailAlerts: boolean
  enablePushAlerts: boolean
  enableSoundAlerts: boolean
  alertFrequency: "immediate" | "hourly" | "daily"
}

interface NotificationsState {
  notifications: Notification[]
  settings: AlertSettings
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read" | "dismissed">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  dismissNotification: (id: string) => void
  clearAllNotifications: () => void
  updateSettings: (settings: Partial<AlertSettings>) => void
  getUnreadCount: () => number
  getNotificationsByType: (type: Notification["type"]) => Notification[]
  getCriticalAlerts: () => Notification[]
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      settings: {
        lowStockThreshold: 10,
        criticalStockThreshold: 5,
        enableEmailAlerts: true,
        enablePushAlerts: true,
        enableSoundAlerts: false,
        alertFrequency: "immediate",
      },
      unreadCount: 0,

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
          read: false,
          dismissed: false,
        }

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }))

        // Trigger browser notification if enabled
        if (get().settings.enablePushAlerts && "Notification" in window) {
          if (Notification.permission === "granted") {
            new Notification(notification.title, {
              body: notification.message,
              icon: "/favicon.ico",
              tag: newNotification.id,
            })
          }
        }

        // Play sound if enabled
        if (get().settings.enableSoundAlerts && notification.priority === "critical") {
          const audio = new Audio("/notification-sound.mp3")
          audio.play().catch(() => {
            // Ignore audio play errors
          })
        }
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification,
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        }))
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({ ...notification, read: true })),
          unreadCount: 0,
        }))
      },

      dismissNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, dismissed: true } : notification,
          ),
        }))
      },

      clearAllNotifications: () => {
        set({
          notifications: [],
          unreadCount: 0,
        })
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }))
      },

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.read && !n.dismissed).length
      },

      getNotificationsByType: (type) => {
        return get().notifications.filter((n) => n.type === type && !n.dismissed)
      },

      getCriticalAlerts: () => {
        return get().notifications.filter((n) => n.priority === "critical" && !n.dismissed)
      },
    }),
    {
      name: "notifications-storage",
    },
  ),
)
