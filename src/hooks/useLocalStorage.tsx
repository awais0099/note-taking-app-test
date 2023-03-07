import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        console.log('useLocalStorage');
        if (jsonValue == null) {
            if (initialValue === 'function') {
                return (initialValue as () => T)()
            } else {
                return initialValue;
            }
        } else {
            return JSON.parse(jsonValue);
        }
    });

    // console.log({value});
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue] as [T, typeof setValue];
} 