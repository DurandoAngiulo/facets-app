import { serverTimestamp } from "firebase/firestore";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const generateUniqueUid = () => {
  // const timestamp = serverTimestamp().seconds.toString();
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
  const uniqueUid = timestamp + randomDigits;
  return uniqueUid;
};

export { capitalizeFirstLetter, generateUniqueUid };
