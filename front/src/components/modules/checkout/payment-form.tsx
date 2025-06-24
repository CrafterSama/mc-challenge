"use client"

import type { UseFormReturn } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Building } from "lucide-react"
import type { CheckoutFormData } from "@/lib/validations"

interface PaymentFormProps {
  form: UseFormReturn<CheckoutFormData>
}

export function PaymentForm({ form }: PaymentFormProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form

  const paymentMethod = watch("paymentMethod")

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Método de Pago
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={paymentMethod} onValueChange={(value) => setValue("paymentMethod", value as any)}>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
              <CreditCard className="h-4 w-4" />
              Tarjeta de Crédito/Débito
            </Label>
          </div>

          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
              <Smartphone className="h-4 w-4" />
              PayPal
            </Label>
          </div>

          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="transfer" id="transfer" />
            <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer flex-1">
              <Building className="h-4 w-4" />
              Transferencia Bancaria
            </Label>
          </div>
        </RadioGroup>

        {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod.message}</p>}

        {paymentMethod === "card" && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
              <Input
                id="cardNumber"
                {...register("cardInfo.cardNumber")}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value)
                  e.target.value = formatted
                  setValue("cardInfo.cardNumber", formatted.replace(/\s/g, ""))
                }}
                className={errors.cardInfo?.cardNumber ? "border-red-500" : ""}
              />
              {errors.cardInfo?.cardNumber && (
                <p className="text-sm text-red-500">{errors.cardInfo.cardNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
              <Input
                id="cardName"
                {...register("cardInfo.cardName")}
                placeholder="Juan Pérez"
                className={errors.cardInfo?.cardName ? "border-red-500" : ""}
              />
              {errors.cardInfo?.cardName && <p className="text-sm text-red-500">{errors.cardInfo.cardName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Fecha de Vencimiento *</Label>
                <Input
                  id="expiryDate"
                  {...register("cardInfo.expiryDate")}
                  placeholder="MM/YY"
                  maxLength={5}
                  onChange={(e) => {
                    const formatted = formatExpiryDate(e.target.value)
                    e.target.value = formatted
                    setValue("cardInfo.expiryDate", formatted)
                  }}
                  className={errors.cardInfo?.expiryDate ? "border-red-500" : ""}
                />
                {errors.cardInfo?.expiryDate && (
                  <p className="text-sm text-red-500">{errors.cardInfo.expiryDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  {...register("cardInfo.cvv")}
                  placeholder="123"
                  maxLength={4}
                  className={errors.cardInfo?.cvv ? "border-red-500" : ""}
                />
                {errors.cardInfo?.cvv && <p className="text-sm text-red-500">{errors.cardInfo.cvv.message}</p>}
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-blue-800">Serás redirigido a PayPal para completar el pago de forma segura.</p>
          </div>
        )}

        {paymentMethod === "transfer" && (
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800 mb-2">
              <strong>Instrucciones para transferencia bancaria:</strong>
            </p>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>Banco: Banco Ejemplo</p>
              <p>IBAN: ES12 3456 7890 1234 5678 9012</p>
              <p>Concepto: Número de pedido</p>
              <p className="mt-2 font-medium">
                El pedido se procesará una vez confirmado el pago (1-2 días laborables).
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
