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
          <Link to="../home/#about">About</Link>
        </li>
        <li>
          <Link to="../home/#works">Works</Link>
        </li>
        <li>
          <Link to="../home/#contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;