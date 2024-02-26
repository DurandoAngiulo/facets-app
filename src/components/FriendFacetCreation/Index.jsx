import React, { useState, useEffect, use } from "react";
import { getTimeStamp } from "@/utils/time-functions";
import { replaceNameInString } from "@/utils/util-functions";
import { getRandomPrompts } from "@/services/prompt.service";
import { useAuth } from "@/context/AuthContext";
import { getUserByReferralId, updateFacet } from "@/services/profile-service";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import FIREBASE from "@/constants/firebase";
import ImageUploadInput from "@/components/ImageUploadInput/Index.jsx";

const FriendFacetCreation = ({ pageReferralId }) => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  const [friendFacet, setFriendFacet] = useState({
    responses: [
      { prompt_id: "", prompt: "", response: "" },
      { prompt_id: "", prompt: "", response: "" },
      { prompt_id: "", prompt: "", response: "" }
    ],
    friendshipPeriod: "",
    respondantUserId: userId,
    createdAt: "",
    updatedAt: ""
  });

  const [isLoaded, setIsLoaded] = useState(false); // New state for loading status
  const [facetOwnerProfile, setFacetOwnerProfile] = useState({});

  // useEffect to run on page load and fetch prompts
  useEffect(() => {
    const fetchData = async () => {
      const facetUser = await getUserByReferralId(pageReferralId);
      setFacetOwnerProfile(facetUser);
      console.log("facetuser", facetUser, pageReferralId);
      try {
        const prompts = await getRandomPrompts(FIREBASE.COLLECTIONS.FRIENDPROMPTS);

        setFriendFacet(() => ({
          respondantUserId: userId,
          createdAt: getTimeStamp(),
          photos: [],
          responses: prompts.map((prompt) => ({
            prompt_id: prompt.id,
            prompt: prompt.prompt
          }))
        }));

        setIsLoaded(true); // Set loading status to true once prompts are fetched
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };

    fetchData();
  }, [JSON.stringify(currentUser)]);

  // TODO Look into debouncing this
  const handleInputChange = (promptId, value) => {
    setFriendFacet((prevState) => {
      // Find the index of the response with the matching promptId
      const responseIndex = prevState.responses.findIndex((response) => response.prompt_id === promptId);

      if (responseIndex === -1) {
        return prevState; // If no matching response is found, return the current state
      }

      // Clone the responses array
      const updatedResponses = [...prevState.responses];
      // Update the specific response
      updatedResponses[responseIndex] = {
        ...updatedResponses[responseIndex],
        response: value
      };

      // Return the updated state
      return {
        ...prevState,
        responses: updatedResponses
      };
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentFriendFacets = facetOwnerProfile.friendFacets;

    if (currentFriendFacets.length > 4) {
      //TODO: render this
      console.error("too many facets");
      return;
    }

    const newFacetData = {
      ...friendFacet,
      updatedAt: getTimeStamp()
    };

    const newProfileData = {
      friendFacets: [...currentFriendFacets, newFacetData]
    };
    const newUpdatedOwnerProfile = {
      ...facetOwnerProfile,
      ...newProfileData
    };

    await updateFacet(facetOwnerProfile, newProfileData);

    await setFacetOwnerProfile(newUpdatedOwnerProfile);
    setStep(1);
  };
  const submitFacet = () => {
    router.push(`${ROUTES.THANKYOU.path}`);
  };
  // console.log(friendFacet, "friendFacet");
  console.log(facetOwnerProfile.uid);

  // Conditional rendering based on loading status
  if (!isLoaded || !pageReferralId) {
    return <div>Loading...</div>;
  }
  if (step === 0) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          {friendFacet.responses.map((response, index) => (
            <div key={response.prompt_id}>
              <label htmlFor={`prompt-${response.prompt_id}`}>
                {replaceNameInString(response.prompt, facetOwnerProfile.firstName)}
              </label>
              {
                //TODO logic here to slot name into promot variables renderPrompt()
              }
              <input
                id={`prompt-${response.prompt_id}`}
                className="text-black border-solid border-2 border-red-500"
                type="text"
                onChange={(e) => handleInputChange(response.prompt_id, e.target.value)}
              />
            </div>
          ))}
          <div>
            <label>{"friendship period"}</label>
            <input
              className="text-black border-solid border-2 border-red-500"
              type="text"
              onChange={(e) =>
                setFriendFacet((prev) => ({
                  ...prev,
                  friendshipPeriod: e.target.value
                }))
              }
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
  if (step === 1) {
    return (
      <>
        <ImageUploadInput refPath={"friend"} mainProfile={facetOwnerProfile} />
        <button onClick={submitFacet}>continue</button>
      </>
    );
  }
};

export default FriendFacetCreation;
