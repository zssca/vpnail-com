import { nailServicesData } from './nail-services.data'
import { massageSpaData } from './massage-spa.data'
import { waxingData } from './waxing.data'
import type { ServicesGridData } from '../types'

export const servicesGridData: ServicesGridData = {
  categories: [
    nailServicesData,
    massageSpaData,
    waxingData
  ]
} as const
