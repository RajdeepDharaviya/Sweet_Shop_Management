import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../constant";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("raj@gmail.com");
  const [password, setPassword] = useState("raj@123");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Redirect to home page
  const dispatch = useDispatch(); // Access the Redux dispatch function
  // Function to handle login
  // This function will be called when the user clicks the login button
  const handleLogin = async (e) => {
    setError(""); // Reset error state
    e.preventDefault();
    // Handle login logic here
    try {
      if (email === "" || password === "") {
        console.error("Email and password cannot be empty");
        setError("Email and password cannot be empty");
        return;
      }
      const res = await axios.post(
        BASE_URL + "api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true, // Include credentials in the request
        }
      );
      if (res.status === 200) {
        // Redirect or show success message

        localStorage.setItem("token", res.data.jwtToken);

        // Dispatch action to add user to Redux store
        dispatch(addUser(res.data.user));
        navigate("/"); // Redirect to home page
      } else {
        // Handle error
        console.error("Login failed");
      }
    } catch (error) {
      // Handle error
      console.error("An error occurred during login:", error);
      setError(
        error?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="flex justify-center">
      <fieldset className="my-10 fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <div className="fieldset-header text-center">
          <legend className="fieldset-legend text-xl py-5">Login</legend>
        </div>

        <label className="label text-black">Email</label>
        <input
          type="email"
          className="input"
          placeholder="john@gmail.com..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label text-black">Password</label>
        <input
          type="password"
          className="input"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button onClick={handleLogin} className="btn btn-neutral mt-4">
          Login
        </button>
        <label className="label text-black my-3 ">
          Are you new user?
          <Link to={"/registration"} className="text-blue-600 text-center">
            Register here
          </Link>
        </label>
      </fieldset>
    </div>
  );
};

export default Login;
