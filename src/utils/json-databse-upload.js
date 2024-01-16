"use client";

import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Index = () => {
  const handleButtonClick = async () => {
    try {
      // New JSON data
      const jsonData = [];

      // Create a new collection in Firebase called "friendPrompts"
      const userPromptCollection = collection(db, "userPrompts");

      // Add each document to the collection with a manually specified ID
      jsonData.forEach(async (prompt, index) => {
        const docRef = doc(userPromptCollection, index.toString());
        await setDoc(docRef, prompt);
      });

      alert("FriendPrompts collection created successfully!");
    } catch (error) {
      console.error("Error creating friendPrompts collection:", error);
      alert("Error creating friendPrompts collection. Check the console for details.");
    }
  };

  return (
    <div>
      <h1>Friend Prompt Page</h1>
      <button onClick={handleButtonClick}>Create friendPrompts Collection</button>
    </div>
  );
};

export default Index;
