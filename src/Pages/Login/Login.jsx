import { useRef, useState } from "react";
import port from "../../assets/config";
import useAuth from "../../Hooks/useAuth";
import "./Login.scss";

function Login() {
  const [setToken] = useAuth(false);
  const [status] = useState(0);
  const email = useRef();
  const password = useRef();
  const loginSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await fetch(`${port.url}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*'
          },
          body: JSON.stringify({
            login: email.current.value,
            password: password.current.value,
          }),
        });
        // console.log(res.json())
        const data = await res.json();
        setToken(data);
      } catch (error) {
        console.log(error);
      }
    })();
  };


  return (
    <div className="container login_container">
      <div className="login_wrapper">
        <h2 className="login_title">Kirish</h2>
        <form onSubmit={loginSubmit}>
          <input
            required
            ref={email}
            type="text"
            placeholder="Login"
            style={
              status === 404
                ? {
                    border: "1px solid #D61F1F",
                  }
                : {}
            }
          />
          <input
            required
            ref={password}
            type="password"
            placeholder="Parol"
            style={
              status === 401
                ? {
                    border: "1px solid #D61F1F",
                  }
                : {}
            }
          />
          <button type="submit">Kirish</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
