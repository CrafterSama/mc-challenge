"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCartStore } from "@/state-management/cart-store";
import type { Product } from "@/types";
import { formatPrice } from "@/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [imageError, setImageError] = useState<boolean>(false);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageError ? "/mc-logo.png" : product.imageUrl}
          alt={product.name}
          fill
          className={`object-cover transition-transform group-hover:scale-105 ${
            imageError && "opacity-30"
          }`}
          onError={() => setImageError(true)}
        />
        {product.stock <= 5 && product.stock > 0 && (
          <Badge className="absolute top-2 right-2" variant="destructive">
            ¡Últimas unidades!
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge className="absolute top-2 right-2" variant="secondary">
            Agotado
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <Badge variant="outline">Stock: {product.stock}</Badge>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
