import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import FIREBASE from "@/constants/firebase";
import { db } from "@/lib/firebase";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const collectionRef = collection(db, FIREBASE.COLLECTIONS.USERPROMPTS);

async function getRandomPrompts() {
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
        ...data, // Include all fields and values from the document
      };
    } else {
      // Handle the case where the document doesn't exist
      return null;
    }
  });

  const resolvedPrompts = await Promise.all(randomPrompts);
  // console.log(resolvedPrompts);
  return resolvedPrompts.filter((prompt) => prompt !== null);
}

export { capitalizeFirstLetter, getRandomPrompts };
