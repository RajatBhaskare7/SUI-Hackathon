import AppLogo from "./sub-components/AppLogo";
// import ThemeControl from "./sub-components/ThemeControl";
import { Link } from "react-router-dom";
import { useState } from "react";
const links = [ "FAQ", "CONTACT"];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <header className=" top-0 w-full mt-2 py-4 px-1 min-h-16 flex items-center justify-between gap-2  z-10">
        <div className="flex items-center  right-0">
            <AppLogo onClick={() => window.location.assign("/")} className="cursor-pointer" />
            {/* Navigation Links (Hidden on lg screens) */}
           
        </div>
        {/* Hamburger Menu (Visible on sm screens) */}
        <div className="flex items-center gap-6 sm:hidden">
            {/* Hamburger Icon */}
            <button onClick={toggleMenu} className="block text-gray-600 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                
                </svg>
            </button>
        </div>
        {/* Full-Screen Overlay Menu */}
        {isMenuOpen && (
        <> 
        
           
          

          
            <div
                style={{
                    backgroundColor:"#211E30"
                }}
            className="fixed top-0 left-0 w-full h-full z-50">

                 <button onClick={toggleMenu} className="fixed right-2 top-4  z-50 block text-gray-600 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                
                </svg>
            </button>
                <div className=" p-4 rounded-lg h-full flex justify-center items-center">
                    {/* Your navigation links go here */}
                    
                    <div className="flex flex-col items-center gap-4">
                    
                {links.map((link, index) => (
                    <a href={"#"+link} key={index} to={`#${link.toLowerCase()}`}>
                        <span 
                            style={{
                                fontFamily:'Redzone'
                            }}
                        className="text-white-600 hover:text-white-900">{link}</span>
                    </a>
                ))}
            
                    <Link to="auth/admin">                
                    <button
                        type="button"
                        style={{
                            margin: '10px',
                            fontFamily: 'Redzone'
                        }}
                        className={`rounded-full py-3 px-5 bg-[#4326f3] hover:bg-[#3b1dff]`}
                    >
                        Login Admin
                    </button>
                </Link>
                <Link to="auth/user">
                    <button
                        type="button"
                        style={{
                            fontFamily: 'Redzone'
                        }}
                        className={`rounded-full py-3 px-5 bg-[#4326f3] hover:bg-[#3b1dff]`}
                    >
                        Login User
                    </button>
                </Link>
                    </div>
                </div>
            </div>
            </>
        )}
        {/* Authentication Buttons */}
        <div className="flex items-center gap-6">
            {/* ThemeControl */}
            {/* <ThemeControl /> */}
            {/* Login Buttons */}
            <div className="ml-24 sm:block hidden lg:flex flex-row flex-wrap gap-8">
                {links.map((link, index) => (
                    <a href={"#"+link} key={index} to={`#${link.toLowerCase()}`}>
                        <span 
                             style={{
                                fontFamily:'Redzone'
                            }}
                        className="text-white-600 hover:text-white-900">{link}</span>
                    </a>
                ))}
            </div>
            <div className="flex hidden sm:block">
                <Link to="auth/admin">                
                    <button
                        type="button"
                        style={{
                            margin: '10px',
                            fontFamily: 'Redzone'
                        }}
                        className={`rounded-full py-3 px-5 bg-[#4326f3] hover:bg-[#3b1dff]`}
                    >
                        Login Admin
                    </button>
                </Link>
                <Link to="auth/user">
                    <button
                        type="button"
                        style={{
                            fontFamily: 'Redzone'
                        }}
                        className={`rounded-full py-3 px-5 bg-[#4326f3] hover:bg-[#3b1dff]`}
                    >
                        Login User
                    </button>
                </Link>
            </div>
        </div>
    </header>

    );
}
