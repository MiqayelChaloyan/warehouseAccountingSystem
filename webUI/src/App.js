import { Routes, Route, NavLink } from "react-router-dom";

import Warehouses from './components/warehouses/Warehouses';
import Products from "./components/products/Products";
import './App.css';


function App() {
  return (
    <>
      <div className="header">
        <li>
          <NavLink style={({ isActive }) =>
            (isActive ? { backgroundColor: '#545e6f', borderRight: '5px solid #2F4F4F' } : { backgroundColor: '' })} to="/products">
            Product
          </NavLink>
        </li>
        <li>
          <NavLink style={({ isActive }) =>
            (isActive ? { backgroundColor: '#545e6f', borderRight: '5px solid #2F4F4F' } : { backgroundColor: '' })} to="/warehouses">
            Warehouse
          </NavLink>
        </li>
      </div>

      <div className="main">
        <Routes>
          <Route  path="/" element={<Products />}/>
          <Route path="/products" element={<Products />} />
          <Route path="/warehouses" element={<Warehouses />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
