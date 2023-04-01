import { CodeBlock } from "#/ui/molecules/CodeBlock/CodeBlock";
import clsx from "clsx";
import { FC, memo } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type ParsedMarkdown2Props = {
  content: string;
  className?: string;
};

export const MemoizedReactMarkdown: FC<Options> = memo(ReactMarkdown);

export const ParsedMarkdown2 = (props: ParsedMarkdown2Props) => {
  const { content, className } = props;

  // Open all parsed markdown links in a new tab
  if (typeof window === "object") {
    const links = document.querySelectorAll(".parsedMarkdown a");
    links.forEach(function (link) {
      link.setAttribute("target", "_blank");
    });
  }

  return (
    <MemoizedReactMarkdown
      className={clsx("parsedMarkdown prose dark:prose-invert", className)}
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <CodeBlock
              key={Math.random()}
              language={match[1]}
              value={String(children).replace(/\n$/, "")}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        table({ children }) {
          return (
            <table className="border-collapse border border-black py-1 px-3 dark:border-white">
              {children}
            </table>
          );
        },
        th({ children }) {
          return (
            <th className="break-words border border-black bg-gray-500 py-1 px-3 text-white dark:border-white">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="break-words border border-black py-1 px-3 dark:border-white">
              {children}
            </td>
          );
        },
      }}
    >
      {content}
    </MemoizedReactMarkdown>
  );
};
export default ParsedMarkdown2;
