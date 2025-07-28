import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constant";
import { useDispatch } from "react-redux";
import { addOneSweet, removeOneSweet } from "../utils/sweetSlice";
import { useNavigate, useParams } from "react-router-dom";
const UpdateSweet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sweetId, sweetName } = useParams();

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [error, setError] = useState("");

  // Function to handle Registration
  // This function will be called when the user clicks the Registration button
  const handleUpdateSweet = async (sweetId) => {
    try {
      if (
        image === "" ||
        category === "" ||
        name === "" ||
        description === "" ||
        price === 0 ||
        stock === 0
      ) {
        console.error("image and category cannot be empty");
        setError("Please enter valid value");
        return;
      }
      const res = await axios.put(
        BASE_URL + `api/sweets/${sweetId}`,
        {
          name: name,
          image: image,
          description: description,
          price: price,
          stock: stock,
          category: category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res?.status === 404) {
        alert("Something is wrong!");
      }
      dispatch(removeOneSweet(sweetId));
      dispatch(addOneSweet(res?.data));

      alert("Sweet updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error during purchase:", error);
      setError(
        error?.response?.data?.message ||
          "Registration failed. Please check your credentials."
      );
    }

    setError(""); // Reset error state
  };

  useEffect(() => {
    console.log("called");

    axios
      .get(BASE_URL + `api/sweets/search?term=` + sweetName, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res?.data);

        setName(res?.data[0]?.name);
        setCategory(res?.data[0]?.category);
        setDescription(res?.data[0]?.description);
        setImage(res?.data[0]?.image);
        setPrice(res?.data[0]?.price);
        setStock(res?.data[0]?.stock);
      });
  }, []);

  return (
    <div className="flex justify-center">
      <fieldset className="my-10 fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <div className="fieldset-header text-center">
          <legend className="fieldset-legend text-xl py-5">Registration</legend>
        </div>

        <label className="label text-black">Name</label>
        <input
          type="text"
          className="input"
          placeholder="john..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="label text-black">Description </label>
        <input
          type="text"
          className="input"
          placeholder="Deo..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="label text-black">image</label>
        <input
          type="text"
          className="input"
          placeholder="john@gmail.com..."
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label className="label text-black">category</label>
        <input
          type="text"
          className="input"
          placeholder="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label className="label text-black">price</label>
        <input
          type="number"
          className="input"
          placeholder="category"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label className="label text-black">stock</label>
        <input
          type="number"
          className="input"
          placeholder="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          onClick={() => {
            handleUpdateSweet(sweetId);
          }}
          className="btn btn-neutral mt-4"
        >
          Update Sweet
        </button>
      </fieldset>
    </div>
  );
};

export default UpdateSweet;
