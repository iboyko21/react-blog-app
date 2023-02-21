import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(response => {
        response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include'
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">#MyBlog</Link>
      <nav>
        {username && (
          <>
            <span className="hello">Hello, {username}</span>
            <Link to="/create" className="header-button">New Post</Link>
            <a className="header-button" onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="header-button">Login</Link>
            <Link to="/register" className="header-button">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}