import { ref, uploadBytes } from "firebase/storage";

import { useAuth } from "@/context/AuthContext";
import { storage } from "@/lib/firebase";
import { updateProfile } from "@/services/profile-service";
import { useState } from "react";

const ImageUploadInput = ({ refPath, mainProfile = null }) => {
  const { currentUser } = useAuth();
  const [imageUploads, setImageUploads] = useState([]); // State to hold multiple uploaded files
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadedCount, setUploadedCount] = useState(0); // Track the number of uploaded photos
  const [previewUrls, setPreviewUrls] = useState(Array.from({ length: 4 })); // Initialize with 4 empty placeholders
  const photoPath =
    refPath === "personal"
      ? `${currentUser.uid}/personalFacetPhotos/`
      : `${mainProfile?.uid}/friendFacetPhotos/${currentUser?.uid}/`;

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

  const uploadToFirebase = async () => {
    const uploadPromises = imageUploads.map((file, index) => {
      const imageRef = ref(storage, `userPhotos${photoPath}${file.name}`);
      return uploadBytes(imageRef, file).then(() => {
        setUploadedCount((prevCount) => prevCount + 1); // Increment uploaded count
        return { order: index + 1, path: imageRef._location.path_ }; // Return image data
      });
    });

    // Wait for all images to be uploaded
    const imageArray = await Promise.all(uploadPromises);
    return imageArray;
  };

  const uploadImages = async () => {
    if (imageUploads.length === 0) return;

    const imageArray = await uploadToFirebase();

    // alert("images uploaded");
    // console.log(imageArray, "imageArray");

    //////
    if (!mainProfile) {
      const updatedPersonalFacets = [...currentUser.profile.personalFacet];

      // Set the photos array of the first element to the uploaded images
      updatedPersonalFacets[0] = {
        ...updatedPersonalFacets[0],
        photos: imageArray
      };

      console.log(updatedPersonalFacets, "updatedPersonalFacets");

      // Update the profile with the new personalFacets
      await updateProfile(currentUser, {
        personalFacet: updatedPersonalFacets
      });
    } else {
      const updatedFriendFacets = [...mainProfile.friendFacets];
      // Find the friend facet whose respondantUserId matches mainProfile.uid
      console.log(updatedFriendFacets, "updated friendFactes");
      const friendFacetToUpdate = updatedFriendFacets.find(
        (friendFacet) => friendFacet.respondantUserId === currentUser.uid
      );
      if (friendFacetToUpdate) {
        // Update the photos array of the found friend facet
        friendFacetToUpdate.photos = imageArray;

        // Update the profile with the new friendFacets
        await updateProfile(mainProfile, {
          friendFacets: updatedFriendFacets
        });
        console.log("succcesfully uplaoded photos to firestore");
      } else {
        // Handle the case where no friend facet matches mainProfile.uid
        console.log("No friend facet found with matching respondantUserId.");
      }
    }
  };

  const canSubmit = uploadedCount + imageUploads.length >= 4; // Check if 4 photos are uploaded or selected
  console.log(mainProfile);
  console.log(currentUser);

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
