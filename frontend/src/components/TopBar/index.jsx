import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import logout from "../../assets/logout.png";
import Dropdown from "../Dropdown";
const TopBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const location = useLocation();

  return (
    <>
      <nav className="bg-gradient-to-b from-amber-100 to-amber-50 flex flex-row max-h-40 min-h-20 px-2 shadow-lg sm:px-4 py-2.5 0 fixed w-full z-20 top-0 left-0 right-0 border-b border-gray-200">
        <div className="container flex flex-row w-full ">
          <div className="left flex w-1/4 h-full items-center justify-center py-5">
            <div>
              <img className="" width="180" height="80" alt="Logo" src={logo} />
            </div>
          </div>

          <div className="center flex w-1/2 h-full items-center justify-center">
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
              <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
                <li>
                  <Link
                    to="/"
                    className={`block py-2 pl-3 pr-4 rounded text-base ${
                      location.pathname === "/"
                        ? "text-blue-700"
                        : "text-gray-700"
                    } hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className={`block py-2 pl-3 pr-4 rounded text-base ${
                      location.pathname === "/profile"
                        ? "text-blue-700"
                        : "text-gray-700"
                    } hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/community"
                    className={`block py-2 pl-3 pr-4 rounded text-base ${
                      location.pathname === "/community"
                        ? "text-blue-700"
                        : "text-gray-700"
                    } hover:bg-blue-700 hover:text-white md:hover:bg-transparent md:hover:text-blue-700 md:p-0`}
                  >
                    Communities
                  </Link>
                </li>
              </ul>
              <div className="mx-1">
                <Dropdown />
              </div>
            </div>
          </div>

          <div className="right w-1/4 h-full flex align-items-center justify-center p-2 py-3">
            <button
              onClick={handleLogout}
              className="relative inline-flex items-center justify-center px-10 overflow-hidden text-sm text-black transition duration-300 ease-out border-2 border-teal-400 bg-teal-400 rounded-3xl shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-15 text-black duration-300 -translate-x-full border-2 border-teal-200 bg-teal-200 group-hover:translate-x-0 ease">
                <img
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  src={logout}
                  alt="Logout"
                ></img>
              </span>
              <span className="absolute flex items-center justify-center w-full h-15 text-black font-semibold transition-all duration-300 transform group-hover:translate-x-full ease">
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
