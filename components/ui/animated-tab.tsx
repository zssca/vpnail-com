'use client';

import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, Transition } from 'motion/react';

import useTabs, { type Tab } from '@/lib/hooks/use-tabs';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

interface AnimatedTabsProps {
  tabs: Tab[];
  className?: string;
  navClassName?: string;
  linkClassName?: string;
}

interface TabsProps {
  tabs: Tab[];
  selectedTabIndex: number;
  onSelectTab?: (index: number) => void;
  navClassName?: string;
  linkClassName?: string;
}

// ============================================================================
// Constants
// ============================================================================

const TRANSITION: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.15
} as const;

const DANGER_ZONE_VALUE = 'danger-zone';

// ============================================================================
// Helpers
// ============================================================================

const getAnimationProps = (rect: DOMRect, containerRect: DOMRect) => ({
  x: rect.left - containerRect.left,
  y: rect.top - containerRect.top,
  width: rect.width,
  height: rect.height
});

const isDangerZone = (value: string): boolean => value === DANGER_ZONE_VALUE;

// ============================================================================
// Tabs Component
// ============================================================================

const Tabs = React.memo<TabsProps>(({
  tabs,
  selectedTabIndex,
  onSelectTab,
  navClassName,
  linkClassName
}) => {
  const buttonRefs = React.useRef<Array<HTMLAnchorElement | null>>([]);
  const [hoveredTabIndex, setHoveredTabIndex] = React.useState<number | null>(null);
  const [hasMounted, setHasMounted] = React.useState(false);

  const navRef = React.useRef<HTMLDivElement>(null);

  // Update refs array when tabs length changes
  React.useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  // Force a paint after mount so we have accurate measurements for the indicators
  React.useLayoutEffect(() => {
    setHasMounted(true);
  }, []);

  // Get bounding rectangles
  const navRect = hasMounted ? navRef.current?.getBoundingClientRect() : null;
  const selectedRect = hasMounted
    ? buttonRefs.current[selectedTabIndex]?.getBoundingClientRect()
    : undefined;
  const hoveredRect = hasMounted && hoveredTabIndex !== null
    ? buttonRefs.current[hoveredTabIndex]?.getBoundingClientRect()
    : undefined;

  // Check if hovered/selected tab is danger zone
  const hoveredTab = hoveredTabIndex !== null ? tabs[hoveredTabIndex] : null;
  const selectedTab = tabs[selectedTabIndex];
  const isHoveredDangerZone = hoveredTab ? isDangerZone(hoveredTab.value) : false;
  const isSelectedDangerZone = selectedTab ? isDangerZone(selectedTab.value) : false;

  return (
    <nav
      ref={navRef}
      className={cn('flex flex-shrink-0 items-center relative py-2 gap-1', navClassName)}
      onPointerLeave={() => setHoveredTabIndex(null)}
    >
      {tabs.map((item, i) => {
        const isActive = selectedTabIndex === i;

        return (
          <Link
            key={item.value}
            ref={(el) => {
              buttonRefs.current[i] = el;
            }}
            href={item.href || '#'}
            className={cn(
              'text-sm font-medium relative rounded-md flex items-center h-9 px-4 z-10 bg-transparent cursor-pointer select-none transition-colors',
              {
                'text-zinc-500': !isActive,
                'text-black dark:text-white font-semibold': isActive
              },
              isDangerZone(item.value) && 'text-red-500',
              linkClassName
            )}
            onPointerEnter={() => setHoveredTabIndex(i)}
            onFocus={() => setHoveredTabIndex(i)}
            onClick={() => onSelectTab?.(i)}
          >
            {item.label}
          </Link>
        );
      })}

      {/* Hover indicator */}
      <AnimatePresence>
        {hoveredRect && navRect && (
          <motion.div
            key="hover"
            className={cn(
              'absolute z-0 top-0 left-0 rounded-md pointer-events-none',
              isHoveredDangerZone
                ? 'bg-red-100 dark:bg-red-500/30'
                : 'bg-accent'
            )}
            initial={{ ...getAnimationProps(hoveredRect, navRect), opacity: 0 }}
            animate={{ ...getAnimationProps(hoveredRect, navRect), opacity: 1 }}
            exit={{ ...getAnimationProps(hoveredRect, navRect), opacity: 0 }}
            transition={TRANSITION}
          />
        )}
      </AnimatePresence>

      {/* Active indicator (underline) */}
      <AnimatePresence>
        {selectedRect && navRect && (
          <motion.div
            className={cn(
              'absolute z-20 bottom-0 left-0 h-[2px] pointer-events-none',
              isSelectedDangerZone
                ? 'bg-red-500'
                : 'bg-primary'
            )}
            initial={{
              width: selectedRect.width,
              x: selectedRect.left - navRect.left,
              opacity: 1
            }}
            animate={{
              width: selectedRect.width,
              x: selectedRect.left - navRect.left,
              opacity: 1
            }}
            transition={TRANSITION}
          />
        )}
      </AnimatePresence>
    </nav>
  );
});

Tabs.displayName = 'Tabs';

// ============================================================================
// Main Component
// ============================================================================

export function AnimatedTabs({
  tabs,
  className,
  navClassName,
  linkClassName
}: AnimatedTabsProps) {
  // Early return if no tabs provided
  if (!tabs || tabs.length === 0) {
    return null;
  }

  const hookProps = React.useMemo(() => {
    const homeTab = tabs.find((tab) => tab.value === 'home');
    const initialTabId = homeTab?.value ?? tabs[0]?.value ?? '';

    return {
      tabs: tabs.map(({ label, value, subRoutes, href }) => ({
        label,
        value,
        subRoutes,
        href
      })),
      initialTabId
    };
  }, [tabs]);

  const framer = useTabs(hookProps);

  return (
    <div className={cn('relative flex items-start justify-start overflow-hidden', className)}>
      <Tabs
        {...framer.tabProps}
        navClassName={navClassName}
        linkClassName={linkClassName}
      />
    </div>
  );
}
