import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, addToCart, removeFromCart, removeItemFromCart, clearCart } =
    useCart();

  return (
    <div className="container" style={{ marginTop: "7rem" }}>
      <h2 className="mb-4 text-center">🛒 Your Cart</h2>

      {Object.keys(cart).length === 0 ? (
        <h4 className="text-center">Your cart is empty!</h4>
      ) : (
        <>
          <div className="row">
            {Object.values(cart).map((item) => (
              <div key={item.id} className="col-12 col-md-8 mx-auto">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border p-3 mb-2 rounded shadow-sm">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid rounded me-3"
                      style={{
                        maxWidth: "80px",
                        height: "80px",
                        objectFit: "contain",
                      }}
                    />
                    <div>
                      <h5 className="fw-bold">{item.title.slice(0, 20)}...</h5>
                      <p className="mb-0 fw-semibold text-danger">
                        Price: &#8377;{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mt-2 mt-md-0">
                    <button
                      className="btn btn-sm btn-outline-secondary mx-1 rounded-circle"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i
                        className="bi bi-dash"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </button>
                    <span className="fw-bold mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-primary mx-1 rounded-circle"
                      onClick={() => addToCart(item)}
                    >
                      <i
                        className="bi bi-plus"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </button>
                  </div>

                  <button
                    className="btn btn-sm btn-outline-danger ms-3 mt-3 mt-md-0 mt-lg-0"
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    <i className="bi bi-trash"></i> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <button className="btn btn-danger" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
