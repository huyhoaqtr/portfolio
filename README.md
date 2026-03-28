# Huy Hoang Portfolio

A data-driven personal portfolio website built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, with an embedded AI assistant for answering questions about the profile.

## Description

This project presents Huy Hoang's professional profile in a modern single-page layout:

- Intro + contact CTA
- What I Do
- Projects
- Experience timeline
- Tech stack
- Education
- Footer + floating AI chat

It solves a common portfolio problem: static profile pages are hard to explore quickly. Here, visitors can either browse structured sections or ask the chat assistant directly for project/experience details.

## Features

- Single-page portfolio UI with section anchors (`#projects`, `#experience`, `#skills`, `#contact`)
- Data-driven content from typed source files in [`src/data`](src/data)
- Animated interface using Framer Motion (`FadeIn`, scroll progress, typing headline)
- Custom WebGL galaxy background using OGL shaders
- Embedded chat widget with markdown rendering (`react-markdown` + `remark-gfm`)
- Server API route at [`/api/chat`](src/app/api/chat/route.ts) with provider fallback logic:
  - Gemini (if `GEMINI_API_KEY` exists)
  - OpenAI (if `OPENAI_API_KEY` exists)
  - Static fallback reply (if no key exists)
- Site metadata / Open Graph config from [`src/config/site.ts`](src/config/site.ts)
- Strict TypeScript setup with `@/*` path alias

## Tech Stack

### Core

- Next.js 14 (App Router)
- React 18
- TypeScript

### Styling & UI

- Tailwind CSS
- PostCSS + Autoprefixer
- Framer Motion
- Lucide React icons

### Graphics

- OGL (custom shader-based galaxy background)

### Chat & Content Rendering

- `react-markdown`
- `remark-gfm`

### Tooling

- ESLint (`next/core-web-vitals`)
- Prettier

## Installation

### Prerequisites

- Node.js 18.17+ (recommended for Next.js 14)
- npm

### Setup

```bash
git clone <your-repo-url>
cd portfolio
npm install
```

### Environment variables

Create `.env.local` in the project root:

```bash
# Use at least one provider key for full chat responses
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
```

Notes:

- If both keys are missing, chat still works in fallback mode.
- `.env*` files are gitignored.

### Run locally

```bash
npm run dev
```

Open: `http://localhost:3000`

## Usage

### Development commands

```bash
npm run dev     # start local dev server
npm run lint    # run eslint
npm run build   # production build
npm run start   # run built app
```

### Chat API usage

Endpoint: `POST /api/chat`

Minimal request:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What projects has Huy built?"}
    ]
  }'
```

Optional request fields:

- `provider`: `"gemini" | "openai"` (override auto-selection)
- `model`: Gemini model name (default: `gemini-2.5-flash`)

Response shape (success):

```json
{
  "reply": "...",
  "provider": "gemini",
  "model": "gemini-2.5-flash"
}
```

## Project Structure

```text
.
├── public/
│   └── logo.svg
├── src/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── data/
│   └── lib/
├── next.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Key Modules

- [`src/app/page.tsx`](src/app/page.tsx)
  - Main page composition and all major sections.
- [`src/app/providers.tsx`](src/app/providers.tsx)
  - Global wrappers: theme provider, header/footer, background, chat, scroll progress.
- [`src/components/chat-widget.tsx`](src/components/chat-widget.tsx)
  - Client chat UI and request handling.
- [`src/app/api/chat/route.ts`](src/app/api/chat/route.ts)
  - Provider routing, context assembly from portfolio data, upstream API calls.
- [`src/components/galaxy-background.tsx`](src/components/galaxy-background.tsx)
  - OGL renderer + shaders for animated starfield background.
- [`src/data/projects.ts`](src/data/projects.ts), [`src/data/experience.ts`](src/data/experience.ts), [`src/data/skills.ts`](src/data/skills.ts), [`src/data/education.ts`](src/data/education.ts)
  - Portfolio content source of truth.
- [`src/config/site.ts`](src/config/site.ts)
  - Site name, description, URL, and social/contact links.

## Configuration

### Runtime env

- `GEMINI_API_KEY` (optional, enables Gemini chat)
- `OPENAI_API_KEY` (optional, enables OpenAI chat)

### App config

- Next.js config: [`next.config.mjs`](next.config.mjs)
- Tailwind config: [`tailwind.config.js`](tailwind.config.js)
- TypeScript config: [`tsconfig.json`](tsconfig.json)
- Global styles: [`src/app/globals.css`](src/app/globals.css)

### Content updates

- Update profile data in [`src/data`](src/data)
- Update metadata/links in [`src/config/site.ts`](src/config/site.ts)

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run checks locally:
   ```bash
   npm run lint
   npm run build
   ```
5. Open a pull request with a clear summary.

## License

No `LICENSE` file is currently present in this repository.

If you plan to open-source this project, add a license file (for example, MIT).

## Contact / Maintainer

- Maintainer: Huy Hoang
- Email: `huyhoaq.tr@gmail.com`
- GitHub: [huyhoaqtr](https://github.com/huyhoaqtr)
