import { FirestoreProvider } from "@/context/FirebaseContext";
// import {AuthContextProvider } from "@/context/AuthContext"

const Providers = ({ children }) => {
  return <FirestoreProvider>{children}</FirestoreProvider>;
};

export default Providers;
