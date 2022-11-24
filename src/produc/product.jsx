import React from 'react'

/// change this line
function Product({product}) {
  return (
    <article className='product-card'>
        <h2>{product.ref}</h2>
        <figure>
            <img src={product.Image} alt="" />
        </figure>
        <p>{product.name}</p>
        <p>{product.price}</p>
    </article>
  )
}

export { Product }