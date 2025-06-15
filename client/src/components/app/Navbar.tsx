import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import { useEffect, useState } from "react";

type CurrentUser = {
  _id: string;
  uid: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  offeredSkills: string[];
  seekedSkills: string[];
  location: {
    zip: string;
    address: string;
  };
};

const Navbar = () => {
  const users = useSelector((state: any) => state.user.users);
  const [user, loading] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [loading]);

  useEffect(() => {
    if (user) {
      const userUid = user.uid;
      const matchId = users.find((user: any) => user.uid === userUid);

      if (matchId) {
        setCurrentUser(matchId);
      }
    }
  }, [user, users]);

  if (loading) return <Loading />;

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
          <span className="font-bold text-emerald-600">LocalLoop</span>
        </div>
        <nav className="flex items-center space-x-6">
          {currentUser && currentUser._id ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/messages">
                <Button variant="ghost">Messages</Button>
              </Link>
              <Link to="/deals">
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
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="ghost">How It Works</Button>
              </Link>
              <Link to="/browse-skills">
                <Button variant="ghost">Browse Skills</Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost">About</Button>
              </Link>
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
