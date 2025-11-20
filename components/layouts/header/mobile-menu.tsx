"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import type { NavItem } from "@/lib/config/nav.config"

interface MobileMenuProps {
  items: NavItem[]
  ctaHref: string
  ctaLabel: string
}

export function MobileMenu({ items, ctaHref, ctaLabel }: MobileMenuProps) {
  const pathname = usePathname()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          aria-expanded={isDrawerOpen}
          aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
        >
          Menu
        </Button>
      </DrawerTrigger>
      <DrawerContent className="!w-[90vw] sm:!w-80 md:!w-96 !h-full !rounded-l-xl !rounded-r-none !border-l !border-r-0 !shadow-none">
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="px-6 py-6 border-b border-border/50 flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl font-bold text-foreground">Menu</DrawerTitle>
              <p className="text-sm text-muted-foreground mt-1">Explore our services</p>
            </div>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-md"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DrawerClose>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 overflow-y-auto p-4">
            <Accordion type="multiple" className="space-y-0">
              {items.map((item) => (
                item.children ? (
                  <AccordionItem key={item.label} value={item.label} className="border-b border-border/30 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <AccordionTrigger className="px-4 py-3 hover:bg-accent/50 hover:no-underline data-[state=open]:bg-accent/30 focus-visible:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <span className="font-semibold text-base text-foreground">{item.label}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-0">
                      <div className="space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors touch-manipulation border-b border-border/20 last:border-b-0 focus-visible:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            onClick={() => setIsDrawerOpen(false)}
                          >
                            <div>
                              <div className="font-medium text-foreground">{child.label}</div>
                              {child.description && (
                                <div className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                                  {child.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <div key={item.label} className="border border-border/30 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <Link
                      href={item.href || "#"}
                      className={cn(
                        "block px-4 py-3 text-base font-semibold rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors touch-manipulation focus-visible:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        pathname === item.href && "bg-accent text-accent-foreground"
                      )}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </div>
                )
              ))}
            </Accordion>
          </div>

          {/* Mobile Footer with CTA */}
          <div className="border-t border-border/50 p-6">
            <Button
              asChild
              onClick={() => setIsDrawerOpen(false)}
            >
              <Link
                href={ctaHref}
                className="block w-full text-center"
              >
                {ctaLabel}
              </Link>
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
