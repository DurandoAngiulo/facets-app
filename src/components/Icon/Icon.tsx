import bevelBottom from "@/svg/bevel-bottom.svg";
import bevelTop from "@/svg/bevel-top.svg";
import closeX from "@/svg/close-x.svg"; //top right of profile
import diamondFilled from "@/svg/diamond-filled.svg";
import diamondLine from "@/svg/diamond-line.svg";
import dots from "@/svg/dots.svg"; //3 dots at top L of profile
import edit from "@/svg/edit.svg";
import heart from "@/svg/heart.svg";
import link from "@/svg/link.svg";
import logoF from "@/svg/logo-F.svg";
import logoWord from "@/svg/logo-word.svg";
import messageDots from "@/svg/message-dots.svg"; //shown on Facet responses to start convo
import messageFilled from "@/svg/message-filled.svg";
import messageLine from "@/svg/message-line.svg";
import next from "@/svg/next.svg";
import plus from "@/svg/plus.svg";
import profileFilled from "@/svg/profile-filled.svg";
import profileLine from "@/svg/profile-line.svg";
import refresh from "@/svg/refresh.svg";
import shuffle from "@/svg/shuffle.svg";
import cake from "@/svg/cake.svg";
import emojiPeople from "@/svg/emoji_people.svg";
import familyStar from "@/svg/family_star.svg";
import pronouns from "@/svg/pronouns.svg";
import preference from "@/svg/preference.svg";
import ageRange from "@/svg/age_range.svg";
import location from "@/svg/location.svg";
import employment from "@/svg/employment.svg";
import occupation from "@/svg/occupation.svg";
import letter from "@/svg/letter.svg";
import copy from "@/svg/copy.svg";
import editGradient from "@/svg/edit-gradient.svg";
import back from "@/svg/back.svg";
import bio from "@/svg/bio.svg";
import sexuality from "@/svg/sexuality.svg";
import school from "@/svg/school.svg";
import hometown from "@/svg/hometown.svg";
import height from "@/svg/height.svg";
import religion from "@/svg/religion.svg";
import smokes from "@/svg/smokes.svg";
import drinking from "@/svg/drinking.svg";
import mbti from "@/svg/mbti.svg";
import astrological from "@/svg/astrological.svg";
import political from "@/svg/political.svg";
import diamondBio from "@/svg/diamond-bio.svg";
import backArrow from "@/svg/back-arrow.svg";
import kabob from "@/svg/kabob.svg";
import phone from "@/svg/smartphone.svg";
import search from "@/svg/search.svg";
import mining from "@/svg/mining.svg";
import shine from "@/svg/shine.svg";
import photoupload from "@/svg/photoupload.svg";

import { forwardRef } from "react";
import styles from "./Icon.module.css";

export const iconRegistry = {
  closeX,
  diamondFilled,
  diamondLine,
  dots,
  edit,
  heart,
  link,
  logoF,
  logoWord,
  messageDots,
  messageFilled,
  messageLine,
  next,
  plus,
  profileFilled,
  profileLine,
  refresh,
  shuffle,
  bevelTop,
  bevelBottom,
  cake,
  emojiPeople,
  familyStar,
  pronouns,
  preference,
  ageRange,
  location,
  employment,
  occupation,
  letter,
  copy,
  editGradient,
  diamondBio,
  backArrow,
  kabob,
  back,
  bio,
  sexuality,
  school,
  hometown,
  height,
  religion,
  smokes,
  drinking,
  mbti,
  astrological,
  political,
  phone,
  search,
  mining,
  shine,
  photoupload
};

type IconNames = keyof typeof iconRegistry;

export interface IconProps {
  iconName: IconNames;
  isDecorative?: boolean;
  title?: string;
  className?: string;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(function IconComponent(
  { iconName, isDecorative = true, title, className, ...rest },
  ref
) {
  const SvgComponent = iconRegistry[iconName];

  if (!SvgComponent) {
    console.error(`Icon "${iconName}" not found.`);
    return null;
  }

  const accessibilityProps = isDecorative
    ? { "aria-hidden": "true", role: "presentation" }
    : { "aria-label": title, role: "img" };

  if (!isDecorative && !title) {
    console.error("Non-decorative icons must have a title for accessibility.");
    return null;
  }

  return (
    <span className={`${styles.icon} ${className || ""}`} data-icon={iconName}>
      <SvgComponent className={styles.svgIcon} ref={ref} {...accessibilityProps} {...rest} />
    </span>
  );
});

export default Icon;
