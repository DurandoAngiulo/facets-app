const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const generateUniqueUid = () => {
  // const timestamp = serverTimestamp().seconds.toString();
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
  //TODO: Add random letter in combination
  const uniqueUid = timestamp + randomDigits;
  return uniqueUid;
};

function replaceNameInString(inputString, userName = null) {
  if (!inputString || !userName) return inputString;

  const replacedString = inputString.replace(/\[Name\]/g, userName);
  return replacedString;
}

const getReferralLink = (id) => {
  const baseUrl = process.env.NODE_ENV === "production" ? "https://facets-app.vercel.app" : "http://localhost:3000";

  return `${baseUrl}/referrals/${id}`;
};

const calculateAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  // If the birth month has not occurred yet in the current year,
  // or if the birth month is occurring in the current month but the birth day hasn't passed yet,
  // subtract one year from the age.
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const extractIdFromUrl = (url) => {
  const parts = url.split("/");
  const idIndex = parts.indexOf("profile") + 1; // Get the index of 'profile' and add 1 to get the index of ID
  return parts[idIndex];
};

const extractFieldFromUrl = (url) => {
  const parts = url.split("/");

  const name = parts[parts.length - 1];

  return name;
};

export {
  calculateAge,
  capitalizeFirstLetter,
  extractFieldFromUrl,
  extractIdFromUrl,
  generateUniqueUid,
  getReferralLink,
  replaceNameInString
};
