"use client";
// pages/index.js
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Index = () => {
  return (
    <div>
      <h1>Test page</h1>
      <p>use this as a playground to test components/styling</p>
    </div>
  );
};

export default Index;
