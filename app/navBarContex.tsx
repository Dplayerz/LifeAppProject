
import React, { createContext, useContext, useState } from "react";

type NavVisibilityContextType = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};


const NavVisibilityContext = createContext<NavVisibilityContextType | null>(null);


export function NavVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);

  return (
    <NavVisibilityContext.Provider value={{ visible, setVisible }}>
      {children}
    </NavVisibilityContext.Provider>
  );
}


export function useNavVisibility() {
  const context = useContext(NavVisibilityContext);
  if (!context) throw new Error("useNavVisibility must be used inside NavVisibilityProvider");
  return context;
}