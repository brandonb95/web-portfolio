import { NavLink } from 'react-router-dom';

const Navbar = ({ handleShowHideNav }) => {
  function closeNav(e) {
    if (window.innerWidth < 600) {
      handleShowHideNav();
    } else {
      e.target.blur();
    }
  }

  return (
    <nav className="main-nav" onClick={closeNav}>
      <ul>
        <li>
          About
        </li>
        <li>
          Work
        </li>
        <li>
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;