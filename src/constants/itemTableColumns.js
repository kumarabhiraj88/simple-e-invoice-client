import React from 'react';
import moment from 'moment';
import { 
    TableCell,
    TableRow,
    Typography
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import * as invoiceTypes from '../redux/types/invoiceTypes';


const useStyles = makeStyles((theme)=>({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius:15,
        margin: '10px 10px'
    },
    tableHeaderCell: {
        fontWeight:'bold',
        backgroundColor:theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    fullname:{
        fontWeight: 'bold',
        color:theme.palette.secondary.dark
      }
  }));

const ItemColumns= (props) =>{
    const classes = useStyles();
    const { rows, page, rowsPerPage, editFunc, deleteFunc } = props;

    const loggedPrivilegeId = localStorage.getItem('privilegeId');

    return(
        <>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row._id}>
                <TableCell >{row.productDetails? row.productDetails : '' }</TableCell>
                <TableCell >{row.qty? row.qty : '' }</TableCell>
                <TableCell >{row.unit? row.unit : '' }</TableCell>
                <TableCell >{row.unitPrice? row.unitPrice : '' }</TableCell>
                <TableCell >{row.unitPrice? row.unitPrice * row.qty : '' }</TableCell>
                <TableCell ><Edit color="primary" onClick={() => editFunc(row._id)}  /> 
                {
                    loggedPrivilegeId=='1' ? <Delete onClick={() => deleteFunc(row._id)} color="error" /> : ''
                }
                
                </TableCell>
                </TableRow>
            ))}
        </>
    )
}


export default ItemColumns;