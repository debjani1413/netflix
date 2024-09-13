import React from 'react';
import logo from '../images/logo-netflix-removebg-preview.png';

const Header = () => {
    return (
        <div className='absolute px-8 py-2 
                        bg-gradient-to-b 
                        from-black via-black/30 to-transparent 
                        w-screen h-screen'>
            <img src={logo}
             alt='logo'  className="w-44 h-25" />
        </div>
    )
}

export default Header;