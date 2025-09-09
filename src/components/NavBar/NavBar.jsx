// src/components/NavBar/NavBar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import logo from "../../assets/core3-logo.svg";

export default function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <header className="nav">
      <div className="container nav__bar">
        <Link to="/" className="brand" aria-label="Core3 Home">
          <img src={logo} alt="Core3 logo" style={{ width: 28, height: 28 }} />
          <span style={{ marginLeft: ".6rem", fontWeight: 800 }}>Core3</span>
        </Link>

        <nav>
          <ul className="nav__links">
            <li><Link to="/workouts">All Workouts</Link></li>
            {user ? (
              <>
                <li><Link to="/workouts/new">New Workout</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/sign-out">Sign Out</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/sign-in">Sign In</Link></li>
                <li><Link to="/sign-up" className="btn">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
