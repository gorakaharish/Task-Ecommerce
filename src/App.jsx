import Cart from "./components/Cart"
import Header from "./components/Header"
import Home from "./components/Home"
import ItemDetails from "./components/ItemDetails"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/item-details/:id" element={<ItemDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
