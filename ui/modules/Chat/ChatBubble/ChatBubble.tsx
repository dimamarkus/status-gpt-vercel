import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { remark } from "remark";
import html from "remark-html";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { ChatMessage } from "#/types";
import Avatar from "#/ui/atoms/Avatar/Avatar";
import Mouth from "#/ui/atoms/Mouth/Mouth";
import ResizablePanel from "#/ui/containers/ResizablePanel/ResizablePanel";

type ChatMessageProps = {
  message: ChatMessage;
  isTalking?: boolean;
};

export const ChatBubble = ({ message, isTalking }: ChatMessageProps) => {
  const { role, content, timestamp } = message;
  const currentDateTime = new Date();
  const time = currentDateTime.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" });
  const isUserMessage = role === "user";
  const chatClass = isUserMessage ? "chat-end" : "chat-start";
  const chatBg = isUserMessage ? "bg-blue-50" : "bg-neutral-50";
  const [mdContent, setMdContent] = useState("");

  // Parse markdown messages
  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getMarkdown() {
      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();
      setMdContent(contentHtml);
    }

    getMarkdown();
  }, [mdContent, message]);

  // Open all parsed markdown links in a new tab
  if (typeof window === "object") {
    const links = document.querySelectorAll("#dangerous-html a");
    links.forEach(function (link) {
      link.setAttribute("target", "_blank");
    });
  }

  const {
    features: { debugMode },
  } = useFeatureToggleContext();

  const shouldHideMessage = !debugMode && message?.role === "system";
  if (shouldHideMessage) {
    return null;
  }

  const Timestamp = dynamic(() => import("./Timestamp"), { ssr: false });
  return (
    <ResizablePanel>
      <AnimatePresence mode="wait">
        <motion.div dir="ltr" className={"chat m-0 p-4" + " " + chatClass}>
          <div
            className={cn(
              "align-center chat-image flex h-16 w-16 justify-center text-center",
              isTalking && "invisible",
            )}
          >
            {isUserMessage ? <Avatar isUserMessage /> : <Mouth animated={isTalking} />}
          </div>
          <Timestamp time={time} />
          <div
            className={`chat-bubble text-neutral-900 ${chatBg} flex max-w-full flex-col transition hover:bg-gray-100`}
          >
            <div
              className="prose text-sm md:text-base"
              id="dangerous-html"
              dangerouslySetInnerHTML={{ __html: mdContent }}
            />
            <button
              className={
                "text-xs text-neutral-300 transition hover:text-blue-500" +
                " " +
                (isUserMessage ? "text-left" : "text-right")
              }
              onClick={() => {
                navigator.clipboard.writeText(content);
                toast("Message copied to clipboard", {
                  icon: "📋",
                });
              }}
            >
              Copy
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </ResizablePanel>
  );
};
export default ChatBubble;
