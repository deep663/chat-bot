import { useEffect, useState } from "react";
import Bg from "../assets/Bot.jpg";
import Logo from "../assets/chat-bot.png";
import Roles from "../config/roles.json";
import Dists from "../config/districts_and_institutions.json";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/16/solid";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userDistrict, setUserDistrict] = useState("");
  const [userInstitution, setUserInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [roles, setRoles] = useState([]);
  const [districtsData, setDistrictsData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);

  useEffect(() => {
    setRoles(Roles);

    setDistrictsData(Dists.districts);
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      const district = districtsData.find((d) => d.name === selectedDistrict);
      setFilteredInstitutions(district ? district.institutions : []);
    }
  }, [selectedDistrict, districtsData]);

  const handleDistrictChange = (event) => {
    setUserDistrict(event.target.value.toString());
    setSelectedDistrict(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(firstName, lastName, userRole, userDistrict, userInstitution, email, password);

    if (password !== confirmPassword) {
      setShowAlert(true);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/register",
          {
            First_Name: firstName,
            Last_Name: lastName,
            Role: userRole,
            District: userDistrict,
            Institution_Name: userInstitution,
            Email: email,
            Password: password,
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setSuccess(true);
          window.location.href = "/login";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center">
      <div
        style={{ backgroundImage: `url(${Bg})` }}
        className="z-0 lg:basis-8/12 h-full bg-no-repeat bg-cover bg-center"
      ></div>
      <div className="container w-full lg:basis-4/12 h-fit bg-white px-4">
        <div className="flex justify-center ">
          <img src={Logo} width="64px" alt="DB chat" />
          <h2 className="text-center text-3xl font-bold my-auto mx-2">
            Welcome
          </h2>
        </div>
        <div className="container w-100 px-2">
          <h3 className="text-center text-2xl font-bold my-4 text-gray-800">
            Sign Up here
          </h3>

          {/* Wrong password alert */}
          {showAlert && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Password did not match!</strong>
              <span className="block sm:inline">
                {" "}
                Please enter same password.
              </span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3 hover:cursor-pointer"
                onClick={() => setShowAlert(false)}
              >
                <XMarkIcon width={24} />
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5 mb-4">
              <label htmlFor="first-name" className="self-center">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-400 py-2 px-4 rounded"
              />
              <label htmlFor="last-name" className="self-center">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-400 py-2 px-4 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-4">
              <label className="self-center">Role</label>
              <div className="flex items-center space-x-4">
                <select
                  id="Role"
                  className="border border-gray-400 py-2 px-4 rounded"
                  onChange={(e) => setUserRole(e.target.value.toString())}
                >
                  <option defaultChecked>
                    Select Your Role
                  </option>
                  {roles.map((role, index) => (
                    <option
                      key={index}
                      value={role}
                    >
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-4">
              <label htmlFor="district" className="self-center">
                District
              </label>
              <select
                id="district"
                className="border border-gray-400 py-2 px-4 rounded"
                onChange={handleDistrictChange}
              >
                <option defaultChecked>
                  Select Your District
                </option>
                {districtsData.map((district, index) => (
                  <option
                    key={index}
                    value={district.name}
                  >
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-4">
              <label htmlFor="Institution Name" className="self-center">
                Institution Name
              </label>
              <select
                id="Institution Name"
                className="border border-gray-400 py-2 px-4 rounded"
                onChange={(e) => setUserInstitution(e.target.value.toString())}
              >
                <option value="" defaultChecked>
                  Select Your Institution
                </option>
                {filteredInstitutions.map((institution, index) => (
                  <option
                    key={index}
                    value={institution}
                  >
                    {institution}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-4">
              <label htmlFor="Email" className="self-center">
                Email
              </label>
              <input
                type="email"
                id="Email"
                placeholder="Email"
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

            <div className="grid grid-cols-2 gap-5 mb-4">
              <label htmlFor="C-password" className="self-center">
                Confirm Password
              </label>
              <input
                type="password"
                id="C-password"
                placeholder=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-400 py-2 px-4 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
            >
              Register
            </button>
            <p className="text-center mt-2">
              Already have an account?
              <a
                href="/login"
                className="text-blue-500 hover:underline cursor-pointer"
              >{" "}
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
      {success && (
        <div
        className="bg-green-200 border-green-600 text-green-600 border-l-4 p-4"
        role="alert"
      >
        <p className="font-bold">Success</p>
        <p>You have successfully registered.</p>
      </div>)}
    </div>
  );
}

export default SignUp;
