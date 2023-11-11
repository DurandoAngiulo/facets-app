import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useState, useEffect } from "react";
import "firebase/auth";
import { useAuth } from "@/context/AuthContext";

const SignInForm = () => {
  const { registerAndLogin, currentUser } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const auth = getAuth();
  const recaptchaButtonId = "sign-in-button";

  useEffect(() => {
    // Create a new RecaptchaVerifier with invisible size
    window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaButtonId, {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        handleSignInRegisterAuth();
      },
    });
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleSignInRegisterAuth = async () => {
    try {
      // Validate phone number
      if (!phoneNumber) {
        setError("Please enter a valid phone number.");
        return;
      }

      const { data, loading, error } = await registerAndLogin(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );

      if (error) {
        console.log(data.message);
        return;
      }
      // redirect user if login was successful?

      const user = data.user;
      console.log("user is logged in", user);

      // Send the verification code to the user's phone
      // const confirmationResult = await signInWithPhoneNumber(
      //   auth,
      //   phoneNumber,
      //   window.recaptchaVerifier // Access the recaptchaVerifier from the global window object
      // );

      // // Prompt the user to enter the verification code
      // const code = window.prompt(
      //   "Enter the verification code sent to your phone:"
      // );

      // if (code) {
      //   // Confirm the verification code
      //   await confirmationResult.confirm(code);

      //   // User signed in successfully
      //   console.log("User signed in successfully");
      //   ``;
      // } else {
      //   // Handle case where the user canceled entering the code
      //   setError("Verification code entry canceled.");
      // }
    } catch (error) {
      // Log the entire error object for debugging
      console.error("Error during sign in:", error);

      // Set a user-friendly error message
      setError("Error during sign in. Check console for details.");
    }
  };

  return (
    <div>
      <label>
        Phone Number:
        <input
          type="tel"
          className="text-black"
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

export default SignInForm;
