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
