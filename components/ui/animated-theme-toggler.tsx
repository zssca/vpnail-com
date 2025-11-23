"use client"

import { useCallback, useEffect, useRef } from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

type ViewTransition = {
  ready: Promise<void>
}

type DocumentWithViewTransition = Document & {
  startViewTransition: (callback: () => void) => ViewTransition
}

type AnimatedThemeTogglerProps = React.ComponentProps<typeof Button> & {
  duration?: number
}

export function AnimatedThemeToggler({
  className,
  duration = 400,
  variant = "ghost",
  size = "icon",
  onClick,
  ...props
}: AnimatedThemeTogglerProps) {
  const { theme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleTheme = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return

      const targetTheme = theme === "dark" ? "light" : "dark"

      const applyTheme = () => {
        setTheme(targetTheme)
      }

      // Check if browser supports View Transitions API
      if (typeof document !== "undefined" && "startViewTransition" in document) {
        try {
          await (document as DocumentWithViewTransition).startViewTransition(() => {
            flushSync(applyTheme)
          }).ready

          const { top, left, width, height } =
            buttonRef.current.getBoundingClientRect()
          const x = left + width / 2
          const y = top + height / 2
          const maxRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          )

          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            }
          )
        } catch {
          // Fallback if animation fails
          applyTheme()
        }
      } else {
        // Fallback for browsers without View Transitions API
        applyTheme()
      }

      onClick?.(event)
    },
    [theme, setTheme, duration, onClick]
  )

  return (
    <Button
      ref={buttonRef}
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      {...props}
    >
      <span aria-hidden className="flex items-center justify-center">
        {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
