const pricing = {
  basePackage: {
    title: 'Development Package',

    setupCost: 100000,
  },

  domain: {
    comNg: {
      title: '.com.ng Domain',

      description:
        'Ideal for Nigerian businesses.',

      yearlyPrice: 0,

      includedInPackage: true,

      addToSetupCost: false,
    },

    com: {
      title: '.com Domain',

      description:
        'Better for international brand positioning.',

      yearlyPrice: 14000,

      includedInPackage: false,

      addToSetupCost: true,
    },

    org: {
      title: '.org Domain',

      description:
        'Suitable for NGOs and organizations.',

      yearlyPrice: 10000,

      includedInPackage: false,

      addToSetupCost: true,
    },
  },

  hosting: {
    standard: {
      title: 'Standard Hosting',

      description:
        'Included in package.',

      monthlyPrice: 0,

      includedInPackage: true,

      addToSetupCost: false,

      recurring: false,

      recommended: false,
    },

    premium: {
      title: 'Premium Hosting',

      description:
        'Better reliability and stronger uptime.',

      monthlyPrice: 12000,

      includedInPackage: false,

      addToSetupCost: true,

      recurring: true,

      recommended: true,
    },
  },

  maintenance: {
    full: {
      title: 'Full Maintenance',

      description:
        'Continuous monitoring and priority support.',

      monthlyPrice: 15000,

      addToSetupCost: false,

      recurring: true,

      recommended: true,
    },

    hybrid: {
      title: 'Hybrid Maintenance',

      description:
        'Routine maintenance and updates.',

      monthlyPrice: 10000,

      addToSetupCost: false,

      recurring: true,

      recommended: false,
    },

    payg: {
      title: 'Pay As You Go',

      description:
        'Maintenance only when requested.',

      monthlyPrice: 0,

      addToSetupCost: false,

      recurring: false,

      recommended: false,
    },
  },

  email: {
    none: {
      title: 'No Professional Email',

      description:
        'No branded business emails.',

      monthlyPrice: 0,

      addToSetupCost: false,

      recurring: false,
    },

    one: {
      title: '1 Professional Email',

      description:
        'Single branded email account.',

      monthlyPrice: 3000,

      addToSetupCost: true,

      recurring: true,
    },

    three: {
      title: '3 Professional Emails',

      description:
        'Business communication setup.',

      monthlyPrice: 7000,

      addToSetupCost: true,

      recurring: true,
    },

    five: {
      title: '5 Professional Emails',

      description:
        'Multiple branded email accounts.',

      monthlyPrice: 10000,

      addToSetupCost: true,

      recurring: true,
    },
  },

  newsletter: {
    none: {
      title: 'No Newsletter',

      description:
        'No subscriber system.',

      monthlyPrice: 0,

      addToSetupCost: false,

      recurring: false,
    },

    basic: {
      title: 'Basic Newsletter',

      description:
        'Simple subscriber communication.',

      monthlyPrice: 5000,

      addToSetupCost: true,

      recurring: true,
    },

    advanced: {
      title: 'Advanced Newsletter',

      description:
        'Automated campaigns and audience communication.',

      monthlyPrice: 15000,

      addToSetupCost: true,

      recurring: true,
    },
  },

  paymentStructure: {
    initialPercentage: 70,

    finalPercentage: 30,
  },

  projectTimeline: {
    estimatedWeeks: 3,
  },

  maintenanceNotice:
    'Maintenance billing begins after the first free month.',
}

const defaultSelections = {
  domain: 'comNg',

  hosting: 'premium',

  maintenance: 'full',

  email: 'three',

  newsletter: 'advanced',
}