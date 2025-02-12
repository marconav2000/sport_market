import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router";
import useProducts from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { products, loading, error } = useProducts();

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((product) => product.id === id);
      setProduct(foundProduct);
    }
  }, [id, products]);

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
    } else {
      alert("Deberías primero logearte o registrarte");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 flex flex-col md:flex-row items-center">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={
              product.image ||
              `${import.meta.env.VITE_API_URL}/assets/${product.image}`
            }
            alt={product.title}
            className="object-cover w-80 h-80 rounded-lg shadow-md"
          />
        </div>
        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col items-start mt-4 md:mt-0 md:ml-6">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl font-bold mb-4">
            {product.price} <span className="text-sm font-light">clp</span>
          </p>
          <p className="mb-4">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="cursor-pointer border-1 border-black bg-blue-400 rounded-sm px-4 py-2 w-full text-center hover:bg-blue-600"
          >
            Agregar al carro
          </button>
        </div>
      </div>
      <a href="/">
        <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded">
          Volver al Home
        </button>
      </a>
    </div>
  );
}
