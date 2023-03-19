import { HashLink } from 'react-router-hash-link';

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
      <ul className='navbar-postpage'>
        <li>
          <HashLink to="/brandonbirk/home#about">About</HashLink>
        </li>
        <li>
          <HashLink to="/brandonbirk/home#works">Works</HashLink>
        </li>
        <li>
          <HashLink to="/brandonbirk/home#contact">Contact</HashLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;