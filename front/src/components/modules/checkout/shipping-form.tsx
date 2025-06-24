"use client"

import type { UseFormReturn } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin } from "lucide-react"
import type { CheckoutFormData } from "@/lib/validations"

interface ShippingFormProps {
  form: UseFormReturn<CheckoutFormData>
}

const countries = [
  { value: "ES", label: "España" },
  { value: "FR", label: "Francia" },
  { value: "IT", label: "Italia" },
  { value: "PT", label: "Portugal" },
  { value: "DE", label: "Alemania" },
]

export function ShippingForm({ form }: ShippingFormProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form

  const selectedCountry = watch("shippingAddress.country")
  const saveAddress = watch("saveAddress")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Dirección de Envío
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              {...register("shippingAddress.name")}
              placeholder="Juan Pérez"
              className={errors.shippingAddress?.name ? "border-red-500" : ""}
            />
            {errors.shippingAddress?.name && (
              <p className="text-sm text-red-500">{errors.shippingAddress.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              {...register("shippingAddress.phone")}
              placeholder="+34 600 123 456"
              className={errors.shippingAddress?.phone ? "border-red-500" : ""}
            />
            {errors.shippingAddress?.phone && (
              <p className="text-sm text-red-500">{errors.shippingAddress.phone.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Dirección *</Label>
          <Input
            id="street"
            {...register("shippingAddress.street")}
            placeholder="Calle Mayor 123, 2º A"
            className={errors.shippingAddress?.street ? "border-red-500" : ""}
          />
          {errors.shippingAddress?.street && (
            <p className="text-sm text-red-500">{errors.shippingAddress.street.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Ciudad *</Label>
            <Input
              id="city"
              {...register("shippingAddress.city")}
              placeholder="Madrid"
              className={errors.shippingAddress?.city ? "border-red-500" : ""}
            />
            {errors.shippingAddress?.city && (
              <p className="text-sm text-red-500">{errors.shippingAddress.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">Código Postal *</Label>
            <Input
              id="postalCode"
              {...register("shippingAddress.postalCode")}
              placeholder="28001"
              className={errors.shippingAddress?.postalCode ? "border-red-500" : ""}
            />
            {errors.shippingAddress?.postalCode && (
              <p className="text-sm text-red-500">{errors.shippingAddress.postalCode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">País *</Label>
            <Select value={selectedCountry} onValueChange={(value) => setValue("shippingAddress.country", value)}>
              <SelectTrigger className={errors.shippingAddress?.country ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecciona un país" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.shippingAddress?.country && (
              <p className="text-sm text-red-500">{errors.shippingAddress.country.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="saveAddress"
            checked={saveAddress}
            onCheckedChange={(checked) => setValue("saveAddress", checked as boolean)}
          />
          <Label htmlFor="saveAddress" className="text-sm">
            Guardar esta dirección para futuros pedidos
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
