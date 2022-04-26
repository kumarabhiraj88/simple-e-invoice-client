import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Container, Grid } from '@material-ui/core';
//import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { connect, useDispatch } from "react-redux";
import PageHeading from "../common/pageHeading";
import useFormValidation from "../../validators/useFormValidation";
import validateAddInvoice from "../../validators/validateAddInvoice";
import { getInvoiceDetail, updateInvoiceAction } from "../../redux/actions/invoiceActions";
import * as invoiceTypes from "../../redux/types/invoiceTypes";


import Items from "./items";

//import "react-datepicker/dist/react-datepicker.css"; is included in the App.js file
import DatePicker from "react-datepicker";



const InvoiceDetailPage = (props) => {

	const loggedPrivilegeId = localStorage.getItem('privilegeId');
console.log(props);

	const { 
			updateInvoiceAction, 
			invoiceDbData,
			qrImage
		  } = props;
	
		

	let INITIAL_STATE = {
        invoiceId: invoiceDbData?._id || '',
		invoiceNumber: invoiceDbData?.invoiceNumber || '',
        createdAt: invoiceDbData?.createdAt ||'',
		invoiceChild: invoiceDbData?.invoiceChild || '',
	};

	const { handleChange, handleSubmit, values = INITIAL_STATE, errors } = useFormValidation(
		INITIAL_STATE,
		validateAddInvoice
		);

	
		// const [disabledField, setDisabledField] = useState(null);
		// if(loggedPrivilegeId== '2'){
		// 	setDisabledField(true);
		// }
		// else{
		// 	setDisabledField(null);
		// };
		// //console.log(disabledField);

		let disabledField=true;
		//let disabledField=null;
		
	


	//if you are on react-router-dom ^5.1.1 then you could use the useParams
	const {id} = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getInvoiceDetail(id));
	}, [dispatch, id]);


	

	const updateFunction = async(e) =>{
		await handleSubmit(e, updateInvoiceAction);
	}


	
	return (
		<Container className="pageContainer">
			<PageHeading
					heading="Invoice Details"
					showButton={true}
					buttonLabel="Update"
					showBackButton={true}
					backButtonUrl={'/admin/invoices'}
					onClick={updateFunction}
				/>


			<Form style={{ 'padding-bottom':'10px'}} >
				   <Grid item xs={12} >
				   <Form.Label>Invoice Id</Form.Label>
				   <InputGroup className="mb-3">
				   
                       <FormControl 
					   			 readOnly
                                 name="invoiceNumber" 
								 value={values.invoiceNumber } 
								 onChange={handleChange} 
								 placeholder='Invoice Number'
                            />
                               
					</InputGroup>
				   </Grid>
				   <Grid container spacing={3}>
						
						
						<Grid item xs>
						<Form.Label>Invoice Date</Form.Label>
						<InputGroup className="mb-3">
						<DatePicker 
							disabled={disabledField}
							name="invoiceDate"
							value={values.createdAt ? moment(values.createdAt).format('DD-MM-YYYY'): ''}
							//onChange={(e) => handleChange(e, false, null, false, false, true)}
							onChange={(value, event) => {
								event.target = {type:"text", value:value, name:"invoiceDate"}
								handleChange(event, false, null, false, false)
							  }}
							dateFormat="DD-MM-YYYY"
						/>
						</InputGroup>
						
							{/* <FormControl
								name="expectedCompletionDate"
								type="date"
								value={moment(values.expectedCompletionDate, 'MM-DD-YYYY')}
								//value={values.expectedCompletionDate? moment(values.expectedCompletionDate).format('DD-MM-YYYY') : new Date()}
								onChange={handleChange}
							/> */}
						</Grid>


						<Grid item xs>
							<img src={qrImage} width='150' height='150' />
						</Grid>
				   </Grid>

				  

			</Form>  

				
			{ (values.invoiceId) && <Items masterId={values.invoiceId} /> }

	   </Container>
	)
}

const mapStateToProps = (state) => ({
	invoiceDbData: state.invoiceReducer.invoiceDetail,
	qrImage: state.invoiceReducer.invQrcode
});

const mapDispatchToProps={
	updateInvoiceAction,
	
}


export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetailPage);

//export default withRouter(
//connect(mapStateToProps, mapDispatchToProps) (InvoiceDetailPage)
//);