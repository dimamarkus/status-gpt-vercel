"use client";
import { Session, User } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { Subscription } from "#/lib/types/stripe";
import { browserSupabase } from "#/lib/databases/supabase/supabase-browser";

export const EVENTS = {
  PASSWORD_RECOVERY: "PASSWORD_RECOVERY",
  TOKEN_REFRESHED: "TOKEN_REFRESHED",
  SIGNED_IN: "SIGNED_IN",
  SIGNED_OUT: "SIGNED_OUT",
  USER_UPDATED: "USER_UPDATED",
  USER_DELETED: "USER_DELETED",
};

export const VIEWS = {
  SIGN_IN: "sign_in",
  SIGN_UP: "sign_up",
  FORGOTTEN_PASSWORD: "forgotten_password",
  MAGIC_LINK: "magic_link",
  UPDATE_PASSWORD: "update_password",
};

export type AuthContextType = {
  initial: boolean;
  session: Session | null;
  user: User | null;
  view: string | null;
  isLoading: boolean;
  supabase: typeof browserSupabase;
  // subscription: Subscription | null;
  setView: (view: string) => void;
  signOut: () => Promise<{ error: AuthError | null }>;
};

export const AuthContext = createContext<AuthContextType>({
  initial: false,
  session: null,
  user: null,
  view: null,
  isLoading: false,
  // subscription: null,
  supabase: browserSupabase,
  setView: () => {},
  signOut: () => Promise.resolve({ error: null }),
});

type AuthProviderProps = {
  children: React.ReactNode;
  accessToken: string | null;
};

export const AuthContextProvider = (props: AuthProviderProps) => {
  const [supabase] = useState(browserSupabase);
  const [isLoadingData, setIsloadingData] = useState(false);
  const [initial, setInitial] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState(VIEWS.SIGN_IN);
  const router = useRouter();
  const { accessToken, ...rest } = props;

  useEffect(() => {
    async function getActiveSession() {
      setIsloadingData(true);
      const {
        data: { session: activeSession },
      } = await browserSupabase.auth.getSession();
      setSession(activeSession);
      setUser(activeSession?.user ?? null);
      setInitial(false);
    }
    getActiveSession();
    const {
      data: { subscription: authListener },
    } = browserSupabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh();
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsloadingData(false);
      switch (event) {
        case EVENTS.SIGNED_IN:
        case EVENTS.TOKEN_REFRESHED:
          const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
          if (currentSession) {
            document.cookie = `my-access-token=${currentSession.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
            document.cookie = `my-refresh-token=${currentSession.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
          }
        case EVENTS.PASSWORD_RECOVERY:
          setView(VIEWS.UPDATE_PASSWORD);
        // redirect("/auth/update-password");
        case EVENTS.SIGNED_OUT:
        case EVENTS.USER_DELETED:
          // delete cookies on sign out
          const expires = new Date(0).toUTCString();
          document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
          document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
          setView(VIEWS.SIGN_IN);
        // redirect("/auth/sign-in");
        // case EVENTS.USER_UPDATED:
        default:
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      view,
      setView,
      supabase,
      // subscription: null, // TODO
      isLoading: isLoadingData,
      signOut: () => browserSupabase.auth.signOut(),
    };
  }, [initial, isLoadingData, session, supabase, user, view]);

  return <AuthContext.Provider value={value} {...rest} />;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
