import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

import FIREBASE from "@/constants/firebase";
import { db } from "@/lib/firebase";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// TODO: Move to service and look into query to order by random and limit by 3. Have 3 be an arugment you pass and maybe you can default to 3
async function getRandomPrompts(limit = 3, random = false) {
  const collectionRef = collection(db, FIREBASE.COLLECTIONS.USERPROMPTS);
  const querySnapshot = await getDocs(collectionRef);
  const totalPrompts = querySnapshot.size;

  const uniquePromptIds = new Set();

  while (uniquePromptIds.size < 3) {
    const randomIndex = Math.floor(Math.random() * totalPrompts);
    const randomPrompt = querySnapshot.docs[randomIndex];
    const randomPromptId = randomPrompt.id;

    uniquePromptIds.add(randomPromptId);
  }
  const randomPrompts = Array.from(uniquePromptIds).map(async (promptId) => {
    const docRef = doc(collectionRef, promptId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      return {
        id: docSnapshot.id,
        ...data
      };
    } else {
      return null;
    }
  });
  const resolvedPrompts = await Promise.all(randomPrompts);
  return resolvedPrompts.filter((prompt) => prompt !== null);
}

const generateUniqueUid = () => {
  const timestamp = serverTimestamp().seconds.toString();
  const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
  const uniqueUid = timestamp + randomDigits;
  return uniqueUid;
};

//TODO: make referralid generator function again

export { capitalizeFirstLetter, getRandomPrompts, generateUniqueUid };
