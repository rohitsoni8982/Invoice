import React, { useState } from 'react';
// import ContactlessRoundedIcon from '@mui/icons-material/ContactlessRounded';
import { NavLink } from "react-router-dom";

const NavePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sellerSubMenuOpen, setSellerSubMenuOpen] = useState(false); // For desktop
  const [mobileSellerSubMenuOpen, setMobileSellerSubMenuOpen] = useState(false); // For mobile
  const [productSubMenuOpen, setProductSubMenuOpen] = useState(false); // For desktop product
  const [mobileProductSubMenuOpen, setMobileProductSubMenuOpen] = useState(false); // For mobile product

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSellerSubMenu = () => setSellerSubMenuOpen((prev) => !prev);
  const toggleMobileSellerSubMenu = () => setMobileSellerSubMenuOpen((prev) => !prev);
  const toggleProductSubMenu = () => setProductSubMenuOpen((prev) => !prev);
  const toggleMobileProductSubMenu = () => setMobileProductSubMenuOpen((prev) => !prev);

  return (
    <div className="index-page top-0">
      <Header 
        toggleMenu={toggleMenu} 
        menuOpen={menuOpen} 
        sellerSubMenuOpen={sellerSubMenuOpen}
        toggleSellerSubMenu={toggleSellerSubMenu}
        mobileSellerSubMenuOpen={mobileSellerSubMenuOpen}
        toggleMobileSellerSubMenu={toggleMobileSellerSubMenu}
        productSubMenuOpen={productSubMenuOpen}
        toggleProductSubMenu={toggleProductSubMenu}
        mobileProductSubMenuOpen={mobileProductSubMenuOpen}
        toggleMobileProductSubMenu={toggleMobileProductSubMenu}
      />
    </div>
  );
};

const Header = ({ toggleMenu, menuOpen, sellerSubMenuOpen, toggleSellerSubMenu, mobileSellerSubMenuOpen, toggleMobileSellerSubMenu, productSubMenuOpen, toggleProductSubMenu, mobileProductSubMenuOpen, toggleMobileProductSubMenu }) => {
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
            <li className="relative">
              <button
                type="button"
                className="text-Black hover:text-[#34b7a7] font-bold focus:outline-none"
                onClick={toggleSellerSubMenu}
              >
                Seller
              </button>
              {sellerSubMenuOpen && (
                <ul className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  <li>
                    <NavLink
                      to="/seller_detail"
                      className={({ isActive }) =>
                        (isActive ? "text-[#34b7a7] font-bold" : "text-Black") + " block px-4 py-2 hover:bg-gray-100"
                      }
                      onClick={toggleSellerSubMenu}
                    >
                      Seller Detail
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/seller_list"
                      className={({ isActive }) =>
                        (isActive ? "text-[#34b7a7] font-bold" : "text-Black") + " block px-4 py-2 hover:bg-gray-100"
                      }
                      onClick={toggleSellerSubMenu}
                    >
                      Seller List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/client_invoice_view"
                      className={({ isActive }) =>
                        (isActive ? "text-[#34b7a7] font-bold" : "text-Black") + " block px-4 py-2 hover:bg-gray-100"
                      }
                      onClick={toggleSellerSubMenu}
                    >
                      Seller Invoice View
                    </NavLink>
                  </li>
                </ul>
              )}
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
            <li className="relative">
              <button
                type="button"
                className="text-Black hover:text-[#34b7a7] font-bold focus:outline-none"
                onClick={toggleProductSubMenu}
              >
                Product
              </button>
              {productSubMenuOpen && (
                <ul className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  <li>
                    <NavLink
                      to="/product"
                      className={({ isActive }) =>
                        (isActive ? "text-[#34b7a7] font-bold" : "text-Black") + " block px-4 py-2 hover:bg-gray-100"
                      }
                      onClick={toggleProductSubMenu}
                    >
                      Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/product_list"
                      className={({ isActive }) =>
                        (isActive ? "text-[#34b7a7] font-bold" : "text-Black") + " block px-4 py-2 hover:bg-gray-100"
                      }
                      onClick={toggleProductSubMenu}
                    >
                      Product List
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? "text-[#34b7a7] font-bold" : "text-Black") + " py-2"
            }
            onClick={toggleMenu}
          >
            Invoice Form
          </NavLink>
          <button
            type="button"
            className="py-2 text-left w-full focus:outline-none"
            onClick={toggleMobileSellerSubMenu}
          >
            Seller <span className="ml-1">▼</span>
          </button>
          {mobileSellerSubMenuOpen && (
            <div className="pl-4">
              <NavLink
                to="/seller_detail"
                className={({ isActive }) =>
                  (isActive ? "text-[#34b7a7] font-bold" : "text-Black") + " py-2 block"
                }
                onClick={toggleMenu}
              >
                Seller Detail
              </NavLink>
              <NavLink
                to="/seller_list"
                className={({ isActive }) =>
                  (isActive ? "text-[#34b7a7] font-bold" : "text-Black") + " py-2 block"
                }
                onClick={toggleMenu}
              >
                Seller List
              </NavLink>
            </div>
          )}
          <NavLink
            to="/invoice_list"
            className={({ isActive }) =>
              (isActive ? "text-[#34b7a7] font-bold" : "text-Black") + " py-2"
            }
            onClick={toggleMenu}
          >
            Invoice List
          </NavLink>
          <button
            type="button"
            className="py-2 text-left w-full focus:outline-none"
            onClick={toggleMobileProductSubMenu}
          >
            Product <span className="ml-1">▼</span>
          </button>
          {mobileProductSubMenuOpen && (
            <div className="pl-4">
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  (isActive ? "text-[#34b7a7] font-bold" : "text-Black") + " py-2 block"
                }
                onClick={toggleMenu}
              >
                Product
              </NavLink>
              <NavLink
                to="/product_list"
                className={({ isActive }) =>
                  (isActive ? "text-[#34b7a7] font-bold" : "text-Black") + " py-2 block"
                }
                onClick={toggleMenu}
              >
                Product List
              </NavLink>
            </div>
          )}
          <NavLink
            to="/credit_note"
            className={({ isActive }) =>
              (isActive ? "text-[#34b7a7] font-bold" : "text-Black") + " py-2"
            }
            onClick={toggleMenu}
          >
            Credit Note
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default NavePage;
