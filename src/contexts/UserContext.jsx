import { createContext, useState } from 'react';

const UserContext = createContext();

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user || null; 
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
