import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PremiumContext = createContext(null);

const STORAGE_KEY = '@para_dos_premium';

export const FREE_LIMITS = {
  posiciones: 25,
  verdades: 15,
  retos: 20,
};

export function PremiumProvider({ children }) {
  const [isPremium, setIsPremiumState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(val => { if (val === 'true') setIsPremiumState(true); })
      .finally(() => setLoading(false));
  }, []);

  const setIsPremium = async (value) => {
    setIsPremiumState(value);
    await AsyncStorage.setItem(STORAGE_KEY, value ? 'true' : 'false');
  };

  const restorePurchase = async () => {
    // TODO: call IAP restore here, then setIsPremium(true) if valid receipt
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored === 'true') setIsPremiumState(true);
    return stored === 'true';
  };

  return (
    <PremiumContext.Provider value={{ isPremium, setIsPremium, restorePurchase, loading }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const ctx = useContext(PremiumContext);
  if (!ctx) throw new Error('usePremium must be used inside PremiumProvider');
  return ctx;
}
