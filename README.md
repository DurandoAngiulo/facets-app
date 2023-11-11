This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## prerequisites

- node v20.9.0

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

This is the vercel link to the live site version
This will update everytime an new branch is pushed to main.
<https://facets-app.vercel.app/>

## 11-5-23 Updates

- database is hooked up, test page was created to make sure I could
  connect to it and read data from it
- env files are configured in local, and updated on vercel deploys

## 11-13-23 updates

-authentication up and running in basic form, see authcontext,js
