"use client";

import { ArrowDownTrayIcon, CheckIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import { FC, memo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  content: string;
}

export const CodeCopyButton: FC<Props> = memo(({ content }) => {
  const [isCopied, setIsCopied] = useState<Boolean>(false);

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <button
      className="flex items-center rounded bg-none py-0.5 px-2 text-xs text-white focus:outline-none"
      onClick={copyToClipboard}
    >
      {isCopied ? (
        <CheckIcon width={18} height={18} className="mr-1.5" />
      ) : (
        <ClipboardIcon width={18} height={18} className="mr-1.5" />
      )}
      {isCopied ? "Copied!" : "Copy code"}
    </button>
  );
});
CodeCopyButton.displayName = "CodeCopyButton";

export default CodeCopyButton;
