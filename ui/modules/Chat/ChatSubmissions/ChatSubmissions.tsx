"use client";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import styles from "./ChatSubmissions.module.scss";
import { DEFAULT_SUBMISSIONS } from "#/app/chat/lib/constants";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { useIsMobile } from "#/lib/hooks/useIsMobile";
import { useChatContext } from "#/lib/contexts/ChatContext";
import Spinner from "#/ui/atoms/svgs/Spinner";
import TextInput from "#/ui/atoms/inputs/TextInput/TextInput";
import { camelToTitleCase, capitalizeFirstLetter } from "#/lib/helpers/string-helpers";
import { useForm } from "react-hook-form";

type ChatSubmissionsProps = {
  className?: string;
};

export const ChatSubmissions = ({ className }: ChatSubmissionsProps) => {
  const {
    chatLog,
    submissions,
    answer,
    getAnswer,
    getSubmissions,
    submissionsLoading,
    showSubmissions,
    loading,
  } = useChatContext();
  const useIsTablet = useIsMobile();
  const { register, handleSubmit } = useForm();
  const [isExpanded, setIsExpanded] = useState(!useIsTablet);
  const {
    features: { debugMode },
  } = useFeatureToggleContext();
  const displaySubmissions =
    Object.keys(submissions).length > 0 ? Object.keys(submissions).map((key) => key) : [];

  if (!displaySubmissions || displaySubmissions === null || displaySubmissions.length === 0) {
    return null;
  }
  // const shouldHideSubmissions = !showSubmissions || !useIsTablet || (chatLog && chatLog.length < 3);
  const shouldHideSubmissions = false;

  const onSubmit = (data: Record<string, any>) => {
    console.log("data", data);
  };

  return (
    <div className={clsx(styles.root, className, shouldHideSubmissions && "hidden")}>
      {loading || submissionsLoading ? (
        <div className="relative -top-2 ml-2 text-blue-400 md:m-4 md:ml-0">
          <Spinner />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <h4>
            Quick Entry
            <ChevronRightIcon
              width={20}
              className={clsx(
                "h-5 w-5 text-inherit transition md:hidden",
                isExpanded && "rotate-90",
              )}
            />
          </h4> */}
          <ul className="flex flex-row">
            {displaySubmissions.map((prompt, index) => (
              <li key={index} className="mr-4">
                <TextInput
                  id={prompt}
                  label={camelToTitleCase(prompt)}
                  size="sm"
                  compact
                  {...register(prompt)}
                />
              </li>
            ))}
          </ul>
        </form>
      )}
    </div>
  );
};

export default ChatSubmissions;
