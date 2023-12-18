import { doc, getDoc, getDocs, setDoc, updateDoc, collection, where, query, limit } from "firebase/firestore";

import FIREBASE from "@/constants/firebase";
import { PROFILE_MODEL } from "@/constants/model";
import { db } from "@/lib/firebase";

const getProfileById = async (userUID) => {
  const docRef = doc(db, FIREBASE.COLLECTIONS.PROFILES, userUID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      data: { data: docSnap.data() },
      loading: false,
      error: false
    };
  }
  return {
    data: { data: null },
    loading: false,
    error: false
  };
};

const createProfile = async (userUID, isGuest) => {
  try {
    const profileFields = {
      role: isGuest ? PROFILE_MODEL.roles[2] : PROFILE_MODEL.roles[1],
      referralID: generateUniqueUid(),
      onboardingStatus: PROFILE_MODEL.onboardingStatus[0],
      onboardingStep: 0,
      firstName: "",
      birthday: "",
      gender: "",
      pronouns: "",
      datingPreference: "",
      ageRange: "",
      location: "",
      personalFacet: [],
      friendFacets: [
        {
          responses: [
            { prompt_id: "", response: "" },
            { prompt_id: "", response: "" },
            { prompt_id: "", response: "" }
          ],
          friendshipPeriod: "",
          last_updated: "",
          createdAt: "",
          respondantUserId: ""
        }
      ]
    };

    await setDoc(doc(db, FIREBASE.COLLECTIONS.PROFILES, userUID), profileFields);

    return {
      data: { profile: profileFields },
      loading: false,
      error: false
    };
  } catch (error) {
    return {
      data: { message: `Error writing document ${error}` },
      loading: false,
      error: true
    };
  }
};

const updateProfile = async (user, profileFields) => {
  const userProfile = user.profile;
  try {
    await updateDoc(doc(db, FIREBASE.COLLECTIONS.PROFILES, user.uid), {
      ...userProfile,
      ...profileFields
    });
    return {
      data: {
        message: `profile successfully updated`,
        profile: profileFields
      },
      loading: false,
      error: false
    };
  } catch (error) {
    return {
      data: { message: `Error updating profile ${error}` },
      loading: false,
      error: true
    };
  }
};

const referralIdValidation = async (referralId) => {
  console.log(referralId);
  try {
    const collectionRef = collection(db, FIREBASE.COLLECTIONS.PROFILES);
    const q = query(collectionRef, where("referralID", "==", referralId), limit(1));
    const querySnapshot = await getDocs(q);

    let referral = null;

    querySnapshot.forEach((doc) => {
      referral = doc.data();
    });

    return {
      data: referral,
      loading: false,
      error: false
    };
  } catch (error) {
    console.error("Error searching for referralID:", error);
    // throw error;
  }
};

//create guest profile function

const createGuestProfile = async (userUID) => {
  try {
    const referralID = 5;
    //TODO figure out referralID logic
    await setDoc(doc(db, FIREBASE.COLLECTIONS.PROFILES, userUID), {
      role: PROFILE_MODEL.roles[2],
      referralID: referralID
    });

    return {
      data: { message: `Document successfully written!` },
      loading: false,
      error: false
    };
  } catch (error) {
    return {
      data: { message: `Error writing document ${error}` },
      loading: false,
      error: true
    };
  }
};

export { createProfile, getProfileById, updateProfile, referralIdValidation, createGuestProfile };
