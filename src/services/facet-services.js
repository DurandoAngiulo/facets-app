import FIREBASE from "@/constants/firebase";
import { getPrompts } from "@/services/prompt.service";

/**
 * Extracts a set of unique prompt IDs from an array of facets.
 * @param {Array} facets - The array of facets to process.
 * @returns {Set} A set of unique prompt IDs.
 */
const extractUniquePromptIds = (facets) => {
  return new Set(
    facets.flatMap((facet) => facet.responses.map((response) => response.prompt_id)).filter(Boolean) // This removes any falsy values including `undefined` and `null`
  );
};

/**
 * Updates the response prompts within each facet based on the provided prompts data.
 * @param {Array} facets - The facets to update.
 * @param {Array} promptsData - The data of prompts used to update the facets.
 */
const updateFacetResponses = (facets, promptsData) => {
  facets.forEach((facet) => {
    facet.responses.forEach((response) => {
      if (!response.prompt_id) return;
      const prompt = promptsData.find((p) => p.id === response.prompt_id);
      if (prompt) {
        response.prompt = prompt.prompt;
      }
    });
  });
};

/**
 * Transforms user facets by updating the prompt details from the database.
 * @param {Object} profileInformation - The user profile containing facets to transform.
 * @returns {Promise} The updated user profile with transformed facets.
 */
const transformUserFacets = async (profileInformation) => {
  const personalFacets = profileInformation.personalFacet || [];
  const uniquePersonalPromptIds = new Set(
    personalFacets
      .flatMap((facet) => facet.responses)
      .map((response) => response.prompt_id)
      .filter((id) => id) // Filter out falsy values, including empty strings
  );

  const friendFacets = profileInformation.friendFacets || [];
  const uniqueFriendPromptIds = new Set(
    friendFacets
      .flatMap((facet) => facet.responses)
      .map((response) => response.prompt_id)
      .filter((id) => id) // Filter out falsy values, including empty strings
  );

  const combinedUniquePromptIds = new Set([...uniqueFriendPromptIds, ...uniquePersonalPromptIds]);
  const uniquePromptIdsArray = Array.from(combinedUniquePromptIds);

  const friendPrompts = await getPrompts(FIREBASE.COLLECTIONS.FRIENDPROMPTS, uniquePromptIdsArray);
  const userPrompts = await getPrompts(FIREBASE.COLLECTIONS.USERPROMPTS, uniquePromptIdsArray);

  friendFacets?.map((facet) => {
    facet.responses.map((response) => {
      if (!response.prompt_id || !response.prompt_id) return;
      const prompt = friendPrompts.data.find((prompt) => prompt.id === response.prompt_id);
      response.prompt = prompt.prompt;
    });
  });

  personalFacets?.map((facet) => {
    facet.responses.map((response) => {
      if (!response.prompt_id || !response.prompt_id) return;
      const prompt = userPrompts.data.find((prompt) => prompt.id === response.prompt_id);
      response.prompt = prompt.prompt;
    });
  });

  console.log({ friendFacets, personalFacets });
  return { friendFacets, personalFacets };
};

export { transformUserFacets };
