import "firebase/auth";

// import { createGuestProfile, getProfileById } from "@/services/profile-service";
import { RecaptchaVerifier, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

import ROUTES from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const ReferralPageVerifcation = ({ pageReferralId, setVerificationState }) => {
  const { registerAndLogin } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("+11234567899");
  const [error, setError] = useState(null);

  const auth = getAuth();
  const recaptchaButtonId = "verfiy-button";

  useEffect(() => {
    // Create a new RecaptchaVerifier with invisible size
    window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaButtonId, {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        handleRegisterGuestUser();
      }
    });
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleRegisterGuestUser = async () => {
    try {
      // Validate phone number
      if (!phoneNumber) {
        setError("Please enter a valid phone number.");
        return;
      }

      const { data, loading, error } = await registerAndLogin(auth, phoneNumber, window.recaptchaVerifier, true);

      if (error) {
        console.log(data.message);
        return;
      }

      const user = data.user;
      const profileData = user?.profile;
      // console.log("user is logged in and already exists", user);
      if (profileData) {
        if (profileData.referralID === pageReferralId) {
          return <p>You cannot edit your own facte</p>;
        }
        if (profileData.friendFacets.some((facet) => facet.respondantUserId === pageReferralId)) {
          return <p>You already inputted a respond for this friend`&apos;`s facet</p>;
        }
        //otherwise route them/render friend facet creation screen
        setVerificationState(true);
        return;
      }

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
      <p>verify you are human</p>
      <label>
        Phone Number:
        <input
          type="tel"
          className="text-black border-solid border-2 border-red-500 "
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <button id={recaptchaButtonId} onClick={() => handleRegisterGuestUser()}>
        Verify
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ReferralPageVerifcation;
