import './modalPOSTProduct.css'
import React from 'react'
import { useForm } from 'react-hook-form';

import { MdCancel } from 'react-icons/md';
import { RiSave3Fill } from 'react-icons/ri';
import { useState } from 'react';
// import { Product } from '../produc/product';

/// change this line
function ModalPostProduct({
  isOpen, 
  openModal, 
  setOpenModal, 
  productsNameArray, 
  setProductsName,
  editing,
  setEditing,
  editProduct
}) {

  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [ posting, setPosting] = useState(false);

  const closeModal = (data) =>{
    setOpenModal(false);
    setEditing(false)
    reset()
  }

  const postOneProduct = (data) => {

    if (!editing) {
      if (JSON.stringify(errors) === '{}') {
        setPosting(true);
      }
  
      fetch('http://localhost:3002/api/v1/products', {
        method: 'POST',
        body: JSON.stringify({
            ref: data.ref,
            name: data.name,
            quantity: parseInt(data.quantity),
            cost: parseInt(data.cost),
            price:  parseInt(data.price),
            image: data.image
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
      
      setTimeout(() => {
        fetch("http://localhost:3002/api/v1/products")
            .then((response) => response.json())
            .then((data) => {
              setProductsName(data); 
            });
            setOpenModal(false);
            // setPosting(true);
            setPosting(false);
      }, 2000);
      reset();
    }else{

      fetch('http://localhost:3002/api/v1/products/' + editProduct.refId, {
        method: 'PATCH',
        body: JSON.stringify({
          ref: data.ref,
          name: data.name,
          quantity: data.quantity,
          cost: data.cost,
          price: data.price,
          image: data.image
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

      setTimeout(() => {
        fetch("http://localhost:3002/api/v1/products")
            .then((response) => response.json())
            .then((data) => {
              setProductsName(data); 
            });
            setOpenModal(false);
            // setPosting(true);
            setPosting(false);
            setEditing(false)
      }, 2000);
      reset();
    }

  }

  return (
    isOpen && !editing ? 
      <div className='modal-background'>
          <div className='modal-product'>
            <div className='modal-header'>
              <h2>Agregar un producto</h2>
              <button onClick={closeModal}> <MdCancel /></button>
            </div>
            {!posting ?
                <form id="product-form" onSubmit={handleSubmit(postOneProduct)} className='form-container'>
                  <div>
                    <label htmlFor="">Referencia</label>
                    <input type="text" placeholder='Referencia' {...register('ref', {
                      required: true
                    })} />
                    {/* {errors.ref?.type === 'required' && <p>Debe llenar el campo</p> */}
                  </div>
                  <div>
                    <label htmlFor="">Nombre</label>
                    <input type="text" placeholder='Nombre' {...register('name', {
                      required: true
                    })}  />
                  </div>
                  <div>
                    <label htmlFor="">Cantidad</label>
                    <input type="number" placeholder='Cantidad' {...register('quantity', {
                      required: true
                    })}  />
                  </div>
                  <div>
                    <label htmlFor="">Costo</label>
                    <input type="number" placeholder='Costo' {...register('cost', {
                      required: true
                    })} />
                  </div>
                  <div>
                    <label htmlFor="">Precio</label>
                    <input type="number" placeholder='Precio' {...register('price', {
                      required: true
                    })} />
                  </div>
                  <div>
                    <label htmlFor="">Imagen</label>
                    <input type="text" placeholder='Imagen' {...register('image', {
                      required: true
                    })} />
                  </div>
                </form>
              :
                <div className='loading-post'>
                  <div className='spinner'></div>
                </div>
            }
            <div className='modal-footer'>
              <button type="submit" form="product-form" className='save-modal-btn'><span>Guardar</span><RiSave3Fill /></button>
              <button onClick={closeModal} className='cancel-modal-btn'><span>Cancelar</span><MdCancel /></button>
            </div>
          </div>
      </div>
    :
    isOpen && editing ? 
      <div className='modal-background'>
          <div className='modal-product'>
            <div className='modal-header'>
              <h2>Editar producto</h2>
              <button onClick={closeModal}> <MdCancel /></button>
            </div>
            {!posting ?
                <form id="product-form" onSubmit={handleSubmit(postOneProduct)} className='form-container'>
                  <div>
                    <label htmlFor="">Referencia</label>
                    <input type="text" placeholder='Referencia' {...register('ref', {
                      required: true
                    })} defaultValue={editProduct.ref} />
                    {/* {errors.ref?.type === 'required' && <p>Debe llenar el campo</p> */}
                  </div>
                  <div>
                    <label htmlFor="">Nombre</label>
                    <input type="text" placeholder='Nombre' {...register('name', {
                      required: true
                    })} defaultValue={editProduct.name} />
                  </div>
                  <div>
                    <label htmlFor="">Cantidad</label>
                    <input type="number" placeholder='Cantidad' {...register('quantity', {
                      required: true
                    })} defaultValue={editProduct.quantity} />
                  </div>
                  <div>
                    <label htmlFor="">Costo</label>
                    <input type="number" placeholder='Costo' {...register('cost', {
                      required: true
                    })} defaultValue={editProduct.cost} />
                  </div>
                  <div>
                    <label htmlFor="">Precio</label>
                    <input type="number" placeholder='Precio' {...register('price', {
                      required: true
                    })} defaultValue={editProduct.price} />
                  </div>
                  <div>
                    <label htmlFor="">Imagen</label>
                    <input type="text" placeholder='Imagen' {...register('image', {
                      required: true
                    })} defaultValue={editProduct.image} />
                  </div>
                </form>
              :
                <div className='loading-post'>
                  <div className='spinner'></div>
                </div>
            }
            <div className='modal-footer'>
              <button type="submit" form="product-form" className='save-modal-btn'><span>Guardar</span><RiSave3Fill /></button>
              <button onClick={closeModal} className='cancel-modal-btn'><span>Cancelar</span><MdCancel /></button>
            </div>
          </div>
      </div>
    :
      ''
  )
}

export { ModalPostProduct }