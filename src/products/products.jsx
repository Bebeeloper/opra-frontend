import {React, useEffect, useState } from 'react'
import { Product } from '../produc/product';
  
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
        <input placeholder='Filtrar producto por nombre' type="text" />
        <section className='products-container'>
            {productsArray.map(pro => (
                <Product product = {pro} key={pro.refId}/>
            ))}
        </section>
    </main>
  )
}

export { Products }
