import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Nishant Library</h1>
        <ul className="nav-links">
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/return">Return Book</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
