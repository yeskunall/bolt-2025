import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load value from localStorage on mount
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsedValue = JSON.parse(item);
        setStoredValue(parsedValue);
      }
    } catch (error) {
      console.error(`Failed to load data from localStorage for key "${key}":`, error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  // Save value to localStorage whenever storedValue changes (but only after initial load)
  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Failed to save data to localStorage for key "${key}":`, error);
    }
  }, [key, storedValue, isLoaded]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
    } catch (error) {
      console.error(`Failed to set value for key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}