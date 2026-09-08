/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ThemeMode = 'dark' | 'light' | 'system';

export type BackgroundStyle = 
  | 'deep_space' 
  | 'plexus_matrix' 
  | 'cosmic_mesh' 
  | 'indigo_aurora' 
  | 'minimal_grid' 
  | 'studio_light';

export type PortraitStyle =
  | 'studio_tech'
  | 'office_bokeh'
  | 'original_photo'
  | 'cyber_neon';

export interface ClientProblemRecord {
  id: string;
  problem: string;
  category: 'Web Dev' | 'SEO' | 'Blogging' | 'Keywords' | 'Guest Posting' | 'Other';
  status: 'Solved' | 'In Progress' | 'Pending';
  date: string;
  clientName?: string;
  websiteUrl?: string;
  details: string;
  rootCause: string;
  recommendedSolution: string;
  estimatedCost: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface ProjectRecord {
  id: string;
  title: string;
  category: 'Web Dev' | 'SEO' | 'WordPress' | 'Full Stack' | 'Blogging';
  tech: string[];
  status: 'Completed' | 'In Progress' | 'Planning';
  img: string;
  demoUrl?: string;
  githubUrl?: string;
  description: string;
  metric?: string;
}

export interface GitHubRepoRecord {
  id: string;
  name: string;
  fullName: string;
  url: string;
  cloneUrl: string;
  language: 'TypeScript' | 'HTML' | 'JavaScript' | 'CSS';
  languageColor: string;
  commits: number;
  lastContribution: string;
  description: string;
  category: 'AI & Smart Tools' | 'Full-Stack & Portfolios' | 'E-Commerce & Luxury' | 'Web Creative';
  stars: number;
  forks: number;
  featured?: boolean;
}

export interface OrderInvoiceRecord {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  service: string;
  amount: number;
  paymentMethod: 'Credit/Debit Card' | 'PayPal' | 'Bank Transfer' | 'Stripe';
  status: 'Paid' | 'Pending' | 'Overdue';
  date: string;
  dueDate: string;
}

export interface InquiryMessageRecord {
  id: string;
  senderName: string;
  senderEmail: string;
  phone?: string;
  service: string;
  message: string;
  date: string;
  status: 'Unread' | 'Replied' | 'Archived';
  isStarred?: boolean;
}

export interface BlogPostRecord {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  status: 'Published' | 'Draft';
  summary: string;
  views: number;
}

export interface ReviewRecord {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  date: string;
  text: string;
  serviceUsed: string;
  verified: boolean;
}

export interface FAQRecord {
  id: string;
  category: string;
  question: string;
  answer: string;
}
