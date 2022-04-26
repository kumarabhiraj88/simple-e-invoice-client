import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, Grid, TableBody,TableHead, TableRow, TableCell, Table, TableContainer, Paper } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { Form, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import useFormValidation from "../../validators/useFormValidation";
import validateAddInvoice from "../../validators/validateAddInvoice";
import { addInvoiceAction, updateInvoiceAction } from "../../redux/actions/invoiceActions";
import * as invoiceTypes from "../../redux/types/invoiceTypes";
import { connect } from "react-redux";
import ItemColumnHead from '../../constants/itemTableColumnsHead';


import {green} from "@material-ui/core/colors";

//mport { useFetching } from "../../Hooks/apiCall";

//import "react-datepicker/dist/react-datepicker.css"; is included in the App.js file
import DatePicker from "react-datepicker";

const useStyles = makeStyles((theme)=>({
    table: {
      minWidth: 650,
      
    },
    tableContainer: {
        borderRadius:15,
        marginTop:'10px'
    },
    tableHeaderCell: {
        fontWeight:'bold',
        backgroundColor:theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    }
  }));

const AddInvoice = (props) => {

    const classes = useStyles();

    const loggedPrivilegeId = localStorage.getItem('privilegeId');


    const { 
            toggleModal, 
            addInvoiceAction, 
            updateInvoiceAction, 
            editFlag, 
            invoiceDbData 
        } = props;

    
        async function invHandleSubmit(event, actionCall, toggleModal = () => { }, file = false, mainDatas){
            event.preventDefault();
            
                try { 	
                    if (file) { 
                        const formData = new FormData();
                        Object.keys(mainDatas).map((keys) => {
                            formData.append([keys], mainDatas[keys])
                        });
                        await actionCall(mainDatas);	
                        toggleModal();
                        
                        
                    }else {
                        await actionCall(mainDatas);
                        toggleModal();
                    }
    
                }
                catch(error){
                    throw error;
                }
                
            
        }
        

    const [inputMasterData, setInputMasterData]= useState([]);
    const [inputSubData, setInputSubData]= useState([]);


    const initialArray = 
    [
           { masterData: { invoiceNumber: '', filedBy: localStorage.getItem('loggeduserid') }, subData: { rowId:0, productDetails: '', qty: '',  unit: '', unitPrice: '' }  }
            
    ];

    
    
   const [mainDatas, setMainDatas] = useState(initialArray);

   const [inputGridData, setInputGridData]= useState([]);
   const [changedDatas, setChangedDatas] = useState(initialArray);


    const addItemtoGrid = (e) =>{
     setMainDatas(mainDatas => [...mainDatas, { masterData:inputMasterData, subData:inputSubData}])
     setInputSubData({ 'productDetails': '', 'qty': '', 'unit': '', 'unitPrice': '' });

    }


    const deleteFunc = async (value)=>{
        //Removing the deleted item Object and change the state into a new one
        await setMainDatas(mainDatas.filter(result=>{
            return result.subData.productDetails!==value
        }))
        
    }

    // const gridOnChangeFunction = (e)=>{
    //     console.log('my change');
    //     console.log(e.target.name);
    //     setInputSubData({   ...inputSubData, [e.target.name]:e.target.value  });
    // }
    

    return (
        <Container className="pageContainer">
           
           <Grid container direction="column" >
               <Form
                  onSubmit={async (e) => {
                   try {
                            if (editFlag) {
                                await invHandleSubmit(e, updateInvoiceAction, toggleModal, true);
                            } else {
                               // await handleSubmit(e, addInvoiceAction, toggleModal, true);
                               await invHandleSubmit(e, addInvoiceAction, toggleModal, false, mainDatas);
                            }
                           
                   }
                   catch (error){ }
                   }}
               >

                    <Grid container spacing={12}>
                        <Grid  item xs direction="row">
                            <Row >
                                <Col xs={4}>
                                    <InputGroup className="mb-3">
                                    <FormControl
                                        name="invoiceNumber"
                                        type="text"
                                        value={inputMasterData.invoiceNumber}
                                        //onChange={handleChange}
                                        onChange={(e)=>setInputMasterData({...inputMasterData, [e.target.name]:e.target.value})}
                                        placeholder='Invoice Id'
                                    />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Grid>
                   </Grid>
                

                   <Grid container spacing={12}>
                    <Grid  item xs direction="row">
                        <Row >
                            <Col xs={4}>
                                <InputGroup className="mb-3">
                                <FormControl
                                    name="productDetails"
                                    type="text"
                                    value={inputSubData.productDetails}
                                   // onChange={handleChange}
                                    onChange={(e)=>setInputSubData({...inputSubData, [e.target.name]:e.target.value})}
                                    placeholder='Enter Product Details'
                                />
                                </InputGroup>
                            </Col>
                            <Col xs={2}>
                                <InputGroup className="mb-3">
                                <FormControl
                                    name="qty"
                                    type="text"
                                    value={inputSubData.qty}
                                   // onChange={handleChange}
                                    onChange={(e)=>setInputSubData({...inputSubData, [e.target.name]:e.target.value})}
                                    placeholder='Qty'
                                />
                                </InputGroup>
                            </Col>
                            <Col xs={2}>
                                <InputGroup className="mb-3">
                                <FormControl
                                    name="unit"
                                    type="text"
                                    value={inputSubData.unit}
                                   // onChange={handleChange}
                                    onChange={(e)=>setInputSubData({...inputSubData, [e.target.name]:e.target.value})}
                                    placeholder='Unit'
                                />
                                </InputGroup>
                            </Col>
                            <Col xs={2}>
                                <InputGroup className="mb-3">
                                <FormControl
                                    name="unitPrice"
                                    type="text"
                                    value={inputSubData.unitPrice}
                                   // onChange={handleChange}
                                    onChange={(e)=>setInputSubData({...inputSubData, [e.target.name]:e.target.value})}
                                    placeholder='Unit Price'
                                />
                                </InputGroup>
                            </Col>
                           
                            <Col xs={2}>
                                <Button onClick={addItemtoGrid} variant="contained" style={{ backgroundColor: "green", color:"white" }} >
                                <i class="fas fa-plus"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                   </Grid>

                   <Grid container spacing={12}>


                        <TableContainer component={Paper} className={classes.tableContainer}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <ItemColumnHead />
                                </TableHead>
                                <TableBody>
                                {mainDatas.map((row, index) => (
                                   row.subData.productDetails?(
                                <TableRow key={index}>
                                    <TableCell style={{width: '25%'}} >
                                        <FormControl
                                        name="productDetails"
                                        type="text"
                                        value={row.subData.productDetails}
                                        //onChange={(e)=>setInputSubData({...inputSubData, ['productDetails']:e.target.value})}
                                       // onChange={(e)=>gridOnChangeFunction(e)}
                                        placeholder='Enter Product Details'
                                        />
                                    </TableCell>
                                    <TableCell style={{width: '15%'}} >
                                        <FormControl
                                        name="gridqty"
                                        type="text"
                                        value={row.subData.qty}
                                      //  onChange={(e)=>setInputSubData({...inputSubData, ['qty']:e.target.value})}
                                        placeholder='Qty'
                                        />
                                    </TableCell>
                                    <TableCell style={{width: '15%'}} >
                                        <FormControl
                                        name="gridunit"
                                        type="text"
                                        value={row.subData.unit}
                                      //  onChange={(e)=>setInputSubData({...inputSubData, ['unit']:e.target.value})}
                                        placeholder='Unit'
                                        />
                                    </TableCell>
                                    <TableCell style={{width: '15%'}} >
                                        <FormControl
                                        name="gridunitPrice"
                                        type="text"
                                        value={row.subData.unitPrice}
                                       // onChange={(e)=>setInputSubData({...inputSubData, ['unitPrice']:e.target.value})}
                                        placeholder='Unit Price'
                                        />
                                     </TableCell>
                                    <TableCell style={{width: '15%'}}>
                                        <FormControl
                                        name="gridtotal"
                                        type="text"
                                        value={row.subData.qty * row.subData.unitPrice}
                                        placeholder='Total'
                                        />
                                    </TableCell>
                                    <TableCell style={{width: '10%'}} >
                                        <Delete color='error' onClick={() => deleteFunc(row.subData.productDetails)}  />
                                    </TableCell>
                                    
                                    </TableRow>):''
                                    ))}
                                </TableBody>
                                </Table>
                            </TableContainer>


                   </Grid>
                   
                   <Grid container spacing={12}>
                    <Grid  item xs direction="row">
                    <Row ><Col xs={2}>&nbsp;</Col></Row>
                        <Row >
                            <Col xs={2}>
                                <Button variant="contained" color="primary" type='submit'>
                                    Save
                                </Button>
                            </Col>
                            <Col xs={2}>
                                <Button variant="contained" style={{ backgroundColor: "#d50000", color:"white"}} onClick={toggleModal}>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                   </Grid>

               </Form>

              
           
       </Grid>

      
 

   </Container>
    )
}


const mapStateToProps = (state) => ({
	invoiceDbData: state.invoiceReducer.invoiceDetail
});

const mapDispatchToProps={
    addInvoiceAction,
    updateInvoiceAction
}


export default connect(mapStateToProps, mapDispatchToProps)(AddInvoice);