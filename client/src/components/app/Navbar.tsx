import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFetchData from "@/hooks/useFetchData";
import { useAuth } from "@/utils/AuthProvider";

const Navbar = () => {
  const { user: currentUser } = useAuth();
  const currentUserId = useAppSelector((state) => state.user.currentUserId);




  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-emerald-600">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <Link to="/" className="font-bold text-emerald-600">LocalLoop</Link>
        </div>
        <nav className="flex items-center space-x-6">
          {currentUser && currentUser._id ? (
            <>
              <Link to="/dashboard?tab=nearby">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to={`/messages/${currentUser._id}`}>
                <Button variant="ghost">Messages</Button>
              </Link>
              <Link to="/deals?tab=active">
                <Button variant="ghost">My Deals</Button>
              </Link>
              <Link to={`/profile/${currentUser._id}`}>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  My Profile
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="space-x-4">
                <Link to="/login">
                  <Button className="border border-emerald-700 bg-transparent text-emerald-700 hover:bg-emerald-700 hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
