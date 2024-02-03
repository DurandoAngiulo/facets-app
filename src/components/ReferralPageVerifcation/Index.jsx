import "firebase/auth";

import { RecaptchaVerifier, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

import ROUTES from "@/constants/routes";
import { getUserByReferralId } from "@/services/profile-service";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const ReferralPageVerifcation = ({ pageReferralId, setVerificationState }) => {
  const { registerAndLogin } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("+11234567899");
  const [error, setError] = useState(null);
  const [template, setTemplate] = useState("");

  const [facetOwner, setFacetOwner] = useState(null);
  const [guestUserProfile, setGuestProfile] = useState(null);

  const auth = getAuth();
  const recaptchaButtonId = "verfiy-button";

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
      profileData.uid = user.uid;
      setGuestProfile(profileData);

      //redirect to profile creation flow
    } catch (error) {
      // Log the entire error object for debugging
      console.error("Error during sign in:", error);

      // Set a user-friendly error message
      setError("Error during sign in. Check console for details.");
    }
  };

  const validateUser = () => {
    console.log("run");
    if (!guestUserProfile) return;

    if (guestUserProfile) {
      if (guestUserProfile.referralID === pageReferralId) {
        setTemplate("own");
        return;
      }
      console.log(facetOwner.friendFacets, "facet owner");
      if (facetOwner?.friendFacets?.some((facet) => facet.respondantUserId === guestUserProfile.uid)) {
        setTemplate("already");
        return;
      }

      //otherwise route them/render friend facet creation screen
      setVerificationState(true);
      return;
    }
  };

  const renderPage = () => {
    if (template === "own") {
      return <p>You cannot edit your own facet</p>;
    } else if (template === "already") {
      return <p>You already inputted a respond for this friend&apos;s facet</p>;
    }

    // check state to see which markup to render
    return (
      <div className="">
        <h1>Text explaining facets and whats gonna happen</h1>
        <p>
          the rest of this page below will be hidden until the continue button is pressehis page below will be hidden
          until the continue button is pressed
        </p>
        <p>Then the rest of the verifcation page will translate in and the header will translate out</p>
        <p>{facetOwner?.firstName}</p>
        <h3></h3>
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

  useEffect(() => {
    // Create a new RecaptchaVerifier with invisible size
    window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaButtonId, {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        handleRegisterGuestUser();
      }
    });
    const fetchData = async () => {
      try {
        const userFacet = await getUserByReferralId(pageReferralId); // Replace 'yourReferralId' with the actual value
        // console.log(userFacet); // Log the fetched data
        setFacetOwner(userFacet); // Update the state with the fetched data
        console.log(facetOwner);
      } catch (error) {
        console.error("Error fetching facet owner:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // TODO: WHY YOU RENDER ON FIRST LOAD
    if (!facetOwner && !guestUserProfile) {
      return;
    }

    validateUser();
  }, [facetOwner, guestUserProfile]);

  return renderPage();
};

export default ReferralPageVerifcation;
