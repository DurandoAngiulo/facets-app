import { FirestoreProvider } from "@/context/FirebaseContext";
import { AuthContextProvider } from "@/context/AuthContext";
// import {AuthContextProvider } from "@/context/AuthContext"

const Providers = ({ children }) => {
  return (
    <FirestoreProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </FirestoreProvider>
  );
};

export default Providers;
