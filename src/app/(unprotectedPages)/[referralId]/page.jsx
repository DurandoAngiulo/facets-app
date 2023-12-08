import React from "react";

const Index = () => {
  //TODO: get the referral id from the url (userRouter) google get dynamic id from url
  //make page nonindexable (google how to do this with next.js)
  //verify that user with that referral id exists, if not, render specific error page based on case
  //check if more than 4 facets exist in refferal id user's list, if they do render no more can be added
  //render verifcation opener (asks guest user to verfiy before reponding to prompts)
  //verification process: if they dont exist, verify them and make a guest account, then allow them to make a facet
  //if they do exist, (guest or/member) check if they have a facet assccociated witht the freinds referral id
  //if they do, return that you cant make another one, if they don't allow them to make one

  return <div>referral Page</div>;
};

export default Index;
