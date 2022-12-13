import './modalImportExcel.css'
import React from 'react'
import * as XLSX from 'xlsx';
import { FiUpload } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';
import { useState } from 'react';

// let timeOut = 0;
// let timeTaken = 0;
// let startTime = new Date();

function ModalImportExcel({
    importOpen,
    setImportOpen,
    productsNameArray,
    setProductsName
}) {

    const [importing, setImporting] = useState(false);

    let jsonData = {}

    const handleFile = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const workSheet = workbook.Sheets[workbook.SheetNames[0]];
        jsonData = XLSX.utils.sheet_to_json(workSheet);

        console.log(jsonData);
        console.log(workbook);
        console.log(file);
    }

    const importMassiveData = async event => {

        setImporting(true);

        if (jsonData[0].image && jsonData[0].ref && jsonData[0].name && jsonData[0].quantity && jsonData[0].cost && jsonData[0].price) {
            for (let index = 0; index < jsonData.length; index++) {

                await fetch('http://localhost:3002/api/v1/products', {
                    method: 'POST',
                    body: JSON.stringify({
                        ref: jsonData[index].ref,
                        name: jsonData[index].name,
                        quantity: parseInt(jsonData[index].quantity),
                        cost: parseInt(jsonData[index].cost),
                        price:  parseInt(jsonData[index].price),
                        image: jsonData[index].image
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    
                })
                .catch((err) => {
                    console.log(err.message);
                });
            }
            setTimeout(() => {
                fetch("http://localhost:3002/api/v1/products")
                    .then((response) => response.json())
                    .then((data) => {
                        setProductsName(data);
                    });
                    setImportOpen(false);
                    setImporting(false);
            }, 2000);
        }else{
            alert('Debe llenar las columnas obligatorias');
        }

    }

    const closeImportModal = event => {
        setImportOpen(false);
    }

    return (
        importOpen ?
            <div className='modal-background'>
                <div className='modal-excel'>
                    {
                        importing ?
                            <div className='loading-post'>
                                <div className='spinner'></div>
                            </div>
                        :
                            <div className="header-body">
                                <div className='modal-excel-header'>
                                    <h2>Cargue masivo</h2>
                                </div>
                                <div className='modal-excel-body'>
                                    <input type="file" name='Lo que sea' onChange={(e) => handleFile(e) }/>
                                </div>
                            </div>
                    }
                    <div className='modal-excel-footer'>
                        <button className='import-btn' onClick={importMassiveData} ><span>Importar</span><FiUpload/></button>
                        <button className='cancel-btn' onClick={closeImportModal} ><span>Cancelar</span><MdCancel/></button>
                    </div>
                </div>
            </div>
        :
            ''
    )
}

export { ModalImportExcel }