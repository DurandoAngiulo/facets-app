import { getDownloadURL, getStorage, ref } from "firebase/storage";

const updatePhotoOrder = (photos, currentOrder, newOrder) => {
  // Check if the current order and new order are within the bounds of the photos array
  if (currentOrder <= 0 || currentOrder > photos.length || newOrder <= 0 || newOrder > photos.length) {
    console.error("Order numbers are out of bounds.");
    return photos;
  }

  // Find the photo with the current order
  const photoToMove = photos.find((photo) => photo.order === currentOrder);
  if (!photoToMove) {
    console.error("Photo with the current order not found.");
    return photos;
  }

  // Create a new array without the photo to move
  const remainingPhotos = photos.filter((photo) => photo.order !== currentOrder);

  // Insert the photo to move at the new order position
  remainingPhotos.splice(newOrder - 1, 0, photoToMove);

  // Update the order numbers for all photos
  const newSortedPhotos = remainingPhotos.map((photo, index) => ({
    ...photo,
    order: index + 1 // Update the order to the new index + 1
  }));

  // TODO: Update the order numbers for all photos via firebase?
  return newSortedPhotos;
};

/**
 * Retrieves a download URL for a single photo from Firebase storage.
 * @param {string} path - The path to the photo in Firebase storage.
 * @returns {Promise<string>} A promise that resolves to the download URL.
 */
const getPhotoURL = async (path) => {
  const storage = getStorage();
  const photoRef = ref(storage, path);

  try {
    const url = await getDownloadURL(photoRef);
    return url;
  } catch (error) {
    console.error("Failed to get download URL", error);
    throw error;
  }
};

/**
 * Retrieves download URLs for an array of photos from Firebase storage.
 * @param {Array<{ order: number; path: string; }>} photos - An array of objects with order and path to the photos in Firebase storage.
 * @returns {Promise<Array<{ order: number; url: string; }>>} A promise that resolves to an array of objects with order and download URLs.
 */
const getFacetPhotoUrls = async (photos) => {
  return Promise.all(
    photos.map(async (photo) => {
      const url = await getPhotoURL(photo.path);
      return { order: photo.order, url };
    })
  );
};

export { getFacetPhotoUrls, getPhotoURL, updatePhotoOrder };
