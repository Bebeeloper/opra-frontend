import './modalImportExcel.css'
import React from 'react'

function ModalImportExcel() {

    return(
        <div className='modal-background'>
            <div className="modal-import-excel">
                <input type="file" />
            </div>
        </div>
    )

}

export { ModalImportExcel }