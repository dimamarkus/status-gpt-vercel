"use client";

import { useChatContext } from "#/lib/contexts/ChatContext";
import { throttle } from "#/lib/helpers/functions/throttle";
import { useEffect, useRef, useState } from "react";

export const useAutoScroll = () => {
  const { appState, appActions } = useChatContext();
  const { selectedConversation, textareaRef } = appState;
  const { setCurrentMessage } = appActions;
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true);
    }
  };
  const throttledScrollDown = throttle(scrollDown, 250);

  useEffect(() => {
    throttledScrollDown();
    selectedConversation &&
      setCurrentMessage(selectedConversation.messages[selectedConversation.messages.length - 2]);
  }, [selectedConversation, setCurrentMessage, throttledScrollDown]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAutoScrollEnabled(entry.isIntersecting);
        if (entry.isIntersecting) {
          textareaRef.current?.focus();
        }
      },
      {
        root: null,
        threshold: 0.5,
      },
    );
    const messagesEndElement = messagesEndRef.current;
    if (messagesEndElement) {
      observer.observe(messagesEndElement);
    }
    return () => {
      if (messagesEndElement) {
        observer.unobserve(messagesEndElement);
      }
    };
  }, [messagesEndRef, textareaRef]);
};
