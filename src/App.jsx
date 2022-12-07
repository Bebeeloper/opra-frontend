// import logo from './logo.svg';
import './App.css';
import { Products } from '../src/products/products';
import { AsideCMS } from '../src/asideCMS/asideCMS';
import { Route, Routes } from "react-router-dom";

const Ventas = () => <h1>Hola mundo</h1>
// const Products = () => <Products/>

function App() {

  return (
    <div className='Opra-container'>
      <AsideCMS />
      <Routes>
        <Route path='/Ventas' element={<Ventas />}/>
        <Route path="/Inventory" element={<Products/>} />
      </Routes>
    </div>
  );
}

export { App };
