import React from 'react';
import moment from 'moment';
import { 
    TableCell,
    TableRow,
    Typography
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import * as servicecallTypes from '../redux/types/invoiceTypes';



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

const ServicecallColumns= (props) =>{
    const classes = useStyles();
    const { rows, page, rowsPerPage, detailedPage, deleteFunc, searchStatus } = props;


    const loggedPrivilegeId = localStorage.getItem('privilegeId');

    //console.log(rows);

    //search conditions written on common/Mtable.js

    return(
        <>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        
                <TableRow key={row._id} style={{display: (searchStatus=='no' && row.bugStatus=='5') ? 'none' : '' }} >
                <TableCell component="th" scope="row">
                <Typography className={classes.fullname}>{row.invoiceNumber}</Typography>
                </TableCell>
                <TableCell >{row.filedBy? row.filedBy.fullName : ''}</TableCell>
                <TableCell >{row.createdAt? moment(row.createdAt).format('DD-MM-YYYY') : ''}</TableCell>
                <TableCell >
                    <Edit  color='warning' onClick={() => {
						detailedPage(row._id);
					}} />
                    
                    {
                        loggedPrivilegeId=='1' ? <Delete color='error' onClick={() => deleteFunc(row._id)}  /> : ''
                    }
                    
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}


export default ServicecallColumns;