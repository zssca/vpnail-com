import { siteConfig } from '@/lib/config/site.config'

export const hoursData = {
  title: 'Business Hours',
  description: 'Open seven days a week so Calgary guests can book when it works for them.',
  schedule: siteConfig.business.hours,
  holiday: {
    title: 'Holiday Hours',
    hours: siteConfig.business.holidayHours,
  },
} as const
