'use client';

import { createContext, useContext, useState } from 'react';

export type Assumptions = {
  age: number;
  assets: number;
  debts: number;
  yearly_income: number;
  monthly_spending: number;
};

type AssumptionsContext = {
  assumptions: Assumptions;
  setAssumptions: (assumptions: Assumptions) => void;
  areAssumptionsShown: boolean;
  setShowAssumptions: (newState: boolean) => void;
};

export const DEFAULT_ASSUMPTIONS = {
  age: 35,
  assets: 20000,
  debts: 5000,
  yearly_income: 75000,
  monthly_spending: 4000,
};

export const DEFAULT_ASSUMPTION_CONTEXT = {
  assumptions: DEFAULT_ASSUMPTIONS,
  setAssumptions: () => false,
  areAssumptionsShown: false,
  setShowAssumptions: (newState: boolean) => false,
};

export const AssumptionsContext = createContext<AssumptionsContext>(
  DEFAULT_ASSUMPTION_CONTEXT,
);

type AssumptionsProps = {
  children: any;
};

export const AssumptionsContextProvider = ({ children }: AssumptionsProps) => {
  const [areAssumptionsShown, setShowAssumptions] = useState<boolean>(false);
  const [assumptions, setAssumptions] =
    useState<Assumptions>(DEFAULT_ASSUMPTIONS);
  return (
    <AssumptionsContext.Provider
      value={{
        assumptions,
        setAssumptions,
        areAssumptionsShown,
        setShowAssumptions: (newState: boolean) => {
          setShowAssumptions(newState);
        },
      }}
    >
      {children}
    </AssumptionsContext.Provider>
  );
};

export const useAssumptionsContext = () => {
  return useContext(AssumptionsContext);
};
