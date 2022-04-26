import * as invoiceTypes  from '../types/invoiceTypes';

const initState = {
    tokenExpire: false,
    invoicelist: { items: [], count: 0 },
	invoiceDetail: {},
    itemlist: { items: [], count: 0 },
	itemDetail: {},

}


const invoiceReducer =  (state=initState, action) => {
    switch(action.type){
        
            case invoiceTypes.GET_INVOICES:
                return {
                    ...state,
                    invoicelist: { 
                        items: [...action.payload],
                        count: action.invoiceCount
                    }
                };
            case invoiceTypes.GET_INVOICE_DETAILS:
                return {
                    ...state,
                    invoiceDetail: { ...action.payload },
                    invQrcode: action.qrcodePath
                }
            case invoiceTypes.EMPTY_INVOICE_DETAILS:
                return {
                    ...state,
                    invoiceDetail: {}
                }
            
                
//INVOICE ITEMS

            case invoiceTypes.GET_ITEMS:
                return {
                    ...state,
                    itemlist: { 
                        items: [...action.payload],
                        count: action.itemCount
                    }
                };
            case invoiceTypes.GET_ITEM_DETAILS:
                return {
                    ...state,
                    itemDetail: { ...action.payload }
                }
            case invoiceTypes.EMPTY_ITEM_DETAILS:
                return {
                    ...state,
                    itemDetail: {}
                }
        default:
            return state;
    }

    
}

export default invoiceReducer;