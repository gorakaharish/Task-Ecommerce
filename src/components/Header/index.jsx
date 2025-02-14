import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { getTotalItems } = useCart();

  return (
    <>
      <nav className="navbar bg-white shadow fixed-top">
        <div className="container-fluid p-2 mx-3 mx-lg-5 mx-md-5">
          <a className="navbar-brand" href="#">
            Ecommerce Cart
          </a>
          <div className="cart-icon d-flex flex-row justify-content-center align-items-center"> 
            <Link to={"/cart"} style={{textDecoration:"none" , color:"#000"}}><span className="rounded-pill border border-0 fs-5 px-2 shadow mx-1">
              {getTotalItems()}
            </span></Link>
            <Link to={"/cart"} className="text-dark"><i className="bi bi-cart-check-fill fs-2 "></i></Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
