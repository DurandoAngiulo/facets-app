"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { usePathname, useRouter } from "next/navigation";
import { extractIdFromUrl } from "@/utils/util-functions";
import { getProfileById } from "@/services/profile-service";
import { calculateAge } from "@/utils/util-functions.js";

const Index = () => {
  const { currentUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const profileId = currentUser?.uid;
  const [profileInformation, setProfileInformation] = useState("");
  console.log(currentUser);
  useEffect(() => {
    const fetchProfile = async (profileId) => {
      try {
        const profileResult = await getProfileById(profileId);
        let profileData = profileResult?.data;

        console.log(profileData);
        setProfileInformation(profileData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchProfile(profileId);
  }, [currentUser]); // Empty dependency array to run only on component mount

  console.log(profileInformation, "proInfo");

  return (
    <DashboardLayout>
      <div>
        <h2>all unstyled profile data</h2>
        <p>{profileInformation?.data?.firstName}</p>
        <p>{calculateAge(profileInformation?.data?.birthday)}</p>
        <p>{profileInformation?.data?.bio}</p>
        <p>{profileInformation?.data?.location}</p>
        <p>{profileInformation?.data?.occupation}</p>
        <p>{profileInformation?.data?.pronouns}</p>
        <p>personalFacetprompts placeholder TBD</p>
        <p>friendFacetPlaceholder TBD</p>
        <p>image palcehodler TBD</p>
      </div>
    </DashboardLayout>
  );
};

export default Index;
