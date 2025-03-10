import { Link } from "react-router-dom";
import googleLoginLogo from "../assets/Google-Logo-SignIn.png";

const Home: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL_LOCAL;

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
