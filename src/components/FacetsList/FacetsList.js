"use client";

import { useEffect, useState } from "react";

import BeveledContainer from "@/components/BeveledContainer/Index";
import { getFacetPhotoUrls } from "@/services/image-service";
import { replaceNameInString } from "@/utils/util-functions";

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
      <div className="mt-2 border rounded border-black">
        <ul>
          {facet.responses.map((response, index) => (
            <li key={response.prompt_id} className={`border border-green`} data-index={index}>
              <img
                src={photoUrls[index]?.url || "https://placehold.co/50x50"}
                alt={`Facet Photo #${index + 1}`}
                data-image-order={photoUrls[index]?.order || index}
              />
              <BeveledContainer className="mt-7">
                <p style={{ color: "var(--text)" }}>
                  {replaceNameInString(response.prompt, currentProfile?.firstName)}
                </p>
                <p className="semibold" style={{ fontSize: "var(--font-size-p-md)", color: "var(--brand)" }}>
                  {response.response}
                </p>
              </BeveledContainer>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FacetsList;
