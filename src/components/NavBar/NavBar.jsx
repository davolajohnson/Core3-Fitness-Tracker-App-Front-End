import { Link } from "react-router-dom";
import logo from "../../assets/core3-logo.svg";

export default function NavBar({ user }) {
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
          <Link to="/workouts" className="nav__link">All Workouts</Link>
          <Link to="/workouts/new" className="btn hide-on-mobile">New Workout</Link>

          {!user ? (
            <>
              <Link to="/sign-in" className="nav__link">Sign In</Link>
              <Link to="/sign-up" className="btn">Sign Up</Link>
            </>
          ) : (
            <Link to="/dashboard" className="btn btn--ghost">Dashboard</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

