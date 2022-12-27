import './modalDelete.css'
import React from 'react'
import { MdOutlineDelete } from 'react-icons/md'
import { MdDeleteForever } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';

function ModalDelete({
  productsNameArray, 
  setProductsName,
  deleteOpen, 
  setDeleteOpen,
  deleteId,
  setDeleteId,
  deleting,
  setDeleting
}){

  const closeDeleteModal = event => {
    setDeleteOpen(false)
  }

  const deleteProduct = envent => {
    setDeleting(true);
    fetch('http://localhost:3002/api/v1/products/' + deleteId, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('response del delete: ',data);
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
            setDeleteOpen(false);
            setDeleting(false);
      }, 2000);

  }

  return (
      deleteOpen ?
        <div className='modal-background'>
            <div className='modal-delete-product'>
              <div className='delete-body'>
                {
                  deleting ? 
                    <div className='loading-post'>
                      <div className='spinner'></div>
                    </div>
                  :
                     <MdOutlineDelete className='garbage'/>
                }
                <h2>¿Estás seguro que deseas eliminar este registro?</h2>
                <p>Una vez eliminado, no se podrá recuperar esta información</p>
                    
                
              </div>
              <div className="delete-footer">
                <button className='cancel-btn' onClick={closeDeleteModal}><span>Cancelar</span><MdCancel /></button>
                <button className='delete-btn' onClick={deleteProduct}><span>Eliminar</span><MdDeleteForever /></button>
              </div>
            </div>
        </div>
      :
        ''
  )

}

export { ModalDelete }
