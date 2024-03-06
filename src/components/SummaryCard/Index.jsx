import BeveledContainer from "@/components/BeveledContainer/Index.jsx";
import { PrimaryButton } from "@/components/Button/Index";
import MaskedImage from "@/components/MaskedImage/Index";
import ROUTES from "@/constants/routes";
import { calculateAge } from "@/utils/util-functions.js";
import Link from "next/link";

const SummaryCard = ({
  profileId,
  name,
  pronouns,
  birthday,
  occupation,
  location,
  facetPrompt,
  facetResponse,
  src,
  disabledState = false
}) => {
  console.log(disabledState);
  const age = calculateAge(birthday);
  console.log(src, "source!!!");
  return (
    <div className="max-w-sm w-full">
      <BeveledContainer>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-center gradient-text" style={{}}>
              {name}
            </h2>
            <div className="flex flex-row gap-4 ">
              <MaskedImage height={140} width={140} src={src} />
              <div className="flex flex-col justify-center">
                <p style={{ color: "var(--text)" }}>{pronouns}</p>
                <p style={{ color: "var(--text)" }}>{age}</p>
                <p style={{ color: "var(--text)" }}>{occupation}</p>
                <p style={{ color: "var(--text)" }}>{location}</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <p style={{ color: "var(--text)" }}>
              <i>{facetPrompt}</i>
            </p>
            <p className="font-medium" style={{ fontSize: "var(--font-size-p-md)", color: "var(--brand)" }}>
              {facetResponse}
            </p>
          </div>

          {disabledState == true ? (
            <PrimaryButton label="View full Facet" active={false} />
          ) : (
            <Link href={`${ROUTES.PROFILE.path}/${profileId}`}>
              <PrimaryButton label="View full Facet" active="true" />
            </Link>
          )}
        </div>
      </BeveledContainer>
    </div>
  );
};

export default SummaryCard;
