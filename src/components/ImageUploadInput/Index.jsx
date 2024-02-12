import { useState, useEffect } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { useAuth } from "@/context/AuthContext";

const ImageUploadInput = () => {
  const { currentUser } = useAuth();
  const [imageUploads, setImageUploads] = useState([]); // State to hold multiple uploaded files
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadedCount, setUploadedCount] = useState(0); // Track the number of uploaded photos
  const [previewUrls, setPreviewUrls] = useState([]); // State to hold preview image URLs

  const handleFileChange = (event) => {
    const files = event.target.files;
    setImageUploads([...files]); // Store multiple files in state
    setPreviewUrls([]); // Clear previous preview URLs
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrls((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadImages = () => {
    if (imageUploads.length === 0) return;
    imageUploads.forEach((file) => {
      const imageRef = ref(storage, `userPhotos/${currentUser.uid}/personalFacetPhotos/${file.name}`);
      uploadBytes(imageRef, file).then(() => {
        setUploadedCount((prevCount) => prevCount + 1); // Increment uploaded count
        alert("Image uploaded");
      });
    });
  };

  const imagesListRef = ref(storage, `userPhotos/${currentUser?.uid}/personalFacetPhotos/`);
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

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
          <img
            key={index}
            src={url}
            alt={`Uploaded ${index}`}
            style={{ width: "100px", height: "100px", margin: "5px" }}
          />
        ))}
      </div>
      <button disabled={!canSubmit} onClick={uploadImages}>
        Upload Images
      </button>
      {imageUrls.map((url, index) => {
        return <img key={index} src={url} alt={`Uploaded ${index}`} />;
      })}
    </div>
  );
};

export default ImageUploadInput;
