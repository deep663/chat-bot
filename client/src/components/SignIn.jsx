import axios from "axios";
import Bg from "../assets/Bot.jpg";
import Logo from "../assets/chat-bot.png";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";

function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const signin = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        Email: email,
        Password: password,
      });
      if(response.data) {
        signin({
          auth: {
            token: response.data.token,
            type: "Bearer",
          },
          userState: { userRole: response.data.role, name: response.data.name },
        });
        localStorage.setItem("user", response.data.name);
        navigate("/");

      }
    } catch (error) {
      setShowAlert(true);
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center">
        <div
          style={{ backgroundImage: `url(${Bg})` }}
          className="z-0 lg:basis-8/12 h-full bg-no-repeat bg-cover bg-center"
        ></div>
        <div className="container w-full lg:basis-4/12 h-fit bg-white px-4">
          <div className="flex justify-center">
            <img src={Logo} width="64px" alt="DB chat" />
            <h2 className="text-center text-3xl font-bold my-auto mx-2">
              Welcome
            </h2>
          </div>
          <div className="container w-100 px-2">
            <h3 className="text-center text-2xl font-bold my-4 text-gray-800">
              Log In Here
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5 mb-4">
                <label htmlFor="Email" className="self-center">
                  Email
                </label>
                <input
                  type="email"
                  id="Iemail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400 py-2 px-4 rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-4">
                <label htmlFor="Password" className="self-center">
                  Password
                </label>
                <input
                  type="password"
                  id="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-400 py-2 px-4 rounded"
                />
              </div>
              
              {showAlert && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Unauthorized!</strong>
                <span className="block sm:inline">
                  {" "}
                  Wrong Email id or password.
                </span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3 hover:cursor-pointer"
                  onClick={() => setShowAlert(false)}
                >
                  <XMarkIcon width={24} />
                </span>
              </div>
            )}

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <input type="checkbox" id="rememberMe" className="mr-2" />
                  <label htmlFor="rememberMe" className="px-1">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="#!" className="text-blue-500 hover:underline">
                    Forget password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-5 py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
              >
                Log In
              </button>
              <p className="text-center mt-4">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
