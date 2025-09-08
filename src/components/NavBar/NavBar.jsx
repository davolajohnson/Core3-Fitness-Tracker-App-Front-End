import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import logo from "../../assets/core3-logo.svg";

export default function NavBar() {

  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
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
        <ul>
          <li>Welcome, {user.username}</li>
          <li><Link to={`/${user._id}/workouts`}>Dashboard</Link></li>
          <li><Link to={`/${user._id}/workouts/new`}>New Workout</Link></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
        
      </div>
    </header>
  );
}

