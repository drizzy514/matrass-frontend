import { createContext, useEffect, useState } from "react";

const Auth = createContext();

function Provider({ children }) {
  const [token, setToken] = useState(
    window.localStorage.getItem("SECRET_KEY")
  );

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("SECRET_KEY", token);
    } else {
      window.localStorage.removeItem("SECRET_KEY");
    }
  }, [token]);

  return <Auth.Provider value={{ token, setToken }}>{children}</Auth.Provider>;
}

export { Auth, Provider };
