// FILE: src/data/siteData.ts

export const siteSettings = {
  companyName: 'DEVSOLE Soft',
  heroHeading: 'Web Development, SEO & Custom Software That Drives Sales',
  heroSubtitle: 'We build fast, modern websites, online stores, and custom web portals that rank on Google, load in under 1 second, and turn visitors into real paying clients. 100% complete source code ownership.',
  ctaProjects: 'View Our Work',
  ctaContact: 'Start a Project',
  email: 'devsole.official@gmail.com',
  whatsapp: '+92 370 6492398',
  phone: '+92 370 6492398',
  address: 'Lahore, Pakistan · Global Client Delivery',
  activeStatus: 'Available for New Projects',
};

export const brandDetails = {
  meaning: '"DEVSOLE Soft" stands for complete software solutions from one trusted team: "Dev" for modern development, and "Sole" for your single, dedicated tech partner.',
  essence: 'We are an independent web development and software company based in Lahore, helping businesses in Pakistan and worldwide build fast websites, online stores, and custom software that generate revenue.',
  mission: 'To build websites and software that load in under 1 second, look world-class on mobile, never break, and belong 100% to the client.',
  vision: 'To be the most reliable tech partner for growing businesses — with fixed timelines, transparent pricing, and zero technical confusion.',
  strengths: [
    { 
      title: 'Under 1-Second Load Speed', 
      desc: 'Websites load instantly on 4G and mobile so you never lose a customer to slow pages.' 
    },
    { 
      title: '100% Code & Asset Ownership', 
      desc: 'You own all source code, database, and accounts. Zero recurring platform lock-in or hidden fees.' 
    },
    { 
      title: 'Direct WhatsApp & Lead Routing', 
      desc: 'Customer inquiries go straight to your WhatsApp and email within seconds so you close deals faster.' 
    }
  ]
};

// 🎯 6 Crystal-Clear, Client-Friendly Services (Aam Fahan Wording)
export const services = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom websites, business portals, and web applications built to look modern, load under 1 second, and work smoothly on all mobile devices and laptops.',
    features: [
      'Mobile-Friendly & Responsive Layouts',
      'Under 1-Second Page Load Speed (< 0.8s)',
      'Custom Forms & Direct WhatsApp Routing',
      '100% Complete Source Code Ownership'
    ]
  },
  {
    id: '2',
    title: 'SEO & Google Ranking',
    description: 'Get your business to the top of Google search results so potential clients find you organically every day without spending fortunes on paid ads.',
    features: [
      'Keyword Research & Competitor Analysis',
      'On-Page SEO & Google Schema Setup',
      'Fast Page Speed & Core Web Vitals Fixes',
      'Local SEO & Google Maps Ranking'
    ]
  },
  {
    id: '3',
    title: 'E-Commerce & Online Stores',
    description: 'Modern online stores with clean product catalogs, quick slide-out carts, credit card / bank payment gateways, and instant WhatsApp order alerts.',
    features: [
      'Fast 1-Click Slide-Out Cart Drawer',
      'Online Card Payments & Cash on Delivery',
      'Easy Product & Inventory Management',
      'Automated Customer WhatsApp Alerts'
    ]
  },
  {
    id: '4',
    title: 'Real Estate & Business Portals',
    description: 'Custom property portals, booking platforms, and client management dashboards with instant filters and direct agent contact buttons.',
    features: [
      'Property Search with Instant Filters',
      'Direct Agent WhatsApp Lead Buttons',
      'Admin Dashboard to Add/Edit Listings',
      'Mobile-Friendly Photo & Video Galleries'
    ]
  },
  {
    id: '5',
    title: 'Custom Calculators & Automation',
    description: 'Interactive price quote calculators, automated PDF proposal generators, and custom tools that pre-qualify clients and save hours of manual work.',
    features: [
      'Real-Time Live Price & Cost Calculators',
      'Instant Downloadable Branded PDF Quotes',
      'Multi-Currency Support (PKR & USD)',
      'Automated Lead Capture to CRM'
    ]
  },
  {
    id: '6',
    title: 'UI/UX Design & Website Redesign',
    description: 'Give your old, outdated website a modern, luxury look that builds immediate trust and makes your company look like a market leader.',
    features: [
      'Clean Modern Obsidian & Light Layouts',
      'Easy-to-Navigate Mobile Menus',
      'Conversion-Focused Call-to-Actions',
      'Zero Template Clutter or Broken Elements'
    ]
  }
];

export const projects = [
  {
    id: '1',
    title: 'Real Space Properties',
    category: 'Real Estate Portal & Lead System',
    description: 'A modern property website featuring instant location and budget filters, interactive property cards, and direct WhatsApp agent contact buttons.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Custom Web Design', 'PHP Backend', 'MySQL Database', 'WhatsApp Lead API'],
    featured: true,
    status: 'Live Project'
  },
  {
    id: '2',
    title: 'Universal Quote Estimator',
    category: 'Interactive Price Calculator & PDF Tool',
    description: 'An automated pricing tool where clients select services, see an instant total cost, and download a branded PDF quote in under 2 seconds.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React & JavaScript', 'Automated PDF Engine', 'Multi-Currency (PKR/USD)'],
    featured: true,
    status: 'Live Tool'
  },
  {
    id: '3',
    title: 'Nexus E-Commerce Store',
    category: 'Online Shopping Store & Checkout',
    description: 'A fast online marketplace with category filtering, slide-out shopping cart, coupon codes, and secure online payment checkout.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    technologies: ['E-Commerce Engine', 'Payment Gateway', 'Cart Drawer', 'Order Alerts'],
    featured: false,
    status: 'Demo Portfolio'
  },
  {
    id: '4',
    title: 'Apex Business Admin Portal',
    category: 'Custom Admin Dashboard & Reports',
    description: 'A secure business management portal with daily revenue charts, customer management table, and automated CSV/PDF report downloads.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Admin Dashboard', 'Role-Based Access', 'Data Visualizations'],
    featured: false,
    status: 'Demo Portfolio'
  },
  {
    id: '5',
    title: 'Lumina Agency Portfolio',
    category: 'Modern Business Website',
    description: 'A sleek, luxury portfolio website built to showcase past client work, case studies, and customer testimonials with smooth page transitions.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Modern UI/UX', 'Mobile Responsive', 'High-Speed CDN'],
    featured: false,
    status: 'Demo Portfolio'
  },
  {
    id: '6',
    title: 'HealthPulse Clinic & Appointments',
    category: 'Healthcare Website & Booking Portal',
    description: 'A medical clinic website where patients browse doctors, book consultation appointments online, and receive WhatsApp confirmations.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Online Booking Form', 'Doctor Directory', 'Automated Confirmations'],
    featured: false,
    status: 'Demo Portfolio'
  }
];

export const technologies = {
  frontend: [
    'React & Modern JavaScript',
    'Tailwind CSS & Mobile Design',
    'HTML5 & Clean CSS',
    'Fast Responsive Layouts'
  ],
  backend: [
    'PHP 8.2 (Secure Server Code)',
    'MySQL (Fast Relational Database)',
    'REST APIs & Webhooks',
    'Automated PDF & Email Systems'
  ],
  devops: [
    'Global Edge CDN & Cloud Hosting',
    'SSL Security & Encryption',
    'GitHub Complete Code Handover',
    'Daily Cloud Backups'
  ]
};

// 📅 4 Transparent Sprint Stages (Aam Zuban me Delivery Steps)
export const processSteps = [
  {
    step: '01',
    title: 'Planning & Scope Lock',
    description: 'We discuss your business goals, decide required pages and features, and lock in a fixed budget and timeline with zero hidden costs.'
  },
  {
    step: '02',
    title: 'Design & Mobile Preview',
    description: 'We design modern, mobile-friendly screens and share a private staging link so you can click around and approve the look.'
  },
  {
    step: '03',
    title: 'Development & Integrations',
    description: 'We code the website, connect forms to WhatsApp and email, set up databases and payments, and verify speed across all devices.'
  },
  {
    step: '04',
    title: 'Live Launch & 100% Handover',
    description: 'We launch on your domain, verify Google speed scores, and hand over all admin logins, passwords, and source code files to you.'
  }
];

export const teamMembers = [
  {
    id: '1',
    name: 'AOUN ABBAS',
    role: 'Founder & Lead Software Architect',
    focus: 'Direct Client Consultations, System Architecture, Full-Stack Development & On-Time Project Delivery.',
    responsibilities: [
      'Direct Technical Calls & Project Planning with Clients',
      'Full-Stack Architecture & High-Speed Code Quality',
      'Database Optimization & Payment API Integrations',
      'Final Production Deployment & 100% Code Handover'
    ],
    skills: ['Web Architecture', 'PHP & MySQL', 'React & JavaScript', 'Payment Gateways', 'GitHub'],
    socialLinks: {
      github: 'https://github.com/naqviuser786-commits',
      linkedin: 'https://www.linkedin.com/company/devsoleofficial/'
    }
  },
  {
    id: '2',
    name: 'Amina Mazhar',
    role: 'Lead Frontend Developer & UI/UX Designer',
    focus: 'Mobile-Friendly Web Design, Clean Interfaces, Fast Loading Pages & Conversion-Focused Layouts.',
    responsibilities: [
      'Mobile-first responsive layouts that look great on any screen',
      'Modern UI/UX styling using clean Tailwind CSS',
      'Fast page load speed optimization and visual polish',
      'Interactive pricing calculators and user-friendly forms'
    ],
    skills: ['UI/UX Design', 'Tailwind CSS', 'React', 'HTML5 & CSS3', 'Mobile Optimization'],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/company/devsoleofficial/'
    }
  },
  {
    id: '3',
    name: 'Syeda Momna',
    role: 'Lead Backend Developer & Database Engineer',
    focus: 'Secure Server Logic, Database Design, Form Data Pipelines & Automated Business Systems.',
    responsibilities: [
      'Secure server logic and instant lead submission pipelines',
      'Relational database architecture for fast search queries',
      'Automated PDF invoice generation and WhatsApp triggers',
      'Security audits, data protection, and API integrations'
    ],
    skills: ['PHP Backend', 'MySQL Database', 'REST APIs', 'Cloud Hosting', 'Data Security'],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/company/devsoleofficial/'
    }
  }
];

export const blogPosts = [
  {
    id: '1',
    title: 'How an Instant Price Calculator Can 3x Your Website Inquiries',
    excerpt: 'Clients hate waiting 24 hours for a manual quote. Learn how interactive online calculators pre-qualify buyers and generate instant leads.',
    tag: 'SaaS & Automation'
  },
  {
    id: '2',
    title: 'Why Real Estate Websites Need Direct WhatsApp Routing to Close Deals',
    excerpt: 'Traditional email forms lose 60% of property buyers. See how direct WhatsApp routing helps real estate brokers close leads on the spot.',
    tag: 'Real Estate'
  },
  {
    id: '3',
    title: 'How We Make Websites Load in Under 1 Second (And Why It Matters)',
    excerpt: 'Slow websites destroy Google rankings and ad budgets. Discover how clean code and indexed databases deliver sub-second speeds.',
    tag: 'Speed & SEO'
  }
];