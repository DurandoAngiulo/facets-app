"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../lib/firebase";

const FirestoreContext = createContext();

export function FirestoreProvider({ children }) {
  const [collections, setCollections] = useState([]);

  // useEffect(() => {
  //   const fetchCollections = async () => {
  //     try {
  //       const collectionRefs = await db.listCollections();

  //       const collectionNames = collectionRefs.map(
  //         (collection) => collection.id
  //       );

  //       setCollections(collectionNames);
  //     } catch (error) {
  //       console.error("Error fetching Firestore collections:", error);
  //     }
  //   };

  //   fetchCollections();
  // }, []);

  return (
    <FirestoreContext.Provider value={collections}>
      {children}
    </FirestoreContext.Provider>
  );
}

export function useFirestoreCollections() {
  return useContext(FirestoreContext);
}
