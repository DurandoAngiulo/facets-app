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

export { updatePhotoOrder };
