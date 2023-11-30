This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## prerequisites

- node v20.9.0

## Getting Started

- copy .env.exmaple, chnage the name to .env.development and ask Durando for keys

To run locally:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Vercel

This is the vercel link to the live site version
This will update everytime an new branch is pushed to main.
<https://facets-app.vercel.app/>

## 11-5-23 Updates

- database is hooked up, test page was created to make sure I could
  connect to it and read data from it
- env files are configured in local, and updated on vercel deploys

## 11-14-23 updates

- authentication up and running in basic form, see authcontext,js
- protected routes also set up in basic form so users are gated from specific pages depending on their role and role
- Upon autehntication if a user doesn't exist in the database they are created in it
- fixed deploys issue

## 11-30-23 Updates

- authentication now mostly good _Knocks on wood_. currentUser now has all auth data as well as thier database profile data, letting proetcted routes work
- added all correct layouts on currently created pages
- created a util-functions file
- added all onboarding page components that let a user input all data and then enter the feed page
