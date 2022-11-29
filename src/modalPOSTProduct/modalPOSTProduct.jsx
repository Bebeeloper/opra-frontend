import './modalPOSTProduct.css'
import React from 'react'
import { MdCancel } from 'react-icons/md';

/// change this line
function ModalPostProduct({isOpen, openModal, setOpenModal}) {

  const closeModal = event =>{
    setOpenModal(false);
  }

  return (
    isOpen ? 
      <div className='modal-background'>
          <div className='modal-product'>
            <div className='modal-header'>
              <h2>Agregar un producto</h2>
              <button onClick={closeModal}> <MdCancel /></button>
            </div>
          </div>
      </div>
    :
      ''
  )
}

export { ModalPostProduct }