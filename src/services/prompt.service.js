import { doc, getDoc, getDocs, setDoc, updateDoc, collection, where, query, limit } from "firebase/firestore";
import FIREBASE from "@/constants/firebase";
import { db } from "@/lib/firebase";

async function getPrompts() {
  const collectionRef = collection(db, FIREBASE.COLLECTIONS.PROMPTS);
  const querySnapshot = await getDocs(collectionRef);

  let prompts = [];

  querySnapshot.forEach((doc) => {
    prompts.push({ id: doc.id, ...doc.data() });
  });

  return {
    data: prompts,
    loading: false,
    error: false
  };
}

async function getRandomPrompts(limit = 3) {
  const { data: prompts } = await getPrompts();
  const totalPrompts = prompts.length;

  const uniquePromptIds = new Set();

  while (uniquePromptIds.size < limit && uniquePromptIds.size < totalPrompts) {
    const randomIndex = Math.floor(Math.random() * totalPrompts);
    uniquePromptIds.add(prompts[randomIndex].id);
  }
  const randomPrompts = Array.from(uniquePromptIds).map((id) => prompts.find((prompt) => prompt.id === id));
  // Return the random prompts based on their ids
  return randomPrompts;
}

export { getRandomPrompts };
