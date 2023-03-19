"use client";
import cn from "classnames";
import React, { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import styles from "./ParsedMarkdown.module.scss";

type ParsedMarkdownProps = {
  content: any;
  className?: string;
  children?: React.ReactNode;
};

export const ParsedMarkdown = ({ content, className }: ParsedMarkdownProps) => {
  const [mdContent, setMdContent] = useState("");

  useEffect(() => {
    async function getMarkdown() {
      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();
      setMdContent(contentHtml);
    }

    getMarkdown();
  }, [content, mdContent]);

  if (!content) {
    return null;
  }

  // Open all parsed markdown links in a new tab
  if (typeof window === "object") {
    const links = document.querySelectorAll("#dangerous-html a");
    links.forEach(function (link) {
      link.setAttribute("target", "_blank");
    });
  }

  return (
    <div
      id="dangerous-html"
      dangerouslySetInnerHTML={{ __html: mdContent }}
      className={cn(styles.ParsedMarkdown, "prose", className)}
    />
  );
};
export default ParsedMarkdown;
