import "firebase/auth";

import { createProfile, getProfileById } from "@/services/profile-service";
import { RecaptchaVerifier, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const { registerAndLogin, currentUser } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("+12676256168");
  const [error, setError] = useState(null);

  const auth = getAuth();
  const recaptchaButtonId = "sign-in-button";
  const router = useRouter();

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

      const { data, loading, error } = await registerAndLogin(auth, phoneNumber, window.recaptchaVerifier);

      if (error) {
        console.log(data.message);
        return;
      }
      // redirect user if login was successful?

      const user = data.user;
      // console.log("user is logged in and already exists", user);
      const { data: profileData } = await getProfileById(user.uid);
      console.log(profileData);
      if (profileData.data) {
        router.push(`${ROUTES.DASHBOARD.path}/feed`);
        return;
      }
      // return;
      const { error: newProfileError } = await createProfile(user.uid);

      if (newProfileError) {
        console.error("Error making new profile:", error);
        return;
      }

      router.push(`${ROUTES.ONBOARDING.path}/profile-creation`);

      //redirect to profile creation flow
    } catch (error) {
      // Log the entire error object for debugging
      console.error("Error during sign in:", error);

      // Set a user-friendly error message
      setError("Error during sign in. Check console for details.");
    }
  };

  return (
    <div className="">
      <label>
        Phone Number:
        <input
          type="tel"
          className="text-black border-solid border-2 border-red-500 "
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <button id={recaptchaButtonId} onClick={() => handleSignInRegisterAuth()}>
        Sign In
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignUpForm;
