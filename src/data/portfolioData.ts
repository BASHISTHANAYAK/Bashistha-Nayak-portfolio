export interface Project {
  id: string;
  title: string;
  badge?: string;
  role: string;
  description: string;
  highlights?: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  images: {
    src: string;
    label?: string;
    caption?: string;
  }[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  bullets: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
  }[];
}

export const PERSONAL_INFO = {
  name: "Bashistha Nayak",
  title: "Full Stack Developer",
  tagline: "Backend Developer | Full Stack Developer",
  codeTag: "// Scalable Backends • Event-Driven Webhooks • REST & Cloud Systems",
  bio: "Full Stack Developer specializing in Node.js, Express, and MongoDB architectures. Experienced in building robust payment workflows with Razorpay, webhook pipelines, automated background tasks, and production debugging.",
  email: "bashisthanayak09@gmail.com",
  github: "https://github.com/BASHISTHANAYAK",
  linkedin: "https://www.linkedin.com/in/bashisthanayak",
  resumeUrl: "https://drive.google.com/file/d/1TUtNyqZYYUYjMbgSOKZlbCJPWjv6NGJC/view?usp=sharing",
  location: "India",
  status: "Available for full-time opportunities",
};

const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "hookflow",
    title: "HookFlow: SaaS Billing & Webhook Engine",
    badge: "Production SaaS Engine",
    role: "Full Stack / Backend Architecture",
    description:
      "SaaS recurring billing engine managing Razorpay subscription lifecycles, automated mandate renewals, and resilient webhook processing.",
    highlights: [
      "Engineered automated recurring billing workflows with Razorpay Subscriptions.",
      "Built webhook pipeline with signature verification and idempotent deduplication.",
      "Developed customer mandate self-service portal and admin MRR analytics console.",
      "Secured API endpoints with JWT and optimized MongoDB indexing for payment states."
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "Webhooks",
      "JWT",
      "Vercel"
    ],
    liveUrl: "https://hookflow-dashboard.vercel.app/",
    githubUrl: "https://github.com/BASHISTHANAYAK/hookflow-dashboard",
    images: [
      {
        src: `${BASE}Images/hookflow.png`,
        label: "Overview",
        caption: "HookFlow SaaS Customer & Admin Dashboard"
      }
    ]
  },
  {
    id: "employee-access-portal",
    title: "Employee Access Portal",
    badge: "Auth & Access Control",
    role: "Cross-Platform Web Authentication",
    description:
      "Web authentication app built with React Native for Web and Expo, enforcing strict Google OAuth 2.0 single sign-on and corporate email domain authorization.",
    highlights: [
      "Configured Google OAuth 2.0 single sign-on using Firebase Authentication.",
      "Enforced client-side domain policy restricting access exclusively to @outlook.com accounts.",
      "Built protected route guards, persistent session restore, and graceful logout states.",
      "Verified with 27 Jest unit tests covering domain validation algorithms and auth state edge cases."
    ],
    technologies: [
      "React Native for Web",
      "Expo",
      "TypeScript",
      "Firebase Auth",
      "Google OAuth 2.0",
      "Netlify",
      "Jest"
    ],
    liveUrl: "https://hbplus-auth-assessment.netlify.app",
    githubUrl: "https://github.com/BASHISTHANAYAK/hbplus-auth-assessment",
    images: [
      {
        src: `${BASE}Images/01-login-page.png`,
        label: "01. Login Page",
        caption: "Sign-In portal with Google OAuth authentication"
      },
      {
        src: `${BASE}Images/02-google-account-selection.png`,
        label: "02. Account Selection",
        caption: "Google identity selection dialog for single sign-on"
      },
      {
        src: `${BASE}Images/03-access-restricted.png`,
        label: "03. Domain Restriction",
        caption: "Access restricted alert when unauthorized email domain is detected"
      },
      {
        src: `${BASE}Images/04-authenticated-dashboard.png`,
        label: "04. Dashboard",
        caption: "Authenticated dashboard with session details and logout control"
      }
    ]
  },
  {
    id: "fruit-ordering",
    title: "Bulk Fruit & Produce Ordering Platform",
    badge: "Supply Chain Platform",
    role: "Full Stack MERN Architecture",
    description:
      "Full-stack wholesale produce ordering platform with role-based access control, dynamic inventory management, and automated order tracking.",
    highlights: [
      "Built complete MERN ordering pipeline connecting produce suppliers with bulk buyers.",
      "Implemented role-based access control separating buyer orders from admin stock controls.",
      "Created dynamic product catalog with real-time stock sync and shopping cart logic.",
      "Integrated automated transactional notifications with Nodemailer for order updates."
    ],
    technologies: [
      "React",
      "Redux",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "REST APIs",
      "Nodemailer",
      "Vercel"
    ],
    liveUrl: "https://fruit-ordering-platform-xjbc.vercel.app/",
    githubUrl: "https://github.com/BASHISTHANAYAK/Fruit_Ordering_Platform",
    images: [
      {
        src: `${BASE}Images/fruit-ordering.png`,
        label: "Storefront",
        caption: "Product catalog and buyer order management interface"
      }
    ]
  }
];

export const OTHER_PROJECTS: Project[] = [
  {
    id: "music-cart",
    title: "Music Cart",
    role: "MERN Stack E-Commerce",
    description:
      "E-commerce music store built with MERN stack featuring product search, dynamic filtering, cart management, and order placement.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "CSS3"],
    liveUrl: "https://music-cart-lyart.vercel.app/home",
    githubUrl: "https://github.com/BASHISTHANAYAK/Music-Cart",
    images: [
      {
        src: `${BASE}Images/music-cart.png`,
        caption: "Music Cart product browsing and checkout interface"
      }
    ]
  },
  {
    id: "nykaa-clone",
    title: "Nykaa Clone",
    role: "Responsive Web Interface",
    description:
      "Responsive e-commerce UI replica of Nykaa built with HTML5, CSS3, and JavaScript, featuring product catalog grids and modal dialogs.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://nykaa-project.onrender.com/",
    githubUrl: "https://github.com/BASHISTHANAYAK/nykaa-project",
    images: [
      {
        src: `${BASE}Images/nykaa-clone.png`,
        caption: "Nykaa e-commerce user interface and authentication dialog"
      }
    ]
  },
  {
    id: "responsive-landing",
    title: "Responsive Landing Page",
    role: "Modern Frontend Interface",
    description:
      "High-design landing page built with React and modern CSS, demonstrating clean component architecture and fluid multi-device adaptability.",
    technologies: ["React", "CSS3", "JavaScript"],
    liveUrl: "https://go-pro-media-project.vercel.app/",
    images: [
      {
        src: `${BASE}Images/responsive-landing.png`,
        caption: "High-design responsive landing page layout"
      }
    ]
  }
];

export const EXPERIENCE_HISTORY: ExperienceItem[] = [
  {
    company: "Eatoes Web Private Limited",
    role: "Full Stack Developer",
    period: "December 2024 – February 2026",
    location: "Hyderabad, India / Remote",
    type: "Full-Time",
    summary:
      "Worked as the primary full-stack developer, taking ownership of backend APIs, MongoDB database operations, payment integrations, and production issue resolution.",
    bullets: [
      "Worked as the primary full-stack developer, building and maintaining React frontend features, Node.js and Express.js REST APIs, and MongoDB database operations.",
      "Coordinated frontend development with an intern, reviewed and tested feature integrations, resolved UI and API issues, and supported development releases.",
      "Developed and maintained REST APIs and integrated Razorpay payment processing, implementing webhook handling and deduplication to maintain accurate transaction states.",
      "Built automated WhatsApp notification workflows using Meta Interakt for restaurant subscription renewals, upcoming expirations, and payment reminders.",
      "Integrated Google Table Reservations, managed scheduled data synchronization jobs, and investigated production issues using DigitalOcean server logs."
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Razorpay",
      "Webhooks",
      "Cron Jobs",
      "JWT",
      "React",
      "DigitalOcean"
    ]
  },
  {
    company: "Cuvette",
    role: "Web Development Intern",
    period: "October 2023 – February 2024",
    location: "Remote",
    type: "Internship",
    summary:
      "Developed responsive frontend web applications and reusable component libraries using React.js and modern state management.",
    bullets: [
      "Developed responsive web interfaces using React.js, JavaScript, HTML, and CSS.",
      "Used Redux for centralized state management and Chakra UI for reusable frontend components."
    ],
    technologies: [
      "React.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Redux",
      "Chakra UI"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript (ES6+)" },
      { name: "TypeScript" },
      { name: "HTML5" },
      { name: "CSS3" }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "Webhooks" },
      { name: "Cron Jobs" },
      { name: "JWT" }
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js" },
      { name: "Redux" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "Chakra UI" }
    ]
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB" },
      { name: "Mongoose ODM" },
      { name: "SQL (Basic)" }
    ]
  },
  {
    title: "Authentication & Security",
    skills: [
      { name: "JWT" },
      { name: "bcrypt" },
      { name: "Firebase Auth" },
      { name: "Google OAuth 2.0" },
      { name: "HMAC" }
    ]
  },
  {
    title: "Mobile / Cross-platform (Project Exposure)",
    skills: [
      { name: "React Native for Web" },
      { name: "Expo" }
    ]
  },
  {
    title: "Testing",
    skills: [
      { name: "Jest (Unit Testing)" }
    ]
  },
  {
    title: "Tools & Deployment",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Postman" },
      { name: "Linux CLI" },
      { name: "DigitalOcean" },
      { name: "Vercel" },
      { name: "Netlify" },
      { name: "Render" }
    ]
  }
];
