import './products.css'
import { React, useEffect, useState } from 'react'
import { Product } from '../produc/product';
import { FcSearch } from 'react-icons/fc';
import { BsArrowDownUp } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
  
function Products(){

    const [productsArray, setProducts] = useState([]);
    const [productsNameArray, setProductsName] = useState([]);
    let [filterName, setFilterName] = useState(false);
    

    console.log(filterName);

    useEffect(() => {
        fetch("http://localhost:3002/api/v1/products")
          .then((response) => response.json())
          .then((data) => {
            setProducts(data); // ⬅️ Guardar datos
          });
      }, []);

      const filterByName = event => {
        let productName = document.getElementById('filter');
        fetch("http://localhost:3002/api/v1/products/name/" + productName.value)
          .then((response) => response.json())
          .then((data) => {
            setProductsName(data.data); // ⬅️ Guardar datos
            setFilterName(true);
          });
      }

      const clearContent = event =>{
        let productName = document.getElementById('filter');
        setFilterName(false);
        productName.value = '';
      };

      const addProduct = event =>{
        fetch('http://localhost:3002/api/v1/products', {
            method: 'POST',
            body: JSON.stringify({
                ref: '0005',
                name: 'Bicicletaaaa',
                cost: 10000,
                price: 20000,
                image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
             .then((response) => response.json())
             .then((data) => {
                console.log(data);
                // Handle data
             })
             .catch((err) => {
                console.log(err.message);
             });
      };

  return (
    <main className='main-container'>
        <h1>Inventario</h1>
        <section className='products-container'>
            <div className='product-filters'>
                <div className='product-search'>
                    <input id='filter' placeholder='Filtrar producto por nombre' type="text" />
                    <button onClick={filterByName}><FcSearch/></button>
                </div>
                <button onClick={clearContent}> <MdCancel/></button>
                <button onClick={addProduct}> + </button>
            </div>
            <table>
                <tr className='header-table'>
                    <td>Imagen</td>
                    <td> 
                        <div> 
                            <p>Referencia</p> 
                            <BsArrowDownUp className='icon-arrow'/> 
                        </div> 
                    </td>
                    <td> 
                        <div> 
                            <p>Nombre del producto</p> 
                            <BsArrowDownUp className='icon-arrow'/> 
                        </div> 
                    </td>
                    <td> 
                        <div> 
                            <p>Costo</p> 
                            <BsArrowDownUp className='icon-arrow'/> 
                        </div> 
                    </td>
                    <td> 
                        <div> 
                            <p>Precio</p> 
                            <BsArrowDownUp className='icon-arrow'/> 
                        </div> 
                    </td>
                </tr>
                {
                    filterName === true ?                     
                        productsNameArray.map(prod => (
                            <Product product = {prod} key={prod.refId}/>
                        ))
                        
                    :
                        productsArray.map(pro => (
                            <Product product = {pro} key={pro.refId}/>
                        ))
                }
            </table>
        </section>
    </main>
  )
}

export { Products }
