"use client";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Icon from "@/components/Icon";
import ImageUploadInput from "@/components/ImageUploadInput/Index.jsx";

const Index = () => {
  return (
    <div>
      <h1>Test page</h1>
      <ImageUploadInput />
    </div>
  );
};

export default Index;
