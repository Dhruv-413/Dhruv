"use client";

import { useState, useCallback } from "react";

/**
 * Custom hook for managing disclosure/toggle state
 * Used for expand/collapse, modals, dropdowns
 *
 * @example
 * ```tsx
 * const { isOpen, open, close, toggle } = useDisclosure();
 * ```
 */
export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle, setIsOpen };
}
