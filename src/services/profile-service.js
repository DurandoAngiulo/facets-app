import { collection, doc, getDoc, getDocs, limit, query, setDoc, updateDoc, where } from "firebase/firestore";

import FIREBASE from "@/constants/firebase";
import { PROFILE_MODEL } from "@/constants/model";
import { db } from "@/lib/firebase";
import { generateUniqueUid } from "@/utils/util-functions";

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
      occupation: "",
      bio: "",
      moreDetails: {
        sexuality: "",
        jobTitle: "",
        school: "",
        hometown: "",
        smoking: "",
        drinking: "",
        mbti: "",
        astrologicalSign: "",
        height: "",
        religion: "",
        politicalAffiliation: ""
      },
      personalFacet: [
        {
          responses: [
            { prompt_id: "", response: "" },
            { prompt_id: "", response: "" },
            { prompt_id: "", response: "" }
          ]
        }
      ],
      friendFacets: []
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

const updateFacet = async (profile, profileFields) => {
  const newFields = {
    ...profile,
    ...profileFields
  };
  try {
    await updateDoc(doc(db, FIREBASE.COLLECTIONS.PROFILES, profile.uid), newFields);
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
    const referralID = generateUniqueUid();
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

/**
 * Retrieves a user by their referral ID.
 * @param {string} referralId - The referral ID to search for.
 * @returns {object|null} The user profile data object if found, otherwise null.
 */
const getUserByReferralId = async (referralId) => {
  try {
    const collectionRef = collection(db, FIREBASE.COLLECTIONS.PROFILES);
    const q = query(collectionRef, where("referralID", "==", referralId), limit(1));

    // Execute the query
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No document found with the given referralId.");
      return null;
    }

    // Assuming there's only one document due to the limit(1) in the query
    const doc = querySnapshot.docs[0];
    const userData = doc.data();
    userData.uid = doc.id; // Add the UID to the user data object

    return userData;
  } catch (error) {
    console.error("Error retrieving user by referral ID:", error);
    return null;
  }
};

const getProfiles = async (referralId) => {
  try {
    const collectionRef = collection(db, FIREBASE.COLLECTIONS.PROFILES);
    const q = query(collectionRef, where("referralID", "!=", referralId), where("role", "==", "member"));

    // Execute the query
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No profile found");
      return [];
    }

    // Extract data from each document in the querySnapshot
    const profiles = [];
    querySnapshot.forEach((doc) => {
      profiles.push({
        id: doc.id,
        ...doc.data()
      });
    });
    // console.log(profiles);
    return profiles;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    // You might want to handle the error in a more appropriate way for your application
    throw error;
  }
};

export {
  createGuestProfile,
  createProfile,
  getProfileById,
  getProfiles,
  getUserByReferralId,
  referralIdValidation,
  updateFacet,
  updateProfile
};
