import { collection, getDocs } from "firebase/firestore";

import { db } from "@/lib/firebase";

/**
 *
 * @param {*} promptTable
 * @param {*} [filteredPromptIds=[]] - Array of prompt ids (Strings) to filteredPromptIds
 * @return {*}
 */
async function getPrompts(promptTable, filteredPromptIds = []) {
  const collectionRef = collection(db, promptTable);
  const querySnapshot = await getDocs(collectionRef);

  let prompts = [];

  querySnapshot.forEach((doc) => {
    if (filteredPromptIds.length > 0) {
      prompts = filteredPromptIds.includes(doc.id) ? [...prompts, { id: doc.id, ...doc.data() }] : prompts;
    } else {
      prompts.push({ id: doc.id, ...doc.data() });
    }
  });

  return {
    data: prompts,
    loading: false,
    error: false
  };
}

async function getRandomPrompts(promptTable, limit = 3) {
  const { data: prompts } = await getPrompts(promptTable);
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

export { getPrompts, getRandomPrompts };
