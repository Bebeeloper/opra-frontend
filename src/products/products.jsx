import './products.css'
import { React, useEffect, useState } from 'react'
import { Product } from '../produc/product';
import { BsArrowDownUp } from 'react-icons/bs';
import { TbFaceIdError } from 'react-icons/tb';
import { FcAddDatabase } from 'react-icons/fc';
import { ModalDelete } from '../modalDelete/modalDelete';
import { ModalPostProduct } from '../modalPOSTProduct/modalPOSTProduct';
  
function Products(){

    const [productsNameArray, setProductsName] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editProduct, setEditProduct] = useState({});
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('')
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3002/api/v1/products")
          .then((response) => response.json())
          .then((data) => {
            // setProducts(data); // ⬅️ Guardar datos
            setProductsName(data)
          });
      }, []);

      const addProduct = event =>{
        setOpenModal(true);
      };

      const onChangeSearch = event =>{
        let productName = document.getElementById('filter');
        if (productName.value !== '') {
            fetch("http://localhost:3002/api/v1/products/name/" + productName.value)
              .then((response) => response.json())
              .then((data) => {
                setProductsName(data.data); // ⬅️ Guardar datos
            });
        }

        if (productName.value === '') {
            fetch("http://localhost:3002/api/v1/products")
                .then((response) => response.json())
                .then((data) => {
                    setProductsName(data)
                });
        }
      };
      

  return (
      <main className='main-container'>
        <ModalDelete 
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            deleteId={deleteId}
            setDeleteId={setDeleteId}
            deleting={deleting}
            setDeleting={setDeleting}
            productsNameArray={productsNameArray}
            setProductsName={setProductsName}
        />
        <ModalPostProduct 
            productsNameArray={productsNameArray} 
            setProductsName={setProductsName} 
            isOpen={openModal} 
            openModal={openModal} 
            setOpenModal={setOpenModal}
            editing={editing}
            setEditing={setEditing}
            editProduct={editProduct}
            setEditProduct={setEditProduct}
        />
        <h1>Inventario</h1>
        <section className='products-container'>
            <div className='product-filters'>
                {/* <div className='product-search'> */}
                    <input id='filter' placeholder='Filtrar producto por nombre' type="text" onChange={onChangeSearch} />
                    {/* <button onClick={filterByName}><FiSearch/></button> */}
                {/* </div> */}
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
                        <p>Cantidad</p>
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
                    <th></th>
                    <th></th>
                </tr>
                {
                    productsNameArray.map((prod, i) => (
                        <Product 
                            product = {prod} 
                            key={prod.refId} 
                            index={i}
                            editing={editing}
                            setEditing={setEditing}
                            openModal={openModal} 
                            setOpenModal={setOpenModal}
                            editProduct={editProduct}
                            setEditProduct={setEditProduct}
                            deleteOpen={deleteOpen}
                            setDeleteOpen={setDeleteOpen}
                            deleteId={deleteId}
                            setDeleteId={setDeleteId}
                        />
                    )) 
                }
            </table>
            {
                productsNameArray?.length === 0 ? 
                    <div className='not-found'><TbFaceIdError/></div> 
                : 
                    ''
            }
        </section>
        
    </main>
  )
}

export { Products }
