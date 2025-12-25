<div align="center">

# 🚀 Dhruv Portfolio

### A Modern, Animated Portfolio Built with Next.js 16 & React 19

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

<p align="center">
  <strong>A sleek, performant developer portfolio featuring real-time GitHub integration, smooth animations, and a modern dark theme with elegant glass morphism effects.</strong>
</p>

[**View Live Demo**](https://dhruvgupta-nu.vercel.app/) • [**Report Bug**](https://github.com/Dhruv-413/Dhruv/issues) • [**Request Feature**](https://github.com/Dhruv-413/Dhruv/issues)

</div>

---

## ✨ Features

### 🎨 **Modern UI/UX**

- **Glass Morphism Design** - Elegant translucent cards with backdrop blur effects
- **Animated Backgrounds** - Floating particles, scan lines, and gradient effects
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Dark Theme** - Eye-friendly dark mode with primary color accents
- **Responsive Design** - Mobile-first approach, works flawlessly on all devices

### 📊 **Real-Time GitHub Integration**

- **Contribution Heatmap** - Visual representation of coding activity
- **Repository Showcase** - Top repositories with stars, forks, and language stats
- **Language Distribution** - Interactive pie charts showing tech proficiency
- **Open Source Contributions** - Track contributions to external repositories
- **Live Stats** - Total commits, PRs, issues, and contribution streaks

### ⚡ **Performance Optimized**

- **Next.js App Router** - Server components for faster initial loads
- **Dynamic Imports** - Lazy loading for optimal bundle size
- **Image Optimization** - Automatic WebP conversion and lazy loading
- **Suspense Boundaries** - Graceful loading states throughout
- **React 19** - Latest concurrent features for smooth UX

### 🌐 **SEO & AEO Optimized**

- **Dynamic Metadata** - Per-page meta tags with Open Graph & Twitter Cards
- **JSON-LD Structured Data** - Person, WebPage, and BreadcrumbList schemas
- **Sitemap & Robots.txt** - Auto-generated for search engine crawling
- **PWA Manifest** - Web App Manifest for installable experience
- **Answer Engine Optimization** - Semantic HTML for AI search engines

### 🛠️ **Developer Experience**

- **TypeScript Strict Mode** - Full type safety across the codebase
- **Component Architecture** - Reusable UI primitives and feature components
- **TanStack Query** - Efficient data fetching with caching
- **Zustand** - Lightweight state management
- **ESLint** - Code quality enforcement

---

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| **Home/About** | `/` | Hero section with animated code snippets, stats dashboard, highlights, and core values |
| **Projects** | `/projects` | Showcase of 7+ projects with filtering, detailed modals, and live demos |
| **Skills** | `/skills` | Interactive skills breakdown by category with proficiency indicators |
| **Career** | `/career` | Professional timeline featuring work experience, education, and achievements |
| **GitHub** | `/github` | Real-time GitHub statistics, contribution calendar, and repository explorer |
| **Contact** | `/contact` | Contact form powered by EmailJS with validation and toast notifications |

---

## 🛠️ Tech Stack

### **Core Framework**

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.0.10 | React framework with App Router |
| [React](https://reactjs.org/) | 19.2.0 | UI library with concurrent features |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-safe JavaScript |

### **Styling & Animation**

| Technology | Purpose |
|------------|---------|
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion/) | Production-ready animations |
| [Radix UI](https://www.radix-ui.com/) | Accessible component primitives |
| [Lucide React](https://lucide.dev/) | Beautiful & consistent icons |

### **Data & State Management**

| Technology | Purpose |
|------------|---------|
| [TanStack Query](https://tanstack.com/query) | Async data fetching & caching |
| [Zustand](https://zustand-demo.pmnd.rs/) | Lightweight state management |
| [React Hook Form](https://react-hook-form.com/) | Performant form handling |
| [Zod](https://zod.dev/) | Schema validation |

### **Integrations**

| Technology | Purpose |
|------------|---------|
| [GitHub GraphQL API](https://docs.github.com/graphql) | Real-time GitHub data |
| [EmailJS](https://www.emailjs.com/) | Contact form email delivery |
| [Recharts](https://recharts.org/) | Data visualization charts |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |

---

## 📁 Project Structure

```
dhruv-portfolio/
├── public/
│   ├── images/              # Static images and assets
│   ├── manifest.json        # PWA Web App Manifest
│   └── favicon.ico          # Site favicon
│
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx         # Home/About page
│   │   ├── layout.tsx       # Root layout with providers
│   │   ├── globals.css      # Global styles & Tailwind
│   │   ├── loading.tsx      # Root loading state
│   │   ├── sitemap.ts       # Dynamic sitemap generation
│   │   ├── robots.ts        # Robots.txt configuration
│   │   ├── icon.svg         # Dynamic favicon
│   │   ├── apple-icon.svg   # Apple touch icon
│   │   ├── projects/        # Projects page
│   │   ├── skills/          # Skills page
│   │   ├── career/          # Career timeline page
│   │   ├── github/          # GitHub stats page
│   │   └── contact/         # Contact page
│   │
│   ├── components/
│   │   ├── features/        # Page-specific components
│   │   │   ├── hero/        # Hero section components
│   │   │   ├── projects/    # Project cards, modals
│   │   │   ├── skills/      # Skills grid, categories
│   │   │   ├── timeline/    # Career timeline
│   │   │   ├── github/      # GitHub stats, heatmap
│   │   │   ├── contact/     # Contact form
│   │   │   └── stats/       # Statistics components
│   │   │
│   │   ├── shared/          # Shared components
│   │   │   ├── Header.tsx   # Navigation header
│   │   │   ├── Footer.tsx   # Site footer
│   │   │   └── Providers.tsx # Context providers
│   │   │
│   │   └── ui/              # Reusable UI primitives (21 components)
│   │       ├── button.tsx   # Button component
│   │       ├── card.tsx     # Card component
│   │       ├── input.tsx    # Form inputs
│   │       ├── AnimatedBackground.tsx
│   │       ├── SectionHeader.tsx
│   │       └── ...          # Other UI components
│   │
│   ├── data/                # Static data files
│   │   ├── projects.json    # Project showcase data
│   │   ├── skills.json      # Skills categories
│   │   ├── timeline.json    # Career timeline
│   │   └── certifications.json
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useGitHub.ts     # GitHub API integration
│   │   └── useUIState.ts    # UI state management
│   │
│   ├── lib/                 # Utility functions
│   │   ├── constants.ts     # Site configuration (SITE_CONFIG)
│   │   ├── utils.ts         # Helper utilities (cn, etc.)
│   │   ├── animations.ts    # Framer Motion variants
│   │   ├── helpers.ts       # Data transformation helpers
│   │   ├── schema.ts        # Zod validation schemas
│   │   └── index.ts         # Barrel exports
│   │
│   ├── types/               # TypeScript definitions
│   │   ├── project.ts       # Project types
│   │   ├── experience.ts    # Timeline types
│   │   └── api.ts           # API response types
│   │
│   └── globals.d.ts         # Global type declarations
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── components.json          # shadcn/ui configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm**
- **GitHub Personal Access Token** (for GitHub integration)
- **EmailJS Account** (optional, for contact form)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Dhruv-413/Dhruv.git
   cd Dhruv/dhruv-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # GitHub API Configuration
   # Get your token at: https://github.com/settings/tokens
   # Required scopes: read:user, repo
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
   NEXT_PUBLIC_GITHUB_USERNAME=your_github_username

   # EmailJS Configuration (Optional - for contact form)
   # Sign up at: https://www.emailjs.com/
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuration

### GitHub Token Setup

1. Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Generate a new token (classic) with these scopes:
   - `read:user` - Read user profile data
   - `repo` - Access repository information
3. Copy the token to your `.env.local` file

### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Message content
4. Copy the credentials to your `.env.local` file

### Customization

#### Adding Projects

Edit `src/data/projects.json`:

```json
{
  "id": "project-id",
  "title": "Project Title",
  "description": "Short description",
  "longDescription": "Detailed description",
  "category": "Backend | Frontend | Full-Stack | AI/ML",
  "featured": true,
  "technologies": ["React", "Node.js", "PostgreSQL"],
  "links": {
    "github": "https://github.com/...",
    "live": "https://..."
  },
  "date": "2025-01-01"
}
```

#### Updating Skills

Edit `src/data/skills.json`:

```json
{
  "category": "Category Name",
  "proficiency": 85,
  "color": "#3b82f6",
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
```

#### Modifying Site Config

Edit `src/lib/constants.ts`:

```typescript
export const SITE_CONFIG = {
  name: "Your Name",
  description: "Your description",
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    email: "mailto:your@email.com"
  }
};
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dhruv-413/Dhruv)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Configure environment variables in Vercel settings
4. Deploy automatically on every push

### Other Platforms

| Platform | Guide |
|----------|-------|
| **Netlify** | [Deploy Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/) |
| **AWS Amplify** | [Deploy with Amplify](https://docs.amplify.aws/guides/hosting/nextjs/) |
| **Railway** | [Deploy on Railway](https://railway.app/) |
| **Render** | [Deploy on Render](https://render.com/) |

---

## 🎯 Performance

This portfolio is optimized for performance:

- ⚡ **Lazy Loading** - Components load on demand
- 🖼️ **Image Optimization** - Automatic WebP conversion
- 📦 **Code Splitting** - Minimal initial bundle size
- 🔄 **Static Generation** - Fast page loads with SSG
- 💾 **Query Caching** - TanStack Query reduces API calls
- 🔍 **SEO Ready** - Sitemap, robots.txt, and structured data

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Write meaningful commit messages
- Add comments for complex logic

---

## 📬 Contact

**Dhruv Gupta** - Full-Stack Developer & AI/ML Engineer

[![GitHub](https://img.shields.io/badge/GitHub-Dhruv--413-181717?style=for-the-badge&logo=github)](https://github.com/Dhruv-413)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-dhruvgpta-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/dhruvgpta/)
[![Email](https://img.shields.io/badge/Email-dhruvgupta6580@gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:dhruvgupta6580@gmail.com)
