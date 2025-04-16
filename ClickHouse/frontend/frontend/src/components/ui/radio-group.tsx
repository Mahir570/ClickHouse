"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot="custom-radio-group"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

const RadioGroupItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  children?: React.ReactNode
}) => {
  return (
    <RadioGroupPrimitive.Item
      data-slot="custom-radio-group-item"
      className={cn(
        "relative flex items-center gap-3 rounded-lg border-2 border-muted px-4 py-2 transition-all duration-300 hover:border-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 aria-checked:border-primary aria-checked:bg-primary/10 aria-checked:text-primary",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-input bg-background shadow-sm">
        <RadioGroupPrimitive.Indicator>
          <CheckCircle2 className="h-5 w-5 text-primary" />
        </RadioGroupPrimitive.Indicator>
      </div>
      {children && <span className="text-sm">{children}</span>}
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
