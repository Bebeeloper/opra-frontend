import './products.css'
import { React, useEffect, useState } from 'react'
import { Product } from '../produc/product';
import { FcSearch } from 'react-icons/fc';
  
function Products(){

    const [productsArray, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3002/api/v1/products")
          .then((response) => response.json())
          .then((data) => {
            setProducts(data); // ⬅️ Guardar datos
          });
      }, []);

      console.log('Products array: ',productsArray);

  return (
    <main className='main-container'>
        <h1>Inventario</h1>
        <section className='products-container'>
            <div className='product-search'>
                <input placeholder='Filtrar producto por nombre' type="text" />
                <button><FcSearch/></button>
            </div>
            <table>
                <tr className='header-table'>
                    <td>Imagen</td>
                    <td>Referencia</td>
                    <td>Nombre del producto</td>
                    <td>Precio</td>
                </tr>
                {productsArray.map(pro => (
                    <Product product = {pro} key={pro.refId}/>
                ))}
            </table>
        </section>
    </main>
  )
}

export { Products }
