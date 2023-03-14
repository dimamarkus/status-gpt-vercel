import { GptMessage } from "#/app/chat/lib/openai";
import { Database } from "#/lib/types/supabase";

export type DatabaseTables = Database["public"]["Tables"];
export type Customer = DatabaseTables["customers"]["Row"];
export type Price = DatabaseTables["prices"]["Row"];
export type Product = DatabaseTables["products"]["Row"];
export type Subscription = DatabaseTables["subscriptions"]["Row"];
export type User = DatabaseTables["users"]["Row"];
