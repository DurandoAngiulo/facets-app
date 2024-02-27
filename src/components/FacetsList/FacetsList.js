"use client";

import { useEffect, useState } from "react";

import BeveledContainer from "@/components/BeveledContainer/Index";
import { getFacetPhotoUrls } from "@/services/image-service";
import { replaceNameInString } from "@/utils/util-functions";
import MaskedImage from "@/components/MaskedImage/Index";
import Icon from "@/components/Icon";

const FacetsList = ({ facet, currentProfile = null }) => {
  const [photoUrls, setPhotoUrls] = useState([]);

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
                src={photoUrls[index]?.url || "https://placehold.co/50x50"}
                alt={`Facet Photo #${index + 1}`}
                data-image-order={photoUrls[index]?.order || index}
              />
              <BeveledContainer className="mt-6 mb-7">
                <p style={{ color: "var(--text)" }}>
                  {replaceNameInString(response.prompt, currentProfile?.firstName)}
                </p>
                <p className="semibold pr-2" style={{ fontSize: "var(--font-size-p-md)", color: "var(--brand)" }}>
                  {response.response}
                </p>
                <div className="absolute bottom-4 right-4">
                  <Icon className="h-7 w-7" iconName="messageDots" />
                </div>
              </BeveledContainer>
            </li>
          ))}
          <MaskedImage
            height={292}
            width={292}
            src={photoUrls[3]?.url || "https://placehold.co/50x50"}
            alt={`Facet Photo #${4}`}
            data-image-order={photoUrls[3]?.order || 3}
          />
        </ul>
      </div>
    </>
  );
};

export default FacetsList;
