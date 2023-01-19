import './product.css'
import {React} from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';

import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

/// change this line
function Product({
  product, 
  index, 
  editing, 
  setEditing, 
  openModal, 
  setOpenModal,
  editProduct,
  setEditProduct,
  deleteOpen,
  setDeleteOpen,
  deleteId,
  setDeleteId
}) {

  const editItem = event => {
    setEditing(true);
    // alert(editing);
    setOpenModal(true);
    setEditProduct({
      id: product.id,
      ref: product.ref,
      name: product.name,
      quantity: product.quantity,
      cost: product.cost,
      price: product.price,
      image: product.image
    });
  }

  const deleteItem = event => {
    setDeleteOpen(true);
    setDeleteId(product.id);
    console.log('Algo está sucediendo: ', deleteId);
  }

  return (
    <tr className='product-card'>
      <td>{index + 1}</td>
      <td className='td-image'>
        <figure>
            <img src={product.image} alt="" />
        </figure>
      </td>
      <td>{product.ref}</td>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{product.cost}</td>
      <td>{product.price}</td>
      <td id={'edit-tooltip' + index} className='edit' onClick={editItem}><AiFillEdit/></td>
      <Tooltip
          anchorId={'edit-tooltip' + index }
          content="Editar este producto" 
          place="top"
      />
      <td id={'delete-tooltip' + index} className='delete' onClick={deleteItem}><MdDeleteForever/></td>
      <Tooltip
          anchorId={'delete-tooltip' + index}
          content="Eliminar este producto" 
          place="top"
      />
    </tr>
  )
}

export { Product }