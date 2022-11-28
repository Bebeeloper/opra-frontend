import './products.css'
import { React, useEffect, useState } from 'react'
import { Product } from '../produc/product';
import { FiSearch } from 'react-icons/fi';
import { BsArrowDownUp } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { TbFaceIdError } from 'react-icons/tb';
import { FcAddDatabase } from 'react-icons/fc';
  
function Products(){

    const [productsArray, setProducts] = useState([]);
    const [productsNameArray, setProductsName] = useState([]);
    let [filterName, setFilterName] = useState(false);
    let [notFound, setNotFound] = useState(false);

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
        if (productName.value !== '') {
            fetch("http://localhost:3002/api/v1/products/name/" + productName.value)
              .then((response) => response.json())
              .then((data) => {
                setProductsName(data.data); // ⬅️ Guardar datos
                setFilterName(true);
              });
        }else {
            setProductsName(null);
            // setFilterName(false);
            setNotFound(true);
        }
      }

      const clearContent = event =>{
        let productName = document.getElementById('filter');
        setFilterName(false);
        productName.value = '';
        setNotFound(false);
      };

      const addProduct = event =>{
        fetch('http://localhost:3002/api/v1/products', {
            method: 'POST',
            body: JSON.stringify({
                ref: '0005',
                name: 'Bicicletaaaa',
                cost: 10000,
                price: 20000,
                image: 'https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2022/08/toyota-t-bike-bicicleta-electrica-toyota-2791257.jpg'
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
                    <button onClick={filterByName}><FiSearch/></button>
                </div>
                <button onClick={clearContent}> <MdCancel className='cancel-btn'/></button>
                <button onClick={addProduct}> <FcAddDatabase/> </button>
            </div>
            <table>
                <tr className='header-table'>
                    <th> # </th>
                    <th>Imagen</th>
                    <th> 
                        <div> 
                            <p>Referencia</p> 
                            <BsArrowDownUp className='icon-arrow'/> 
                        </div> 
                    </th>
                    <th> 
                        <div> 
                            <p>Nombre del producto</p> 
                            <BsArrowDownUp className='icon-arrow'/> 
                        </div> 
                    </th>
                    <th> 
                        <div> 
                            <p>Costo</p> 
                            <BsArrowDownUp className='icon-arrow'/> 
                        </div> 
                    </th>
                    <th> 
                        <div> 
                            <p>Precio</p> 
                            <BsArrowDownUp className='icon-arrow'/> 
                        </div> 
                    </th>
                </tr>
                {
                    filterName === true ?          
                        productsNameArray.map((prod, i) => (
                            <Product product = {prod} key={prod.refId} index={i}/>
                        )) 
                    :
                        productsArray.map((pro, i) => (
                            <Product product = {pro} key={pro.refId} index={i}/>
                        ))
                }
            </table>
            {
                notFound && productsNameArray?.length === 0 ? 
                    <div className='not-found'><TbFaceIdError/></div> 
                : 
                    ''
            }
        </section>
    </main>
  )
}

export { Products }
