"use client";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import Icon from "@/components/Icon";
import { useAuth } from "@/context/AuthContext";
import ImageUploadInput from "@/components/ImageUploadInput/Index.jsx";
// import { getPhoto } from "@/services/image-service.js";
import { useState, useEffect } from "react";

const Index = () => {
  const [image, setImage] = useState();
  const { currentUser } = useAuth();
  console.log("test");
  useEffect(() => {
    const fetchPhoto = async (media) => {
      console.log("testtest");
      try {
        const photo = await getPhoto(media);
        let photoResult = photo;
        setImage(photoResult);
      } catch (error) {
        console.error("Failed to fetch photo", error);
      }
    };
    fetchPhoto(currentUser?.profile?.personalFacet[0]?.photos[0].path);
  }, [currentUser]);
  return (
    <div>
      <h1>Test page</h1>

      <ImageUploadInput />
      <img src={image} />
    </div>
  );
};

export default Index;
