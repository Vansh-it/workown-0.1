// ----------------------------------------------------------------------------
// MOCK / PLACEHOLDER DATA LAYER
// Everything in this file stands in for a real backend (Supabase/REST/GraphQL).
// Swap the functions below for real API calls in `lib/api.ts` without touching
// any component code — every component consumes these typed exports only.
// ----------------------------------------------------------------------------
import type { Category, Worker, Testimonial, FAQ, Stat, Thread, Message, Booking } from "./types";

export const img = {
  carpenterHero: "https://images.pexels.com/photos/5710902/pexels-photo-5710902.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
  carpenter2: "https://images.pexels.com/photos/5711771/pexels-photo-5711771.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
  plumber1: "https://images.pexels.com/photos/29226620/pexels-photo-29226620.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100",
  plumber2: "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100",
  electrician1: "https://images.pexels.com/photos/33379361/pexels-photo-33379361.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100",
  electrician2: "https://images.pexels.com/photos/4254163/pexels-photo-4254163.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100",
  cleaner1: "https://images.pexels.com/photos/3871607/pexels-photo-3871607.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100",
  cleaner2: "https://images.pexels.com/photos/3871587/pexels-photo-3871587.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100",
  cleanerPortrait: "https://images.pexels.com/photos/7513048/pexels-photo-7513048.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
  tutor1: "https://images.pexels.com/photos/5311406/pexels-photo-5311406.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100",
  tutor2: "https://images.pexels.com/photos/5311458/pexels-photo-5311458.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100",
  painter: "https://images.pexels.com/photos/36153946/pexels-photo-36153946.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100",
  gardener: "https://images.pexels.com/photos/4920293/pexels-photo-4920293.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1100",
};

export const avatars = {
  man1: "https://images.pexels.com/photos/9271168/pexels-photo-9271168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  man2: "https://images.pexels.com/photos/7752846/pexels-photo-7752846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  man3: "https://images.pexels.com/photos/7752822/pexels-photo-7752822.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  man4: "https://images.pexels.com/photos/7752820/pexels-photo-7752820.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  photographer: "https://images.pexels.com/photos/5528969/pexels-photo-5528969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  womanHijab: "https://images.pexels.com/photos/37272329/pexels-photo-37272329.png?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  woman1: "https://images.pexels.com/photos/7752788/pexels-photo-7752788.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  woman2: "https://images.pexels.com/photos/7752790/pexels-photo-7752790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
  womanBiz: "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400",
};

export const CATEGORIES: Category[] = [
  {
    id: "plumbing", slug: "plumbing", name: "Plumbing", nameHi: "प्लंबिंग", icon: "Wrench",
    tagline: "Leak repairs, fittings & installs", color: "primary", heroImage: img.plumber1,
    workerCount: 1240, avgPrice: { amount: 349, unit: "hour" },
    subServices: [
      { id: "leak-repair", name: "Leak Repair", description: "Tap, pipe and joint leak fixes", startingPrice: { amount: 249, unit: "job" } },
      { id: "pipe-fitting", name: "Pipe Fitting", description: "New pipeline laying & replacement", startingPrice: { amount: 499, unit: "job" } },
      { id: "fixture-install", name: "Fixture Installation", description: "Taps, showers, geysers, sinks", startingPrice: { amount: 399, unit: "job" } },
      { id: "drain-cleaning", name: "Drain Cleaning", description: "Blocked drain & sewer line clearing", startingPrice: { amount: 349, unit: "job" } },
    ],
  },
  {
    id: "electrical", slug: "electrical", name: "Electrical", nameHi: "इलेक्ट्रिकल", icon: "Zap",
    tagline: "Wiring, repairs & installations", color: "amber", heroImage: img.electrician1,
    workerCount: 980, avgPrice: { amount: 399, unit: "hour" },
    subServices: [
      { id: "wiring", name: "House Wiring", description: "Full or partial rewiring", startingPrice: { amount: 599, unit: "job" } },
      { id: "switchboard", name: "Switchboard Repair", description: "Switches, MCBs & sockets", startingPrice: { amount: 199, unit: "job" } },
      { id: "appliance-install", name: "Appliance Installation", description: "Fans, AC points, chimneys", startingPrice: { amount: 349, unit: "job" } },
      { id: "inverter", name: "Inverter & Stabilizer", description: "Setup and troubleshooting", startingPrice: { amount: 449, unit: "job" } },
    ],
  },
  {
    id: "tutoring", slug: "tutoring", name: "Tutoring", nameHi: "ट्यूशन", icon: "BookOpen",
    tagline: "School, exam prep & languages", color: "navy", heroImage: img.tutor1,
    workerCount: 2150, avgPrice: { amount: 499, unit: "hour" },
    subServices: [
      { id: "school-tuition", name: "School Tuition", description: "Grades 1–12, all boards", startingPrice: { amount: 399, unit: "hour" } },
      { id: "exam-prep", name: "Competitive Exam Prep", description: "JEE, NEET, UPSC & more", startingPrice: { amount: 699, unit: "hour" } },
      { id: "language", name: "Language Classes", description: "English, Hindi & regional", startingPrice: { amount: 349, unit: "hour" } },
      { id: "music", name: "Music & Arts", description: "Instruments, singing, drawing", startingPrice: { amount: 449, unit: "hour" } },
    ],
  },
  {
    id: "cleaning", slug: "cleaning", name: "Cleaning", nameHi: "सफाई", icon: "Sparkles",
    tagline: "Homes, offices & deep cleans", color: "primary", heroImage: img.cleaner1,
    workerCount: 1870, avgPrice: { amount: 299, unit: "hour" },
    subServices: [
      { id: "home-cleaning", name: "Home Cleaning", description: "Regular sweeping, mopping, dusting", startingPrice: { amount: 299, unit: "job" } },
      { id: "deep-cleaning", name: "Deep Cleaning", description: "Kitchen, bathroom & full-home", startingPrice: { amount: 1499, unit: "job" } },
      { id: "office-cleaning", name: "Office Cleaning", description: "Daily or scheduled upkeep", startingPrice: { amount: 2999, unit: "month" } },
      { id: "sofa-carpet", name: "Sofa & Carpet Shampoo", description: "Steam & shampoo cleaning", startingPrice: { amount: 599, unit: "job" } },
    ],
  },
  {
    id: "carpentry", slug: "carpentry", name: "Carpentry", nameHi: "बढ़ईगीरी", icon: "Hammer",
    tagline: "Furniture, fittings & repair", color: "coral", heroImage: img.carpenterHero,
    workerCount: 760, avgPrice: { amount: 449, unit: "hour" },
    subServices: [
      { id: "furniture-repair", name: "Furniture Repair", description: "Doors, drawers, hinges", startingPrice: { amount: 249, unit: "job" } },
      { id: "custom-furniture", name: "Custom Furniture", description: "Wardrobes, beds, shelves", startingPrice: { amount: 3499, unit: "job" } },
      { id: "modular", name: "Modular Kitchen Fit", description: "Cabinets & countertops", startingPrice: { amount: 7999, unit: "job" } },
      { id: "door-window", name: "Door & Window Fitting", description: "Fitting & alignment", startingPrice: { amount: 399, unit: "job" } },
    ],
  },
  {
    id: "gardening", slug: "gardening", name: "Gardening", nameHi: "बागवानी", icon: "Leaf",
    tagline: "Lawn care & landscaping", color: "primary", heroImage: img.gardener,
    workerCount: 430, avgPrice: { amount: 349, unit: "hour" },
    subServices: [
      { id: "lawn-care", name: "Lawn Mowing & Care", description: "Trimming, mowing, weeding", startingPrice: { amount: 349, unit: "job" } },
      { id: "landscaping", name: "Landscaping", description: "Garden design & planting", startingPrice: { amount: 2499, unit: "job" } },
      { id: "plant-care", name: "Plant Care Subscription", description: "Monthly maintenance visits", startingPrice: { amount: 999, unit: "month" } },
    ],
  },
  {
    id: "painting", slug: "painting", name: "Painting", nameHi: "पेंटिंग", icon: "PaintRoller",
    tagline: "Interior & exterior painting", color: "amber", heroImage: img.painter,
    workerCount: 610, avgPrice: { amount: 14, unit: "job" },
    subServices: [
      { id: "interior", name: "Interior Painting", description: "Rooms, walls & ceilings", startingPrice: { amount: 14, unit: "job" } },
      { id: "exterior", name: "Exterior Painting", description: "Weatherproof finishes", startingPrice: { amount: 18, unit: "job" } },
      { id: "waterproofing", name: "Waterproofing", description: "Terrace & wall treatment", startingPrice: { amount: 45, unit: "job" } },
    ],
  },
  {
    id: "moving", slug: "moving", name: "Moving", nameHi: "शिफ्टिंग", icon: "Truck",
    tagline: "Packing, loading & shifting", color: "navy", heroImage: img.carpenter2,
    workerCount: 340, avgPrice: { amount: 1999, unit: "job" },
    subServices: [
      { id: "local-shifting", name: "Local Home Shifting", description: "Within-city relocation", startingPrice: { amount: 1999, unit: "job" } },
      { id: "packing", name: "Packing Only", description: "Professional packing service", startingPrice: { amount: 699, unit: "job" } },
      { id: "loading", name: "Loading & Unloading", description: "Labour for heavy items", startingPrice: { amount: 499, unit: "job" } },
    ],
  },
  {
    id: "beauty", slug: "beauty", name: "Beauty & Spa", nameHi: "ब्यूटी", icon: "Scissors",
    tagline: "At-home salon & spa", color: "coral", heroImage: img.cleanerPortrait,
    workerCount: 920, avgPrice: { amount: 399, unit: "job" },
    subServices: [
      { id: "haircut", name: "Haircut & Styling", description: "Men, women & kids", startingPrice: { amount: 299, unit: "job" } },
      { id: "facial", name: "Facial & Skincare", description: "Cleanup, facial, threading", startingPrice: { amount: 499, unit: "job" } },
      { id: "spa", name: "Spa & Massage", description: "Relaxing at-home therapy", startingPrice: { amount: 899, unit: "job" } },
    ],
  },
  {
    id: "cooking", slug: "cooking", name: "Cooking", nameHi: "खाना बनाना", icon: "ChefHat",
    tagline: "Home chefs & meal prep", color: "amber", heroImage: img.tutor2,
    workerCount: 540, avgPrice: { amount: 399, unit: "day" },
    subServices: [
      { id: "daily-cook", name: "Daily Home Cook", description: "Everyday meal prep", startingPrice: { amount: 6999, unit: "month" } },
      { id: "party-chef", name: "Party & Event Chef", description: "On-demand event cooking", startingPrice: { amount: 1999, unit: "job" } },
      { id: "tiffin", name: "Tiffin Service Setup", description: "Daily tiffin preparation", startingPrice: { amount: 4999, unit: "month" } },
    ],
  },
  {
    id: "driving", slug: "driving", name: "Driving", nameHi: "ड्राइविंग", icon: "Car",
    tagline: "Personal & commute drivers", color: "navy", heroImage: img.electrician2,
    workerCount: 710, avgPrice: { amount: 299, unit: "hour" },
    subServices: [
      { id: "personal-driver", name: "Personal Driver", description: "Hourly or full-day hire", startingPrice: { amount: 299, unit: "hour" } },
      { id: "monthly-driver", name: "Monthly Driver", description: "Dedicated daily commute", startingPrice: { amount: 13999, unit: "month" } },
      { id: "outstation", name: "Outstation Trips", description: "Long-distance driving", startingPrice: { amount: 2499, unit: "day" } },
    ],
  },
  {
    id: "photography", slug: "photography", name: "Photography", nameHi: "फोटोग्राफी", icon: "Camera",
    tagline: "Events, portraits & more", color: "primary", heroImage: img.cleaner2,
    workerCount: 310, avgPrice: { amount: 2499, unit: "day" },
    subServices: [
      { id: "event", name: "Event Photography", description: "Weddings, parties & functions", startingPrice: { amount: 7999, unit: "job" } },
      { id: "portrait", name: "Portrait Sessions", description: "Studio or outdoor shoots", startingPrice: { amount: 1999, unit: "job" } },
      { id: "product", name: "Product Photography", description: "For e-commerce & catalogues", startingPrice: { amount: 2999, unit: "job" } },
    ],
  },
  {
    id: "labor", slug: "casual-labor", name: "Casual Labor", nameHi: "श्रमिक", icon: "HardHat",
    tagline: "Everyday help & manual work", color: "coral", heroImage: img.plumber2,
    workerCount: 1480, avgPrice: { amount: 249, unit: "day" },
    subServices: [
      { id: "loading-help", name: "Loading Help", description: "Heavy-lifting & manual labor", startingPrice: { amount: 249, unit: "day" } },
      { id: "assembly", name: "Furniture Assembly", description: "Flat-pack & fittings", startingPrice: { amount: 299, unit: "job" } },
      { id: "yard-work", name: "Yard & Cleanup Work", description: "Outdoor clearing & hauling", startingPrice: { amount: 349, unit: "day" } },
    ],
  },
];

export const WORKERS: Worker[] = [
  {
    id: "w1", name: "Ramesh Yadav", avatar: avatars.man1, cover: img.plumber1,
    categorySlug: "plumbing", categoryName: "Plumbing", city: "Delhi", distanceKm: 2.3,
    rating: 4.9, reviewCount: 482, verified: true, backgroundChecked: true,
    bio: "15 years fixing leaks, fittings and full bathroom pipelines across South Delhi. Punctual and tidy work, guaranteed.",
    skills: [{ name: "Leak Repair", years: 15 }, { name: "Pipe Fitting", years: 12 }, { name: "Bathroom Fitouts", years: 8 }],
    languages: ["Hindi", "English"], price: { amount: 349, unit: "hour" }, availability: "available-now",
    experienceYears: 15, completedJobs: 2130,
    gallery: [img.plumber1, img.plumber2, img.electrician1],
    services: [{ name: "Leak Repair", price: { amount: 249, unit: "job" } }, { name: "Pipe Fitting", price: { amount: 499, unit: "job" } }, { name: "Geyser Installation", price: { amount: 399, unit: "job" } }],
    responseTime: "Usually responds in 10 min",
  },
  {
    id: "w2", name: "Suresh Kumar", avatar: avatars.man2, cover: img.electrician1,
    categorySlug: "electrical", categoryName: "Electrical", city: "Gurugram", distanceKm: 4.1,
    rating: 4.8, reviewCount: 356, verified: true, backgroundChecked: true,
    bio: "Licensed electrician specialising in home wiring, inverter setup and smart switchboards. Safety-first approach.",
    skills: [{ name: "House Wiring", years: 10 }, { name: "Inverter Setup", years: 7 }, { name: "Smart Home", years: 3 }],
    languages: ["Hindi", "English"], price: { amount: 399, unit: "hour" }, availability: "today",
    experienceYears: 10, completedJobs: 1420,
    gallery: [img.electrician1, img.electrician2, img.plumber1],
    services: [{ name: "Switchboard Repair", price: { amount: 199, unit: "job" } }, { name: "Full Home Rewiring", price: { amount: 599, unit: "job" } }],
    responseTime: "Usually responds in 15 min",
  },
  {
    id: "w3", name: "Priya Sharma", avatar: avatars.woman1, cover: img.tutor1,
    categorySlug: "tutoring", categoryName: "Tutoring", city: "Delhi", distanceKm: 1.2,
    rating: 5.0, reviewCount: 214, verified: true, backgroundChecked: true,
    bio: "Mathematics & Science tutor for grades 6–12. Ex-Kota faculty with a track record of board exam toppers.",
    skills: [{ name: "Mathematics", years: 9 }, { name: "Physics", years: 9 }, { name: "Board Exam Prep", years: 6 }],
    languages: ["Hindi", "English"], price: { amount: 599, unit: "hour" }, availability: "this-week",
    experienceYears: 9, completedJobs: 860,
    gallery: [img.tutor1, img.tutor2],
    services: [{ name: "School Tuition", price: { amount: 499, unit: "hour" } }, { name: "Board Exam Crash Course", price: { amount: 699, unit: "hour" } }],
    responseTime: "Usually responds in 20 min",
  },
  {
    id: "w4", name: "Kavita Devi", avatar: avatars.woman2, cover: img.cleaner1,
    categorySlug: "cleaning", categoryName: "Cleaning", city: "Noida", distanceKm: 3.6,
    rating: 4.7, reviewCount: 601, verified: true, backgroundChecked: true,
    bio: "Detail-oriented home cleaning professional. Eco-friendly products available on request. Trusted by 200+ families.",
    skills: [{ name: "Deep Cleaning", years: 8 }, { name: "Kitchen Cleaning", years: 8 }, { name: "Sofa Shampoo", years: 4 }],
    languages: ["Hindi"], price: { amount: 299, unit: "hour" }, availability: "available-now",
    experienceYears: 8, completedJobs: 3040,
    gallery: [img.cleaner1, img.cleaner2, img.cleanerPortrait],
    services: [{ name: "Home Cleaning", price: { amount: 299, unit: "job" } }, { name: "Deep Cleaning", price: { amount: 1499, unit: "job" } }],
    responseTime: "Usually responds in 5 min",
  },
  {
    id: "w5", name: "Manoj Verma", avatar: avatars.man3, cover: img.carpenterHero,
    categorySlug: "carpentry", categoryName: "Carpentry", city: "Delhi", distanceKm: 5.4,
    rating: 4.9, reviewCount: 298, verified: true, backgroundChecked: true,
    bio: "Custom furniture and modular kitchen specialist. Precise joinery and finishing with a 1-year workmanship warranty.",
    skills: [{ name: "Custom Furniture", years: 12 }, { name: "Modular Kitchens", years: 6 }, { name: "Repairs", years: 14 }],
    languages: ["Hindi", "English"], price: { amount: 449, unit: "hour" }, availability: "busy",
    experienceYears: 14, completedJobs: 970,
    gallery: [img.carpenterHero, img.carpenter2],
    services: [{ name: "Furniture Repair", price: { amount: 249, unit: "job" } }, { name: "Custom Wardrobe", price: { amount: 3499, unit: "job" } }],
    responseTime: "Usually responds in 30 min",
  },
  {
    id: "w6", name: "Arjun Mehta", avatar: avatars.photographer, cover: img.cleaner2,
    categorySlug: "photography", categoryName: "Photography", city: "Gurugram", distanceKm: 6.8,
    rating: 4.8, reviewCount: 142, verified: true, backgroundChecked: true,
    bio: "Event and portrait photographer with a cinematic eye. 150+ weddings and corporate events shot across NCR.",
    skills: [{ name: "Event Photography", years: 7 }, { name: "Portraits", years: 7 }, { name: "Editing", years: 7 }],
    languages: ["Hindi", "English"], price: { amount: 2499, unit: "day" }, availability: "this-week",
    experienceYears: 7, completedJobs: 310,
    gallery: [img.cleaner2, img.tutor2],
    services: [{ name: "Event Photography", price: { amount: 7999, unit: "job" } }, { name: "Portrait Session", price: { amount: 1999, unit: "job" } }],
    responseTime: "Usually responds in 1 hr",
  },
  {
    id: "w7", name: "Fatima Khan", avatar: avatars.womanHijab, cover: img.tutor2,
    categorySlug: "tutoring", categoryName: "Tutoring", city: "Delhi", distanceKm: 2.9,
    rating: 4.9, reviewCount: 176, verified: true, backgroundChecked: true,
    bio: "English and language coach for school students and working professionals. Spoken-English specialist.",
    skills: [{ name: "Spoken English", years: 6 }, { name: "IELTS Prep", years: 4 }, { name: "Creative Writing", years: 5 }],
    languages: ["Hindi", "English", "Urdu"], price: { amount: 449, unit: "hour" }, availability: "today",
    experienceYears: 6, completedJobs: 520,
    gallery: [img.tutor2, img.tutor1],
    services: [{ name: "Language Classes", price: { amount: 349, unit: "hour" } }],
    responseTime: "Usually responds in 10 min",
  },
  {
    id: "w8", name: "Deepak Singh", avatar: avatars.man4, cover: img.gardener,
    categorySlug: "gardening", categoryName: "Gardening", city: "Noida", distanceKm: 7.5,
    rating: 4.6, reviewCount: 88, verified: true, backgroundChecked: false,
    bio: "Landscaping and lawn-care expert with a love for native, low-maintenance gardens. Monthly packages available.",
    skills: [{ name: "Landscaping", years: 5 }, { name: "Lawn Care", years: 5 }],
    languages: ["Hindi"], price: { amount: 349, unit: "hour" }, availability: "available-now",
    experienceYears: 5, completedJobs: 240,
    gallery: [img.gardener],
    services: [{ name: "Lawn Mowing", price: { amount: 349, unit: "job" } }, { name: "Landscaping", price: { amount: 2499, unit: "job" } }],
    responseTime: "Usually responds in 25 min",
  },
];

export const STATS: Stat[] = [
  { label: "Verified workers", value: "50,000", suffix: "+" },
  { label: "Jobs completed", value: "1.2", suffix: "M+" },
  { label: "Cities served", value: "85", suffix: "+" },
  { label: "Average rating", value: "4.8", suffix: "★" },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Anita Rao", role: "customer", avatar: avatars.woman1, city: "Bengaluru", rating: 5, quote: "Booked an electrician at 9pm and he was at my door in 40 minutes. The live tracking made it feel completely safe." },
  { id: "t2", name: "Mohammed Irfan", role: "worker", avatar: avatars.man2, city: "Hyderabad", rating: 5, quote: "WorkOwn tripled my monthly bookings. Payments land in my account the same day — no more chasing clients." },
  { id: "t3", name: "Sneha Kapoor", role: "customer", avatar: avatars.woman2, city: "Mumbai", rating: 4, quote: "Found a fantastic math tutor for my daughter within minutes. Transparent pricing, no haggling." },
  { id: "t4", name: "Vikram Nair", role: "worker", avatar: avatars.man3, city: "Chennai", rating: 5, quote: "The free training videos helped me offer modular kitchen work too. My earnings have genuinely grown." },
  { id: "t5", name: "Rhea D'Souza", role: "customer", avatar: avatars.womanHijab, city: "Pune", rating: 5, quote: "Our cleaner is reliable every single week. The recurring booking and auto re-match gives real peace of mind." },
];

export const FAQS: FAQ[] = [
  { id: "f1", category: "Booking", question: "How accurate is the live location tracking?", answer: "Worker location updates every few seconds via GPS once a booking is confirmed, so your ETA stays accurate within 1–2 minutes, even in traffic." },
  { id: "f2", category: "Trust & Safety", question: "How are workers vetted before joining WorkOwn?", answer: "Every worker completes ID verification, address proof, and a background check through our verification partner before their profile goes live." },
  { id: "f3", category: "Booking", question: "What happens if a worker cancels last minute?", answer: "We automatically re-match you with the next best-rated available worker nearby and add a service credit to your account for the inconvenience." },
  { id: "f4", category: "Booking", question: "Can I set up recurring services?", answer: "Yes — choose daily, weekly or monthly recurrence during booking. You can pause, reschedule or cancel any upcoming visit anytime." },
  { id: "f5", category: "Communication", question: "Can I call or message a worker without sharing my number?", answer: "All calls and chats happen through WorkOwn's masked numbers and in-app chat, so your real phone number is never shared." },
  { id: "f6", category: "Payments", question: "What payment methods are supported?", answer: "UPI, debit/credit cards, popular wallets, and cash for select categories. All online payments are encrypted and PCI-DSS compliant." },
  { id: "f7", category: "Pricing", question: "Will I know the full price before booking?", answer: "Yes — every listing shows a clear unit price (per hour, job, day or month) and you see a full estimate before you confirm." },
  { id: "f8", category: "For Workers", question: "How soon do I get paid after a job?", answer: "Payouts are released to your linked bank account within 24 hours of a job being marked complete." },
];

export const THREADS: Thread[] = [
  { id: "th1", name: "Ramesh Yadav", avatar: avatars.man1, role: "Plumber", lastMessage: "I'll be there by 4:15 PM, bringing the new tap fitting.", lastTime: "2m", unread: 2, online: true },
  { id: "th2", name: "Kavita Devi", avatar: avatars.woman2, role: "Cleaner", lastMessage: "Thank you! See you next Tuesday for the regular visit.", lastTime: "1h", unread: 0, online: false },
  { id: "th3", name: "WorkOwn Support", avatar: "", role: "Support", lastMessage: "Your refund for booking #4021 has been processed.", lastTime: "3h", unread: 0, online: true },
  { id: "th4", name: "Priya Sharma", avatar: avatars.woman1, role: "Tutor", lastMessage: "Can we shift tomorrow's session to 6 PM?", lastTime: "1d", unread: 1, online: false },
];

export const MESSAGES: Record<string, Message[]> = {
  th1: [
    { id: "m1", threadId: "th1", from: "them", text: "Hi! I've accepted your booking for tap leak repair.", time: "3:40 PM" },
    { id: "m2", threadId: "th1", from: "me", text: "Great, thank you! Do you need anything from my side?", time: "3:42 PM" },
    { id: "m3", threadId: "th1", from: "them", text: "Just keep the area under the sink accessible, I'll bring all tools and parts.", time: "3:44 PM" },
    { id: "m4", threadId: "th1", from: "them", text: "I'll be there by 4:15 PM, bringing the new tap fitting.", time: "3:58 PM" },
  ],
};

export const BOOKINGS: Booking[] = [
  { id: "b1", workerId: "w1", workerName: "Ramesh Yadav", workerAvatar: avatars.man1, service: "Leak Repair", category: "Plumbing", date: "Today", time: "4:00 PM", address: "A-204, Sunrise Apartments, Sector 50, Noida", status: "on-the-way", price: { amount: 349, unit: "job" } },
  { id: "b2", workerId: "w3", workerName: "Priya Sharma", workerAvatar: avatars.woman1, service: "Math Tuition", category: "Tutoring", date: "Tomorrow", time: "6:00 PM", address: "Home address", status: "confirmed", price: { amount: 599, unit: "hour" }, recurrence: "weekly" },
  { id: "b3", workerId: "w4", workerName: "Kavita Devi", workerAvatar: avatars.woman2, service: "Home Cleaning", category: "Cleaning", date: "12 Mar", time: "10:00 AM", address: "Home address", status: "completed", price: { amount: 299, unit: "job" } },
  { id: "b4", workerId: "w2", workerName: "Suresh Kumar", workerAvatar: avatars.man2, service: "Switchboard Repair", category: "Electrical", date: "4 Mar", time: "2:00 PM", address: "Office address", status: "completed", price: { amount: 199, unit: "job" } },
];

export function formatPrice(p: { amount: number; unit: string }) {
  const unitLabel: Record<string, string> = { hour: "/hr", job: "/job", day: "/day", month: "/mo" };
  return `₹${p.amount.toLocaleString("en-IN")}${unitLabel[p.unit] ?? ""}`;
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getWorker(id: string) {
  return WORKERS.find((w) => w.id === id);
}
