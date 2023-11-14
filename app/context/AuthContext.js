"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPhoneNumber, getAuth } from "firebase/auth";

const AuthContext = createContext();
const auth = getAuth();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  registerAndLogin = async (auth, phoneNumber, appVerifier) => {
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
      })
      .finally(() => {
        setLoading(false);
      });

    // User signed in successfully
  };
  //TODO: test this to make sure it works
  const logout = () => {
    auth.signOut();
    console.log("user logged out");
  };

  //   useEffect(() => {
  //     const unsubscribe = auth.onAuthStateChanged((user) => {
  //       setCurrentUser(user);
  //       setLoading(false);
  //     });

  //     return unsubscribe;
  //   }, []);

  const value = {
    currentUser,
    registerAndLogin,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
