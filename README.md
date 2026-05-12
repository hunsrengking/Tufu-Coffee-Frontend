# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Deployment

This frontend is built with Vite and can be hosted on Vercel as a static site.

### Local development

1. Create a `.env` file at the project root.
2. Add this value for local backend proxying when running the app locally:

```env
VITE_API_URL=http://localhost:3000/api
```

3. Start the frontend with:

```bash
npm install
npm run dev
```

The local Vite server proxies `/api` requests to your local backend.

### Hosting on Vercel

1. Add the environment variable in your Vercel project settings:

```env
VITE_API_URL=https://tufu-coffee-api.onrender.com/api
```

2. Set the build command to:

```bash
npm run build
```

3. Set the output directory to:

```bash
dist
```

### Backend on Render

Your frontend will call the Render-hosted backend through `VITE_API_URL`. Update the Render service URL if it differs from `https://tufu-coffee-api.onrender.com/api`.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
