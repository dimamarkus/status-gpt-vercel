"use client";

import { CHAT_COSTS } from "#/app/chat/lib/constants";
import { useChatContext } from "#/lib/contexts/ChatContext";
import { useFeatureToggleContext } from "#/lib/contexts/FeatureToggleContext";
import { usePrevious } from "#/lib/hooks/usePrevious";
import Card from "#/ui/atoms/containers/Card/Card";
import KeyValueList from "#/ui/atoms/lists/KeyValueList/KeyValueList";
import React, { useEffect, useState } from "react";
import styles from "./ChatStats.module.scss";
import { useConversationsContext } from "#/lib/contexts/ConversationContext";

type ChatStatsProps = {
  children?: React.ReactNode;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 5,

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const ChatStats = (props: ChatStatsProps) => {
  const [totalCost, setTotalCost] = useState(0);
  const { features } = useFeatureToggleContext();
  const {
    appState: { selectedConversation },
    dataState: { bot },
  } = useConversationsContext();

  const chatLog = selectedConversation?.messages;
  const isStart = chatLog && chatLog?.length < 3;
  const prevChatLog = usePrevious(chatLog);

  const promptTokens = chatLog
    ? chatLog.reduce(
        (total, message, index) =>
          index < 3 || message.role === "user" || message.role === "system"
            ? total + (message.tokens || 0)
            : total,
        0,
      )
    : 0;

  const completionTokens = chatLog
    ? chatLog.reduce(
        (total, message, index) =>
          message.role === "assistant" && index > 2 ? total + (message.tokens || 0) : total,
        0,
      )
    : 0;

  const promptPrice = bot ? CHAT_COSTS[bot.model].prompt : 0;
  const completionPrice = bot ? CHAT_COSTS[bot.model].completion : 0;
  const promptsCost = !isStart ? promptTokens * promptPrice : 0;
  const completionsCost = completionTokens * completionPrice;
  const latestCost = promptsCost + completionsCost;

  useEffect(() => {
    if (!chatLog || !prevChatLog || !chatLog.length || prevChatLog.length === chatLog.length) {
      return;
    }

    const lastMessage = chatLog[chatLog.length - 1];
    const costToAdd = chatLog && lastMessage?.role === "assistant" ? promptsCost : completionsCost;
    console.log("prevChatLog.length", prevChatLog?.length);
    console.log("chatLog.length", chatLog.length);
    console.log("lastMessage", lastMessage);
    console.log("I SHOULD RUN and add", costToAdd, "to", totalCost);
    // setTotalCost(totalCost + costToAdd);
  }, [
    chatLog,
    completionPrice,
    completionsCost,
    latestCost,
    prevChatLog,
    promptPrice,
    promptsCost,
    totalCost,
  ]);

  if (!chatLog || !bot || !features.showTokens) {
    return null;
  }

  return (
    <Card className="mb-auto bg-orange-100 dark:bg-orange-900/50">
      <h6 className="text-orange-900 dark:text-orange-300">CHAT</h6>
      <KeyValueList
        keyClasses="text-xs text-orange-700 dark:text-orange-200 mr-4"
        valueClasses="text-sm"
        items={[
          { key: "Messages", value: chatLog.length },
          { key: "Prompts Tokens", value: promptTokens },
          { key: "Completions Tokens", value: completionTokens },
          { key: "Total Tokens", value: promptTokens + completionTokens },
        ]}
      />

      <br />
      <h6 className="text-orange-900 dark:text-orange-300">MODEL</h6>
      <KeyValueList
        keyClasses="text-xs text-orange-700 dark:text-orange-200 mr-4"
        valueClasses="text-sm"
        items={[
          { key: "Model", value: bot.model },
          { key: "Prompt Cost per token", value: formatter.format(promptPrice) },
          { key: "Completion Cost per token", value: formatter.format(completionPrice) },
        ]}
      />

      <br />
      <h6 className="text-orange-900 dark:text-orange-300">COST</h6>
      <KeyValueList
        keyClasses="text-xs text-orange-700 dark:text-orange-200 mr-4"
        valueClasses="text-sm"
        items={[
          { key: "Prompts Cost", value: formatter.format(promptsCost) },
          { key: "Completions Cost", value: formatter.format(completionsCost) },
          chatLog.length > 2
            ? { key: "Last Exchange Cost", value: formatter.format(latestCost) }
            : null,
          { key: "Total Cumulative Cost", value: "COMING SOON" },
        ]}
      />
    </Card>
  );
};
export default ChatStats;
