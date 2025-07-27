const SweetCard = ({ name, description, stock, price, image }) => {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <p>{price}</p>

          <div className="card-actions">
            {stock > 0 ? (
              <button className="btn  bg-green-600 hover:bg-green-500">
                Order Now
              </button>
            ) : (
              <button className="btn disabled bg-green-600 hover:bg-green-500">
                Order Now
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SweetCard;
