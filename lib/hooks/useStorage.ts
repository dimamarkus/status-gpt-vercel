import { useCallback, useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, value: any) =>
  useStorage<T>(key, value, typeof window !== "undefined" ? window.localStorage : null);

export const useSessionStorage = <T>(key: string, value: any) => {
  return useStorage<T>(key, value, typeof window !== "undefined" ? window.sessionStorage : null);
};

type UseStorageReturn<T> = [T, React.Dispatch<React.SetStateAction<any>>, () => void];

const useStorage = <T>(
  key: string,
  value: any,
  storageObject: Storage | null,
): UseStorageReturn<T | undefined> => {
  const [storageValue, setStorageValue] = useState<T | undefined>(() => {
    if (!storageObject) return undefined;
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof value === "function") {
      return value();
    }
    return value;
  });

  useEffect(() => {
    if (!storageObject) return undefined;
    if (storageValue === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(storageValue));
  }, [key, storageValue, storageObject]);

  const remove = useCallback(() => {
    setStorageValue(undefined);
  }, []);

  return [storageValue, setStorageValue, remove];
};
