import React, { useState } from 'react';
// import ContactlessRoundedIcon from '@mui/icons-material/ContactlessRounded';
import { NavLink } from "react-router-dom";

const NavePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="index-page top-0">
      <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />
    </div>
  );
};

const Header = ({ toggleMenu, menuOpen }) => {
  return (
    <header className="header d-flex items-center m-2 ">
      <div className="container-fluid flex justify-between items-center px-4 py-1">
        <a href="/" className="flex items-center">
          <em className='font-bold'>MG.</em>
        </a>
        <nav className="navmenu hidden md:flex items-center space-x-4">
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-[#34b7a7] font-bold" : "text-Black"
                }
              >
                Invoice Form
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/seller_detail"
                className={({ isActive }) =>
                  isActive ? "text-[#34b7a7] font-bold" : "text-Black"
                }
              >
                Seller Detail
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/invoice_list"
                className={({ isActive }) =>
                  isActive ? "text-[#34b7a7] font-bold" : "text-Black"
                }
              >
                Invoice List
              </NavLink>
            </li>
            <li><NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? "text-[#34b7a7] font-bold" : "text-Black"
              }
            >
              Product
            </NavLink></li>
            <li><NavLink
              to="/product_list"
              className={({ isActive }) =>
                isActive ? "text-[#34b7a7] font-bold" : "text-Black"
              }
            >
              Product List
            </NavLink></li>
            <li><NavLink
              to="/credit_note"
              className={({ isActive }) =>
                isActive ? "text-[#34b7a7] font-bold" : "text-Black"
              }
            >
              Credit Note
            </NavLink></li>
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="hidden sm:block header-social-links flex space-x-4">
          <a href="/Contact" className="hover:text-[#05d3f7] transition-all duration-300"></a>
        </div>

        {/* Hamburger for mobile */}
        <button className="mobile-nav-toggle text-xl md:hidden px-4" onClick={toggleMenu}>
          {menuOpen ? 'X' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu flex flex-col md:hidden bg-gray-100 p-4">
          <a href="/" className="py-2">Invoice Form</a>
          <a href="/seller_detail" className="py-2">Seller Detail</a>
          <a href="/invoice_list" className="py-2">Invoice List</a>
          <a href="/product" className="py-2">Product</a>
          <a href="/product_list" className="py-2">Product List</a>
          <a href="/credit_note" className="py-2">Credit Note</a>
        </div>
      )}
    </header>
  );
};

export default NavePage;
