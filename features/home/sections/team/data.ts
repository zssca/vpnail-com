import type { TeamMember } from './types'

export const teamData = {
  title: 'Our Team',
  members: [
    {
      id: 'desanna',
      name: 'Desanna',
      position: 'Salon Manager & Senior Nail Technician',
      bio: '15+ years leading Calgary salons. Known for calm, detail-first prep, advanced gel structure work, and hand-painted art that holds up for weeks.',
      image: '/avatar-placeholder.webp',
      specialties: [
        'Advanced Nail Art',
        'Gel Extensions',
        'Nail Health Consultation',
        'Team Leadership',
        'Manicures & Pedicures',
      ],
      experience: '15+ years',
      certifications: [
        'Certified Nail Technician (CNA)',
        'Advanced Gel Certification',
        'Nail Art Specialist'
      ],
      bookingUrl: 'https://victoriaparknailsspa.setmore.com/team/cyenzUfc96WJtwAUlopx7DhYQ83kffxi',
    },
    {
      id: 'evon',
      name: 'Evon',
      position: 'Senior Nail Technician',
      bio: '18+ years specializing in classic shapes, French finishes, and calm pedicures. Guests love her gentle touch and consistent, chip-resistant results.',
      image: '/avatar-placeholder.webp',
      specialties: [
        'Manicures',
        'French Manicures',
        'Pedicures',
        'Cuticle Care',
        'Shellac Applications',
      ],
      experience: '18+ years',
      certifications: [
        'Certified Nail Technician',
        'Pedicure Specialist',
        'Advanced Nail Art Certification',
      ],
      bookingUrl: 'https://victoriaparknailsspa.setmore.com/team/cLetBzJqo9uYtJFldrdZpDYEbgo7v4ne',
    },
    {
      id: 'samie',
      name: 'Samie',
      position: 'Nail Artist & Technician',
      bio: "7+ years of bold nail art, chrome, cat eye, and trending finishes. She matches inspo photos, perfects shaping, and keeps sets light yet strong.",
      image: '/avatar-placeholder.webp',
      specialties: [
        '3D Nail Art',
        'Custom Designs',
        'Seasonal Nail Art',
        'Acrylic Extensions',
        'Gel and Shellac Applications',
      ],
      experience: '7+ years',
      certifications: [
        'Nail Art & Nail Technology Certification from the international ibi institution',
        'Acrylic Extension Specialist'
      ],
      bookingUrl: 'https://victoriaparknailsspa.setmore.com/team/cNsVJHwzW7yBam6mFFdWrlsMAGehj4Om',
    },
    {
      id: 'rita',
      name: 'Rita',
      position: 'Nail Technician',
      bio: '5+ years focused on healthy prep, smooth polish, and detailed nail art. Clients trust her for consistent shapes and easy maintenance plans.',
      image: '/avatar-placeholder.webp',
      specialties: [
        'Gel Nails',
        'Nail Extensions',
        'Creative Nail Art',
        'Manicures',
        'Pedicures',
      ],
      experience: '5+ years',
      certifications: [
        'Certified Nail Technician',
        'Advanced Nail Art Specialist'
      ],
      bookingUrl: 'https://victoriaparknailsspa.setmore.com/team/r360e1663875729418',
    },
  ] as TeamMember[],
} as const
