"use client";
//TODO: check this code with paul
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Navbar from "@/components/Navbar/Index";
import SummaryCard from "@/components/SummaryCard/Index.jsx";
import { getProfiles } from "@/services/profile-service"; // Import getProfiles function

const Index = () => {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState([]);
  console.log(currentUser);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (currentUser?.profile?.referralID) {
        try {
          const profilesData = await getProfiles(currentUser.profile.referralID);
          setProfiles(profilesData);
          //TODO: add prompt population
          // const prompt = currentUser.profile.personalfacet;
        } catch (error) {
          console.error("Error fetching profiles:", error);
        }
      }
    };

    fetchProfiles();
  }, [currentUser]);

  return (
    <div>
      <DashboardLayout />
      <Navbar activePage={"Feed"} />

      <div>
        {profiles.map((profile) => (
          <SummaryCard
            key={currentUser.uid} // Assuming each profile has a unique ID
            name={profile.firstName}
            pronouns={profile.pronouns}
            birthday={profile.birthday}
            occupation={profile.occupation}
            location={profile.location}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
