import { createBrowserSupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import { ProductWithPrice } from "types/stripe";
import type { Database } from "types/supabase";

export const clientSideSupabase = createBrowserSupabaseClient<Database>();

export const updateUserName = async (user: User, name: string) => {
  await clientSideSupabase
    .from("users")
    .update({
      full_name: name,
    })
    .eq("id", user.id);
};
