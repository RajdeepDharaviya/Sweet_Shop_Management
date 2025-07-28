import axios from "axios";
import { BASE_URL } from "../constant";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeOneSweet } from "../utils/sweetSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const SweetCard = ({
  id,
  name,
  description,
  stock,
  price,
  image,
  handleDeleteSweet,
}) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [isDelete, setIsDelete] = useState(false);

  const handlePurchase = async (sweetId) => {
    try {
      const res = await axios.post(
        BASE_URL + `api/sweets/${sweetId}/purchase`,
        {
          quantity: 1, // Include credentials in the request
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Sweet purchased successfully!");
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  };

  if (!user) {
    return <div></div>;
  }

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <p>
            <span className="font-semibold">Price : </span> {price}
          </p>

          <div className="card-actions">
            {stock > 0 ? (
              <button
                onClick={() => handlePurchase(id)}
                className="btn  bg-green-600 hover:bg-green-500"
              >
                Order Now
              </button>
            ) : (
              <div>
                <p className="text-red-600 text-sm mb-2">
                  This Sweet is currently out of stock
                </p>
                <button
                  onClick={handlePurchase}
                  className="btn bg-green-600 hover:bg-green-500"
                  disabled
                >
                  Order Now
                </button>
              </div>
            )}
            {user.role === "admin" && (
              <Link
                to={"/update/sweets/" + id + "/" + name}
                className="btn  bg-green-600 hover:bg-green-500"
              >
                Update Sweet
              </Link>
            )}
            {user.role === "admin" && (
              <Link
                onClick={() => {
                  handleDeleteSweet(id);
                }}
                className="btn  bg-red-600 hover:bg-red-500"
              >
                Delete
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SweetCard;
