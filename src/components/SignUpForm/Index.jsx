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
import { PrimaryButton } from "@/components/Button/Index";
import Icon from "@/components/Icon";

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
        // setError("Please enter a valid phone number.");
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
    <div className={`p-5 border-opacity-100 text-center page padding`}>
      <div className="w-full h-4 relative mt-12">
        <Icon iconName="phone" className="w-full h-8 left-0 mb-4 absolute" />
      </div>
      <h1 className="text-primary my-8 ">First, enter your phone number.</h1>
      <p className="text-body">Facets will text you a verification code.</p>
      <div className="mt-5 font-['Arboria']">
        <PhoneInputGroup value={phoneNumber} onChange={setPhoneNumber} />
      </div>

      <div className="absolute px-1 bottom-16 left-0 right-0 flex justify-center ">
        <button
          className="w-full px-1"
          id={recaptchaButtonId}
          onClick={() => handleSignInRegisterAuth()}
          style={{ maxWidth: "420px" }}
        >
          <PrimaryButton active="true" label="Continue"></PrimaryButton>
        </button>
      </div>
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
};

export default SignUpForm;
