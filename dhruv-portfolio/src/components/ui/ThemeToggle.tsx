"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "dark" | "light";

// External store for theme management
const themeStore = {
  listeners: new Set<() => void>(),
  
  getSnapshot: () => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("theme") as Theme) || "dark";
  },
  
  getServerSnapshot: () => "dark",
  
  subscribe: (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    
    const handleStorage = () => {
      callback();
    };
    const handleThemeChange = () => {
      callback();
    };
    
    window.addEventListener("storage", handleStorage);
    window.addEventListener("themechange", handleThemeChange);
    
    themeStore.listeners.add(callback);
    
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("themechange", handleThemeChange);
      themeStore.listeners.delete(callback);
    };
  },
  
  setTheme: (newTheme: Theme) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);
    themeStore.listeners.forEach(listener => listener());
    // Dispatch custom event for other components
    window.dispatchEvent(new Event("themechange"));
  },
};

// Hook to use theme from external store
function useTheme() {
  return useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );
}

// Hook to check if mounted (client-side only) using useSyncExternalStore pattern
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const theme = useTheme();
  const mounted = useMounted();

  const toggleTheme = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    themeStore.setTheme(newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-md hover:bg-primary/10 hover:text-primary transition-all hover:scale-110 active:scale-95 touch-manipulation"
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-md hover:bg-primary/10 hover:text-primary transition-all hover:scale-110 active:scale-95 touch-manipulation"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 transition-transform duration-300 rotate-0 scale-100" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-300 rotate-0 scale-100" aria-hidden="true" />
      )}
    </Button>
  );
}
