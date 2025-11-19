"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Container } from "./container"
import { primaryNav, headerCTA, type NavItem } from "@/lib/config/nav.config"
import { siteConfig } from "@/lib/config/site.config"
import { HeaderLogo } from "./header/header-logo"
import { DesktopNav } from "./header/desktop-nav"
import { MobileMenu } from "./header/mobile-menu"

interface HeaderProps {
  items?: NavItem[]
}

export function Header({ items = primaryNav }: HeaderProps) {
  const [isVisible, setIsVisible] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300",
      !isVisible && "-translate-y-full"
    )}>
      <Container className="flex h-16 items-center justify-between gap-3">
        <HeaderLogo name={siteConfig.name} />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <DesktopNav items={items} />
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <AnimatedThemeToggler variant="secondary" />
          <Button asChild>
            <Link href={headerCTA.href}>
              {headerCTA.label}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <AnimatedThemeToggler variant="secondary" />
          <MobileMenu
            items={items}
            ctaHref={headerCTA.href}
            ctaLabel={headerCTA.label}
          />
        </div>
      </Container>
    </header>
  )
}
