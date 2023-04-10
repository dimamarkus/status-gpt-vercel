import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export const supabaseServerComponent = () =>
  createServerComponentSupabaseClient({
    headers,
    cookies,
  });

export const supabaseServerComponentWithSession = async () => {
  const nextCookies = cookies();
  const refreshToken = nextCookies.get("my-refresh-token");
  const accessToken = nextCookies.get("my-access-token");

  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  if (refreshToken && accessToken) {
    await supabase.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    });
  }

  return supabase;
};

export default supabaseServerComponent;
