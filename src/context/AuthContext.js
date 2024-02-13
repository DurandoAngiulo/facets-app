"use client";

import { createProfile, getProfileById } from "@/services/profile-service";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "@/lib/firebase";
import { signInWithPhoneNumber } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * Provides context for authentication and user profile management.
 * @param {object} props - Component props containing children nodes.
 * @returns {JSX.Element} Context Provider component.
 */
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * This function is designed to be used when there's a need to reflect changes
   * made to the user's profile data immediately within the application's context.
   * For instance, it can be utilized after a user updates their profile
   * information through a form and the server returns the updated profile data.
   *
   * @param {Object} profileData - The new profile data for the current user.
   * This should contain the updated fields of the user's profile.
   *
   * @example
   * const handleProfileUpdate = async (newProfileData) => {
   *   const updatedData = await sendProfileUpdateToServer(newProfileData);
   *   if (updatedData) {
   *     updateUserProfile(updatedData);
   *   }
   * }
   *
   */
  const updateUserProfile = async (profileData) => {
    if (currentUser && profileData) {
      const updatedUser = { ...currentUser, profile: profileData };
      await setCurrentUser(updatedUser);
    }
  };

  /**
   * Fetches the current user's profile and merges it with the currentUser state.
   * @param {object} user - The user object
   */
  const fetchAndSetUserProfile = async (user, isGuest) => {
    try {
      const uid = user.uid;
      const profileResult = await getProfileById(uid);
      let profileData = profileResult?.data?.data;

      if (!profileData) {
        const { data } = await createProfile(uid, isGuest);
        profileData = data?.profile;
      }

      // Create an updated user object with profile data
      const updatedUser = { ...user, profile: profileData };
      await setCurrentUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  /**
   * Registers and logs in a user using their phone number.
   * @param {firebase.auth.Auth} auth - The Firebase auth object.
   * @param {string} phoneNumber - The user's phone number.
   * @param {firebase.auth.ApplicationVerifier} appVerifier - The app verifier for reCAPTCHA.
   * @returns {Promise<object>} An object containing user data and profile.
   */
  const registerAndLogin = async (auth, phoneNumber, appVerifier, isGuest = false) => {
    try {
      setLoading(true);
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      const code = window.prompt("Enter the verification code sent to your phone:");
      const { user } = await confirmationResult.confirm(code);
      const userWithProfile = await fetchAndSetUserProfile(user, isGuest);

      setLoading(false);
      return {
        data: { user: userWithProfile },
        loading: false,
        error: false
      };
    } catch (error) {
      setLoading(false);
      return {
        data: { message: `User could not sign in (bad verification code?)` },
        loading: false,
        error: true
      };
    }
  };

  /**
   * Logs out the current user.
   */
  const logout = () => {
    console.log("user logged out");
    return auth.signOut();
  };

  // Effect to automatically update the state on authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        await setCurrentUser(user); // Set the user
        await fetchAndSetUserProfile(user); // Fetch and set user profile
      } else {
        setCurrentUser(null); // Set current user to null if not authenticated
      }
      setLoading(false);
    });

    return unsubscribe; // Cleanup function to unsubscribe from the listener
  }, []);

  const value = {
    currentUser,
    registerAndLogin,
    loading,
    logout,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
