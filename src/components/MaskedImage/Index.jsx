import { renderToStaticMarkup } from "react-dom/server";
import Icon from "@/components/Icon";

const MaskedImage = ({ height, width }) => {
  const maskIcon = <Icon name="heart" />;

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
};

export default MaskedImage;
