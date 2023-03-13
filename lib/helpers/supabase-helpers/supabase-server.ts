import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "#/types/supabase";

export const createServerSideSupabase = () =>
  createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });
