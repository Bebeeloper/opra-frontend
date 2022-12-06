import './modalDelete.css'
import React from 'react'
import { MdOutlineDelete } from 'react-icons/md'
import { MdDeleteForever } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';

function ModalDelete(){

  return (

    <div className='modal-background'>
        <div className='modal-delete-product'>
          <div className='delete-body'>
            <MdOutlineDelete className='garbage'/>
            <h2>¿Estás seguro que deseas eliminar este registro?</h2>
            <p>Una vez eliminado, no se podrá recuperar esta información</p>
          </div>
          <div className="delete-footer">
            <button className='delete-btn'><span>Eliminar</span><MdDeleteForever /></button>
            <button className='cancel-btn'><span>Cancelar</span><MdCancel /></button>
            
          </div>
        </div>
    </div>
  )

}

export { ModalDelete }
