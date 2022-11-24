import './product.css'
import React from 'react'

/// change this line
function Product({product}) {
  return (
    <tr className='product-card'>
        <td className='td-image'>
          <figure>
              <img src={product.Image} alt="" />
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