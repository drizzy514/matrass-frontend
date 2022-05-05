import { createContext, useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [data, setData] = useState([]);
  const [param, setParam] = useState("");
  const [seachedItem, setSeachedItem] = useState("");
  const [name, setName] = useState("");
  const [token] = useAuth(true);

  useEffect(() => {
    if (seachedItem.length) {
      const searchResult = data.filter((e) => e.users_login);
      if (searchResult.length) {
        setData(searchResult);
      } 
    }
  }, [data, name, seachedItem]);

  useEffect(() => {
    async function getData() {
      if (param) {
        const response = await fetch(`https://matras-backend-g1.herokuapp.com${param}`, {
          headers: {
            token: token,
          },
            cookies: {token: token}
        });
        const res = await response.json();
        setData( res);
      }
    }

    getData();
  }, [param, token]);

  return (
    <SearchContext.Provider value={{ data, setParam, setSeachedItem, setName }}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
