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
 * @param {Object} userProfile - The user profile containing facets to transform.
 * @returns {Promise} The updated user profile with transformed facets.
 */
const transformUserFacets = async (userProfile) => {
  const personalFacet = userProfile.personalFacet || [];
  const friendFacets = userProfile.friendFacets || [];

  const uniquePersonalPromptIds = extractUniquePromptIds(personalFacet);
  const uniqueFriendPromptIds = extractUniquePromptIds(friendFacets);

  const combinedUniquePromptIds = new Set([...uniqueFriendPromptIds, ...uniquePersonalPromptIds]);

  try {
    const [friendPrompts, userPrompts] = await Promise.all([
      getPrompts(FIREBASE.COLLECTIONS.FRIENDPROMPTS, Array.from(combinedUniquePromptIds)),
      getPrompts(FIREBASE.COLLECTIONS.USERPROMPTS, Array.from(combinedUniquePromptIds))
    ]);

    updateFacetResponses(friendFacets, friendPrompts.data);
    updateFacetResponses(personalFacet, userPrompts.data);

    return { ...userProfile, personalFacet, friendFacets };
  } catch (error) {
    console.error("Error transforming user facets:", error);
    throw error; // Rethrow the error for upstream handling.
  }
};

export { transformUserFacets };
