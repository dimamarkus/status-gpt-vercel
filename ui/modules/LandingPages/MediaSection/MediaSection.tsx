import { MediaSection as MediaSectionType } from "#/lib/types/cms";
import BaseLink from "#/ui/_base/BaseLink/BaseLink";
import styles from "./MediaSection.module.scss";
import Image from "next/image";

type MediaSectionProps = MediaSectionType & {
  className?: string;
};

export const MediaSection = (props: MediaSectionProps) => {
  const { heading, subheading, description, cta, media, className } = props;
  const image = media?.data;
  const rootStyles = "";
  const headingStyles = "";
  const subheadingStyles = "";
  const descriptionStyles = "";
  const linkStyles = "";
  const imageStyles = "";

  return (
    <section className={[rootStyles, className].join(" ")}>
      {heading && <h1 className={headingStyles}>{heading}</h1>}
      {subheading && <h2 className={subheadingStyles}>{subheading}</h2>}
      {description && <p className={descriptionStyles}>{description}</p>}
      {cta && <BaseLink className={linkStyles} href={cta.url} text={cta.text} />}
      {image && (
        <Image
          src={image.attributes.url}
          alt={image.attributes.alternativeText || ""}
          width={image.attributes.width}
          height={image.attributes.height}
          className={imageStyles}
        />
      )}
    </section>
  );
};
export default MediaSection;
