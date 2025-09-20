import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../src/firebase/firebaseConfig'; // adjust path as needed

type UserContextType = {
  user: User | null;
  uid: string | null;
};

const UserContext = createContext<UserContextType>({ user: null, uid: null });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, uid: user?.uid ?? null }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);