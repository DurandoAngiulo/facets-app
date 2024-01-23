This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## prerequisites

- node v20.9.0

## Getting Started

- Run `cp .env.example .env.development` to copy the .env.example file to .env.development. - Ask Durando for values
- Run `npm install` to install all dependencies
- Run `npm run dev` to start the development server

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Vercel

This is the vercel link to the live site version
This will update everytime an new branch is pushed to main.
<https://facets-app.vercel.app/>

## Working with the project:

## Structure:

- Everything you need to do front end for this application is in the `src` folder. Here you should see, `app` and `components` folder. Inside that, are all the project files you'll need to worry about.
- Basically, every page and component you'll need to interact with and style will be wrapped in a file of the name of the page/component. For instance, the loginAndSign page is called `page.jsx` and resides within a folder of the same name. Another example is the 'Navbar' component. The file itself is called `Index.jsx` and resides within the Navbar folder.
- witin a jsx file (page or component). The file strucutre is divided as follows:
  - Imports: (where all components, libraries, files, and other assets are imported in)
  - logic (all the functions/state management/behvaior that makes the file behave in a certain way with interaction)
  - render section: **(This is primarily where your work will be and is where the HTML/CSS/JS is actually rendered and shown on page)**
  ```jsx
  return (
    <div>
      <p> hello world</p>
    </div>
  );
  ```

## CSS & Tailwind

- CSS is pretty simple here. I have set up an example for you of how it works in the `SignupForm` component.
- Basically you add a style sheet file (can be named whatever but I chose styles) with the the file ending of `.module.css`. You would then do all the specific selector styling with css like normal on the actual jsx file in the same folder.
- next all you need to do is import the relevant style sheet in the import section of the file, as I show in the signupform jsx file, and your css should show up, as mine does in the example (you should see the purple border that I added).
- Whenever you can though, you should try to use tailwind for all styling. Tailwind is like bootstrap and it just makes monotonous styling easier. Only whee tailwind can't accomplihs what you're trying to do should you use custom styling.
- tailwinds documentation (https://v2.tailwindcss.com/docs). The documentation has a robust search bar so you shpould have no issue searching for what you want to do.

## Global styling/variables

- there is a file at root level, called globals.css Any `root: {}` global styligns you want to assign, fonts, colors, spacings, etc. Define them here, then they will be accessible everywhere and can be called using the `var(--"value")` css like normal

## Fonts

- ok so this is a bit more involved, attaching the font documentation here.
- https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- https://www.youtube.com/watch?v=L8_98i_bMMA
- https://stackoverflow.com/questions/74607996/how-to-add-custom-local-fonts-to-a-nextjs-13-tailwind-project
- I will be availible to help configure/set this up for our fonts

## Icons

the `Icon` component which is used to integrate SVG icons into the application.

### Usage

To use an icon, specify the `iconName` which corresponds to the name of the SVG file in the `@/svg/` directory.

Example usage:

```jsx
import Icon from "@/components/Icon";

const MyComponent = () => (
  <div>
    <Icon iconName="CheckMarkIcon" />
  </div>
);
```

### Adding New Icons

To add a new icon:

1. Place the optimized SVG file in the @/svg/ directory.
2. Import the SVG in the Icon component file and add it to the iconRegistry.

```
// src/components/Icon/Icon.js
import NewIcon from '@/svg/NewIcon.svg';

const iconRegistry = {
  // ... existing icons
  NewIcon,
};
```

### Accessibility

Ensure that icons used for conveying information are accompanied by a descriptive title and `isDecorative` is set to false. For purely decorative icons, you can omit the title prop or set `isDecorative` to true.

## Images

- TBD need to consult with Paul here + image uploading knowledge lacking
- for now if an image needs to be added I will either do it through cloudinary or gets added in `public/dist/images`

## Framer React CSS Framework

- https://www.framer.com/motion/
- need to look into this more for microinteratcions
- I don't yet have an example, I encourge you all to look yourself

## Pauls next.js site for reference/help

https://github.com/mrpaulphan/drexel-attendance

---

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

## 1-15-24

- finished friend link logic so guests can add facets to other users's data
- onboarding system gltich still exists where when the onboarding finishes, it loops the user back to the start
- friend facet link logic still has an issue where some info isnt added in the new friend Facet
- created a test page at top level so people can test visuals of thier components/CSS
- Added all prompts tables into database and created function to slot names into prompt questions

## 1-18-24

- fixed onboarding and friendfacets bugs (one bug still outstanding that is inprogress)
- more details still in progress

## 1-20-24

- moredetails page added to user flow and occupation page is tweaked
