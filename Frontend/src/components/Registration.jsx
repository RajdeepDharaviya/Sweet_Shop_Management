import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../constant";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [firstName, setFirstName] = useState("rajdeep");
  const [lastName, setLastName] = useState("dharaviya");
  const [email, setEmail] = useState("rajdeep@gmail.com");
  const [password, setPassword] = useState("rajdeep@123");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Redirect to home page

  // Function to handle Registration
  // This function will be called when the user clicks the Registration button
  const handleRegistration = async (e) => {
    setError(""); // Reset error state
    e.preventDefault();
    // Handle Registration logic here
    try {
      if (email === "" || password === "") {
        console.error("Email and password cannot be empty");
        setError("Email and password cannot be empty");
        return;
      }
      const res = await axios.post(
        BASE_URL + "api/auth/register",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: "user", // Default role for registration
        },
        {
          withCredentials: true, // Include credentials in the request
        }
      );
      console.log("Registration response:", res);

      if (res.status === 201) {
        // Redirect or show success message

        navigate("/login"); // Redirect to home page
      } else {
        // Handle error
        console.error("Registration failed");
      }
    } catch (error) {
      // Handle error
      console.error("An error occurred during Registration:", error);
      setError(
        error?.response?.data?.message ||
          "Registration failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="flex justify-center">
      <fieldset className="my-10 fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <div className="fieldset-header text-center">
          <legend className="fieldset-legend text-xl py-5">Registration</legend>
        </div>

        <label className="label text-black">First Name</label>
        <input
          type="text"
          className="input"
          placeholder="john..."
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="label text-black">Last Name</label>
        <input
          type="text"
          className="input"
          placeholder="Deo..."
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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

        <button onClick={handleRegistration} className="btn btn-neutral mt-4">
          Registration
        </button>
      </fieldset>
    </div>
  );
};

export default Registration;
