import { Link } from 'react-router-dom';

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
          <a href="#about">About</a>
        </li>
        <li>
        <a href="#works">Works</a>
        </li>
        <li>
        <a href="#contact">Contact</a>

        </li>
      </ul>
    </nav>
  );
};

export default Navbar;