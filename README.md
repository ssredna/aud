# aud

A small SvelteKit site that shows Aud's age, live and in Norwegian: years, months, weeks and days, plus hours and minutes since 19 August 2026 at 03:53 (Europe/Oslo). The age logic lives in `src/lib/age.ts` and uses the Temporal polyfill.

Deployed on Vercel via `@sveltejs/adapter-vercel`.

## Developing

```sh
npm install
npm run dev
```

## Checks

```sh
npm run check   # svelte-check / TypeScript
npm run lint    # prettier + eslint
npm test        # vitest
npm run build   # production build
```
