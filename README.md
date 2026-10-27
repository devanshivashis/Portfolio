# devanshi-vashistha.vercel.app

Personal site of Devanshi Vashistha, Data Scientist and ML Engineer.

**Live:** https://devanshi-vashistha.vercel.app

## Stack
React + Vite + Tailwind, deployed on Vercel from `main`.

## Editing content
All text (experience, projects, skills, links) lives in `client/src/data/profile.ts`. Components in `client/src/components/` only handle layout. The plain-HTML summary inside `client/index.html` is what search engines and link previews read, so update it when the headline facts change.

## Run locally
```bash
npm install
npm run dev:client   # http://localhost:5000
npm run build        # outputs to dist/public
```
