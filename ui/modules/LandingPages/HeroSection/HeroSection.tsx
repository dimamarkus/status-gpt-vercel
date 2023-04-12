import { HeroSection as HeroSectionType } from "#/lib/types/cms";
import BaseLink from "#/ui/_base/BaseLink/BaseLink";
import styles from "./HeroSection.module.scss";

type HeroSectionProps = HeroSectionType & {
  className?: string;
};

export const HeroSection = (props: HeroSectionProps) => {
  const { heading, subheading, description, cta, className } = props;
  const rootStyles = "";
  const headingStyles = "";
  const subheadingStyles = "";
  const descriptionStyles = "";
  const linkStyles = "";

  return (
    <section className={[rootStyles, className].join(" ")}>
      {heading && <h1 className={headingStyles}>{heading}</h1>}
      {subheading && <h2 className={subheadingStyles}>{subheading}</h2>}
      {description && <p className={descriptionStyles}>{description}</p>}
      {cta && <BaseLink className={linkStyles} href={cta.url} text={cta.text} />}
    </section>
  );
};
export default HeroSection;
