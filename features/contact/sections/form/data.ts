export const formData = {
  title: 'Send a Message',
  fields: {
    name: {
      label: 'Name',
      placeholder: 'Your name',
      required: true,
    },
    email: {
      label: 'Email',
      placeholder: 'your@email.com',
      required: true,
    },
    phone: {
      label: 'Phone',
      placeholder: 'Optional',
      required: false,
    },
    service: {
      label: 'Service Interest',
      placeholder: 'Select a service',
      options: [
        'Manicures',
        'Pedicures',
        'Nail Extensions',
        'Nail Art',
        'Massage',
        'Waxing',
        'Other',
      ],
      required: false,
    },
    message: {
      label: 'Message',
      placeholder: 'Tell us about your goals and any questions you have...',
      required: true,
    },
  },
  submitButton: 'Send Message',
} as const
