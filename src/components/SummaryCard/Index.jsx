import { PrimaryButton } from "@/components/Button/Index";
import ROUTES from "@/constants/routes";
import { calculateAge } from "@/utils/util-functions.js";
import Link from "next/link";
import BeveledContainer from "@/components/BeveledContainer/Index.jsx";
import MaskedImage from "@/components/MaskedImage/Index";

const SummaryCard = ({
  profileId,
  name,
  pronouns,
  birthday,
  occupation,
  location,
  facetPrompt,
  facetResponse,
  profilePhoto
}) => {
  const age = calculateAge(birthday);
  return (
    <div className="max-w-sm w-full">
      <BeveledContainer>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-center gradient-text" style={{}}>
              {name}
            </h2>
            <div className="flex flex-row gap-4 ">
              <MaskedImage height={140} width={140} src={`${profilePhoto}`} />
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
            <p className="semibold" style={{ fontSize: "var(--font-size-p-md)", color: "var(--brand)" }}>
              {facetResponse}
            </p>
          </div>

          <Link href={`${ROUTES.PROFILE.path}/${profileId}`}>
            <PrimaryButton label="View full Facet" active="true" />
          </Link>
        </div>
      </BeveledContainer>
    </div>
  );
};

export default SummaryCard;
