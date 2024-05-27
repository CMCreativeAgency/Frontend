'use client';
import { createContext, useContext } from 'react';

export const ExampleContext = createContext({});

interface ExampleProps {
  children: React.ReactNode;
}

export default function ExampleProvider({ children }: ExampleProps) {
  const context = {};

  return (
    <ExampleContext.Provider value={context}>
      {children}
    </ExampleContext.Provider>
  );
}

export const useExampleContext = () => {
  return useContext(ExampleContext);
};
