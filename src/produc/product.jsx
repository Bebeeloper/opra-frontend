import './product.css'
import {React} from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';

/// change this line
function Product({product, index, editing, setEditing, openModal, setOpenModal}) {

  const editItem = event => {
    setEditing(true);
    // alert(editing);
    setOpenModal(true);
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