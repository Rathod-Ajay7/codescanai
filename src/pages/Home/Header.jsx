import { Link } from "react-router-dom";
import { Sun, Moon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

export function Header({ isDark, setIsDark, user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex justify-between py-1 px-1 bg-white dark:bg-[#17171d] rounded  ">
      <Link to="/">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-8 h-8 rounded" alt="logo" />
          <span className="dark:text-white font-bold text-lg">CodeScan AI</span>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {!isDark ? (
            <Sun className="w-7 h-7 text-black" />
          ) : (
            <Moon className="w-7 h-7 text-white" />
          )}
        </Button>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm dark:text-white hidden sm:inline">{user.email}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-red-600 text-white hover:bg-red-700"
              size="sm"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="bg-blue-600 mx-1  text-white"
          >
            Signin
          </Button>
        )}
      </div>
    </div>
  );
}
export default Header;
