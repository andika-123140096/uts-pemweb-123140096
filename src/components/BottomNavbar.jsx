import { NavLink } from "react-router-dom";
import { Home, Search, BookOpen } from "lucide-react";

const BottomNavbar = () => {
  return (
    <nav className="fixed right-0 bottom-0 left-0 mx-8 mb-4 rounded-lg bg-white/90 p-4 shadow-lg backdrop-blur-md">
      <div className="flex justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${isActive ? "text-blue-500" : "text-gray-500"}`
          }
        >
          <Home size={24} />
          Home
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${isActive ? "text-blue-500" : "text-gray-500"}`
          }
        >
          <Search size={24} />
          Search
        </NavLink>
        <NavLink
          to="/reading-list"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${isActive ? "text-blue-500" : "text-gray-500"}`
          }
        >
          <BookOpen size={24} />
          Reading List
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavbar;
