import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import logo from "../../assets/core3-logo.svg";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <header className="nav">
      <div className="container nav__bar">
        {/* Brand */}
        <Link to="/" className="brand" aria-label="Core3 Home">
          <img src={logo} alt="Core3 logo" className="logo" />
          <span className="brand__name">Core3</span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav__links">
          {user ? (
            <>
              <span className="nav__link">Welcome, {user.username}</span>
              <Link to={`/${user._id}/workouts`} className="btn btn--ghost">
                Dashboard
              </Link>
              <Link
                to={`/${user._id}/workouts/new`}
                className="btn hide-on-mobile"
              >
                New Workout
              </Link>
              <Link to="/" onClick={handleSignOut} className="nav__link">
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav__link">
                Home
              </Link>
              <Link to="/sign-in" className="nav__link">
                Sign In
              </Link>
              <Link to="/sign-up" className="btn">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}