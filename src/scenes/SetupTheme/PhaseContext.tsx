import type { Dispatch, SetStateAction, FC, ReactNode, JSX } from "react";
import { createContext, useState, useContext } from "react";

import type { AnimationPhase } from "./types";

interface PhaseContextType {
  phase: AnimationPhase;
  setPhase: Dispatch<SetStateAction<AnimationPhase>>;
}

export const PhaseContext = createContext<PhaseContextType | null>(null);

export const usePhaseContext = useContext<PhaseContextType>;

export const PhaseContextProvider: FC<{ children: ReactNode }> = ({
  children,
}): JSX.Element => {
  const [phase, setPhase] = useState<AnimationPhase>(1);

  return (
    <PhaseContext.Provider value={{ phase, setPhase }}>
      {children}
    </PhaseContext.Provider>
  );
};
