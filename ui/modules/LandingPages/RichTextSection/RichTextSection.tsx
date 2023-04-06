"use client";

import { RichTextSection as RichTextSectionType } from "#/lib/types/cms";
import ParsedMarkdown2 from "#/ui/molecules/ParsedMarkdown/ParsedMarkdown";
import styles from "./RichTextSection.module.scss";

type RichTextSectionProps = RichTextSectionType & {
  className?: string;
};

export const RichTextSection = (props: RichTextSectionProps) => {
  const { heading, subheading, description, content, className } = props;
  const rootStyles = "";
  const headingStyles = "";
  const subheadingStyles = "";
  const descriptionStyles = "";
  const contentStyles = "";

  return (
    <section className={[rootStyles, className].join(" ")}>
      {heading && <h1 className={headingStyles}>{heading}</h1>}
      {subheading && <h2 className={subheadingStyles}>{subheading}</h2>}
      {description && <p className={descriptionStyles}>{description}</p>}
      <ParsedMarkdown2 content={content} className={contentStyles} />
    </section>
  );
};
export default RichTextSection;
