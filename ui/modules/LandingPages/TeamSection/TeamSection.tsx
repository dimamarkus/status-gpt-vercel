import { TeamSection as TeamSectionType } from "#/lib/types/cms";
import BaseLink from "#/ui/_base/BaseLink/BaseLink";
import Image from "next/image";
import styles from "./TeamSection.module.scss";
import { getAvatarUrl } from "#/lib/helpers/url-helpers";

type TeamSectionProps = TeamSectionType & {
  className?: string;
};

export const TeamSection = (props: TeamSectionProps) => {
  const { heading, subheading, description, avatars, className } = props;
  const rootStyles = "team-section";
  const headingStyles = "";
  const subheadingStyles = "";
  const descriptionStyles = "";
  const avatarsStyles = "";

  return (
    <section className={[rootStyles, className].join(" ")}>
      {heading && <h1 className={headingStyles}>{heading}</h1>}
      {subheading && <h2 className={subheadingStyles}>{subheading}</h2>}
      {description && <p className={descriptionStyles}>{description}</p>}
      {avatars && (
        <ul className={avatarsStyles}>
          {avatars.map((avatar, index) => (
            <li key={index}>
              {avatar.picture && (
                <Image
                  src={getAvatarUrl(avatar.picture)}
                  alt={avatar.picture.data.attributes.alternativeText || ""}
                  width={avatar.picture.data.attributes.width}
                  height={avatar.picture.data.attributes.height}
                />
              )}
              {avatar.heading && <h3>{avatar.heading}</h3>}
              {avatar.subheading && <p>{avatar.subheading}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default TeamSection;
