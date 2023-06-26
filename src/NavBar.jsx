/* eslint-disable react/prop-types */
import { Logo } from "./Logo";

export function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
