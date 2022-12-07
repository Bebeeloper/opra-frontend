import './asideCMS.css';
import React from 'react';

/// change this line
function AsideCMS() {

  let inventoryRoute = 'http://localhost:3000/Inventory';
  let ventasRoute = 'http://localhost:3000/Ventas';

  return (
    <aside className='product-cms-container'>
        <ul>
            <li><a href={inventoryRoute} >Inventario</a></li>
            <li><a href={ventasRoute} >Ventas</a></li>
            
            {/* <li href={inventoryRoute} >Inventario</li> */}
        </ul>
    </aside>
  )
}

export { AsideCMS }