"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { ParkingDialog } from "@/components/shared/parking-dialog"
import { primaryNav } from "@/lib/config/nav.config"
import { siteConfig } from "@/lib/config/site.config"

interface HeaderProps {
  items?: typeof primaryNav
}

export function Header({ items = primaryNav }: HeaderProps) {
  const pathname = usePathname()
  const [isParkingDialogOpen, setIsParkingDialogOpen] = useState(false)

  // Filter nav items to only those with href
  const navLinks = items.filter(item => item.href)

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Mobile Layout: Navigation only (no logo) */}
      <div className="md:hidden">
        <nav className="flex h-12 items-center justify-center gap-1 px-2">
          {navLinks.map((item) => (
            <Button
              key={item.href}
              variant="secondary"
              asChild
              className={cn(isActive(item.href!) && "text-primary")}
            >
              <Link href={item.href!}>{item.label}</Link>
            </Button>
          ))}
          <Button
            variant="secondary"
            onClick={() => setIsParkingDialogOpen(true)}
          >
            Parking
          </Button>
          <AnimatedThemeToggler variant="secondary" />
        </nav>
      </div>

      {/* Desktop Layout: Logo on left, navigation centered */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-80 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              aria-label="Go to homepage"
            >
              <Image
                src="/Victoria_Park_Nails_Spa_Logo_Primary_small.png"
                alt={siteConfig.name}
                width={110}
                height={36}
                className="h-9 w-auto"
                priority
              />
            </Link>

            <nav className="absolute left-1/2 -translate-x-1/2 flex gap-1">
              {navLinks.map((item) => (
                <Button
                  key={item.href}
                  variant="secondary"
                  asChild
                  className={cn(isActive(item.href!) && "text-primary")}
                >
                  <Link href={item.href!}>{item.label}</Link>
                </Button>
              ))}
            </nav>

            <div className="flex gap-1">
              <Button
                variant="secondary"
                onClick={() => setIsParkingDialogOpen(true)}
              >
                Parking
              </Button>
              <AnimatedThemeToggler variant="secondary" />
            </div>
          </div>
        </div>
      </div>

      <ParkingDialog
        open={isParkingDialogOpen}
        onOpenChange={setIsParkingDialogOpen}
      />
    </header>
  )
}
