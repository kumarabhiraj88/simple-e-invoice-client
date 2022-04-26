import React from 'react';
import InvoiceColumnHead from '../../constants/invoiceTableColumnsHead';
import InvoiceColumns from '../../constants/invoiceTableColumns';
import { 
    TableBody,
    TableHead
} from '@material-ui/core';

const InvoiceTableRecords = (props) => {
    const { rows, page, rowsPerPage, detailedPage, deleteFunc , searchStatus} = props;
    //console.log(rows);
    return (
        <>
            <TableHead>
                <InvoiceColumnHead />
            </TableHead>
            <TableBody>
                <InvoiceColumns searchStatus={searchStatus} detailedPage={detailedPage} deleteFunc={deleteFunc} rows={rows} page={page} rowsPerPage={rowsPerPage} />
            </TableBody>
        </>
    )
}

export default InvoiceTableRecords;