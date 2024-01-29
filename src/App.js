import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './API/SignUp';
import Login from './API/Login';
import Cart from './API/Cart';
import Home from './API/Home';
import Product from './API/Product';
import About from './API/About';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
