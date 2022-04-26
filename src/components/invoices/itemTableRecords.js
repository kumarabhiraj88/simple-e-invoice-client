import React from 'react';
import ItemColumnHead from '../../constants/itemTableColumnsHead';
import ItemColumns from '../../constants/itemTableColumns';
import { 
    TableBody,
    TableHead
} from '@material-ui/core';

const ItemTableRecords = (props) => {
    const { rows, page, rowsPerPage, editFunc, deleteFunc } = props;
    return (
        <>
            <TableHead>
                <ItemColumnHead />
            </TableHead>
            <TableBody>
                <ItemColumns editFunc={editFunc} deleteFunc={deleteFunc} rows={rows} page={page} rowsPerPage={rowsPerPage} />
            </TableBody>
        </>
    )
}

export default ItemTableRecords;