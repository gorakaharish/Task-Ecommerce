import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Hourglass } from "react-loader-spinner";
import { useCart } from "../../context/CartContext"; 

const ItemDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); 
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <Hourglass />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <h2 className="text-center mt-5">❌ Product Not Found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`✅ ${product.title} added to cart!`, { position: "top-right", autoClose: 2000 });
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="row" style={{ marginTop: "7.5rem" }}>
        <div className="col-12 col-md-6 col-lg-5 d-flex justify-content-center align-items-center">
          <img src={product.image} alt={product.title} className="w-75" />
        </div>
        <div className="col-md-6 col-12 col-lg-6 mt-5">
          <div className="p-3">
            <div className="card-body">
              <h4 className="card-title mb-3">{product.title}</h4>
              <p className="card-text mb-3">{product.description}</p>
              <div className="d-flex justify-content-between">
                <h5 className="text-primary">Price: &#8377;{product.price}</h5>
                <h6>Rating: {product?.rating?.rate} ⭐</h6>
              </div>
              <button className="btn btn-outline-primary mt-3" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
