import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AVATAR_RED, LOGO_RED, BACKDROP } from '../utils/constants';
import { PAGE } from '../router/routes';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../stores/userSlice';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [showNavList, setShowNavList] = useState(true);
  const [navbarOpacity, setNavbarOpacity] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth > 768);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScroll = 75;
    const opacity = Math.min((scrollPosition / maxScroll) * 90 + 0, 100);
    setNavbarOpacity(opacity);
    setShowNavList(scrollPosition < maxScroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setProfilePhoto(user?.photoURL || AVATAR_RED);
  }, [user]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate(PAGE.HOME);
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!user) return null;

  return (
    <div
      className={`navbar ${showNavList && !isLargeScreen ? 'h-[115px]' : 'h-[70px]'} backdrop-blur-xl bg-transparent md:backdrop-blur-none fixed top-0 w-full px-4 md:px-12 py-3 text-white`}
      style={{
        zIndex: 9999999,
        backgroundColor: !isLargeScreen && 'rgba(0, 0, 0, 0.5)',
        backgroundImage: isLargeScreen ? `linear-gradient(180deg, #141414 ${navbarOpacity}%,transparent)` : `url(${BACKDROP})`
      }}
    >
      <div className="flex items-center justify-between">
        <div className="md:mr-14">
          <div className="w-40 md:w-48">
            <Link to={PAGE.BROWSE}>
              <img src={LOGO_RED} className="w-full" alt="logo" />
            </Link>
          </div>
        </div>
        {/* Hamburger Menu Toggle */}
        {!isLargeScreen && (
          <div className="md:hidden flex items-center relative">
            <button onClick={toggleMenu}>
              <ArrowDropDownIcon fontSize='large' />
            </button>
            {isMenuOpen && (
              <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 bg-black/95 border border-gray-900 rounded-md min-w-[170px] pt-3 z-50">
                <Link to={PAGE.BROWSE} className="flex items-center px-4 py-2 gap-3 text-xs text-slate-500 hover:text-white">
                  Home
                </Link>
                <Link to={PAGE.SHOWS} className="flex items-center px-4 py-2 gap-3 text-xs text-slate-500 hover:text-white">
                  TV Show
                </Link>
                <Link to={PAGE.MOVIES} className="flex items-center px-4 py-2 gap-3 text-xs text-slate-500 hover:text-white">
                  Movies
                </Link>
                <Link to={PAGE.LATEST} className="flex items-center px-4 py-2 gap-3 mb-3 text-xs text-slate-500 hover:text-white">
                  New & Popular
                </Link>
              </div>
            )}
          </div>
        )}
        {/* Navbar links for larger screens */}
        <div className="gap-6 ml-4 text-white text-sm hidden md:flex">
          <Link to={PAGE.BROWSE} className="hover:text-gray-400">Home</Link>
          <Link to={PAGE.SHOWS} className="hover:text-gray-400">TV Show</Link>
          <Link to={PAGE.MOVIES} className="hover:text-gray-400">Movies</Link>
          <Link to={PAGE.LATEST} className="hover:text-gray-400">New & Popular</Link>
        </div>
        <div className="gap-6 ml-auto flex items-center">
          <Link to={PAGE.SEARCH} className="hover:text-gray-400 flex gap-2 items-center">
            <SearchOutlinedIcon style={{ fontSize: '28px' }} />
            <span className="hidden lg:block">Search</span>
          </Link>
          <div className="profile-dropdown relative" ref={dropdownRef}>
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleDropDown}>
              <div className="thumb aspect-square w-8 h-8 bg-gray-800">
                <img src={profilePhoto} alt={user.displayName} className="w-full h-full object-cover" />
              </div>
              <div className="text-sm hidden lg:block">{user.displayName}</div>
            </div>
            {isOpen && (
              <div className="bg-black/95 absolute z-50 right-0 top-10 min-w-[170px] pt-2 border border-gray-900 rounded-md">
                <a href="#!" className="flex items-center px-4 py-2 gap-3 text-xs text-slate-500 hover:text-white">
                  <div className="w-5 h-5 bg-cyan-500"></div>
                  <div className="title">Ruhi</div>
                </a>
                <a href="#!" className="flex items-center px-4 py-2 gap-3 text-xs text-slate-500 hover:text-white">
                  <div className="w-5 h-5 bg-green-500"></div>
                  <div className="title">Child</div>
                </a>
                <Link to={PAGE.PROFILE} className="flex items-center px-4 py-2 gap-3 text-xs text-slate-500 hover:text-white">
                  <div className="w-5 h-5 bg-gray-700"></div>
                  <div className="title">Manage Profile</div>
                </Link>
                <div className="px-2 gap-3 text-xs text-slate-300 flex justify-center items-center border-t border-gray-700 mt-4 hover:text-white">
                  <button className="p-3" onClick={handleSignOut}>Sign Out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
