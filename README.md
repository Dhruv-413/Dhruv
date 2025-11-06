# Dhruv Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4)](https://tailwindcss.com/)

Modern, responsive portfolio website built with Next.js 16, React 19, and TypeScript. Features smooth animations, real-time GitHub integration, and a professional contact form.

## Features

- ⚡ Optimized performance with Next.js App Router
- 📱 Fully responsive design
- 🎬 Smooth animations with Framer Motion
- 🔄 Real-time GitHub activity integration
- 📧 Contact form with EmailJS
- 🎯 Type-safe with TypeScript
- ♿ Accessible UI with Radix components

## Tech Stack

**Framework:** Next.js 16 • React 19 • TypeScript 5

**Styling:** Tailwind CSS 4 • Radix UI • Framer Motion

**Forms:** React Hook Form • Zod

**State & Data:** Zustand • TanStack Query

**Integrations:** EmailJS • GitHub API • Recharts

## Prerequisites

- Node.js >= 18.x
- npm/yarn/pnpm

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Dhruv-413/Dhruv.git
cd Dhruv/dhruv-portfolio

# Install dependencies
npm install

# Set up environment variables (see Configuration below)
# Create .env.local file

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Configuration

Create a `.env.local` file in the root directory:

```env
# GitHub API (get token at: https://github.com/settings/tokens)
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username

# EmailJS (sign up at: https://www.emailjs.com/)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

## Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── features/    # Page-specific components
│   ├── shared/      # Reusable components
│   └── ui/          # Base UI primitives
├── data/            # Static data (projects, skills)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── types/           # TypeScript definitions
```

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dhruv-413/Dhruv)

**Vercel (Recommended):**
1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Configure environment variables
4. Deploy

**Other Platforms:** Netlify, AWS Amplify, Railway, Render

## Contributing

Contributions are welcome! Fork the repository, create a feature branch, and submit a pull request.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contact

**Dhruv Gupta**

- GitHub: [@Dhruv-413](https://github.com/Dhruv-413)
- Portfolio: [Your Portfolio URL]
- Email: [your-email@example.com]

---

<div align="center">
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
