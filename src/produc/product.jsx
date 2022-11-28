import './product.css'
import React from 'react'

/// change this line
function Product({product, index}) {
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
      <td>{product.cost}</td>
      <td>{product.price}</td>
    </tr>
  )
}

export { Product }