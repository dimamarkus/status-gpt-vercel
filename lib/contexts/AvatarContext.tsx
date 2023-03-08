'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const DEFAULT_AVATAR_URL = '/avatar.svg';

export const DEFAULT_AVATAR_CONTEXT = {
  avatarUrl: DEFAULT_AVATAR_URL,
  setAvatarUrl: () => '',
};

export const AvatarContext = createContext<{
  avatarUrl: string;
  setAvatarUrl: Dispatch<SetStateAction<string>>;
}>(DEFAULT_AVATAR_CONTEXT);

type AvatarProps = {
  children: any;
};

export const AvatarContextProvider = ({ children }: AvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR_URL);
  return (
    <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatarContext = () => {
  return useContext(AvatarContext);
};
