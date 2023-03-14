import { createBrowserSupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import { ProductWithPrice } from "#/lib/types/stripe";
import type { Database } from "#/lib/types/supabase";

export const clientSideSupabase = createBrowserSupabaseClient<Database>();

export const updateUserName = async (user: User, name: string) => {
  await clientSideSupabase
    .from("users")
    .update({
      full_name: name,
    })
    .eq("id", user.id);
};
