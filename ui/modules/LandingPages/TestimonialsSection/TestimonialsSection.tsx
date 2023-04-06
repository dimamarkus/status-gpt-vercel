import { TestimonialsSection as TestimonialsSectionType } from "#/lib/types/cms";

type TestimonialsSectionProps = TestimonialsSectionType & {
  className?: string;
};

export const TestimonialsSection = (props: TestimonialsSectionProps) => {
  const { heading, subheading, description, quotes, className } = props;

  const rootStyles = "";
  const headingStyles = "";
  const subheadingStyles = "";
  const descriptionStyles = "";
  const quoteStyles = "";

  return (
    <section className={[rootStyles, className].join(" ")}>
      {heading && <h1 className={headingStyles}>{heading}</h1>}
      {subheading && <h2 className={subheadingStyles}>{subheading}</h2>}
      {description && <p className={descriptionStyles}>{description}</p>}
      {quotes &&
        quotes.map((quote, index) => (
          <div key={index} className={quoteStyles}>
            {quote.title && <h3>{quote.title}</h3>}
            {quote.body && <p>{quote.body}</p>}
          </div>
        ))}
    </section>
  );
};
export default TestimonialsSection;
