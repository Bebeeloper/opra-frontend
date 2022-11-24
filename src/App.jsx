// import logo from './logo.svg';
import './App.css';
import { Products } from '../src/products/products';
import { AsideCMS } from '../src/asideCMS/asideCMS';

function App() {
  return (
    <div className='Opra-container'>
      <AsideCMS/>
      <Products/>
    </div>
  );
}

export default App;
