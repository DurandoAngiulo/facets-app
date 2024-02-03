"use client";
//TODO: check this code with paul
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SummaryCard from "@/components/SummaryCard/Index.jsx";
import { getProfiles } from "@/services/profile-service"; // Import getProfiles function

const Index = () => {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState([]);
  console.log(currentUser);

  useEffect(() => {
    console.log(currentUser, "useefect");
    const fetchProfiles = async () => {
      if (currentUser?.profile?.referralID) {
        try {
          const profilesData = await getProfiles(currentUser.profile.referralID);
          setProfiles(profilesData);

          console.log(profiles, "profiles!");
        } catch (error) {
          console.error("Error fetching profiles:", error);
        }
      }
    };

    fetchProfiles();
  }, [currentUser]);

  return (
    <DashboardLayout>
      <div>
        {profiles.map((profile) => (
          <SummaryCard
            key={profile.id} // Assuming each profile has a unique ID
            name={profile.firstName}
            pronouns={profile.pronouns}
            birthday={profile.birthday}
            occupation={profile.occupation}
            location={profile.location}
            profileId={profile.id}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Index;
