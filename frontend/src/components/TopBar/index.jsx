import React from "react";
import { Link, useLocation } from "react-router-dom";
import logout from '../../assets/logout.png';
const TopBar = () =>{
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
    const location = useLocation();

    return(
        <>
            <nav className="bg-gradient-to-b from-sky-200 to-teal-100 flex flex-row max-h-40 min-h-20 px-2 shadow-lg sm:px-4 py-2.5 0 fixed w-full z-20 top-0 left-0 right-0 border-b border-gray-200">
                <div className="container flex flex-row w-full ">
                    <div className="left flex w-1/4 h-full items-center justify-center py-5">
                        <h1>EcoConnect</h1>
                    </div>

                    <div className="center flex w-1/2 h-full items-center justify-center">
                        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-inherit md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                                <li>
                                    <Link
                                        to="/profile"
                                        className={`block py-2 pl-3 pr-4 rounded text-sm ${
                                        location.pathname === "/profile"
                                            ? "text-blue-700"
                                            : "text-gray-700"
                                        } hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
                                    >Profile</Link>
                                </li>
                                <li>
                                    <Link
                                        to=""
                                        className={`block py-2 pl-3 pr-4 rounded text-sm ${
                                        location.pathname === ""
                                            ? "text-blue-700"
                                            : "text-gray-700"
                                        } hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
                                    >Event</Link>
                                </li>
                                <li>
                                    <Link
                                        to=""
                                        className={`block py-2 pl-3 pr-4 rounded text-sm ${
                                        location.pathname === ""
                                            ? "text-blue-700"
                                            : "text-gray-700"
                                        } hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
                                    >Communities</Link>
                                </li>
                                <li>
                                    <Link
                                        to=""
                                        className={`block py-2 pl-3 pr-4 rounded text-sm ${
                                        location.pathname === ""
                                            ? "text-blue-700"
                                            : "text-gray-700"
                                        } hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
                                    >Challenges</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="right flex w-1/4 h-full flex align-items-center justify-center p-2">
                    <button
                        onClick={handleLogout}
                        className="relative inline-flex items-center justify-center px-10  overflow-hidden text-sm  transition duration-300 ease-out border-2 border-emerald-900 bg-emerald-900 rounded-3xl shadow-md group"
                    >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-15 text-white duration-300 -translate-x-full bg-emerald-500 group-hover:translate-x-0 ease">
                        <img
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            src={logout}
                            alt="Logout"
                        ></img>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-15 text-white font-medium transition-all duration-300 transform group-hover:translate-x-full ease">
                        Log Out
                        </span>
                        <span className="relative invisible">Log out</span>
                    </button>
                    </div>
                </div>
                
            </nav>
        </>
    );
};

export default TopBar;