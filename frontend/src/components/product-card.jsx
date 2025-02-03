import PropTypes from "prop-types";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="border-1 border-black rounded-sm flex flex-col">
      <div className="w-full rounded-t-sm overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          className="w-full h-48 object-cover"
          alt="imagen producto"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-bold text-xl mb-2">{product.title}</h2>
        <h3 className="text-2xl font-bold mb-4">
          {product.price} <span className="text-sm font-light">clp</span>
        </h3>

        <div className="mt-auto flex gap-2">
          <button
            onClick={() => addToCart(product)}
            className="cursor-pointer border-1 border-black bg-blue-400 rounded-sm px-4 py-2 w-full text-center hover:bg-blue-600"
          >
            Agregar al carro
          </button>
          <a
            href={`/productos/${product.id.toString()}`}
            className="border-1 border-black rounded-sm bg-gray-300 px-4 py-2 w-full text-center cursor-pointer hover:bg-gray-500"
          >
            Ver Producto
          </a>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;
