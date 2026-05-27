import { createContext, useContext, useState } from "react";

const AccountContext = createContext(null);

const DEMO_USERS = [
  { id: 1, name: "Derek Huizar", email: "lemurya@demo.com", password: "123456", avatar: "DH", memberSince: "Mayo 2026" },
];

export function AccountProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [error, setError] = useState("");

  function login(email, password) {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safe } = found;
      setUser(safe);
      setError("");
      return true;
    }
    setError("Correo o contraseña incorrectos.");
    return false;
  }

  function logout() { setUser(null); }

  return (
    <AccountContext.Provider value={{ user, login, logout, error, setError }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  return useContext(AccountContext);
}
