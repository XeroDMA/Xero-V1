import { Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface XerodmaLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function XerodmaLogo({ size = "md", showText = true, className }: XerodmaLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  }

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center bg-primary rounded-lg",
          size === "sm" ? "w-8 h-8" : size === "md" ? "w-10 h-10" : "w-14 h-14",
        )}
      >
        <Shield className={cn(sizeClasses[size], "text-primary-foreground")} />
      </div>
      {showText && (
        <div>
          <span className={cn("font-bold text-foreground", textSizeClasses[size])}>XERODMA</span>
          {size === "lg" && <p className="text-sm text-muted-foreground">Gaming Arsenal</p>}
        </div>
      )}
    </div>
  )
}
