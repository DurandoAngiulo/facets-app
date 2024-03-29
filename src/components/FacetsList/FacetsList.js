import { useEffect, useState } from "react";

import BeveledContainer from "@/components/BeveledContainer/Index";
import { getFacetPhotoUrls } from "@/services/image-service";
import { replaceNameInString } from "@/utils/util-functions";
import MaskedImage from "@/components/MaskedImage/Index";
import Icon from "@/components/Icon";
import { updateProfile } from "@/services/profile-service";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

const FacetsList = ({ facet, currentProfile = null }) => {
  const { currentUser, updateUserProfile } = useAuth();
  const [photoUrls, setPhotoUrls] = useState([]);
  const uid = currentProfile?.uid;
  const currentMessageData = currentUser?.profile?.messageData || [];
  const router = useRouter();
  // console.log(currentProfile, "current profile");

  useEffect(() => {
    const fetchPhotoURLs = async () => {
      if (!facet?.photos) return;

      try {
        const photoURLs = await getFacetPhotoUrls(facet.photos);
        const sortedPhotos = photoURLs.sort((a, b) => a.order - b.order);
        setPhotoUrls(sortedPhotos);
      } catch (error) {
        console.error("Error fetching photo URLs", error);
      }
    };

    fetchPhotoURLs();
  }, [facet?.photos]);

  const handleMessageUser = async (prompt, response) => {
    const newMessageData = { userId: uid, userName: currentProfile?.firstName, prompt: prompt, response: response };
    console.log(newMessageData, "NEW");
    console.log(currentMessageData, "old");
    const updatedMessageData = { messageData: [...currentMessageData, newMessageData] };
    console.log(updatedMessageData, "UPDATED");
    const { data, error } = await updateProfile(currentUser, updatedMessageData);
    console.log(data, "DATA!!!");
    if (error) {
      console.error(data.message);
      return;
    }

    await updateUserProfile(data?.profile);
    router.push(`${ROUTES.MESSAGES.path}/${uid}`);
  };

  if (!facet?.responses) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <div className="mt-2 flex flex-col gap-2 snap-center">
        <ul>
          {facet.responses.map((response, index) => (
            <li key={response.prompt_id} data-index={index}>
              <MaskedImage
                height={292}
                width={292}
                src={photoUrls[index]?.url}
                alt={`Facet Photo #${index + 1}`}
                data-image-order={photoUrls[index]?.order || index}
              />
              <BeveledContainer className="mt-6 mb-7">
                <p style={{ color: "var(--text)" }}>
                  {replaceNameInString(response.prompt, currentProfile?.firstName)}
                </p>
                <p className="font-medium pr-2" style={{ fontSize: "var(--font-size-p-md)", color: "var(--brand)" }}>
                  {response.response}
                </p>

                <button
                  className="absolute bottom-4 right-4"
                  onClick={() => handleMessageUser(response.prompt, response.response)}
                >
                  <Icon className="h-7 w-7" iconName="messageDots" />
                </button>
              </BeveledContainer>
            </li>
          ))}
          <MaskedImage
            height={292}
            width={292}
            src={photoUrls[3]?.url}
            alt={`Facet Photo #${4}`}
            data-image-order={photoUrls[3]?.order || 3}
          />
        </ul>
      </div>
    </>
  );
};

export default FacetsList;
