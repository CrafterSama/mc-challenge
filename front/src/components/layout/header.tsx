"use client";

import { CartBadge } from "@/components/modules/cart/cart-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants";
import { useAuthStore } from "@/state-management/auth-store";
import { useCartStore } from "@/state-management/cart-store";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link href={ROUTES.HOME} className="flex items-center space-x-2">
          <span className="text-2xl font-bold">ShoesStore</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href={ROUTES.HOME}
            className="text-sm font-medium hover:text-primary"
          >
            Inicio
          </Link>
          {isAuthenticated && user?.role === "admin" && (
            <Link
              href={ROUTES.DASHBOARD}
              className="text-sm font-medium hover:text-primary"
            >
              Dashboard
            </Link>
          )}
          {isAuthenticated && (
            <Link
              href={ROUTES.ORDERS}
              className="text-sm font-medium hover:text-primary"
            >
              Mis Órdenes
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <CartBadge />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <span className="font-medium">{user?.name}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href={ROUTES.LOGIN}>Iniciar Sesión</Link>
              </Button>
              <Button asChild>
                <Link href={ROUTES.REGISTER}>Registrarse</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
