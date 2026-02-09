import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">Arcade</span>
          <span className="brand-name">Cart</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          {token && (
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>
          )}
        </div>

        <div className="nav-actions">
          {!token && (
            <>
              <NavLink className="button ghost" to="/login">
                Login
              </NavLink>
              <NavLink className="button primary" to="/signup">
                Create Account
              </NavLink>
            </>
          )}
          {token && (
            <button className="button ghost" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
