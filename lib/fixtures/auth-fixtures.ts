import { User } from "@supabase/auth-helpers-nextjs";
import { StatusChatMessage } from "#/lib/types";

export const EXAMPLE_CHAT_MESSAGE: StatusChatMessage = {
  role: "user",
  content: "Hello world!",
  timestamp: Date.now(),
};

export const LOGGED_IN_USER: User = {
  id: "1",
  email: "example@example.com",
  created_at: Date.now().toString(),
  aud: "authenticated",
  user_metadata: {
    name: "Example User",
  },
  app_metadata: {
    provider: "email",
  },
};
