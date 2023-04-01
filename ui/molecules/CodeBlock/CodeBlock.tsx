import { CheckIcon, ClipboardIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { FC, useState, memo } from "react";
import { useTranslation } from "next-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { generateRandomString, programmingLanguages } from "./codeblock-functions";
import React from "react";

interface Props {
  language: string;
  value: string;
}

export const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { t } = useTranslation("markdown");
  const [isCopied, setIsCopied] = useState<Boolean>(false);

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  const downloadAsFile = () => {
    const fileExtension = programmingLanguages[language] || ".file";
    const suggestedFileName = `file-${generateRandomString(3, true)}${fileExtension}`;
    const fileName = window.prompt(t("Enter file name") || "", suggestedFileName);

    if (!fileName) {
      // user pressed cancel on prompt
      return;
    }

    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="codeblock relative font-sans text-[16px]">
      <div className="flex items-center justify-between pb-2">
        <span className="text-xs lowercase text-white">{language}</span>

        <div className="flex items-center">
          <button
            className="flex items-center rounded bg-none py-0.5 px-2 text-xs text-white focus:outline-none"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <CheckIcon width={18} height={18} className="mr-1.5" />
            ) : (
              <ClipboardIcon width={18} height={18} className="mr-1.5" />
            )}
            {isCopied ? t("Copied!") : t("Copy code")}
          </button>
          <button
            className="flex items-center rounded bg-none py-0.5 pl-2 text-xs text-white focus:outline-none"
            onClick={downloadAsFile}
          >
            <ArrowDownTrayIcon width={18} height={18} />
          </button>
        </div>
      </div>

      <SyntaxHighlighter language={language} style={oneDark} customStyle={{ margin: 0 }}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = "CodeBlock";

export default CodeBlock;

