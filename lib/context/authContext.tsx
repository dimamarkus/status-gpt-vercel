'use client';

import { clientSideSupabase } from '#/lib/supabase-client';
import { Session, User } from '@supabase/auth-helpers-nextjs';
import { AuthError } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Subscription } from 'types/stripe';

export const EVENTS = {
  PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
  SIGNED_OUT: 'SIGNED_OUT',
  USER_UPDATED: 'USER_UPDATED',
};

export const VIEWS = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
};

export type AuthContextType = {
  initial: boolean;
  session: Session | null;
  user: User | null;
  view: string | null;
  isLoading: boolean;
  supabase: typeof clientSideSupabase;
  subscription: Subscription | null;
  setView: (view: string) => void;
  signOut: () => Promise<{ error: AuthError | null }>;
};

export const AuthContext = createContext<AuthContextType>({
  initial: false,
  session: null,
  user: null,
  view: null,
  isLoading: false,
  subscription: null,
  supabase: clientSideSupabase,
  setView: () => {},
  signOut: () => Promise.resolve({ error: null }),
});

type AuthProviderProps = {
  children: React.ReactNode;
  accessToken: string | null;
};

export const AuthContextProvider = (props: AuthProviderProps) => {
  console.log(`AuthContextProvider`);
  const [supabase] = useState(clientSideSupabase);
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
      } = await clientSideSupabase.auth.getSession();
      setSession(activeSession);
      setUser(activeSession?.user ?? null);
      setInitial(false);
      console.log('getActiveSession', activeSession);
    }
    getActiveSession();
    console.log('about to listne', session);
    const {
      data: { subscription: authListener },
    } = clientSideSupabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh();
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsloadingData(false);
      switch (event) {
        case EVENTS.PASSWORD_RECOVERY:
          setView(VIEWS.UPDATE_PASSWORD);
          break;
        case EVENTS.SIGNED_OUT:
        case EVENTS.USER_UPDATED:
          setView(VIEWS.SIGN_IN);
          break;
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
      subscription: null, // TODO
      isLoading: isLoadingData,
      signOut: () => clientSideSupabase.auth.signOut(),
    };
  }, [initial, isLoadingData, session, supabase, user, view]);

  return <AuthContext.Provider value={value} {...rest} />;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
