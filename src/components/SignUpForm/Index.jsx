"use client";

import "firebase/auth";

import { RecaptchaVerifier, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

import { PhoneInputGroup } from "@/components/Inputs";
import { PROFILE_MODEL } from "@/constants/model";
import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

const SignUpForm = () => {
  const { registerAndLogin, currentUser } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState();
  const [error, setError] = useState(null);

  const auth = getAuth();
  const recaptchaButtonId = "sign-in-button";
  const router = useRouter();

  // https://firebase.google.com/docs/auth/web/phone-auth
  useEffect(() => {
    // Create a new RecaptchaVerifier with invisible size
    window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaButtonId, {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        handleSignInRegisterAuth();
      }
    });
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleSignInRegisterAuth = async () => {
    try {
      // Validate phone number
      if (!phoneNumber) {
        setError("Please enter a valid phone number.");
        return;
      }

      const { data, error } = await registerAndLogin(auth, phoneNumber, window.recaptchaVerifier);

      if (error) {
        console.log(data.message);
        return;
      }

      const user = data?.user;
      if (!user?.profile) return;

      if (user.profile.onboardingStatus === PROFILE_MODEL.onboardingStatus[1]) {
        router.push(`${ROUTES.FEED.path}`);
        return;
      }

      router.push(`${ROUTES.PROFILE_CREATION.path}`);

      //redirect to profile creation flow
    } catch (error) {
      // Log the entire error object for debugging
      console.error("Error during sign in:", error);

      // Set a user-friendly error message
      setError("Error during sign in. Check console for details.");
    }
  };

  return (
    <div className={`p-5 border-4 border-opacity-100 text-center ${styles.testBorderColor}`}>
      <h2 className="text-primary">First, enter your phone number.</h2>
      <p>Facets will text you a verification code.</p>
      <div className="mt-5">
        <PhoneInputGroup value={phoneNumber} onChange={setPhoneNumber} />
      </div>
      <button
        className="mt-5 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-600"
        id={recaptchaButtonId}
        onClick={() => handleSignInRegisterAuth()}
      >
        Sign In
      </button>
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
};

export default SignUpForm;
