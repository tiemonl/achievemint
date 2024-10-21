interface LocalStorageHook {
    value: string | null;
    setValue: (value: string) => void;
    getValue: () => string | null;
    storageKey: string;
}

export function useLocalStorage(key: string): LocalStorageHook {
    return {
        value: localStorage.getItem(key),
        storageKey: key,
        setValue: (value: string) => localStorage.setItem(key, value),
        getValue: () => localStorage.getItem(key)
    }
}