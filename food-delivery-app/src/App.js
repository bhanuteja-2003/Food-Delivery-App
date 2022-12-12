import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";
import Footer from './components/Layout/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AvailableMeals from './components/Meals/AvailableMeals';

function App() {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CartProvider>
              {showCart && <Cart onClose={hideCartHandler}/>}
              <Header onShowCart={showCartHandler} flag={true}/>
            </CartProvider>
          }
        ></Route>

        <Route
          path="/order"
          element={
            <CartProvider>
              {showCart && <Cart onClose={hideCartHandler} />}
              <Header onShowCart={showCartHandler} flag={false}/>
                <Meals></Meals>
            </CartProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
