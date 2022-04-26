import { http } from './http';

export const getInvoiceApi = async (loggedUserId, loggedPrivilegeId, loggedCompanyId, limit, skip, query) => 
	await http.get(
		`/admin/invoice/getInvoicesList?loggedUserId=${loggedUserId}&loggedPrivilegeId=${loggedPrivilegeId}&loggedCompanyId=${loggedCompanyId}&limit=${limit}&skip=${skip}&query=${query}`
	);

export const getInvoiceDetailApi =  async id =>
	await http.get(
			`/admin/invoice/${id}/detail`
		);
export const addInvoiceApi = async data => {
	await http.post(`/admin/invoice/addInvoice`, data);
}

export const updateInvoiceApi = async (data, id) => {
	await http.put(`/admin/invoice/${id}`, data);
}

export const getInvoicesDashboardApi =  async (id, loggedPrivilegeId, loggedCompanyId) =>
	await http.get(
			`/admin/invoice/${id}/count?loggedPrivilegeId=${loggedPrivilegeId}&loggedCompanyId=${loggedCompanyId}`
		);
export const deleteInvoiceApi = async id =>
	await http.delete(`/admin/invoice/${id}/delete`);
		
//invoice COMMENTS

export const getItemApi = async (masterId, limit, skip, query) => 
	await http.get(
		`/admin/invoice/item/getItemsList?masterId=${masterId}&limit=${limit}&skip=${skip}&query=${query}`
	);
export const getItemDetailApi =  async id =>
	await http.get(
			`/admin/invoice/item/${id}/detail`
		);
export const addItemApi = async data => {
	return await http.post(`/admin/invoice/item/addItem`, data);
}

export const updateItemApi = async data => {
	//await http.put(`/admin/invoice/item/update`, data);
	return await http.post(`/admin/invoice/item/updateItem`, data);
}

export const downloadImgApi = async data => {
	return await http.post(`/admin/invoice/item/downloadImg`, data);
	//return await http.get(`/admin/invoice/item/downloadImg`);
}

export const deleteItemApi = async id => {
	return await http.delete(`/admin/invoice/item/${id}/delete`);
}
