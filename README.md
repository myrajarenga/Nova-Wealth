nova wealth website 

## Tailwind CSS Setup (v3)

- Tailwind CSS is pinned at `3.4.13`.
- PostCSS is pinned at `8.5.6` and Autoprefixer at `10.4.21`.
- Content paths are set in `tailwind.config.js` to `./index.html` and `./src/**/*.{js,jsx,ts,tsx}`.

### Required directives in `src/index.css`

Use Tailwind v3 directives:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Do not use `@import "tailwindcss";` (Tailwind v4 syntax) in this project.

### Run

```
npm install
npm run dev
```

If dev preview shows CSS abort warnings, verify versions above and restart `npm run dev`.