import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container } from '@material-ui/core';
import { connect } from "react-redux";
import PageHeading from "../common/pageHeading";
import MTable from "../common/Mtable";
import ModalComponent from "../common/modal/modal";
import AddInvoice from "./addInvoice";
import { 
	getInvoices, 
	emptyInvoiceDetails, 
	searchInvoices, 
	getInvoiceDetail,
	deleteInvoice
	 } from "../../redux/actions/invoiceActions";
import * as invoiceTypes from '../../redux/types/invoiceTypes';
import { useFetching } from "../../Hooks/apiCall";

const Invoices = (props) => {
	const history = useHistory();
	const { invoices, searchInvoices, getInvoiceDetail, emptyInvoiceDetails, deleteInvoice } = props;

 const [addInvoiceModalState, toggleaddInvoiceModalState] = useState(false);
 const [editInvoice, setEditInvoice] = useState(false);

 const toggleAddInvoiceModal = async () => {
 	toggleaddInvoiceModalState(!addInvoiceModalState);
 	setEditInvoice(false);
 	await emptyInvoiceDetails();
 }


 const invDetailedPage = async (id) => {
	await getInvoiceDetail(id);
	 setEditInvoice(true);
	history.push(`/admin/invoices/${id}/detail`);
};

useFetching(getInvoices);

	return (

		<Container className="pageContainer" >
				<PageHeading
					heading="Invoices"
					showButton={true}
					buttonLabel="New"
					showSearch={true}
					searchAction={searchInvoices}
					onClick={toggleAddInvoiceModal}
				/>
			
				<MTable 
					tableData={invoices.items}
					contentFlag={invoiceTypes.INVOICE_FLAG}
					detailedPage={invDetailedPage}
					deleteFunc={deleteInvoice}
				/>
				<ModalComponent
					title={"Add Invoice" }
					modalState={addInvoiceModalState}
					message={<AddInvoice toggleModal={toggleAddInvoiceModal} editFlag={editInvoice} />}
					toggleModal={toggleAddInvoiceModal}
					modalClassName={'modal-dialog-invoicepopup'}
				/>

		</Container>

	)
}

const mapStateToProps = (state) => ({
	invoices: state.invoiceReducer.invoicelist
});

const mapDipatchToProps = {
	searchInvoices,
	getInvoiceDetail,
	emptyInvoiceDetails,
	deleteInvoice
}

export default connect(mapStateToProps, mapDipatchToProps)(Invoices);