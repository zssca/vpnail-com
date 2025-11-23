'use client';

import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';

export interface Tab {
  label: string;
  value: string;
  subRoutes?: string[];
  href?: string;
}

const normalizePath = (path: string | null | undefined): string => {
  if (!path) return '';
  if (path === '/') return '/';
  return path.replace(/\/+$/, '');
};

const findBestTabIndex = (path: string | null | undefined, tabs: Tab[]): number => {
  const normalizedPath = normalizePath(path);

  let bestIndex = -1;
  let bestMatchLength = -1;

  tabs.forEach((tab, index) => {
    const targets = [tab.href, tab.value, ...(tab.subRoutes ?? [])]
      .filter(Boolean)
      .map((target) => normalizePath(target as string));

    targets.forEach((target) => {
      if (!target) return;

      const isExactMatch = normalizedPath === target;
      const isNestedMatch = target !== '/' && normalizedPath.startsWith(`${target}/`);

      if ((isExactMatch || isNestedMatch) && target.length > bestMatchLength) {
        bestIndex = index;
        bestMatchLength = target.length;
      }
    });
  });

  return bestIndex;
};

export default function useTabs({
  tabs,
  initialTabId,
  onChange
}: {
  tabs: Tab[];
  initialTabId: string;
  onChange?: (id: string) => void;
}) {
  const pathname = usePathname();

  const selectedTabIndex = useMemo(() => {
    if (!tabs.length) return 0;

    const pathMatchIndex = findBestTabIndex(pathname, tabs);
    if (pathMatchIndex !== -1) return pathMatchIndex;

    const indexOfInitialTab = tabs.findIndex((tab) => tab.value === initialTabId);
    return indexOfInitialTab === -1 ? 0 : indexOfInitialTab;
  }, [initialTabId, pathname, tabs]);

  // Notify consumers when the active tab changes (e.g., analytics/hooks)
  useEffect(() => {
    const activeTab = tabs[selectedTabIndex];
    if (activeTab) {
      onChange?.(activeTab.value);
    }
  }, [onChange, selectedTabIndex, tabs]);

  const handleSelectTab = (index: number) => {
    const nextTab = tabs[index];
    if (nextTab) {
      onChange?.(nextTab.value);
    }
  };

  return {
    tabProps: {
      tabs,
      selectedTabIndex,
      onSelectTab: handleSelectTab
    },
    selectedTab: tabs[selectedTabIndex],
    contentProps: {
      direction: 0,
      selectedTabIndex
    }
  };
}
