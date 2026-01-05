import { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, setUser, setShowUserLogin, navigate } = useAppContext();

  const logout = () => {
    setUser(null);
    navigate("/");
    setProfileOpen(false);
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">

        {/* Links */}
        <NavLink to="/" className="hover:text-primary transition">Home</NavLink>
        <NavLink to="/products" className="hover:text-primary transition">All Products</NavLink>
        <NavLink to="/contact" className="hover:text-primary transition">Contact</NavLink>

        {/* Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search icon" className="w-4 h-4" />
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer" onClick={()=>navigate("/cart")}>
          <img src={assets.nav_cart_icon} alt="nav-cart" className="w-6 opacity-80" />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
            0
          </span>
        </div>

        {/* Login / Profile */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <img
              src={assets.profile_icon}
              alt="profile icon"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <ul className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-2 w-40 text-sm">
                <li
                  className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                  onClick={() => { navigate("my orders"); setProfileOpen(false); }}
                >
                  My Orders
                </li>
                <li
                  className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}

      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <img src={assets.menu_icon} alt="menu icon" className="w-6 h-6" />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm sm:hidden flex">

          <NavLink to="/" className="block" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" className="block" onClick={() => setOpen(false)}>All Products</NavLink>
          {user && <NavLink to="/orders" className="block" onClick={() => setOpen(false)}>My Orders</NavLink>}
          <NavLink to="/contact" className="block" onClick={() => setOpen(false)}>Contact</NavLink>

          {!user ? (
            <button
              onClick={() => { setShowUserLogin(true); setOpen(false); }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}

        </div>
      )}

    </nav>
  );
};

export default Navbar;
