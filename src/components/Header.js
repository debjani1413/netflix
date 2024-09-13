import React, { useState } from 'react';
import logo from '../images/logo-netflix-removebg-preview.png';
import avatar from '../images/avatar-red.jpeg'; // Replace with your avatar image path
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/Firebase';
import { signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Sign out error', error);
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-8 py-2 md:py-4 bg-gradient-to-b from-black via-black/70 to-transparent z-50">
      {/* Netflix Logo */}
      <div className="flex-shrink-0 flex items-center space-x-4 md:space-x-10">
        <img 
          src={logo} 
          alt="Netflix Logo" 
          className="w-24 md:w-44 h-auto cursor-pointer" 
        />
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-white text-xs md:text-sm hover:text-gray-300">Home</a>
          <a href="#" className="text-white text-xs md:text-sm hover:text-gray-300">TV Shows</a>
          <a href="#" className="text-white text-xs md:text-sm hover:text-gray-300">Movies</a>
          <a href="#" className="text-white text-xs md:text-sm hover:text-gray-300">New & Popular</a>
          <a href="#" className="text-white text-xs md:text-sm hover:text-gray-300">My List</a>
        </nav>
        {/* Browse Menu for Smaller Screens */}
        <div className="relative md:hidden flex items-center">
          <FontAwesomeIcon 
            icon={faCaretDown} 
            className="text-white text-lg md:text-xl cursor-pointer" 
            onClick={() => setMenuOpen(!menuOpen)} 
          />
          {menuOpen && (
            <div className="absolute top-full m-auto mt-2 w-48 bg-black/80 text-white rounded-lg shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Home</li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">TV Shows</li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Movies</li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">New & Popular</li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">My List</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Search Icon and Avatar with Dropdown Menu */}
      <div className="relative flex items-center space-x-2 md:space-x-4">
        {/* Search Icon */}
        <FontAwesomeIcon 
          icon={faSearch} 
          className="text-white text-base md:text-lg cursor-pointer" 
        />
        {/* Avatar and Dropdown Menu */}
        <div className="relative">
          <img 
            src={avatar} 
            alt="Avatar" 
            className="w-8 md:w-10 h-auto cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)} 
          />
          <div 
            className={`absolute right-0 mt-2 w-48 bg-black text-white rounded-lg shadow-lg transition-opacity duration-200 ${dropdownOpen ? 'opacity-100' : 'opacity-0'}`}
          >
            <ul>
              <li 
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer" 
                onClick={handleSignOut}
              >
                Sign Out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
