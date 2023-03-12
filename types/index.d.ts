import { Strapi } from "@strapi/strapi";
import { GptMessage } from "#/features/chat/openai";
import { Database } from "#/types/supabase";

export type DateTimeValue = string;
export type DatabaseTables = Database["public"]["Tables"];

export type Customer = DatabaseTables["customers"]["Row"];
export type Price = DatabaseTables["prices"]["Row"];
export type Product = DatabaseTables["products"]["Row"];
export type Subscription = DatabaseTables["subscriptions"]["Row"];
export type User = DatabaseTables["users"]["Row"];

export type ChatMessage = GptMessage & {
  timestamp: number;
};

export type CommonSizes = "xs" | "sm" | "md" | "lg" | "xl";
