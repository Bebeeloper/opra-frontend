import './modalPOSTProduct.css'
import React from 'react'
import { MdCancel } from 'react-icons/md';
import { RiSave3Fill } from 'react-icons/ri';

/// change this line
function ModalPostProduct({
  isOpen, openModal, setOpenModal, productsNameArray, setProductsName}) {

  const closeModal = event =>{
    setOpenModal(false);
  }

  const postOneProduct = event => {
    const ref = document.getElementById('ref').value;
    const name = document.getElementById('name').value;
    const cost = document.getElementById('cost').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;

    if (ref === '' || name === '' || cost === '' || price === '' || image === '') {
      alert('Complete la información');
    }else{
      fetch('http://localhost:3002/api/v1/products', {
        method: 'POST',
        body: JSON.stringify({
            ref: ref,
            name: name,
            cost: cost,
            price: price,
            image: image
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
      
      setTimeout(() => {
        fetch("http://localhost:3002/api/v1/products")
            .then((response) => response.json())
            .then((data) => {
              // setProducts(data); // ⬅️ Guardar datos
              setProductsName(data)
              console.log('products array desde modal: ',productsNameArray); 
            });
            setOpenModal(false);
      }, 1000);
    }

  }

  return (
    isOpen ? 
      <div className='modal-background'>
          <div className='modal-product'>
            <div className='modal-header'>
              <h2>Agregar un producto</h2>
              <button onClick={closeModal}> <MdCancel /></button>
            </div>
            <form action="" className='form-container'>
              <div>
                <label htmlFor="">Referencia</label>
                <input type="text" placeholder='Referencia' id='ref' required/>
              </div>
              <div>
                <label htmlFor="">Nombre</label>
                <input type="text" placeholder='Nombre' id='name' required/>
              </div>
              <div>
                <label htmlFor="">Costo</label>
                <input type="text" placeholder='Costo' id='cost' required/>
              </div>
              <div>
                <label htmlFor="">Precio</label>
                <input type="text" placeholder='Precio' id='price' required/>
              </div>
              <div>
                <label htmlFor="">Imagen</label>
                <input type="text" placeholder='Imagen' id='image' required/>
              </div>
            </form>
            <div className='modal-footer'>
              <button onClick={postOneProduct} className='save-modal-btn'><span>Guardar</span><RiSave3Fill /></button>
              <button onClick={closeModal} className='cancel-modal-btn'><span>Cancelar</span><MdCancel /></button>
            </div>
          </div>
      </div>
    :
      ''
  )
}

export { ModalPostProduct }