import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import FIREBASE from "@/constants/firebase";

const getProfileById = async (documentId) => {
  const docRef = doc(db, FIREBASE.COLLECTIONS.PROFILES, documentId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      data: { data: docSnap.data() },
      loading: false,
      error: false,
    };
  }
  return {
    data: { data: null },
    loading: false,
    error: false,
  };
};

const createProfile = async (userUID) => {
  try {
    await setDoc(doc(db, FIREBASE.COLLECTIONS.PROFILES, userUID), {
      role: "member",
      status: "inProgress",
    });
    return {
      data: { message: `Document successfully written!` },
      loading: false,
      error: false,
    };
  } catch (error) {
    return {
      data: { message: `Error writing document ${error}` },
      loading: false,
      error: true,
    };
  }
};

export { getProfileById, createProfile };
