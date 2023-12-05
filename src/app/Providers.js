import { AuthContextProvider } from "@/context/AuthContext";
import { FirestoreProvider } from "@/context/FirebaseContext";

const Providers = ({ children }) => {
  return (
    <FirestoreProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </FirestoreProvider>
  );
};

export default Providers;
