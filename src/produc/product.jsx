import './product.css'
import {React} from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';

/// change this line
function Product({
  product, 
  index, 
  editing, 
  setEditing, 
  openModal, 
  setOpenModal,
  editProduct,
  setEditProduct
}) {

  const editItem = event => {
    setEditing(true);
    // alert(editing);
    setOpenModal(true);
    setEditProduct({
      refId: product.refId,
      ref: product.ref,
      name: product.name,
      quantity: product.quantity,
      cost: product.cost,
      price: product.price,
      image: product.image
    });
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
      <td className='edit-delete' onClick={editItem}><AiFillEdit/></td>
      <td className='edit-delete'><MdDeleteForever/></td>
    </tr>
  )
}

export { Product }