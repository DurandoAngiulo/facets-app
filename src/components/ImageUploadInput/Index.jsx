import { useState, useEffect } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/services/profile-service";

const ImageUploadInput = () => {
  const { currentUser } = useAuth();
  const [imageUploads, setImageUploads] = useState([]); // State to hold multiple uploaded files
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadedCount, setUploadedCount] = useState(0); // Track the number of uploaded photos
  const [previewUrls, setPreviewUrls] = useState(Array.from({ length: 4 })); // Initialize with 4 empty placeholders
  console.log(currentUser);
  const handleFileChange = (event) => {
    const files = event.target.files;
    setImageUploads([...files]); // Store multiple files in state
    const newPreviewUrls = Array.from({ length: 4 }).map(() => ""); // Initialize placeholders
    setPreviewUrls(newPreviewUrls);
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviewUrls[index] = e.target.result; // Replace placeholders with actual preview URLs
        setPreviewUrls([...newPreviewUrls]);
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadImages = async () => {
    if (imageUploads.length === 0) return;

    const imageArray = [];

    await imageUploads.forEach((file, index) => {
      const imageRef = ref(storage, `userPhotos/${currentUser.uid}/personalFacetPhotos/${file.name}`);
      uploadBytes(imageRef, file).then(() => {
        setUploadedCount((prevCount) => prevCount + 1); // Increment uploaded count
        imageArray.push({ order: index + 1, path: imageRef._location.path_ });
      });
    });
    alert("images uploaded");

    console.log(imageArray, "imageArray");
    // Clone the current personalFacets
    const updatedPersonalFacets = [...currentUser.profile.personalFacet];

    // Set the photos array of the first element to empty, while preserving responses
    updatedPersonalFacets[0] = {
      ...updatedPersonalFacets[0],
      photosssss: imageArray,
      slakfjda: [...imageArray]
    };
    console.log(updatedPersonalFacets, "updatedPersonalFacets");

    const test = await updateProfile(currentUser, {
      personalFacet: updatedPersonalFacets
    });
    console.log(test, "test");
  };

  //   const imagesListRef = ref(storage, `userPhotos/${currentUser?.uid}/personalFacetPhotos/john.png`);
  //   useEffect(() => {
  //     listAll(imagesListRef).then((response) => {
  //       response.items.forEach((item) => {
  //         getDownloadURL(item).then((url) => {
  //           setImageUrls((prev) => [...prev, url]);
  //         });
  //       });
  //     });
  //   }, []);

  const canSubmit = uploadedCount + imageUploads.length >= 4; // Check if 4 photos are uploaded or selected

  return (
    <div>
      <input
        type="file"
        multiple // Allow multiple file selection
        onChange={handleFileChange}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {previewUrls.map((url, index) => (
          <div
            key={index}
            style={{
              width: "100px",
              height: "100px",
              margin: "5px",
              backgroundColor: url ? "white" : "lightgrey",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {url ? (
              <img src={url} alt={`Uploaded ${index}`} style={{ maxWidth: "100%", maxHeight: "100%" }} />
            ) : (
              "Empty"
            )}
          </div>
        ))}
      </div>
      <button disabled={!canSubmit} onClick={uploadImages}>
        Upload Images
      </button>
    </div>
  );
};

export default ImageUploadInput;
