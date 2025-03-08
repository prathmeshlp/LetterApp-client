import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/user";
import { Link } from "react-router-dom";
import googleLoginLogo from "../assets/Google-Logo-SignIn.png";
import Dashboard from "./Dashboard";

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL_LOCAL;

  //
  console.log(user, "user");

  useEffect(() => {
    axios
      .get(`${apiUrl}/auth/user`, { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch(() => setUser(null));
  }, []);

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="border-2 border-black h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 ml-10">Letter Writing App</h1>
      <div className="sign-in-component flex justify-center items-center gap-2">
        <img src={googleLoginLogo} alt="googlelogo" className="w-10" />
        <span className="text-xl font-semibold cursor-pointer">
          <Link to={`${apiUrl}/auth/google`}>Sign in with Google</Link>
        </span>
      </div>
    </div>
  );
};

export default Home;
