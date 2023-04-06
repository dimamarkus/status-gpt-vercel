import { BlurbSection as BlurbSectionType } from "#/lib/types/cms";
import Link from "#/ui/atoms/Link/Link";
import styles from "./BlurbSection.module.scss";

type BlurbSectionProps = BlurbSectionType & {
  className?: string;
};

export const BlurbSection = (props: BlurbSectionProps) => {
  const { heading, subheading, description, blurbs, className } = props;
  const rootStyles = "";
  const headingStyles = "";
  const subheadingStyles = "";
  const descriptionStyles = "";
  const blurbsStyles = "";

  return (
    <section className={[rootStyles, className].join(" ")}>
      {heading && <h1 className={headingStyles}>{heading}</h1>}
      {subheading && <h2 className={subheadingStyles}>{subheading}</h2>}
      {description && <p className={descriptionStyles}>{description}</p>}
      {blurbs && (
        <ul className={blurbsStyles}>
          {blurbs.map((blurb, index) => (
            <div key={index}>
              {blurb.heading && <h3>{blurb.heading}</h3>}
              {blurb.text && <p>{blurb.text}</p>}
            </div>
          ))}
        </ul>
      )}
    </section>
  );
};
export default BlurbSection;
