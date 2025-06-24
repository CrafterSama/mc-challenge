"use client";

import { useNotificationsStore } from "@/state-management/notifications-store";
import type { Product } from "@/types";
import { useCallback, useEffect } from "react";
import { useGetProducts } from "./api/use-products";

export const useStockMonitor = () => {
  const { data: products = [] } = useGetProducts();
  const { addNotification, settings } = useNotificationsStore();

  const checkStockLevels = useCallback(
    (products: Product[]) => {
      products.forEach((product: Product) => {
        // Critical stock alert (out of stock)
        if (product.stock === 0) {
          addNotification({
            type: "error",
            title: "Producto Agotado",
            message: `${product.name} está completamente agotado`,
            productId: product.id,
            productName: product.name,
            priority: "critical",
            actionRequired: true,
          });
        }
        // Low stock warning
        else if (product.stock <= settings.criticalStockThreshold) {
          addNotification({
            type: "warning",
            title: "Stock Crítico",
            message: `${product.name} tiene solo ${product.stock} unidades restantes`,
            productId: product.id,
            productName: product.name,
            priority: "high",
            actionRequired: true,
          });
        }
        // Low stock info
        else if (product.stock <= settings.lowStockThreshold) {
          addNotification({
            type: "warning",
            title: "Stock Bajo",
            message: `${product.name} tiene ${product.stock} unidades. Considera reabastecer pronto.`,
            productId: product.id,
            productName: product.name,
            priority: "medium",
            actionRequired: false,
          });
        }
      });
    },
    [addNotification, settings]
  );

  // Monitor stock levels when products change
  useEffect(() => {
    if ((products as Product[]).length > 0) {
      checkStockLevels(products as Product[]);
    }
  }, [products, checkStockLevels]);

  // Set up periodic stock monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      if ((products as Product[]).length > 0) {
        checkStockLevels(products as Product[]);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [products, checkStockLevels]);

  return {
    checkStockLevels,
  };
};
