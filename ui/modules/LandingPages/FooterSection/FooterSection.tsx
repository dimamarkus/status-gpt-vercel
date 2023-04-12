import { FooterSection as BlurbSectionType } from "#/lib/types/cms";
import BaseLink from "#/ui/_base/BaseLink/BaseLink";
import styles from "./FooterSection.module.scss";

type BlurbSectionProps = BlurbSectionType & {
  className?: string;
};

export const FooterSection = (props: BlurbSectionProps) => {
  const { heading, subheading, description, primary_links, secondary_links, className } = props;
  const rootStyles = "";
  const headingStyles = "";
  const subheadingStyles = "";
  const descriptionStyles = "";
  const primaryLinksStyles = "";
  const secondaryLinksStyles = "";

  return (
    <section className={[rootStyles, className].join(" ")}>
      {heading && <h1 className={headingStyles}>{heading}</h1>}
      {subheading && <h2 className={subheadingStyles}>{subheading}</h2>}
      {description && <p className={descriptionStyles}>{description}</p>}
      {primary_links && (
        <ul className={primaryLinksStyles}>
          {primary_links.map((primary_link, index) => (
            <BaseLink key={index} href={primary_link.url} text={primary_link.text} />
          ))}
        </ul>
      )}
      {secondary_links && (
        <ul className={secondaryLinksStyles}>
          {secondary_links.map((secondary_link, index) => (
            <BaseLink key={index} href={secondary_link.url} text={secondary_link.text} />
          ))}
        </ul>
      )}
    </section>
  );
};
export default FooterSection;
