"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPhoneNumber } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  /**
   * TODO: what does this do
   * @link https://firebase.google.com/docs/auth/web/phone-auth#send-a-verification-code-to-the-users-phone
   */
  const registerAndLogin = async (auth, phoneNumber, appVerifier) => {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier // Access the recaptchaVerifier from the global window object
    );

    // Prompt the user to enter the verification code
    const code = window.prompt(
      "Enter the verification code sent to your phone:"
    );
    // Confirm the verification code
    return await confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        setCurrentUser(user);

        return {
          data: { user },
          loading: false,
          error: false,
        };
      })
      .catch((error) => {
        return {
          data: { message: `User could not sign in (bad verification code?)` },
          loading: false,
          error: true,
        };
      });

    // User signed in successfully
  };
  const logout = () => {
    auth.signOut();
  };

  const value = {
    currentUser,
    registerAndLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
