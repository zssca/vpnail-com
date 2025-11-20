"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ArrowRight } from "lucide-react"
import type { NavItem } from "@/lib/config/nav.config"

interface DesktopNavProps {
  items: NavItem[]
}

export function DesktopNav({ items }: DesktopNavProps) {
  const pathname = usePathname()

  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList className="gap-1">
        {items.map((item) => (
          <NavigationMenuItem key={item.label}>
            {item.children ? (
              <>
                <NavigationMenuTrigger 
                  className="px-3 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-md"
                  aria-label={`${item.label} navigation menu`}
                >
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <div className="w-[360px] sm:w-[420px] md:w-[520px] lg:w-[600px] p-4">
                    {item.meta && (
                      <div className="mb-4 flex items-center justify-between rounded-lg border border-border/70 bg-muted/40 px-4 py-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {item.meta}
                        </span>
                      </div>
                    )}
                    <ul className="grid gap-3 md:grid-cols-2">
                      {item.children.map((child) => (
                        <ListItem
                          key={child.label}
                          title={child.label}
                          href={child.href}
                          serviceCount={child.serviceCount}
                          ctaLabel={child.ctaLabel}
                        >
                          {child.description}
                        </ListItem>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={item.href || "#"}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === item.href && "bg-accent text-accent-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string
    serviceCount?: number
    ctaLabel?: string
  }
>(({ className, title, children, serviceCount, ctaLabel, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block h-full select-none space-y-3 rounded-lg border border-border/60 bg-background/95 p-4 leading-none no-underline outline-none transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary/50 focus-visible:bg-primary/5",
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-base font-semibold leading-none">{title}</div>
            {typeof serviceCount === "number" && (
              <span className="rounded-full bg-primary/20 px-2 py-1 text-xs font-semibold text-primary dark:bg-primary/30">
                {serviceCount} {serviceCount === 1 ? "service" : "services"}
              </span>
            )}
          </div>
          {children && (
            <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
          {ctaLabel && (
            <div className="flex items-center gap-1 text-sm font-semibold text-primary">
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
