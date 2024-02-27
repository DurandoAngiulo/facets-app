"use client";

import { useEffect, useState } from "react";

import BeveledContainer from "@/components/BeveledContainer/Index";
import Icon from "@/components/Icon";
import MaskedImage from "@/components/MaskedImage/Index";
import { useAuth } from "@/context/AuthContext";
import { transformUserFacets } from "@/services/facet-services";
import { calculateAge, replaceNameInString, extractIdFromUrl } from "@/utils/util-functions";
import { usePathname } from "next/navigation";
import MoreDetailsPillGroup from "@/components/MoreDetailsPillGroup/Index.jsx";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import FacetsList from "@/components/FacetsList";
import { getProfileById } from "@/services/profile-service";

const Index = () => {
  const { currentUser } = useAuth();
  const pathname = usePathname();
  const profileId = extractIdFromUrl(pathname); // You need to define this function
  const [profileInformation, setProfileInformation] = useState(null);
  const friendFacetsExist = profileInformation?.friendFacets && profileInformation.friendFacets.length > 0;
  const profileFacetsExist = profileInformation?.personalFacets && profileInformation.personalFacets[0] !== undefined;

  useEffect(() => {
    const fetchProfile = async (profileId) => {
      try {
        const profileResult = await getProfileById(profileId);
        let profileData = profileResult?.data?.data;
        setProfileInformation(profileData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchProfile(profileId);
  }, [profileId]);

  useEffect(() => {
    if (!profileInformation) return;

    const transformFacetData = async () => {
      const newProfile = await transformUserFacets(profileInformation);
      setProfileInformation({ ...profileInformation, ...newProfile });
    };

    transformFacetData();
  }, [profileInformation]);

  if (!profileInformation) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div>
        <header>
          <Link href={ROUTES.EDIT_PROFILE.path}>
            <h2>edit profile</h2>
          </Link>

          <h2>all unstyled profile data</h2>
          <p>{profileInformation?.firstName}</p>
          <p>{calculateAge(profileInformation?.birthday)}</p>
          <p>{profileInformation?.bio}</p>
          <p>{profileInformation?.location}</p>
          <p>{profileInformation?.occupation}</p>
          <p>{profileInformation?.pronouns}</p>
        </header>
        <MoreDetailsPillGroup moreDetails={profileInformation?.moreDetails} />

        <section className="bg-green-400">
          {profileFacetsExist && (
            <div>
              <h3>Facet By {profileInformation?.firstName}</h3>
              <ul>
                <FacetsList facet={profileInformation.personalFacets[0]} />
              </ul>
            </div>
          )}

          {friendFacetsExist &&
            profileInformation.friendFacets.map((facet) => (
              <div key={facet.respondantUserId}>
                <h3>Facet By A friend of {facet.friendshipPeriod}</h3>
                <FacetsList facet={facet} currentProfile={profileInformation} />
              </div>
            ))}
        </section>
      </div>
    </>
  );
};

export default Index;
