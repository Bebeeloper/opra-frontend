import './products.css'
import { React, useEffect, useState } from 'react'
import { Product } from '../produc/product';
import { BsArrowDownUp } from 'react-icons/bs';
import { TbFaceIdError } from 'react-icons/tb';
import { FcAddDatabase } from 'react-icons/fc';
import { ModalDelete } from '../modalDelete/modalDelete';
import { ModalPostProduct } from '../modalPOSTProduct/modalPOSTProduct';
import { ModalImportExcel } from '../modalImportExcel/modalImportExcel';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { RiFileExcel2Line } from 'react-icons/ri';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  
function Products(){

    const dataSet1 = [
        {
            name: "Johson",
            amount: 30000,
            sex: 'M',
            is_married: true
        },
        {
            name: "Monika",
            amount: 355000,
            sex: 'F',
            is_married: false
        },
        {
            name: "John",
            amount: 250000,
            sex: 'M',
            is_married: false
        },
        {
            name: "Josef",
            amount: 450500,
            sex: 'M',
            is_married: true
        }
    ];

    const [productsNameArray, setProductsName] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editProduct, setEditProduct] = useState({});
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('')
    const [deleting, setDeleting] = useState(false);
    const [importOpen, setImportOpen] = useState(false);

    useEffect(() => {
        // fetch("http://localhost:3002/api/v1/products?limit=10")
        fetch("http://localhost:3002/api/v1/products")
          .then((response) => response.json())
          .then((data) => {
            // setProducts(data); // ⬅️ Guardar datos
            setProductsName(data)
          });
      }, []);

      const addProduct = event =>{
        setOpenModal(true);
      };

      const onChangeSearch = event =>{
        let productName = document.getElementById('filter');
        if (productName.value !== '') {
            fetch("http://localhost:3002/api/v1/products/name/" + productName.value)
              .then((response) => response.json())
              .then((data) => {
                setProductsName(data.data); // ⬅️ Guardar datos
            });
        }

        if (productName.value === '') {
            fetch("http://localhost:3002/api/v1/products")
                .then((response) => response.json())
                .then((data) => {
                    setProductsName(data)
                });
        }
      };

      const importMassive = event => {
        setImportOpen(true);
      }

  return (
      <main className='main-container'>
        <ModalImportExcel 
            importOpen={importOpen}
            setImportOpen={setImportOpen}
            productsNameArray={productsNameArray} 
            setProductsName={setProductsName}
        />
        <ModalDelete 
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            deleteId={deleteId}
            setDeleteId={setDeleteId}
            deleting={deleting}
            setDeleting={setDeleting}
            productsNameArray={productsNameArray}
            setProductsName={setProductsName}
        />
        <ModalPostProduct 
            productsNameArray={productsNameArray} 
            setProductsName={setProductsName} 
            isOpen={openModal} 
            openModal={openModal} 
            setOpenModal={setOpenModal}
            editing={editing}
            setEditing={setEditing}
            editProduct={editProduct}
            setEditProduct={setEditProduct}
        />
        {/* <ExcelFile element={<button>Download Data from excel</button>}>
            <ExcelSheet data={dataSet1} name="Employees">
                <ExcelColumn label="Name" value="name"/>
                <ExcelColumn label="Wallet Money" value="amount"/>
                <ExcelColumn label="Gender" value="sex"/>
                <ExcelColumn label="Marital Status"
                                value={(col) => col.is_married ? "Married" : "Single"}/>
            </ExcelSheet>
        </ExcelFile> */}
        <h1>Inventario</h1>
        <section className='products-container'>
            <div className='product-filters'>
                <input id='filter' placeholder='Filtrar producto por nombre o referencia' type="text" onChange={onChangeSearch} />
                <div className='action-btns'>
                    <ExcelFile element={<button id="excel-export-Tooltip" className='excel-export-btn'> <RiFileExcel2Line/> </button>}>
                        <ExcelSheet data={dataSet1} name="Employees">
                            <ExcelColumn label="Name" value="name"/>
                            <ExcelColumn label="Wallet Money" value="amount"/>
                            <ExcelColumn label="Gender" value="sex"/>
                            <ExcelColumn label="Marital Status"
                                            value={(col) => col.is_married ? "Married" : "Single"}/>
                        </ExcelSheet>
                    </ExcelFile>
                    <Tooltip
                        anchorId="excel-export-Tooltip" 
                        content="Exportar plantilla de excel" 
                        place="top"
                    />
                    <button id="excel-import-Tooltip" onClick={importMassive} className='excel-btn'> <RiFileExcel2Fill/> </button>
                    <Tooltip
                        anchorId="excel-import-Tooltip" 
                        content="Importar de excel" 
                        place="top"
                    />
                    <button id="add-product-Tooltip" onClick={addProduct}> <FcAddDatabase/> </button>
                    <Tooltip
                        anchorId="add-product-Tooltip" 
                        content="Agregar un producto al inventario" 
                        place="top"
                    />
                </div>
            </div>
            <table>
                <tr className='header-table'>
                    <th> # </th>
                    <th>Imagen</th>
                    <th> 
                        <div> 
                            <p>Referencia</p> 
                            <BsArrowDownUp className='icon-arrow'/> 
                        </div> 
                    </th>
                    <th> 
                        <div> 
                            <p>Nombre del producto</p> 
                            <BsArrowDownUp className='icon-arrow'/>
                        </div> 
                    </th>
                    <th>
                    <div> 
                        <p>Cantidad</p>
                        <BsArrowDownUp className='icon-arrow'/>
                    </div> 
                    </th>
                    <th> 
                        <div> 
                            <p>Costo</p> 
                            <BsArrowDownUp className='icon-arrow'/> 
                        </div> 
                    </th>
                    <th> 
                        <div> 
                            <p>Precio</p> 
                            <BsArrowDownUp className='icon-arrow'/> 
                        </div> 
                    </th>
                    <th></th>
                    <th></th>
                </tr>
                {
                    productsNameArray.map((prod, i) => (
                        <Product 
                            product = {prod} 
                            key={prod.refId} 
                            index={i}
                            editing={editing}
                            setEditing={setEditing}
                            openModal={openModal} 
                            setOpenModal={setOpenModal}
                            editProduct={editProduct}
                            setEditProduct={setEditProduct}
                            deleteOpen={deleteOpen}
                            setDeleteOpen={setDeleteOpen}
                            deleteId={deleteId}
                            setDeleteId={setDeleteId}
                        />
                    )) 
                }
            </table>
            {
                productsNameArray?.length === 0 ? 
                    <div className='not-found'><TbFaceIdError/></div> 
                : 
                    ''
            }
        </section>
        
    </main>
  )
}

export { Products }
