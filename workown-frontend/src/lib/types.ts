// Core data models for the WorkOwn marketplace.
// NOTE: All data returned by `lib/data.ts` is placeholder/mock content for design
// purposes only. See README.md "Placeholders" section for what must be replaced
// with real backend data before launch.

export type PriceUnit = "hour" | "job" | "day" | "month";

export interface Price {
  amount: number;
  unit: PriceUnit;
  currency?: "INR";
}

export interface SubService {
  id: string;
  name: string;
  description: string;
  startingPrice: Price;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameHi: string;
  icon: string; // lucide icon name
  tagline: string;
  color: "primary" | "coral" | "navy" | "amber";
  heroImage: string;
  workerCount: number;
  avgPrice: Price;
  subServices: SubService[];
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  date: string;
  text: string;
  tags?: string[];
  serviceName?: string;
}

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  cover?: string;
  categorySlug: string;
  categoryName: string;
  city: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  backgroundChecked: boolean;
  bio: string;
  skills: { name: string; years: number }[];
  languages: string[];
  price: Price;
  availability: "available-now" | "today" | "this-week" | "busy";
  experienceYears: number;
  completedJobs: number;
  gallery: string[];
  services: { name: string; price: Price }[];
  responseTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: "customer" | "worker";
  avatar?: string;
  city: string;
  rating: number;
  quote: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface Booking {
  id: string;
  workerId: string;
  workerName: string;
  workerAvatar: string;
  service: string;
  category: string;
  date: string;
  time: string;
  address: string;
  status: "requested" | "confirmed" | "on-the-way" | "arrived" | "in-progress" | "completed" | "cancelled";
  price: Price;
  recurrence?: "none" | "daily" | "weekly" | "monthly";
}

export interface Message {
  id: string;
  threadId: string;
  from: "me" | "them";
  text: string;
  time: string;
  read?: boolean;
}

export interface Thread {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  online?: boolean;
}
