"use client";

import BeveledContainer from "../BeveledContainer/Index";
import { useState, useEffect } from "react";
import { getPhoto } from "@/services/image-service";
import { replaceNameInString } from "@/utils/util-functions";

const FacetGroupCard = ({ facet }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const renderImage = async () => {
      let img = await getPhoto("userPhotos/ZLAjnLUuAzdYHeDUnJ9WvuYQPEz1/personalFacetPhotos/IMG_2130.jpeg");
      console.log(img, "salkfj");
      setImage(img);
      return img;
    };

    renderImage();
  }, []);

  return (
    <div key={facet.id} className="mt-2 border rounded border-black">
      <h3>
        {/* Facet By {facet.friendshipPeriod ? `A friend of ${facet.friendshipPeriod}` : profileInformation?.firstName} {} */}
      </h3>
      <ul>
        {facet.responses.map((response) => (
          <li key={response.id} className="border border-green">
            --- {image} ---
            {/* <img src={renderImage} /> */}
            <BeveledContainer>
              <p style={{ color: "var(--text)" }}>
                {/* <i>{replaceNameInString(response.prompt, profileInformation?.firstName)}</i> */}
              </p>
              <p className="semibold" style={{ fontSize: "var(--font-size-p-md)", color: "var(--brand)" }}>
                {response.response}
              </p>
            </BeveledContainer>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacetGroupCard;
