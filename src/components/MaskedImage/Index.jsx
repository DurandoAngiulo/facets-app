"use client";
import { renderToStaticMarkup } from "react-dom/server";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { getPhoto } from "@/services/image-service.js";

const MaskedImage = ({ height, width, src }) => {
  // console.log(src);
  let imageSrc = src;
  const [image, setImage] = useState();
  // console.log("test");
  useEffect(() => {
    const fetchPhoto = async (media) => {
      // console.log("testtest");
      try {
        const photo = await getPhoto(media);
        let photoResult = photo;
        setImage(photoResult);
      } catch (error) {
        setImage("https://placehold.co/300x300");
        console.error("Failed to fetch photo", error);
      }
    };
    fetchPhoto(imageSrc);
  }, []);
  if (height > 140) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        x="0"
        y="0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="shape">
            <path
              d="M292 26.3137C292 24.192 291.157 22.1571 289.657 20.6569L271.343 2.34315C269.843 0.842855 267.808 -3.29015e-08 265.686 0L26.3137 3.71193e-06C24.192 3.74483e-06 22.1571 0.842859 20.6569 2.34315L2.34315 20.6569C0.842855 22.1571 0 24.192 0 26.3137V265.686C0 267.808 0.842856 269.843 2.34315 271.343L20.6569 289.657C22.1571 291.157 24.192 292 26.3137 292L265.686 292C267.808 292 269.843 291.157 271.343 289.657L289.657 271.343C291.157 269.843 292 267.808 292 265.686V26.3137Z"
              fill="#d8d8d8"
            />
          </mask>
        </defs>
        <image
          mask="url(#shape)"
          preserveAspectRatio="xMidYMid meet"
          x="0"
          y="0"
          xlinkHref="https://placehold.co/300x300"
          width="100%"
          height="100%"
        />
      </svg>
    );
  } else {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        x="0"
        y="0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="shape">
            <path
              d="M140 12.6162C140 11.5989 139.596 10.6233 138.877 9.90397L130.096 1.12343C129.377 0.404108 128.401 -1.57747e-08 127.384 0L12.6162 1.77969e-06C11.5989 1.79547e-06 10.6233 0.40411 9.90397 1.12343L1.12343 9.90397C0.404108 10.6233 0 11.5989 0 12.6162V127.384C0 128.401 0.404109 129.377 1.12343 130.096L9.90397 138.877C10.6233 139.596 11.5989 140 12.6162 140L127.384 140C128.401 140 129.377 139.596 130.096 138.877L138.877 130.096C139.596 129.377 140 128.401 140 127.384V12.6162Z"
              fill="#d8d8d8"
            />
          </mask>
        </defs>
        <image
          mask="url(#shape)"
          preserveAspectRatio="xMidYMid meet"
          x="0"
          y="0"
          xlinkHref={image}
          width="100%"
          height="100%"
        />
      </svg>
    );
  }
};

export default MaskedImage;
