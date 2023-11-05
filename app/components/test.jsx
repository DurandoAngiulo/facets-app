"use client";
import { db } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

async function test(db) {
  const citiesCol = collection(db, "userdata");
  const citySnapshot = await getDocs(citiesCol);
  //   console.log(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  console.log("success");
  console.log(cityList);
  return cityList;
}

function Testdata() {
  console.log("Component is rendering");
  useEffect(() => {
    // Your JavaScript function to run on page load
    // For example, you can call a function named "myFunction" here
    test(db);
  }, []); // Empty de
  return <p>yay</p>;
}

export default Testdata;
