import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Body = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Body;
