import { forwardRef } from "react";

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

import styles from "./Icon.module.css";

export const iconRegistry = {
  next,
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
  plus,
  profileFilled,
  profileLine,
  refresh,
  shuffle
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
    <span className={`${styles.icon} ${className || ""}`}>
      <SvgComponent className={styles.svgIcon} ref={ref} {...accessibilityProps} {...rest} />
    </span>
  );
});

export default Icon;
