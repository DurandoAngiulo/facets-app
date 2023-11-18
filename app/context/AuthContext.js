'use client'

import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "@/lib/firebase";
import { getProfileById } from "@/services/profile-service";
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
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches the current user's profile and merges it with the currentUser state.
   * @param {string} uid - The UID of the user.
   */
  const fetchAndSetUserProfile = async (uid) => {
    try {
      const profileResult = await getProfileById(uid);
      const profileData = profileResult?.data?.data;
      if (profileData) {
        setCurrentUser(prevUser => ({ ...prevUser, profile: profileData }));
      }
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
  const registerAndLogin = async (auth, phoneNumber, appVerifier) => {
    try {
      setLoading(true);
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      const code = window.prompt("Enter the verification code sent to your phone:");
      const { user } = await confirmationResult.confirm(code);
      setCurrentUser(user);
      await fetchAndSetUserProfile(user.uid);

      setLoading(false);
      return {
        data: {
          user,
          profile: currentUserProfile // Remove if not needed when calling this function
        },
        loading: false,
        error: false,
      };
    } catch (error) {
      setLoading(false);
      return {
        data: { message: `User could not sign in (bad verification code?)` },
        loading: false,
        error: true,
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
        setCurrentUser(user); // Set the user
        await fetchAndSetUserProfile(user.uid); // Fetch and set user profile
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
