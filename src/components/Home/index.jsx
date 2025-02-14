import axios from "axios";
import { useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "./../../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    if (!cart[product.id]) {
      addToCart(product);
      toast.success(`✅ ${product.title} successfully added to the cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      toast.info(`ℹ️ ${product.title} is already in the cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container" style={{ marginTop: "7.5rem" }}>
      <h1 className="fs-3 text-dark fw-bolder text-uppercase mb-3">All Products</h1>
      <ToastContainer />

      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <Bars />
        </div>
      )}

      <div className="row justify-content-center">
        {!loading &&
          products.map((product) => (
            <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-4 px-5 px-lg-0 px-md-0">
              <div className="card shadow-sm mx-2">
                <Link to={`/item-details/${product.id}`}>
                  <img
                    src={product.image}
                    className="card-img-top p-3"
                    alt={product.title}
                    height={200}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title fs-6 fw-bold">
                    {product.title.slice(0, 20)}
                  </h5>
                  <div className="d-flex justify-content-between">
                    <p className="card-text fw-bolder">&#8377;{product.price}</p>
                    <p className="card-text fw-bolder">{product.rating.rate}</p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-2 mb-3 mx-3">
                    <i
                      className="bi bi-plus border border-1 rounded-pill p-1 shadow-sm"
                      onClick={() => addToCart(product)}
                      style={{ cursor: "pointer" }}
                    ></i>
                    <span className="border border-1 rounded-pill px-2 p-1 shadow-sm">
                      {cart[product.id]?.quantity || 0}
                    </span>
                    <i
                      className="bi bi-dash border border-1 rounded-pill p-1 shadow-sm"
                      onClick={() => removeFromCart(product.id)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>

                  <button
                    className="btn btn-outline-primary shadow-sm w-100"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
