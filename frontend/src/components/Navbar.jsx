import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
const Navbar = () => {
  const { user, logout } = useUserStore();
  console.log(user);

  const isAdmin = user?.role === "admin";
  return (
    <header
      className="fixed top-0 left-0 w-full bg-yellow-200 bg-opacity-90 backdrop-blur-md
     shadow-lg z-40 transition-all duration-300 border-b border-green-600"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-yellow-400 items-center space-x-2 flex"
          >
            Burmese Food
            {/* add border to text */}
          </Link>
          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="text-black hover:text-yellow-500 transition duration-300 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to="/cart"
                className="relative group text-black hover:text-yellow-500 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 text-black transition-colors duration-300 ease-in-out group-hover:text-yellow-500"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                <span
                  className="absolute -top-2 -left-2 text-xs bg-yellow-400 text-black rounded-full px-2 py-0.5 
              transition-colors duration-300 ease-in-out group-hover:bg-yellow-500"
                >
                  4
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className="bg-yellow-500 text-black hover:text-white 
              border border-transparent hover:border hover:border-black
              px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center
                transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Log out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-yellow-400 text-black hover:text-white py-2 px-4 rounded-md
                border border-transparent hover:border hover:border-black
                transition duration-300 ease-in-out flex items-center"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign up
                </Link>
                <Link
                  to={"/login"}
                  className="bg-gray-700 text-white hover:text-gray-600 py-2 px-4 rounded-md
                transition duration-300 ease-in-out flex items-center"
                >
                  <LogIn className="mr-2" size={18} />
                  Log in
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
