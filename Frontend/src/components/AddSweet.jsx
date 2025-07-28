import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../constant";

const AddSweet = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [error, setError] = useState("");

  // Function to handle Registration
  // This function will be called when the user clicks the Registration button
  const handleAddSweet = async (e) => {
    setError(""); // Reset error state
    e.preventDefault();
    // Handle Registration logic here
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
      const res = await axios.post(
        BASE_URL + "api/sweet",
        {
          name: name,
          description: description,
          image: image,
          category: category,
          price: price,
          stock: stock,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"), // Include the token in the Authorization header
          },
          withCredentials: true, // Include credentials in the request
        }
      );
      console.log("Registration response:", res);

      if (res.status === 201) {
        // Redirect or show success message

        alert("Sweet added succesfully");
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

        <button onClick={handleAddSweet} className="btn btn-neutral mt-4">
          Add Sweet
        </button>
      </fieldset>
    </div>
  );
};

export default AddSweet;
