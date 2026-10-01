export interface Technology {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  category?: string | null;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string | null;
  features: string[];
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  order: number;
  active: boolean;
}

export interface ProjectImage {
  id: string;
  url: string;
  alt?: string | null;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string | null;
  category?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  completionDate?: string | null;
  featured: boolean;
  order: number;
  published: boolean;
  challenge?: string | null;
  solution?: string | null;
  results?: string | null;
  caseStudy?: string | null;
  images: ProjectImage[];
  technologies: Technology[];
  services: ServiceItem[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  company?: string | null;
  role?: string | null;
  content: string;
  rating?: number | null;
  photo?: string | null;
  published: boolean;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo?: string | null;
  bio?: string | null;
  skills: string[];
  socialLinks?: Record<string, string> | null;
  order: number;
  active: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  content: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED';
  featured: boolean;
  publishedAt?: string | null;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
}

export interface ProcessStepItem {
  id: string;
  number: number;
  title: string;
  description: string;
  icon?: string | null;
  order: number;
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
  active: boolean;
  order: number;
}

export interface SiteSettings {
  id: string;
  companyName: string;
  logoUrl?: string | null;
  wordmarkUrl?: string | null;
  heroHeading?: string | null;
  heroSubtitle?: string | null;
  ctaText?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  favicon?: string | null;
  seoDefaultTitle?: string | null;
  seoDefaultDescription?: string | null;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}
