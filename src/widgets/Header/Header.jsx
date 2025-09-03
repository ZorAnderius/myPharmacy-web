import { NavLink } from "react-router-dom";

const Header = () => {
   return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shops</NavLink>
        <NavLink to="/shop/create">Create Shop</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </header>
  );
}

export default Header