import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import FIREBASE from "@/constants/firebase";
import { db } from "@/lib/firebase";
import { PROFILE_MODEL } from "@/constants/model";
const getProfileById = async (userUID) => {
  const docRef = doc(db, FIREBASE.COLLECTIONS.PROFILES, userUID);
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
    const referralID = 0;
    //TODO figure out referralID logic
    await setDoc(doc(db, FIREBASE.COLLECTIONS.PROFILES, userUID), {
      role: PROFILE_MODEL.roles[1],
      referralID: referralID,
      onboardingStatus: PROFILE_MODEL.onboardingStatus[0],
      onboardingStep: "0",
      firstName: "",
      birthday: "",
      gender: "",
      pronouns: "",
      datingPreference: "",
      ageRange: "",
      location: "",
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

const updateProfile = async (user, profileFields) => {
  const userProfile = user.profile;
  try {
    await updateDoc(doc(db, FIREBASE.COLLECTIONS.PROFILES, user.uid), {
      ...userProfile,
      ...profileFields,
    });
    return {
      data: {
        message: `profile successfully updated`,
        profile: profileFields,
      },
      loading: false,
      error: false,
    };
  } catch (error) {
    return {
      data: { message: `Error updating profile ${error}` },
      loading: false,
      error: true,
    };
  }
};

export { createProfile, getProfileById, updateProfile };
