import * as invoiceServices  from '../services/invoiceServices';
import * as invoiceTypes from '../types/invoiceTypes';
import { useHistory } from "react-router-dom";


export const getInvoices = (limit = 10, skip = 0, query = '', pagination=true) => async dispatch => {
	try{  
		const loggedUserId = localStorage.getItem('loggeduserid');
		const loggedPrivilegeId = localStorage.getItem('privilegeId');
		const loggedCompanyId = localStorage.getItem('loggedCompanyId');
		 const { data } = await invoiceServices.getInvoiceApi(loggedUserId, loggedPrivilegeId, loggedCompanyId, limit, skip, query, pagination);
		 dispatch({
			type: invoiceTypes.GET_INVOICES,
			payload: data.data.items,
			invoiceCount: data.data.total
		});

	}
	catch (error) {
		if( (error.responseCode === 400 || error.responseCode === 401)	&&
		error.message === "Token Expired"){
			localStorage.removeItem('token');
			useHistory.push("/");
		}
		throw error;
	}

};
//search invoices
export const searchInvoices = (query) => async dispatch => {
	getInvoices(10, 0, query)(dispatch);
}
//create new invoice
export const addInvoiceAction = payload => async dispatch => {	
			await invoiceServices.addInvoiceApi(payload);
			getInvoices()(dispatch);
};

//update invoice
export const updateInvoiceAction = body => async dispatch => {
	let id = body.invoiceId;
	await invoiceServices.updateInvoiceApi(body, id);
	getInvoices()(dispatch);
};

//get invoice details
export const getInvoiceDetail = (id) => async dispatch => {
	try {
			const {data} = await invoiceServices.getInvoiceDetailApi(id);
			
			dispatch({
				type: invoiceTypes.GET_INVOICE_DETAILS,
				payload: data.data.invoice,
				qrcodePath:data.data.imagePath
			})
	}
	catch (err) {
			throw err;
	}
};

export function getInvoicesDashboardCount(ScStatus) {
		const loggedPrivilegeId = localStorage.getItem('privilegeId');
		const loggedCompanyId = localStorage.getItem('loggedCompanyId');
	return invoiceServices.getInvoicesDashboardApi(ScStatus, loggedPrivilegeId, loggedCompanyId);

};



export const emptyInvoiceDetails = () => async dispatch => {
	dispatch({
		type: invoiceTypes.EMPTY_INVOICE_DETAILS
	});
}

// export const deleteServicecall = async id => {
// 	await servicecallServices.deleteServicecallApi(id);
// 	getServicecalls()(dispatch);
// };

	export const deleteInvoice = (id) => async dispatch => {
	await invoiceServices.deleteInvoiceApi(id);
	getInvoices()(dispatch);
};




//INVOICE ITEMS

export const getItems = (masterId, limit = 10, skip = 0, query = '', pagination=true) => async dispatch => {
	try{  
		 const { data } = await invoiceServices.getItemApi(masterId, limit, skip, query, pagination);
		 dispatch({
			type: invoiceTypes.GET_ITEMS,
			payload: data.data.items,
			itemCount: data.data.total
		});

	}
	catch (error) {
		if( (error.responseCode === 400 || error.responseCode === 401)	&&
		error.message === "Token Expired"){
			localStorage.removeItem('token');
			useHistory.push("/");
		}
		throw error;
	}

};

export const searchItems = (query) => async dispatch => {
	getItems(10, 0, query)(dispatch);
}

export const addItemAction = payload => async dispatch => {
	const { data } = await invoiceServices.addItemApi(payload);
	getItems(data.data.masterId)(dispatch);
};

export const updateItemAction = body => async dispatch => {
	try{
		const { data } = await invoiceServices.updateItemApi(body);
		getItems(data.data.masterId)(dispatch);
	}
	catch(err){
		throw err;
	}
};


export const getItemDetail = (id) => async dispatch => {
	try {
			const {data} = await invoiceServices.getItemDetailApi(id);
			dispatch({
				type: invoiceTypes.GET_ITEM_DETAILS,
				payload: data.data
			})
	}
	catch (err) {
			throw err;
	}
};

export const emptyItemDetails = () => async dispatch => {
	dispatch({
		type: invoiceTypes.EMPTY_ITEM_DETAILS
	});
}

export const downloadImgAction = payload => async dispatch => {
	//console.log(payload);
	const filename=payload;
	let payloaddata = payload.filename;
	return await invoiceServices.downloadImgApi(payloaddata);

};

export const deleteItem = (id) => async dispatch => {
	const { data } = await invoiceServices.deleteItemApi(id);
	getItems(data.data.masterId)(dispatch);
};




