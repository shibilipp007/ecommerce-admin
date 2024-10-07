import { createContext, useContext, useState } from "react";

const SessionContext = createContext(undefined);

export default function SessionProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("USER")) || {}
  );

  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined)
    throw new Error("useSession must be within a SessionProvider");
  return context;
}
