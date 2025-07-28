import { useEffect } from "react";
import SweetCard from "./SweetCard";
import axios from "axios";
import { BASE_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addSweet, removeOneSweet } from "../utils/sweetSlice";

const DashBoard = () => {
  const dispatch = useDispatch(); // Assuming you are using Redux for state management

  const sweetsSelector = useSelector((store) => store.sweet); // Get sweets from Redux store

  // Fetch sweets data from the API or state management
  // This is a placeholder for actual data fetching logic
  const fetchSweets = async () => {
    try {
      const res = await axios.get(BASE_URL + "api/sweets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true, // Include credentials in the request
      });
      console.log("Sweets fetched successfully:", res.data);
      // Dispatch action to add sweets to Redux store
      if (res.data?.length > 0) {
        dispatch(addSweet(res.data));
        return; // Assuming you have an action to add sweets
      }
      dispatch(addSweet([]));
    } catch (error) {
      console.error("Error fetching sweets:", error);
    }
  };

  const handleDeleteSweet = async (sweetId) => {
    try {
      const res = await axios.delete(BASE_URL + `api/sweets/${sweetId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(removeOneSweet(sweetId));
      alert("Sweet deleted successfully!");
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching sweets data...");

    fetchSweets();
  }, []);

  if (!sweetsSelector) {
    return (
      <div className="flex my-4 flex-row items-center justify-center flex-wrap gap-4">
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
        <ShimmerCard />
      </div>
    );
  }

  if (sweetsSelector.length === 0) {
    return (
      <div className="flex my-4 flex-row items-center justify-center flex-wrap gap-4">
        <h1 className="text-red-500">No sweets found</h1>
      </div>
    );
  }

  return (
    <div className="flex my-4 flex-row items-center justify-center flex-wrap gap-4">
      {sweetsSelector.map((sweet) => {
        return (
          <SweetCard
            key={sweet._id}
            id={sweet._id}
            name={sweet.name}
            description={sweet.description}
            image={sweet.image}
            stock={sweet.stock}
            price={sweet.price}
            handleDeleteSweet={handleDeleteSweet}
          />
        );
      })}
    </div>
  );
};

// Shimmer effect for loading state
// This can be used while fetching data
const ShimmerCard = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm animate-pulse">
      <figure className="px-10 pt-10">
        <div className="h-48 w-full bg-gray-300 rounded-xl"></div>
      </figure>
      <div className="card-body items-center text-center">
        <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-64 bg-gray-300 rounded mb-1"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mb-4"></div>
        <div className="card-actions">
          <div className="h-10 w-24 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
