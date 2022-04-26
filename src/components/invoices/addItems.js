import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Grid, TableBody,TableHead, TableRow, TableCell, Table, TableContainer, Paper } from '@material-ui/core';
import { Form, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import useFormValidation from "../../validators/useFormValidation";
import validateAddItems from "../../validators/validateAddItems";
import { addItemAction, updateItemAction, downloadImgAction } from "../../redux/actions/invoiceActions";
//import { Link } from 'react-router-dom';

const AddItems = (props) => {
		const {
			toggleModal,
			addItemAction,
            updateItemAction,
            downloadImgAction,
			editFlag,
            masterId,
            itemDbData
		} = props;

	let INITIAL_STATE = {
        masterId: itemDbData?.masterId || masterId,
        itemId:itemDbData._id,
		productDetails: itemDbData?.productDetails || '',
		qty: itemDbData?.qty || '',
        unit:itemDbData?.unit || '',
        unitPrice:itemDbData?.unitPrice || '',
        updatedBy: localStorage.getItem('loggeduserid')
	}

   
	const { handleChange, handleSubmit, values, errors } = useFormValidation(
		INITIAL_STATE,
		validateAddItems
		);

        // function download(imgUrl) {
        //     // var link = document.createElement('a');
        //     // link.download = imgUrl;
        //     // document.body.appendChild(link);
        //     // link.click();
        //     // document.body.removeChild(link);

        //     const url = window.URL.createObjectURL(new Blob(['https://servicecalluploads.s3.ap-south-1.amazonaws.com/']));
        //     // const url = window.URL.createObjectURL(new Blob(['https://servicecalluploads.s3.ap-south-1.amazonaws.com/'], { type: 'image/png' }));
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.setAttribute('download', values.bugAttachmentsUrlOld);
        //     document.body.appendChild(link);
        //     link.click();
        // }

        //https://www.youtube.com/watch?v=hjtTWw7XWiQ

      
        const downloadFunc = async(imgUrl) => {
  
			const { data } = await downloadImgAction(imgUrl);
            
            //const url = window.URL.createObjectURL(new Blob([data],{ type: "image/*"} ));
            const url = window.URL.createObjectURL(new Blob([data] ));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', values.bugAttachmentsUrlOld);
            document.body.appendChild(link);
            link.click();

	    }




	return (
        <Container className="pageContainer">
      <Grid container direction="column" >
				<Form
                  onSubmit={async (e) => {
                   try {
                            if (editFlag) {
                               await handleSubmit(e, updateItemAction, toggleModal, true);
                               toggleModal();
                                
                            } else {
                                await handleSubmit(e, addItemAction, toggleModal, true);
                                toggleModal();
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
                                    name="productDetails"
                                    type="text"
                                    value={values.productDetails}
                                   onChange={handleChange}
                                   // onChange={(e)=>setInputSubData({...inputSubData, [e.target.name]:e.target.value})}
                                    placeholder='Enter Product Details'
                                />
                                </InputGroup>
                            </Col>
                            <Col xs={2}>
                                <InputGroup className="mb-3">
                                <FormControl
                                    name="qty"
                                    type="text"
                                    value={values.qty}
                                    onChange={handleChange}
                                    //onChange={(e)=>setInputSubData({...inputSubData, [e.target.name]:e.target.value})}
                                    placeholder='Qty'
                                />
                                </InputGroup>
                            </Col>
                            <Col xs={2}>
                                <InputGroup className="mb-3">
                                <FormControl
                                    name="unit"
                                    type="text"
                                    value={values.unit}
                                    onChange={handleChange}
                                   // onChange={(e)=>setInputSubData({...inputSubData, [e.target.name]:e.target.value})}
                                    placeholder='Unit'
                                />
                                </InputGroup>
                            </Col>
                            <Col xs={2}>
                                <InputGroup className="mb-3">
                                <FormControl
                                    name="unitPrice"
                                    type="text"
                                    value={values.unitPrice}
                                    onChange={handleChange}
                                   // onChange={(e)=>setInputSubData({...inputSubData, [e.target.name]:e.target.value})}
                                    placeholder='Unit Price'
                                />
                                </InputGroup>
                            </Col>

                            <Col xs={2}>
                                <InputGroup className="mb-3">
                                <FormControl
                                    name="total"
                                    type="text"
                                    value={values.unitPrice * values.qty}
                                    onChange={handleChange}
                                   // onChange={(e)=>setInputSubData({...inputSubData, [e.target.name]:e.target.value})}
                                    placeholder='Total'
                                />
                                </InputGroup>
                            </Col>
                           
                           
                        </Row>
                    </Grid>
                   </Grid>
                    

					<Grid container spacing={3}>
                    <Grid  item xs={8} direction="row">
                        <Row >
                            <Col xs={3}>
                                <Button variant="contained" color="primary" type='submit'>
                                    {editFlag ? 'Update' : 'Submit'}
                                </Button>
                            </Col>
                            <Col xs={3}>
                                <Button variant="contained" color="primary" onClick={toggleModal}>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                   </Grid>
				   
				</Form>
                

{   editFlag && values.bugAttachmentsUrlOld &&

            <Col xs={4}>
               
                    <img width="200px" height="250px" src={"https://servicecalluploads.s3.ap-south-1.amazonaws.com/"+ values.bugAttachmentsUrlOld} />
                    {/* <Button style={{'margin-top': '5px'}} variant="contained" color="secondary"  onClick={() => {downloadFunc("https://servicecalluploads.s3.ap-south-1.amazonaws.com/"+ values.bugAttachmentsUrlOld)}}>Download</Button> */}
            </Col>

}
</Grid>

            
            </Container>
	)
}

const mapStateToProps = (state) => ({
	itemDbData: state.invoiceReducer.itemDetail
});

export default connect(mapStateToProps, { addItemAction, updateItemAction, downloadImgAction }) (AddItems);
