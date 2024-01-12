import { forwardRef } from "react";
import styles from "./Icon.module.css";
import next from "@/svg/next.svg";

export const iconRegistry = { next };

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
  //hi
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
