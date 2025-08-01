import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSweet, removeSweet } from "../utils/sweetSlice";

export default function Navbar() {
  const user = useSelector((store) => store.user);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    // e.preventDefault();
    setSearch(e.target.value);
    if (e.target.value === "") {
      axios
        .get(BASE_URL + `api/sweets`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          dispatch(removeSweet());
          dispatch(addSweet(res.data));
        });

      return;
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, []);

  useEffect(() => {
    console.log("called");

    if (search === "") {
      return;
    }
    let time = setTimeout(() => {
      axios
        .get(BASE_URL + `api/sweets/search?term=` + search, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          dispatch(removeSweet());
          if (res?.status === 201) {
            dispatch(addSweet([]));
            return;
          }
          dispatch(addSweet(res.data));
        });
    }, 300);

    return () => {
      clearTimeout(time);
    };
  }, [search]);

  if (!user) {
    return <div></div>;
  }

  return (
    <nav className=" text-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 text-xl font-bold">
              <Link to={"/"}>Sweet Shop</Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* {
                <details className="dropdown">
                  <summary className="text-black hover:text-slate-700 transform transition-all hover:scale-[1.10] px-3 py-2 text-lg font-medium  duration-200">
                    Filter
                  </summary>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </details>
              } */}
              {!user && (
                <Link
                  to={"/login"}
                  href="#"
                  className="text-black hover:text-slate-700 transform transition-all hover:scale-[1.10] px-3 py-2 text-lg font-medium  duration-200"
                >
                  Login
                </Link>
              )}
              {user?.role === "admin" && (
                <Link
                  to={"/add/sweet"}
                  href="#"
                  className="text-black hover:text-slate-700 transform transition-all hover:scale-[1.10] px-3 py-2 text-lg font-medium  duration-200"
                >
                  Add Sweet
                </Link>
              )}

              <a
                onClick={() => {
                  window.location.reload();
                  localStorage.removeItem("token");
                }}
                href="#"
                className="text-black text-lg hover:text-slate-700 transform transition-all hover:scale-[1.10] px-3 py-2  font-medium duration-200"
              >
                Logout
              </a>
            </div>
          </div>

          {/* Right side - Search, Notifications, Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {
                  handleSearch(e);
                }}
                value={search}
                type="text"
                placeholder="Search"
                className="bg-white text-black border border-black placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-100 transition-colors duration-200 w-64"
              />
            </div>

            {/* Profile */}
            <div className="flex items-center"></div>
          </div>

          {/* Mobile menu button - CSS only toggle */}
          <div className="md:hidden">
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            <label
              htmlFor="menu-toggle"
              className="cursor-pointer p-2 bg-black rounded-lg hover:bg-slate-700 transition-colors duration-200 block"
            >
              {/* Hamburger icon */}
              <div className="peer-checked:hidden">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              {/* X icon */}
              <div className="hidden peer-checked:block">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </label>

            {/* Mobile menu - hidden by default, shown when checkbox is checked */}
            <div className="hidden peer-checked:block absolute top-16 left-0 w-full bg-white border-t border-slate-700 z-50">
              <div className="px-6 pt-2 pb-3 space-y-1">
                {/* {
                  <a
                    href="#"
                    className="block px-3 py-2 text-base font-medium text-black hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
                  >
                    Filter
                  </a>
                } */}
                {!user && (
                  <Link
                    to={"/login"}
                    href="#"
                    className="text-black hover:text-slate-700 transform transition-all hover:scale-[1.10] px-3 py-2 text-lg font-medium  duration-200"
                  >
                    Login
                  </Link>
                )}

                {user?.role === "admin" && (
                  <Link
                    to={"/add/sweet"}
                    href="#"
                    className="text-black hover:text-slate-700 transform transition-all hover:scale-[1.10] px-3 py-2 text-lg font-medium  duration-200"
                  >
                    Add Sweet
                  </Link>
                )}
                <a
                  onClick={() => {
                    window.location.reload();
                    localStorage.removeItem("token");
                  }}
                  href="#"
                  className="block px-3 py-2 font-medium text-black hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
                >
                  Logout
                </a>
              </div>

              {/* Mobile search and profile section */}
              <div className="px-6 pt-2 pb-3 border-t border-slate-700">
                {/* Mobile Search */}
                <div className="relative mb-3">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-white text-black border border-black placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-100 transition-colors duration-200"
                    onChange={(e) => {
                      console.log("called");

                      handleSearch(e);
                    }}
                    value={search}
                  />
                </div>

                {/* Mobile profile section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                    />
                    <span className="text-sm font-medium text-white">
                      John Doe
                    </span>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                    <svg
                      className="h-5 w-5 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-5 5v-5zM8 17H3l5 5v-5zM18 6a6 6 0 11-12 0v5l-2 2v3h16v-3l-2-2V6z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
