"use client";

import { createContext, useContext, useEffect, useState } from "react";

const EnquiryContext = createContext(null);
const STORAGE_KEY = "printmagic_enquiry";

export function EnquiryProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (product) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleItem = (product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  };

  const clear = () => setItems([]);

  const isSelected = (id) => items.some((p) => p.id === id);

  return (
    <EnquiryContext.Provider
      value={{ items, addItem, removeItem, toggleItem, clear, isSelected }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  }
  return ctx;
}
