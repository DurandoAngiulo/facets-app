"use client";
import { db } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

async function test(db) {
  const userCollection = collection(db, "userdata");
  const collectionSnapshot = await getDocs(userCollection);
  //   console.log(citiesCol);
  const collectionItems = collectionSnapshot.docs.map((doc) => doc.data());
  console.log("success");
  console.log(collectionItems);
  return collectionItems;
}

function Testdata() {
  console.log("Component is rendering");
  useEffect(() => {
    test(db);
  }, []); // Empty de
  return <p>database test</p>;
}

export default Testdata;
