import "./Header.scss";
import profile from "../../images/Profile.png";
import { useContext } from "react";
import { SearchContext } from "../../Context/SearchContext";
import useAuth from "../../Hooks/useAuth";

function Header({ placeholder, input,  }) {
  const { setSeachedItem } = useContext(SearchContext);
  const [token] = useAuth(true)
  // const [{t}] = token
  const searchInputChange = (e) => {
    setSeachedItem(e.target.value);
  };

  return (
    <header>
      {input ? (
        <input
          type="text"
          placeholder={placeholder}
          className="search_input"
          onChange={searchInputChange}
        />
      ) : (
        ""
      )}
      <div className="user_wrapper">
        <div>
          <img src={profile} alt="profile" />
        </div>
          <h3>Abdulhakim {token.users_login}</h3>
        </div>
    </header>
  );
}

export default Header;
